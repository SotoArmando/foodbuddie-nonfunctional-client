import {
    NavigationContainer,

    // useLinkBuilder,
    // useTheme,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions } from 'react-native';
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
type RootStackParamList = any;

const MyTabs = createBottomTabNavigator<RootStackParamList>({
    screens: {
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
                    inputRange: [-0.25, 0, 0.25], // Normalized progress range
                    outputRange: [0, 0, screenWidth * 3], // Corresponding translateX values
                }),
            },
        ],
        display: (current.progress <= -1 || current.progress >= 1) ? 'none' : 'content',
        backgroundColor: 'transparent',
        opacity: current.progress.interpolate({
            inputRange: [-1, -0.9, 0, 0.2, 1], // Normalized progress range
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
    lazy: false,
    animation: 'shift',
    headerShown: false,

    header: () => null,
    contentStyle: {
        backgroundColor: 'transparent', // Set your desired background color here
    },
    transitionSpec: {
        animation: 'spring',
        config: {
            // velocity: 0.02,
            stiffness: 374, // Adjust stiffness for the spring
            damping: 97, // Adjust damping for the spring
            mass: 3.6, // Adjust mass for the spring
            overshootClamping: true, // Prevent overshooting
            restDisplacementThreshold: 0.001, // When to stop the animation
            restSpeedThreshold: 0.001, // Speed threshold to stop the animation
        },
    },
    sceneStyleInterpolator: sceneInterpolator,
};

const CommonLayout = ({ children }: { children: any }) => {
    return <PrerenderCacheProvider >
        {children}
    </PrerenderCacheProvider>
}
export const AppLayout = () => {

    return <>
        <NavigationContainer >

            <NavigationProvider >


                <BottomNavigation />
                {/* Color Filter Layer with Internet Image */}
            </NavigationProvider>
        </NavigationContainer>
    </>
}

function BottomNavigation() {
    return <MyTabs.Navigator
        screenLayout={CommonLayout}

        screenOptions={{ ...screenOptionsConfig, }}
        initialRouteName='Home'
        tabBar={props => <>
            {/* <Text>asd11</Text> */}
            {/* <CookMotionNotification />
            <MyTabBar {...props} /> */}
            {/* <Image
    style={[screensLayoutStyles.filterImage, { opacity: 0.33, transform: 'rotate(0deg)', mixBlendMode: 'exclusion', }]}
    
    source={{
        uri: 'https://i.imgur.com/1xU1p5h.png', // Replace with any URL
    }}
    resizeMode="stretch"
/> */}

            {/* <View pointerEvents="none" style={screensLayoutStyles.overlay}>

</View> */}
            {/* <MorphingShape /> */}
            {/* <MorphingShapeSkia onNavigate={() => {}} /> */}
            {/* Bitmap shadow */}

            {/* <Image resizeMode="stretch" style={{ position: 'absolute', opacity: 1, flex: 1, left: 0, top: 0, bottom: 0, right: 0, backgroundColor: '#fff', borderRadius: scale(19), }} /> */}
            <SkiaTutorial />

        </>}>

        <MyTabs.Group screenOptions={{ lazy: true }}>
            <MyTabs.Screen
                name="Splash"
                component={SplashScreen}
                // component={() => <></>}
                options={{ title: 'Splash' }} />
        </MyTabs.Group>


        <MyTabs.Group screenOptions={{ lazy: false, }}>

            <MyTabs.Screen
                name="Home"
                component={Home}
                options={{ title: 'AllSet' }} />
            <MyTabs.Screen
                name="Planning"
                component={Planning}
                options={{ title: 'Planning' }} />
            <MyTabs.Screen
                name="Pantry"
                component={Pantry}
                options={{ title: 'Pantry' }} />
            <MyTabs.Screen
                name="Recipes"
                component={Recipes}
                options={{ title: 'Recipes' }} />

            <MyTabs.Screen
                name="RecipesDetails"
                component={RecipesDetails}
                options={{ title: 'Recipes Details' }} />
        </MyTabs.Group>

        <MyTabs.Group screenOptions={{ lazy: true }}>


            <MyTabs.Screen
                name="Onboard"
                component={Onboarding}
                options={{ title: 'Onboard' }} />
            <MyTabs.Screen
                name="SignUp"
                component={SignUp}
                options={{ title: 'SignUp' }} />
            <MyTabs.Screen
                name="Preferences"
                component={Preferences}
                options={{ title: 'Preferences' }} />
            <MyTabs.Screen
                name="AllSet"
                component={AllSet}
                options={{ title: 'AllSet' }} />
            <MyTabs.Screen
                name="Profile"
                component={Profile}
                options={{ title: 'Profile', }} />
        </MyTabs.Group>

        <MyTabs.Group screenOptions={{
            ...screenOptionsConfig, sceneStyleInterpolator: sceneInterpolator1,
            transitionSpec: {
                animation: 'spring',
                config: {
                    // velocity: 0.02,
                    stiffness: 15, // Adjust stiffness for the spring
                    damping: 3, // Adjust damping for the spring
                    mass: 1 / 200, // Adjust mass for the spring
                    restDisplacementThreshold: 0.001, // When to stop the animation
                    restSpeedThreshold: 0.001, // Speed threshold to stop the animation
                },
            }

            , lazy: true
        }}>
            <MyTabs.Screen
                name="PlannerAdd"
                component={PlannerAdd}
                options={{ title: 'PlannerAdd' }} />
            <MyTabs.Screen
                name="Scanner"
                component={Scanner}
                options={{ title: 'Scanner' }} />
            <MyTabs.Screen
                name="LoadScreen"
                component={LoadScreen}
                options={{ title: 'LoadScreen' }} />
            <MyTabs.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{ title: 'SearchScreen' }} />

        </MyTabs.Group>
    </MyTabs.Navigator>;
}
