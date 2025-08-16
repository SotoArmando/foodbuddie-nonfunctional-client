import React, { createContext, useContext, ReactNode } from 'react';
import { StyleSheet, TextStyle, ViewStyle, ImageStyle } from 'react-native';

// Define style types for components
type ComponentStyles = {
  Button: {
    container: ViewStyle;
    text: TextStyle;
  };
  Card: {
    container: ViewStyle;
    header: TextStyle;
    content: TextStyle;
  };
  [key: string]: any; // Allow additional components to be added
};

const defaultStyles: ComponentStyles = {
  Button: {
    container: {
      backgroundColor: '#6200EE',
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    text: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
  },
  Card: {
    container: {
      backgroundColor: '#FFFFFF',
      padding: 16,
      borderRadius: 8,
      shadowColor: '#02733E',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    header: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    content: {
      fontSize: 14,
      color: '#333333',
    },
  },
};

const StyleContext = createContext<ComponentStyles>(defaultStyles);

// Hook to use component styles
export const useComponentStyles = <T extends keyof ComponentStyles>(
  componentName: T
) => {
  const styles = useContext(StyleContext);
  return styles[componentName];
};

type StyleProviderProps = {
  styles?: Partial<ComponentStyles>;
  children: ReactNode;
};

// Merging default styles with custom styles
export const StyleProvider = ({ styles, children }: StyleProviderProps) => {
  const mergedStyles = {
    ...defaultStyles,
    ...styles,
    // Deep merge nested objects
    Button: {
      ...defaultStyles.Button,
      ...styles?.Button,
    },
    Card: {
      ...defaultStyles.Card,
      ...styles?.Card,
    },
  };

  return (
    <StyleContext.Provider value={mergedStyles}>
      {children}
    </StyleContext.Provider>
  );
};
