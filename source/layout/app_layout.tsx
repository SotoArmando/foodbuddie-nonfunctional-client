import {
    NavigationContainer,

    // useLinkBuilder,
    // useTheme,
} from '@react-navigation/native';
import { Animated, Dimensions, StatusBar, View } from 'react-native';
import { SplashScreen } from '../screens/splash';
import { Preferences } from '../screens/modulate/splash/preferences';
import { AllSet } from '../screens/modulate/status/allset';
import { Home } from '../screens/home';
import { Planning } from '../screens/planning';
import { Pantry } from '../screens/pantry';
import { Recipes } from '../screens/recipes';
import { Profile } from '../screens/profile';
import { SkiaTutorial } from '../screens/modulate/bottomnavbar/morphtestskia';
import { PlannerAdd } from '../screens/modulate/planner/planner_add';
import { SearchScreen } from '../screens/search';
import { RecipesDetails } from '../screens/modulate/recipes/recipedetail';
import { NavigationProvider } from '../providers/NavigationProvider';
import { PrerenderCacheProvider } from '../providers/PrerenderedTextProvider';
import { Scanner } from '../screens/scan';
import { LoadScreen } from '../screens/modulate/status/loadscreen';
import { Onboarding } from '../screens/modulate/splash/onboarding';
import { SignUp } from '../screens/modulate/splash/signup';
import { createStackNavigator } from '@react-navigation/stack';
import MorphingShape from "../screens/modulate/bottomnavbar/morphtest";
import { useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Easing } from 'react-native-reanimated';
import Delayed from '../screens/modulate/util/delayed';


const Navigation = createStackNavigator({
    screens: {
        Home: () => <></>
    },
    screenOptions: {
        headerShown: false,
        header: () => []
    },


});
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const sceneInterpolator1 = ({ current }: { current: any }) => ({
    sceneStyle: {
        // transform: [
        //     {
        //         translateY: current.progress.interpolate({
        //             inputRange: [-1, 0, 1], // Normalized progress range
        //             outputRange: [0, 0, 0], // Corresponding translateX values
        //         }),
        //     },
        // ],
        // display: (current.progress <= -1 || current.progress >= 1) ? 'none' : 'content',
        // backgroundColor: '#FDFEF4',
        opacity: current.progress.interpolate({
            inputRange: [-1, -0.9, 0, 0.1, 1], // Normalized progress range
            outputRange: [0, 0.1, 1, 0.5, 0],
        }),
    },
});

const sceneInterpolator = ({ current }: { current: any }) => ({
    sceneStyle: {
        transform: [
            {
                translateX: current.progress.interpolate({
                    inputRange: [-1, 0, 1], // Normalized progress range
                    outputRange: [-screenWidth, 0, screenWidth], // Corresponding translateX values
                }),
            },
        ],
        display: (current.progress <= -1 || current.progress >= 1) ? 'none' : 'content',
        backgroundColor: 'transparent',
        opacity: current.progress.interpolate({
            inputRange: [-1, 0, 1], // Normalized progress range
            outputRange: [0, 1, 0],
        }),
    },
    containerStyle: {
        backgroundColor: 'transparent',
    },
    shadowStyle: {
        backgroundColor: 'transparent',
    }
});

const sceneInterpolator2 = ({ current }: { current: any }) => ({
    sceneStyle: {
        transform: [
            {
                translateX: current.progress.interpolate({
                    inputRange: [1, 0, 1], // Normalized progress range
                    outputRange: [0, 0, screenWidth * 3], // Corresponding translateX values
                }),
            },
        ],
        display: (current.progress <= -1 || current.progress >= 1) ? 'none' : 'content',
        backgroundColor: "#FDFEF4",
        opacity: current.progress.interpolate({
            inputRange: [-1, -0.25, 0, 0.2, 1], // Normalized progress range
            outputRange: [0, 0, 1, 0, 0],
        }),
    },
    containerStyle: {
        backgroundColor: 'transparent',
    },
    shadowStyle: {
        backgroundColor: 'transparent',
    }
});

const screenOptionsConfig: any = {
    headerShown: false,

    animation: 'reveal_from_bottom',

};

const CommonLayout = (props) => {
    const { navigation, children, state } = props;
    // console.log("state",props)
    return <NavigationProvider navigation={navigation}>
        <View style={{ marginBottom: StatusBar.currentHeight }} />
                {children}
    </NavigationProvider>

}

const forSlide = ({ current, next, inverted, layouts: { screen } }) => {
    const progress = Animated.add(
        current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        }),
        next
            ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolate: 'clamp',
            })
            : 0
    );

    const translateX = Animated.multiply(
        progress.interpolate({
            inputRange: [0, 1, 3],
            outputRange: [
                screen.width * 1, // Focused, but offscreen in the beginning
                0, // Fully focused
                (screen.width * 1) * 0, // Fully unfocused
            ],
            extrapolate: 'clamp',
        }),
        inverted
    );

    const shadowOpacity = progress.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [0, 0.5, 0],
        extrapolate: 'clamp',
    });

    return {
        cardStyle: {
            transform: [{ translateX }],
            backgroundColor: "#FDFEF4",
        },
        shadowStyle: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 10,
            shadowOpacity: shadowOpacity,
            elevation: shadowOpacity.interpolate({
                inputRange: [0, 0.5],
                outputRange: [0, 10],
                extrapolate: 'clamp',
            }),
        },
    };
};


const forModalMotion = ({ current, next, inverted, layouts: { screen } }) => {
  // Combine progress of current and next screens for transition smoothness
  const progress = Animated.add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    next
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })
      : 0
  );

  // Translate modal vertically from bottom (screen height) to center (0)
  const translateY = Animated.multiply(
    progress.interpolate({
      inputRange: [0, 1, 3],
      outputRange: [
        screen.height, // Offscreen at bottom initially
        0, // Fully visible centered
        0, // No translation after transition complete
      ],
      extrapolate: 'clamp',
    }),
    inverted
  );

  // Optional scale effect from 0.9 to 1 for pop effect on show
  const scale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1],
    extrapolate: 'clamp',
  });

  // Shadow opacity fades in with modal showing, fades out with dismiss
  const shadowOpacity = progress.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 0.5, 0],
    extrapolate: 'clamp',
  });

  return {
    
    cardStyle: {
      transform: [{ translateY }, { scale }],
    },
    shadowStyle: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 10,
      shadowOpacity: shadowOpacity,
      elevation: shadowOpacity.interpolate({
        inputRange: [0, 0.5],
        outputRange: [0, 10],
        extrapolate: 'clamp',
      }),
    },
  };
};
const AppLayout = () => {

    return <>
        <NavigationContainer>

            <Navigation.Navigator layout={CommonLayout} screenOptions={{
                // header: ({navigation}) => <View style={{position:'absolute', bottom: 0, left: 0, right: 0, height:120, backgroundColor: 'red'}}>
                //     <SkiaTutorial />
                // </View>,
                headerShown: false, cardShadowEnabled: true, freezeOnBlur: true, cardStyleInterpolator: forSlide, transitionSpec: {
                    open: {
                        animation: "spring",
                        config: {
                            // duration: 750,
                            // easing: Easing.out(Easing.exp)
                            delay:0,
                            velocity: 0.02,
                            stiffness: 13, // Adjust stiffness for the spring
                            damping: 13, // Adjust damping for the spring
                            mass: 0.06, // Adjust mass for the spring
                            restDisplacementThreshold: 0.1, // When to stop the animation
                            restSpeedThreshold: 0.1, // Speed threshold to stop the animation
                            overshootClamping: true,
                        }

                    }, close: {
                        animation: "spring",
                        config: {
                            delay:0,
                            // velocity: 0.02,
                            stiffness: 13, // Adjust stiffness for the spring
                            damping: 13, // Adjust damping for the spring
                            mass: 0.03, // Adjust mass for the spring
                            restDisplacementThreshold: 0.1, // When to stop the animation
                            restSpeedThreshold: 0.1, // Speed threshold to stop the animation
                            overshootClamping: true,
                        }
                    }
                }
            }} initialRouteName='Home'  >

                <Navigation.Group screenOptions={{}}>
                    <Navigation.Screen
                        name="Splash"
                        component={SplashScreen}
                        // component={() => <></>}
                        options={{ title: 'Splash' }} />
                </Navigation.Group>


                <Navigation.Group screenOptions={{}}>

                    <Navigation.Screen
                        name="Home"
                        component={Home}
                        options={{ title: 'AllSet' }} />
                    <Navigation.Screen
                        name="Planning"
                        component={Planning}
                        options={{ title: 'Planning' }} />
                    <Navigation.Screen
                        name="Pantry"
                        component={Pantry}
                        options={{ title: 'Pantry' }} />
                    <Navigation.Screen
                        name="Recipes"
                        component={Recipes}
                        options={{ title: 'Recipes' }} />

                    <Navigation.Screen
                        name="RecipesDetails"
                        component={RecipesDetails}
                        options={{ title: 'RecipesDetails' }} />
                </Navigation.Group>

                <Navigation.Group screenOptions={{}}>
                    <Navigation.Screen
                        name="Onboard"
                        component={Onboarding}
                        options={{ title: 'Onboard' }} />
                    <Navigation.Screen
                        name="SignUp"
                        component={SignUp}
                        options={{ title: 'SignUp' }} />
                    <Navigation.Screen
                        name="Preferences"
                        component={Preferences}
                        options={{ title: 'Preferences' }} />
                    <Navigation.Screen
                        name="AllSet"
                        component={AllSet}
                        options={{ title: 'AllSet' }} />
                    <Navigation.Screen
                        name="Profile"
                        component={Profile}
                        options={{ title: 'Profile', }} />
                </Navigation.Group>

                <Navigation.Group screenOptions={{

                }}>
                    <Navigation.Screen
                        name="PlannerAdd"
                        component={PlannerAdd}
                        options={{ title: 'PlannerAdd' }} />
                    <Navigation.Screen
                        name="Scanner"
                        component={Scanner}
                        options={{ title: 'Scanner' }} />
                    <Navigation.Screen
                        name="LoadScreen"
                        component={LoadScreen}
                        options={{ title: 'LoadScreen' }} />
                    <Navigation.Screen
                        name="SearchScreen"
                        component={SearchScreen}
                        options={{ title: 'SearchScreen' }} />

                </Navigation.Group>
            </Navigation.Navigator>
            {/* <BottomNavigation /> */}
            {/* Color Filter Layer with Internet Image */}



        </NavigationContainer>
    </>
}


export default AppLayout;