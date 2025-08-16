import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, G, Path, Image as SvgImage, Defs, Filter, FeDropShadow, FeGaussianBlur } from 'react-native-svg';
import Animated, { useSharedValue, withSpring, useAnimatedProps, runOnJS, withRepeat, withTiming, Easing, interpolate, useDerivedValue } from 'react-native-reanimated';

import { interpolatePath, opacity, parse } from 'react-native-redash';
import { circleframedicons, flaticons, labels, states } from '../abstract/BottomnavMorph';
import PrerenderedText from '../abstract/PrerenderedTextView';
import { TouchableWithoutFeedback } from 'react-native';
import { useSession } from '../providers/SessionProvider';
import { debounce } from "lodash";
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { CommonRectButton } from '../components/CommonRectButton';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedG = Animated.createAnimatedComponent(G);
const AnimatedSvg = Animated.createAnimatedComponent(SvgImage);

// const DangerousOverlapedWidget = () => {
//     const { positionedImgContainer, reusableAbsolutePositionedImg } = styles;

//     const labelsWidgets = Object.keys(labels).map(e => <Image resizeMode='contain' style={reusableAbsolutePositionedImg} source={{ uri: labels[e] }} />);
//     const flaticonsWidgets = Object.keys(flaticons).map(e => <Image resizeMode='contain' style={reusableAbsolutePositionedImg} source={{ uri: flaticons[e] }} />);
//     const circleframediconsWidgets = Object.keys(circleframedicons).map(e => <Image resizeMode='contain' style={reusableAbsolutePositionedImg} source={{ uri: circleframedicons[e] }} />);

//     return <View style={positionedImgContainer}>
//         <Image style={reusableAbsolutePositionedImg as any} />
//         {circleframediconsWidgets}
//     </View>
// }

const useCurrentButton = () => {
    const [currentButton, setCurrentButton] = useState(0);
    return { currentButton };
}

const SvgLabel = React.memo(({ isActive, animatedProps, ...props }) => (
    <Svg {...props}>
        {isActive ? (
            <AnimatedG animatedProps={animatedProps}>
                <SvgImage {...props.imageProps} />
            </AnimatedG>
        ) : (
            <G opacity={0}>
                <SvgImage {...props.imageProps} />
            </G>
        )}
    </Svg>
));

const SvgIcon = React.memo(({ animatedProps, ...props }) => (
    <Svg {...props}>
        <AnimatedG animatedProps={animatedProps}>
            <SvgImage {...props.imageProps} />
        </AnimatedG>
    </Svg>
));

const springConfigB = {
    damping: 800, // How quickly the spring stops moving
    mass: 0.25 / 8, // Weight of the spring
    stiffness: 100, // How bouncy the spring is
    overshootClamping: true, // Whether to prevent overshooting
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 2,
};

const springConfigA = {
    damping: 800, // How quickly the spring stops moving
    mass: 0.25 / 8, // Weight of the spring
    stiffness: 100, // How bouncy the spring is
    overshootClamping: true, // Whether to prevent overshooting
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 2,
};

const springConfigC = {
    damping: 100, // How quickly the spring stops moving
    mass: 1, // Weight of the spring
    stiffness: 200, // How bouncy the spring is
    overshootClamping: true, // Whether to prevent overshooting
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 2,
};

const { width, height } = Dimensions.get('window');

// Base screen dimensions (adjust these to match your design reference)
const baseWidth = 393;
const baseHeight = 852;
// (width / baseWidth) *  size

const useProgressAnimations = () => {
    const { goToHome, goToPlanning, goToPantry, goToRecipes, goToProfile } = useScreenRoutes();

    const progress = useSharedValue(0);
    const progress1 = useSharedValue(0);
    const progressA = useSharedValue(1);
    const progressA1 = useSharedValue(1);
    const progressA2 = useSharedValue(1);
    const progressA3 = useSharedValue(1);
    // const [timeout, setTimeout] = useState(0);
    const progressA4 = useSharedValue(1);
    const [prevButton, setPrevButton] = useState(-1);
    const [currentButton, setCurrentButton] = useState(0);

    const currentState = useDerivedValue(() => states[currentButton]);

    const pathData = useDerivedValue(() => {
        const steppedProgress = Math.round(progress.get() * 45) / 45;
        return interpolatePath(steppedProgress, [0, 1], currentState.get());
    });

    const animatedProps = useAnimatedProps(() => ({ d: pathData.get() }), [currentButton]);

    const naverAnimatedProps = useAnimatedProps(() => ({
        // d: interpolatePath(progress.value, [0, 1], currentState.value)
    }), []);

    const animatedProps1 = useAnimatedProps(() => ({
        opacity: interpolate(Math.round(progress.get() * 30) / 30, [0, 1], [0, 1]),
        y: interpolate(Math.round(progress.get() * 30) / 30, [0, 1], [-22.5, 0]),
    }), []);

    const animatedProps2 = useAnimatedProps(() => ({
        opacity: interpolate(Math.round(progress1.get() * 60) / 60, [0, 1], [0, 1]),
    }), []);

    const animatedPropsA = useAnimatedProps(() => ({
        opacity: Math.round(progressA.get() * 15) / 15,
    }), []);

    const animatedPropsA1 = useAnimatedProps(() => ({
        opacity: Math.round(progressA1.get() * 15) / 15,
    }), []);

    const animatedPropsA2 = useAnimatedProps(() => ({
        opacity: Math.round(progressA2.get() * 15) / 15,
    }), []);

    const animatedPropsA3 = useAnimatedProps(() => ({
        opacity: Math.round(progressA3.get() * 15) / 15,
    }), []);

    const animatedPropsA4 = useAnimatedProps(() => ({
        opacity: Math.round(progressA4.get() * 15) / 15,
    }), []);

    function handleReload(prevButton, currentButton) {
        setTimeout(() => {
            requestAnimationFrame(() => {
                [progressA, progressA1, progressA2, progressA3, progressA4][currentButton].set(0);
                [progressA, progressA1, progressA2, progressA3, progressA4].forEach((e, i) => {
                    if (![currentButton, prevButton].includes(i) && e.value < 1) {
                        e.set(1);
                    }
                });

                progress.set(withSpring(1, springConfigC, (finished) => {
                    if (finished) {
                        progress1.value = withSpring(1, springConfigC);
                        if (prevButton >= 0) {
                            [progressA, progressA1, progressA2, progressA3, progressA4][prevButton].value = withSpring(1, springConfigC);
                        }
                    }
                }));
            })
        }, 300)
    }

    const handleButtonClick = debounce((next: number) => {
        if (next !== currentButton) {
            [progressA, progressA1, progressA2, progressA3, progressA4][next].set(0);
            setTimeout(() => {
                requestAnimationFrame(() => {
                    [progressA, progressA1, progressA2, progressA3, progressA4][next].set(withSpring(0, springConfigA, (finished1) => {
                        if (finished1) {
                            progress.set(withSpring(0, springConfigB, (finished) => {
                                if (finished) {
                                    [progressA, progressA1, progressA2, progressA3, progressA4][currentButton].value = 0;
                                    progress1.set(withSpring(0, springConfigA, (finished => {
                                        if (finished) {
                                            runOnJS(setPrevButton)(currentButton);
                                            runOnJS(setCurrentButton)(next);
                                            runOnJS(handleReload)(currentButton, next)
                                        }
                                    })));
                                }
                            }));
                        }
                    }));
                })
            }, 300)
        }
    })



    return {
        currentButton,
        prevButton,
        handleButtonClick,
        animatedProps,
        animatedProps1,
        animatedProps2,
        animatedPropsA,
        animatedPropsA1,
        animatedPropsA2,
        animatedPropsA3,
        animatedPropsA4,
        naverAnimatedProps,
        goToHome,
        goToPlanning,
        goToPantry,
        goToRecipes,
        goToProfile
    };
}

const useScreenRoutes = () => {
    const navigation = useNavigation();

    const goToPlanning = debounce(() => {
        navigation.navigate('Planning');
    });

    const goToHome = debounce(() => {
        navigation.navigate('Home');
    });

    const goToPantry = debounce(() => {
        navigation.navigate('Pantry');
    });

    const goToRecipes = debounce(() => {
        navigation.navigate('Recipes');
    });

    const goToProfile = debounce(() => {
        navigation.navigate('Profile');
    });

    return { goToHome, goToPlanning, goToPantry, goToRecipes, goToProfile };
}

const MorphingShape = () => {

    const { hasSession } = useSession();

    const {
        currentButton,
        handleButtonClick,
        animatedProps,
        animatedProps1,
        animatedProps2,
        animatedPropsA,
        animatedPropsA1,
        animatedPropsA2,
        animatedPropsA3,
        naverAnimatedProps,
        animatedPropsA4,
        goToHome,
        goToPlanning,
        goToPantry,
        goToRecipes,
        goToProfile
    } = useProgressAnimations();

    useEffect(() => {
        const preloadImages = async () => {
            await Image.prefetch("https://i.imgur.com/zHwObzo.png");
            await Image.prefetch("https://i.imgur.com/5U0lJAC.png");
            await Image.prefetch("https://i.imgur.com/Wy79JUg.png");
            await Image.prefetch("https://i.imgur.com/G64woUg.png");
            await Image.prefetch("https://i.imgur.com/qq4de40.png");
            await Image.prefetch("https://i.imgur.com/4KeSEOA.png");
        };
        preloadImages();
    }, []);

    const svgCircleFrames = useMemo(() => [
        <Svg style={reusableAbsolutePositionedImg} viewBox='0 -55 395 123'>
            <AnimatedG animatedProps={animatedProps1}>
                <G x='49.6445' y='-1' textAnchor="middle" dominantBaseline="middle">
                    <SvgImage width={146} height={146} x={-73} y={-73} href={"https://i.imgur.com/zHwObzo.png"} />
                    <Circle r="29" fill="white" />
                    <SvgImage width={24} height={24} x={-12} y={-12} href={"https://i.imgur.com/5U0lJAC.png"} />
                </G>
            </AnimatedG>
        </Svg>,
        <Svg style={reusableAbsolutePositionedImg} viewBox='0 -55 395 123'>
            <AnimatedG animatedProps={animatedProps1}>
                <G transform="translate(120.645, -1)" textAnchor="middle" dominantBaseline="middle">
                    <SvgImage width={146} height={146} x={-73} y={-73} href={"https://i.imgur.com/zHwObzo.png"} />
                </G>
                <Circle cx="120.645" cy="-1" r="29" fill="white" />
                <G transform="translate(120.645, -1)" textAnchor="middle" dominantBaseline="middle">
                    <SvgImage width={24} height={24} x={-12} y={-12} href={"https://i.imgur.com/Wy79JUg.png"} />
                </G>
            </AnimatedG>
        </Svg>,
        <Svg style={reusableAbsolutePositionedImg} viewBox='0 -55 395 123'>
            <AnimatedG animatedProps={animatedProps1}>
                <G transform="translate(191.645, -1)" textAnchor="middle" dominantBaseline="middle">
                    <SvgImage width={146} height={146} x={-73} y={-73} href={"https://i.imgur.com/zHwObzo.png"} />
                </G>
                <Circle cx="191.645" cy="-1" r="29" fill="white" />
                <G transform="translate(191.645, -1)" textAnchor="middle" dominantBaseline="middle">
                    <SvgImage width={24} height={24} x={-12} y={-12} href={"https://i.imgur.com/G64woUg.png"} />
                </G>
            </AnimatedG>
        </Svg>,
        <Svg style={reusableAbsolutePositionedImg} viewBox='0 -55 395 123'>
            <AnimatedG animatedProps={animatedProps1}>
                <G transform="translate(262.934, -1)" textAnchor="middle" dominantBaseline="middle">
                    <SvgImage width={146} height={146} x={-73} y={-73} href={"https://i.imgur.com/zHwObzo.png"} />
                </G>
                <Circle cx="262.934" cy="-1" r="29" fill="white" />
                <G transform="translate(262.934, -1)" textAnchor="middle" dominantBaseline="middle">
                    <SvgImage width={24} height={24} x={-12} y={-12} href={"https://i.imgur.com/qq4de40.png"} />
                </G>
            </AnimatedG>
        </Svg>,
        <Svg style={reusableAbsolutePositionedImg} viewBox='0 -55 395 123'>
            <AnimatedG animatedProps={animatedProps1}>
                <G transform="translate(333.934, -1)" textAnchor="middle" dominantBaseline="middle">
                    <SvgImage width={146} height={146} x={-73} y={-73} href={"https://i.imgur.com/zHwObzo.png"} />
                </G>
                <Circle cx="333.934" cy="-1" r="29" fill="white" />
                <G transform="translate(333.934, -1)" textAnchor="middle" dominantBaseline="middle">
                    <SvgImage width={24} height={24} x={-12} y={-12} href={"https://i.imgur.com/4KeSEOA.png"} />
                </G>
            </AnimatedG>
        </Svg>
    ], []);

    const svgLabels = useMemo(() => [
        <SvgLabel
            key={0}
            isActive={currentButton === 0}
            animatedProps={animatedProps2}
            style={reusableAbsolutePositionedImg}
            viewBox='0 -55 395 123'
            imageProps={{
                width: 42,
                height: 21,
                x: 49.6445 - 21,
                y: 50.5,
                href: "https://ampland-fortune-bouquet-structural.trycloudflare.com/static/3440203895.webp"
            }}
        />,
        <SvgLabel
            key={1}
            isActive={currentButton === 1}
            animatedProps={animatedProps2}
            style={reusableAbsolutePositionedImg}
            viewBox='0 -55 395 123'
            imageProps={{
                width: 54,
                height: 21,
                x: 120.645 - 27,
                y: 50.5,
                href: "https://ampland-fortune-bouquet-structural.trycloudflare.com/static/1220566622.webp"
            }}
        />,
        <SvgLabel
            key={2}
            isActive={currentButton === 2}
            animatedProps={animatedProps2}
            style={reusableAbsolutePositionedImg}
            viewBox='0 -55 395 123'
            imageProps={{
                width: 54,
                height: 21,
                x: 191.645 - 27,
                y: 50.5,
                href: "https://ampland-fortune-bouquet-structural.trycloudflare.com/static/559412626.webp"
            }}
        />,
        <SvgLabel
            key={3}
            isActive={currentButton === 3}
            animatedProps={animatedProps2}
            style={reusableAbsolutePositionedImg}
            viewBox='0 -55 395 123'
            imageProps={{
                width: 48,
                height: 21,
                x: 262.934 - 24,
                y: 50.5,
                href: "https://ampland-fortune-bouquet-structural.trycloudflare.com/static/3384229049.webp"
            }}
        />,
        <SvgLabel
            key={4}
            isActive={currentButton === 4}
            animatedProps={animatedProps2}
            style={reusableAbsolutePositionedImg}
            viewBox='0 -55 395 123'
            imageProps={{
                width: 44,
                height: 21,
                x: 333.934 - 22,
                y: 50.5,
                href: "https://ampland-fortune-bouquet-structural.trycloudflare.com/static/2706480923.webp"
            }}
        />,
    ], [currentButton, animatedProps2]);

    const svgIcons = useMemo(() => {
        const animatedPropsArr = [
            animatedPropsA,
            animatedPropsA1,
            animatedPropsA2,
            animatedPropsA3,
            animatedPropsA4,
        ];
        const iconData = [
            { href: "https://i.imgur.com/cUzT3m0.png", x: 49.6445 - 12 },
            { href: "https://i.imgur.com/kUZPnZA.png", x: 120.645 - 12 },
            { href: "https://i.imgur.com/10XRGfo.png", x: 191.645 - 12 },
            { href: "https://i.imgur.com/iftrVsW.png", x: 262.934 - 12 },
            { href: "https://i.imgur.com/gyrYLba.png", x: 333.934 - 12 },
        ];
        return iconData.map((icon, i) => (
            <SvgIcon
                key={i}
                animatedProps={animatedPropsArr[i]}
                style={reusableAbsolutePositionedImg}
                viewBox='0 -55 395 123'
                imageProps={{
                    width: 24,
                    height: 24,
                    x: icon.x,
                    y: 50.5 - 20,
                    href: icon.href,
                }}
            />
        ));
    }, [animatedPropsA, animatedPropsA1, animatedPropsA2, animatedPropsA3, animatedPropsA4]);

    return (
        <View style={{ ...parentComponent, display: hasSession ? 'flex' : 'none' }}>
            <View style={{ backgroundColor: '#FF8D51', left: 0, bottom: 0, position: 'absolute', width: 5, height: (width / baseWidth) * 94 }} />
            <View style={{ backgroundColor: '#FF8D51', right: 0, bottom: 0, position: 'absolute', width: 5, height: (width / baseWidth) * 94 }} />
            <View style={{ backgroundColor: '#FF8D51', left: 0, right: 0, bottom: 0, position: 'absolute', width: '100%', height: 0.5 * ((width / baseWidth) * 94) }} />

            <View style={{ ...positionedImgContainer, transform: `scale(${(width / baseWidth) * 1.1})` }} >
                <Svg style={reusableAbsolutePositionedImg} viewBox='0 -55 395 123'>
                    <AnimatedPath
                        animatedProps={animatedProps}
                        fill="#FF8D51"
                    />
                </Svg>
                {/* {svgCircleFrames[currentButton]} */}
                {/* {svgLabels} */}
                {/* {svgIcons} */}
                {/* <View style={filler0} /> */}
                <View style={buttonsContainer}>
                    <CommonRectButton style={button} onPress={() => { handleButtonClick(0); goToHome(); }}></CommonRectButton>
                    <CommonRectButton style={button} onPress={() => { handleButtonClick(1); goToPlanning(); }}></CommonRectButton>
                    <CommonRectButton style={button} onPress={() => { handleButtonClick(2); goToPantry(); }}></CommonRectButton>
                    <CommonRectButton style={button} onPress={() => { handleButtonClick(3); goToRecipes(); }}></CommonRectButton>
                    <CommonRectButton style={button} onPress={() => {handleButtonClick(4); goToProfile();}}></CommonRectButton>
                </View>
            </View>
            {/* <PrerenderedText
                style={{ fontFamily: 'Poppins',fontWeight: '500', fontSize: 14, lineHeight: 21, letterSpacing: 0, color: '#fff' }}
                anchor="middle"
                lines={['Home']}
                width={42}
                height={21}
                quality={0.6}
            />
            <PrerenderedText
                style={{ fontFamily: 'Poppins', fontWeight: '500', fontSize: 14, lineHeight: 21, letterSpacing: 0, color: '#fff' }}
                anchor="middle"
                lines={['Planner']}
                width={54}
                height={21}
                quality={0.6}
            />
            <PrerenderedText
                style={{ fontFamily: 'Poppins', fontWeight: '500', fontSize: 14, lineHeight: 21, letterSpacing: 0, color: '#fff' }}
                anchor="middle"
                lines={['Pantry']}
                width={46}
                height={21}
                quality={0.6}
            />
            <PrerenderedText
                style={{ fontFamily: 'Poppins',fontWeight: '500', fontSize: 14, lineHeight: 21, letterSpacing: 0, color: '#fff' }}
                anchor="middle"
                lines={['Recipe']}
                width={48}
                height={21}
                quality={0.6}
            />
            <PrerenderedText
                style={{ fontFamily: 'Poppins',fontWeight: '500', fontSize: 14, lineHeight: 21, letterSpacing: 0, color: '#fff' }}
                anchor="middle"
                lines={['Profile']}
                width={44}
                height={21}
                quality={0.6}
            /> */}
        </View>
    );
};

const styles = StyleSheet.create(
    {
        parentComponent: {
            width: '100%', backgroundColor: 'transparent', position: 'absolute', bottom: 0, left: 0, height: 123 + 24
        },
        positionedImgContainer: {
            position: 'relative',
            width: '101%',
            height: 123 + 24,
            paddingBottom: 24,
        },
        reusableAbsolutePositionedImg: {
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            // backgroundColor:'red'
        },
        filler0: {
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '101%',
            height: 24,
            backgroundColor: '#FF8D51'
        },
        buttonsContainer: {
            position: 'absolute',
            left: 0,
            bottom: -35,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            // paddingLeft: 21,
            // paddingRight: 16
        },
        button: {
            flex: 1,
            height: 80,

        }
    }
);

const { filler0, buttonsContainer, button, parentComponent, positionedImgContainer, reusableAbsolutePositionedImg } = styles;

export default MorphingShape;


