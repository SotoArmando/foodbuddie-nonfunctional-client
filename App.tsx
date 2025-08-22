/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { StrictMode } from 'react';
import { StyleProvider } from './source/providers/StyleProvider';
import { ScreensLayout } from './source/layout/screens_layout';
import { SessionProvider } from './source/providers/SessionProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DaySelectionProvider } from './source/providers/DaySelectorProvider';
// import { PrerenderCacheProvider } from './source/providers/PrerenderedTextProvider';
// import { NavigationProvider } from './source/providers/NavigationProvider';
// import { useScreens } from 'react-native-screens';
function App(): React.JSX.Element {
  // useScreens();
  /*
   * To keep the template simple and small we're adding padding to prevent view
   * from rendering under the System UI.
   * For bigger apps the recommendation is to use `react-native-safe-area-context`:
   * https://github.com/AppAndFlow/react-native-safe-area-context
   *
   * You can read more about it here:
   * https://github.com/react-native-community/discussions-and-proposals/discussions/827
   */

  return (
    <>
      {/* <StrictMode> */}
        <StyleProvider>
          <SessionProvider initialSessionState={true}>
              <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#FDFEF4' }}>
                <ScreensLayout />
              </GestureHandlerRootView>
          </SessionProvider>
        </StyleProvider>
      {/* </StrictMode> */}
    </>
  );
}


export default App;
