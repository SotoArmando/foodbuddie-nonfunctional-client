import { useState, useEffect, useMemo, useRef, Suspense } from 'react';
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
import { TextImageAsBody } from './PrerenderedTextProvider';
import FastImage from '@d11/react-native-fast-image';
import { scale } from './StyleProvider';
import { usePrerenderCache } from '../providers/PrerenderedTextProvider';
import { PrerenderedTextStyle } from './screensStyle/ScannerScreen';
import { useIsFocused, useNavigationState, useRoute } from '@react-navigation/core';
import { useCardAnimation } from '@react-navigation/stack';



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
  switcheable?: boolean;
  preloadColor?: { color: string, fontWeight: string }[];
  pStyles?: number;
  hot?: boolean;
}

const usePrerenderedTextUrl = (props: TextImage) => {
  const [url, setURL] = useState('');
  const { getPrerenderedUrl } = usePrerenderCache();
  const [preloaded, setPreloaded] = useState<string[]>([]);
  const route = useRoute()

  useEffect(() => {
    getPrerenderedUrl(props as any, route.name).then((result) => {
      setURL(result);
    });

    if (props.preloadColor) {
      // console.log(props.preloadColor)
      props.preloadColor.forEach(e => {
        getPrerenderedUrl({ ...props, style: { ...props.style, color: e.color, fontWeight: e.fontWeight } } as any, route.name).then(v => {
          setPreloaded([...preloaded, v])
          // FastImage.preload(preloaded.map(e => ({ uri: e })));
        })
      })
    }

  }, []);

  // console.log(props.pStyles, props.lines, url);
  const memo = useMemo(() => ({ url: props.pStyles !== undefined && props.pStyles > 0 ? preloaded[props.pStyles] : url, preloaded }), [props.pStyles, url])
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
  // const { isFocused = false, timeout = 500, pStyles } = props;
  const [cIsFocused, setcIsFocused] = useState(props.hot);
  const { url, preloaded } = usePrerenderedTextUrl({ ...props, anchor: props.anchor || props.style?.anchor || 'start' });
  const fetchTasks = [];
  // const x = useIsFocused()
  useEffect(() => {
    // console.log("pstyles",props.pStyles)
    // console.log("switcheable",props.switcheable)
    // console.log(props.pStyles !== undefined && props.switcheable === true)
    if (props.hot === true) {
      // setcIsFocused(true);
    } else {

      InteractionManager.runAfterInteractions(() => {
        setcIsFocused(true);
      })

    }

  }, []);

  const images = useMemo(() => [
    <FastImage
      resizeMode={FastImage.resizeMode.contain}
      // fallback={true}
      source={{
        uri: url,

        priority: props.hot ? FastImage.priority.high : FastImage.priority.normal,

      }}
      style={{
        height: props.style?.height || scale(props.height || 30),
        minHeight: props.style?.height || scale(props.height || 30),
        width: props.style?.width || scale(props.width || 200),
        minWidth: props.style?.width || scale(props.width || 200),
        // backgroundColor: pStyles ? 'rgba(0,0,244,0.3)' : 'red',
        display: props.pStyles !== undefined && props.pStyles >= 0 ? 'none' : props.style?.display,
        ...props.imageStyle,
      }}
    />,
    ...preloaded.map((e, ie) => <FastImage
      resizeMode={FastImage.resizeMode.contain}
      source={{
        uri: e,
        priority: FastImage.priority.low,
      }}
      style={{
        height: props.style?.height || scale(props.height || 30),
        minHeight: props.style?.height || scale(props.height || 30),
        width: props.style?.width || scale(props.width || 200),
        minWidth: props.style?.width || scale(props.width || 200),
        // backgroundColor: pStyles ? 'rgba(0,0,244,0.3)' : 'red',
        display: ie === props.pStyles ? 'flex' : 'none',
        ...props.imageStyle,
      }}
    />)
  ], [props.pStyles, url])

  // console.log(props)
  return (
    <Suspense>
      <View style={{
        ...props.viewStyle,
        minHeight: props.style?.height || scale(props.height || 30),
        minWidth: props.style?.width || scale(props.width || 200),
        // backgroundColor:'blue'
        // backgroundColor: isFocused ? 'transparent' :  props.style?.color
      }}>
        <View>
          {cIsFocused && images}

        </View>
      </View>
    </Suspense>

  );
};



export default PrerenderedText;
