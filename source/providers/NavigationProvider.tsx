import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import debounce from 'lodash.debounce';
import {  InteractionManager } from 'react-native';
import { useSession } from './SessionProvider';



// Define your navigation param list type if you have it, else use any
type RootStackParamList = any;

interface NavigationContextType {
  navigation: NavigationProp<RootStackParamList>,
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

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [nextScreen, setNextScreen] = useState<string | null>(null);
  const [currentScreen, setcurrentScreen] = useState<string | null>(null);
  const { hasSession, updateSession } = useSession();
  // const [screens, setScreens] = useState<string[]>([]);

  // Helper to create debounced navigation functions that also set nextScreen
  const createNavFunction = useCallback(
    (screenName: string) =>
       debounce(async (params?: any) => {
        setcurrentScreen(screenName);
        // setScreens(screens.includes(screenName) ? screens : [...screens,screenName]);

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

        InteractionManager.runAfterInteractions(() => {
          navigation.navigate(screenName, params || {});
        })
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
