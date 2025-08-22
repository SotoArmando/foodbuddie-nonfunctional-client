import { useState, useEffect, useMemo, useRef } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  PixelRatio,
  TextStyle,
  Dimensions,
  ViewStyle,
  InteractionManager,
  ImageStyle,
} from 'react-native';
import { TextImageAsBody } from './PrerenderingProvider';
import FastImage from '@d11/react-native-fast-image';
import { scale } from './StyleProvider';
import { usePrerenderCache } from '../providers/PrerenderedTextProvider';
import { PrerenderedTextStyle } from './screensStyle/ScannerScreen';

interface TextImage {
  height?: number;
  width?: number;
  lines?: string[];
  anchor?: string;
  textDecoration?: string;
  gradientColors?: string[];
  gradientColorsB?: string[];
  isIcon?: string;
  viewY?: number;
  viewX?: number;
  style?: PrerenderedTextStyle | TextStyle;
  letterSpacing?: number;
  quality?: number;
  viewStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  isFocused?: boolean;
  timeout?: number;
  preloadColor?: { color: string, fontWeight: string }[];
  pStyles?: number;
}

const usePrerenderedTextUrl = (props: TextImage) => {
  const [url, setURL] = useState('');
  const { getPrerenderedUrl } = usePrerenderCache();
  const [preloaded, setPreloaded] = useState<string[]>([]);

  useEffect(() => {
    getPrerenderedUrl(props as any).then((result) => {
      setURL(result);
    });

    if (props.preloadColor) {
      // console.log(props.preloadColor)
      props.preloadColor.forEach(e => {
        getPrerenderedUrl({ ...props, style: { ...props.style, color: e.color, fontWeight: e.fontWeight } } as any).then(v => {
          setPreloaded([...preloaded, v])
          FastImage.preload(preloaded.map(e => ({ uri: e })));
        })
      })
    }

  }, []);

  // console.log(props.pStyles, props.lines, url);
  const memo = useMemo(() => ({ url: props.pStyles !== undefined ? preloaded[props.pStyles] : url, preloaded }), [props.pStyles, url])
  return memo;
};

const PrerenderedText: React.FC<TextImage> = (props = {
  anchor: "start",
  viewStyle: {},
  textDecoration: "none",
  isFocused: false,
  preloadColor: [],
  pStyles: undefined,
}) => {
  const { isFocused = false, timeout, pStyles } = props;
  const [cIsFocused, setcIsFocused] = useState((pStyles && true) || false);
  const { url } = usePrerenderedTextUrl({ ...props, anchor: props.anchor || props.style?.anchor || 'start' });

  useEffect(() => {
    if (isFocused === true && cIsFocused !== isFocused) {
      setTimeout(() => {
        setcIsFocused(isFocused)
      }, timeout || 350);
    } else {
      if (cIsFocused !== isFocused) {
        setcIsFocused(isFocused)
      }
    }

  }, [isFocused]);


  // console.log(props)
  return (
    <View style={{
      ...props.viewStyle,
      height: props.style?.height || scale(props.height || 30),
      width: props.style?.width || scale(props.width || 200),
      // backgroundColor: isFocused ? 'transparent' :  props.style?.color
    }}>
      {url && cIsFocused && <>
        
        {!pStyles && <FastImage
          resizeMode={FastImage.resizeMode.contain}
          source={{ uri: url }}
          style={{
            height: props.style?.height || scale(props.height || 30),
            minHeight: props.style?.height || scale(props.height || 30),
            width: props.style?.width || scale(props.width || 200),
            minWidth: props.style?.width || scale(props.width || 200),

            // backgroundColor: 'rgba(0,0,244,0.3)',
            display: props.style?.display,
            ...props.imageStyle,
          }}
        />}
      </>}
    </View>

  );
};



export default PrerenderedText;
