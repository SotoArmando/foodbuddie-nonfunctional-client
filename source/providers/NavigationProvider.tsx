import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';
import debounce from 'lodash.debounce';
import { InteractionManager } from 'react-native';
import { useSession } from './SessionProvider';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SkiaTutorial } from '../screens/modulate/bottomnavbar/morphtestskia';
import { usePrerenderCache } from './PrerenderedTextProvider';
import RNFetchBlob from 'rn-fetch-blob';



// Define your navigation param list type if you have it, else use any
type RootStackParamList = any;

interface NavigationContextType {
  navigation: StackNavigationProp<RootStackParamList>,
  goToPlanning: () => void;
  goToAllSet: () => void;
  goToOnboard: () => void;
  goToPreferences: () => void;
  goToSignUp: () => void;
  goToHome: () => void;
  goToPantry: () => void;
  goToRecipes: () => void;
  goToProfile: () => void;
  goToSearchScreen: () => void;
  goToPlannerAdd: () => void;
  goToRecipeDetails: () => void;
  goToScanner: (params: any) => void;
  goToLoadScreen: () => void;
  currentScreen: string | null;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode, navigation: StackNavigationProp<{ route: {} }> }> = ({ children, navigation }) => {
  // const navigation = useNavigation<StackNavigationProp<{route: {}}>>();
  const [nextScreen, setNextScreen] = useState<string | null>(null);
  const [currentScreen, setcurrentScreen] = useState<string>('Home');
  const { hasSession, updateSession } = useSession();
  // const [screens, setScreens] = useState<string[]>([]);

  // Helper to create debounced navigation functions that also set nextScreen
  const createNavFunction = useCallback(
    (screenName: string) =>
      debounce(async (params?: any) => {

        // setScreens(screens.includes(screenName) ? screens : [...screens,screenName]);
        setTimeout(() => {
          
          RNFetchBlob.session(currentScreen).dispose();
          setcurrentScreen(screenName);
          

          setTimeout(() => {
            const hiddenNavScreens = ['LoadScreen', 'PlannerAdd', 'Scanner', 'Splash', 'Onboard', 'SignUp', 'AllSet', 'Preferences'];
            const resetRoutes = ['Home', 'RecipesDetails', 'Pantry', 'Planning', 'Preferences']

            if (resetRoutes.includes(screenName)) {

              // navigation.dispatch((state) => {
              //   // Remove all the screens after `Profile`
              //   const index = state.routes.findIndex((r) => r.name === screenName);
              //   const routes = state.routes.slice(0, index + 1);

              //   return CommonActions.reset({
              //     ...state,
              //     index: index, // index should point to the last route
              //     routes: state.routes, // keep only the last two routes
              //   });
              // });
            }
            if (hiddenNavScreens.includes(screenName)) {
              updateSession(false);
            } else {
              updateSession(true);
            }

          })
        })

        setTimeout(() => {
            navigation.replace(screenName, params || { routeName: screenName });
            // setTimeout(() => {
            //   navigation.navigate(screenName, params || { routeName: screenName });
            // }, 1)
          },2)

        


      }),


    []
  );

  const goToPlanning = createNavFunction('Planning');
  const goToAllSet = createNavFunction('AllSet');
  const goToOnboard = createNavFunction('Onboard');
  const goToPreferences = createNavFunction('Preferences');
  const goToHome = createNavFunction('Home');
  const goToPantry = createNavFunction('Pantry');
  const goToRecipes = createNavFunction('Recipes');
  const goToProfile = createNavFunction('Profile');
  const goToSearchScreen = createNavFunction('SearchScreen');
  const goToPlannerAdd = createNavFunction('PlannerAdd');
  const goToRecipeDetails = createNavFunction('RecipesDetails');
  const goToSignUp = createNavFunction('SignUp');
  const goToScanner = createNavFunction('Scanner');
  const goToLoadScreen = createNavFunction('LoadScreen');

  const memo = useMemo(() => ({
    navigation,
    goToPlanning,
    goToAllSet,
    goToOnboard,
    goToPreferences,
    goToSignUp,
    goToHome,
    goToPantry,
    goToRecipes,
    goToProfile,
    goToSearchScreen,
    goToPlannerAdd,
    goToRecipeDetails,
    goToScanner: (params) => {
      goToScanner(params);
    },
    goToLoadScreen,
    currentScreen
  }), []);

  return (
    <NavigationContext.Provider
      value={memo}
    >
      {children}
      <SkiaTutorial />
    </NavigationContext.Provider>
  );
};

export const useScreenRoutes = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useScreenRoutes must be used within a NavigationProvider');
  }
  return context;
};
