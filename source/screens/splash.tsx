import { Image, View } from "react-native"
import { useComponentStyles } from "../providers/StyleProvider"
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import { useEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useScreenRoutes } from "../providers/NavigationProvider";

const useSplashLogoIconComponentAppearing = () => {
    const { goToOnboard, navigation } = useScreenRoutes();
    const isFocused = true;
    const onPress = () => {
        goToOnboard();
    };

    const offset = useSharedValue<number>(0);
    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: (offset.value * 10) * -1 }],
        opacity: offset.value,
    }));

    const begin = (opacity: number) => {
        const newOffset = opacity;
        // offset.value = 0.25;
        offset.value = withSpring(newOffset, {
            stiffness: 100, // Adjust stiffness for the spring
            damping: 1500, // Adjust damping for the spring
            mass: 0.35, // Adjust mass for the springa
            overshootClamping: true, // Prevent overshooting
            restDisplacementThreshold: 0.9, // When to stop the animation
            restSpeedThreshold: 0.01,
        });
    };

    useEffect(() => {
        // navigation.preload('Onboard')
        if (isFocused) {
            setTimeout(() => {

                begin(1);
                setTimeout(() => {
                    onPress();
                }, 2000)
            }, 1000)

        }

    }, []);

    return { animatedStyles }
}

const SplashLogoIconComponent = () => {
    const isFocused = true;

    // if (!isFocused) return <V;

    const { SplashLogoIcon } = useComponentStyles('Splash')
    const { animatedStyles } = useSplashLogoIconComponentAppearing();

    return <Animated.View style={animatedStyles}>
        <Image
            style={SplashLogoIcon as any}
            source={{
                uri: 'https://i.imgur.com/ZgrhI61.png', // Replace with any URL
            }}
            resizeMode="contain"
        ></Image>
    </Animated.View>
}

export const SplashScreen = () => {
    const { SplashComponent, SplashScreen } = useComponentStyles('Splash')
    return <View style={SplashScreen}>
        <View style={SplashComponent}>
            <SplashLogoIconComponent />
        </View>
    </View>
}

