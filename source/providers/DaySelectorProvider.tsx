import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { AnimatedStyle, cancelAnimation, interpolateColor, SharedValue, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

// Define the shape of our context
type DaySelectorContextType = {
    day: number;
    progress?: SharedValue<number>;
    animatedStyle?: AnimatedStyle,
    updateDay: (newDay: number) => number;
};

// Create the context with default values
const DaySelectionContext = createContext<DaySelectorContextType>({
    day: 3,
    progress: undefined,
    animatedStyle: undefined,
    updateDay: () => 0,
});

// Hook to use session context
export const useDaySelection = () => {
    return useContext(DaySelectionContext);
};

type DaySelectionProviderProps = {
    initialSessionState?: number;
    children: ReactNode;
};

export const DaySelectionProvider = ({
    initialSessionState = 0,
    children
}: DaySelectionProviderProps) => {
    const [day, setDay] = useState<number>(initialSessionState);
    const progress = useSharedValue<number>(1);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(
                progress.value,
                [0, 1],
                ['transparent', '#F09C33']
            ),
        };
    });

    const updateDay = async (newDay: number) => {
        cancelAnimation(progress);
        progress.value = 0;

        setDay(newDay);

    };
    const value = React.useMemo(() => ({ day, updateDay, progress, animatedStyle }), [day]);

    useEffect(() => {
        setTimeout(() => {
            progress.value = withSpring(1, {
                stiffness: 15, // Adjust stiffness for the spring
                damping: 3, // Adjust damping for the spring
                mass: 1 / 200, // Adjust mass for the spring
                restDisplacementThreshold: 0.001, // When to stop the animation
            restSpeedThreshold: 0.001, // Speed threshold to stop the animation
            });
        },300)
    }, [day])
    return (
        <DaySelectionContext.Provider value={value}>
            {children}
        </DaySelectionContext.Provider>
    );
};