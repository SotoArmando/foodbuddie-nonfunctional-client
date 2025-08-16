import React, { createContext, useContext, ReactNode } from 'react';
import {
  StyleSheet,
  TextStyle,
  ViewStyle,
  ImageStyle,
  PixelRatio,
} from 'react-native';
import { PrerenderedTextStyle } from './screensStyle/ScannerScreen';

type StoredLabel = {
  identifier: string;
  content: string;
};

type LabelStorageContext = {
  labels: StoredLabel[];
  fetchLabel: (query: TextImage) => Promise<StoredLabel>; // Optional if you fetch dynamically
  // [key: string]: any; // Allow additional components to be added
};

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

}
// export const defaultStorage: LabelStorageContext = {
//   labels: []
// };

const TextImageAsBody = (props: TextImage) => {
  // console.log(PixelRatio.get())
  return JSON.stringify({
    width1: (props.style?.width || props.width).toString(),
    width: ((props.style?.width || props.width) * (PixelRatio.get() * (PixelRatio.get()))).toString(),
    height1: (props.style?.height || props.height).toString(),
    height: ((props.style?.height || props.height) * (PixelRatio.get() * (PixelRatio.get()))).toString(),
    // gradientColors: props.gradientColors || [
    //   'rgba(255,0,0,0.005)',
      
    //   'rgba(0,255,0,0.005)',
    // ],
    // gradientColorsB: props.gradientColorsB || [
    //   'rgba(255,255,0,0.005)',
      
    //   'rgba(0,0,255,0.005)',
    // ],

    gradientColors: props.gradientColors || [
      'rgba(255,0,0,0.00001)',
      'rgba(255,255,255,0)',
      'rgba(0,255,0,0.00001)',
    ],
    gradientColorsB: props.gradientColorsB || [
      'rgba(255,255,0,0.01)',
      'rgba(255,255,255,0)',
      'rgba(0,0,255,0.01)',
    ],
    lines: (props.style?.lines && Object.values(props.style?.lines)) || props.lines || [
      'Bienvenido, Armando!',
      // "for my application work"
    ],
    textDecoration: props.textDecoration,
    fontSize:
      (props.style?.fontSize && (props.style?.fontSize).toString()) || '22',
    fontFamily: props.style?.fontFamily || 'Epilogue',
    fontWeight: props.style?.fontWeight || '700',
    lineHeight: ((props.style?.lineHeight && props.style?.fontSize) ? (props.style?.lineHeight / props.style?.fontSize) : 1.777) ,
    anchor: props.style?.anchor || props.anchor || 'start',
    fill: props.style?.color || 'rgb(12, 28, 23)',
    x: props.anchor === 'start' ? '0.5' : '49.90%',
    x1: props.anchor === 'start' ? '0' : '50%',
    x2: props.anchor === 'start' ? '1' : '50.10%',
    isicon: props.isIcon || null,
    viewY: props.viewY || 0,
    viewX: props.viewX || 0,
    letterSpacing: props.style?.letterSpacing || null,
  });
};

export { React, createContext, TextImageAsBody, useContext, StyleSheet };

export type {
  LabelStorageContext,
  TextImage,
  StoredLabel,
  TextStyle,
  ViewStyle,
  ImageStyle,
  ReactNode,
};
