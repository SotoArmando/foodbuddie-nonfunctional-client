import { Image, View } from "react-native";
import { useComponentStyles } from "../../../providers/StyleProvider";
import PrerenderedText from "../../../abstract/PrerenderedTextView";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "../../../providers/SessionProvider";
import { useEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useScreenRoutes } from "../../../providers/NavigationProvider";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';

const useLoadingProgress = () => {
    const offset = useSharedValue<number>(0);
    const { hasSession } = useSession();
    const {  currentScreen } = useScreenRoutes();
    const animatedStyles = useAnimatedStyle(() => ({
        // transform: [{ scaleX: offset.value }],
        width: `${offset.value}%`
    }));

    useEffect(() => {
        if (currentScreen === 'LoadScreen') {
            offset.value = withTiming(0, { duration: 0 });
            offset.value = withSpring(100, {
                stiffness: 100, // Adjust stiffness for the spring
                damping: 26, // Adjust damping for the spring
                mass: 100, // Adjust mass for the spring
                overshootClamping: true, // Prevent overshooting
                restDisplacementThreshold: 0.001, // When to stop the animation
                restSpeedThreshold: 0.001, // Speed threshold to stop the animation
    
            });
        }
        
    }, [currentScreen]);

    return { animatedStyles, offset }
}

export const LoadScreen = () => {
    const { animatedStyles, offset } = useLoadingProgress();
    const {
        LoadingSreenComponent,
        LoadingSreenComponentTitle,
        LoadingSreenComponentTitlePicture,
        LoadingSreenComponentTitleDescriptionLabel,
        LoadingSreenComponentTitleLoadingBar,
    } = useComponentStyles('LoadingScreen');

    const isFocused = true;
    const { goToPantry } = useScreenRoutes();

    return <>
        <SafeAreaView>
            <View style={LoadingSreenComponent}>
                <PrerenderedText style={LoadingSreenComponentTitle} isFocused={isFocused} />
                <Image source={{ uri: 'https://i.imgur.com/pFVXZKt.png' }} style={LoadingSreenComponentTitlePicture as any} />
                <PrerenderedText style={LoadingSreenComponentTitleDescriptionLabel} isFocused={isFocused} />
                <View style={LoadingSreenComponentTitleLoadingBar} isFocused={isFocused} >
                    <Animated.View style={[LoadingSreenComponentTitleLoadingBar, { backgroundColor: '#F09C33', marginTop: 0 }, animatedStyles]} />
                </View>
            </View>
        </SafeAreaView >
    </>
}