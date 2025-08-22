import React, { createContext, useContext, useRef, ReactNode, useMemo } from 'react';
import { TextImageAsBody, TextStyle, ViewStyle } from '../abstract/PrerenderingProvider';
import { PrerenderedTextStyle } from '../abstract/screensStyle/ScannerScreen';


interface CacheContextType {
  getPrerenderedUrl: (props: TextImage) => Promise<string>;
}


interface TextImage {
  height: number;
  width: number;
  lines: string[];
  anchor?: string;
  textDecoration?: string;
  gradientColors?: string[];
  gradientColorsB?: string[];
  isIcon?: string;
  viewY?: number;
  viewX?: number;
  style?: PrerenderedTextStyle;
  letterSpacing?: number;
  quality?: number;
  viewStyle?: ViewStyle;
}

const PrerenderCacheContext = createContext<CacheContextType | undefined>(undefined);

export const PrerenderCacheProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const urlCache = useRef<Map<string, string>>(new Map());
  const promiseCache = useRef<Map<string, Promise<string>>>(new Map());

  const getPrerenderedUrl = async (props: TextImage): Promise<string> => {
    // console.log(props);
    const cacheKey = [JSON.stringify(props.lines), JSON.stringify(props.style?.lines), props.style?.fontSize, props.style?.width, props.style?.color].join(',');
    // console.log(cacheKey);
    if (urlCache.current.has(cacheKey)) {
      return urlCache.current.get(cacheKey)!;
    }

    // if (promiseCache.current.has(cacheKey)) {
    //   return promiseCache.current.get(cacheKey)!;
    // }

    try {
      const newLocal = TextImageAsBody({ ...props, anchor: props.anchor || 'start' });
      // console.log(newLocal);
      const promise = fetch(
        'https://antonio-constant-intranet-field.trycloudflare.com/generate-svg',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: newLocal,
        }
      ).then(async (response) => {
        const data = await response.json();
        const fullUrl = 'https://antonio-constant-intranet-field.trycloudflare.com' + data.imageUrl;
        console.log(data);
        setTimeout(() => {
          urlCache.current.set(cacheKey, fullUrl);
        }, 0)
        return fullUrl;
      });


      // promiseCache.current.set(cacheKey, promise);
      const result = await promise;
      // promiseCache.current.delete(cacheKey);
      return result;
    } catch (error) {
      console.error('Error fetching image:', error);
      return 'error';
    }
  };
  const memo = useMemo(() => ({getPrerenderedUrl}), [])
  return (
    <PrerenderCacheContext.Provider value={memo}>
      {children}
    </PrerenderCacheContext.Provider>
  );
};

export const usePrerenderCache = (): CacheContextType => {
  const context = useContext(PrerenderCacheContext);
  if (!context) {
    throw new Error('usePrerenderCache must be used within a PrerenderCacheProvider');
  }
  return context;
};
