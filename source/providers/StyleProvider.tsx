import { useMemo } from 'react';
import {
  React,
  createContext,
  useContext,
  ReactNode,
  defaultStyles,
  ComponentStyles,
  scaleStyles,
} from '../abstract/StyleProvider';

const StyleContext = createContext<ComponentStyles>(defaultStyles);

// Hook to use component styles
export const useComponentStyles = <T extends keyof ComponentStyles>(
  componentName: T,
  isFocused?: boolean
) => {
  // if (isFocused === false) {
  //   return {} as any;
  // }
  
  const styles = useContext(StyleContext);
  
  return scaleStyles(styles[componentName]);
};

type StyleProviderProps = {
  styles?: Partial<ComponentStyles>;
  children: ReactNode;
};

// Merging default styles with custom styles
export const StyleProvider = ({styles, children}: StyleProviderProps) => {
  const mergedStyles = {
    ...defaultStyles,
    ...styles,
  };

  return (
    <StyleContext.Provider value={mergedStyles}>
      {children}
    </StyleContext.Provider>
  );
};
