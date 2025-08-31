import React, { createContext, useContext, useRef, ReactNode, useMemo } from 'react';
import { getIdFromBody, TextImageAsBody, TextStyle, ViewStyle } from '../abstract/PrerenderedTextProvider';
import { PrerenderedTextStyle } from '../abstract/screensStyle/ScannerScreen';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/core';
import FastImage from '@d11/react-native-fast-image';
import RNFetchBlob from "rn-fetch-blob";
const fs = RNFetchBlob.fs;

interface CacheContextType {
  getPrerenderedUrl: (props: TextImage, routeName: string) => Promise<string>;
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

  const fetchTasks: any[] = [];

  function cancelAllFetches() {
    fetchTasks.forEach(task => {
      task.cancel();
    });
    // Optionally clear the tasks array
    fetchTasks.length = 0;
  }
  const getPrerenderedUrl = async (props: TextImage, routeName: string): Promise<string> => {
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
      const body = TextImageAsBody({ ...props, anchor: props.anchor || 'start' });
      const config = RNFetchBlob.config({
        session: routeName,
        fileCache: true
      });
      const response = config.fetch("GET", `https://bool-failing-calculator-orchestra.trycloudflare.com/images/${routeName}/${getIdFromBody(body)}.webp`,);


      // the image is now dowloaded to device's storage
      const base64 = await response.then(resp => {
        // the image path you can use it directly with Image component
        // let imagePath = resp.path();
        // console.log(imagePath)
        // fs.unlink(imagePath);
        return resp.base64();
      });

      if (base64) {
        console.log(props.lines || props.style?.lines,'base64',base64)
        const newLocal = `data:image/wepb;base64,${base64}`;
        // console.log(base64)
        urlCache.current.set(cacheKey, newLocal);
        return newLocal;
      }

      console.log('am asking')
      const promise = config.fetch(
        "POST",
        'https://bool-failing-calculator-orchestra.trycloudflare.com/generate-svg',
        {
          headers: JSON.stringify({
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify({ ...body, routeName: routeName }),
        }
      ).then(async (response) => {
        // const data = await response.json();
        const fullUrl = 'https://bool-failing-calculator-orchestra.trycloudflare.com' + data.imageUrl;
        console.log(fullUrl);
        // setTimeout(() => {
        //   urlCache.current.set(cacheKey, fullUrl);
        // }, 0)
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
  const memo = useMemo(() => ({ getPrerenderedUrl }), [])
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
