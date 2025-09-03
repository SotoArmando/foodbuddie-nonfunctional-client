import { View, ScrollView, Image, TextStyle, ViewStyle, Pressable, Text, DimensionValue } from "react-native";
import { useComponentStyles } from "../providers/StyleProvider"
import PrerenderedText from "../abstract/PrerenderedTextView";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { transform } from "../helpers/styleStringHelper";
import { scale } from "../abstract/StyleProvider";
import { useScreenRoutes } from "../providers/NavigationProvider";
import { useIsFocused } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import { act, useEffect, useState } from "react";
import Animated, { cancelAnimation, runOnJS, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useDaySelection } from "../providers/DaySelectorProvider";
import { CommonRectButton } from "../components/CommonRectButton";

// color: '#EFF0E5', borderless: false, radius: 200 
const pressableRippleConfig = {};

const PantrySection = ({ first = false, name = 'Vegetables', ingredients = [], isFocused = true }) => {
    const [isPressed, setIsPressed] = useState(false);
    const [collapsed, setIsCollapsed] = useState(false);

    const o = useSharedValue(1);
    const {
        PantrySectionLabelContainer,
        PantrySectionIcon,
        PantrySectionLabel,
        PantrySectionIconChevron
    } = useComponentStyles('Pantry');

    const handlePress = () => {
        setIsPressed(true);
        setTimeout(() => {
            setIsPressed(false);
            setIsCollapsed((v) => !v)
        }, 100)
    }

    useEffect(() => {
        if (isPressed) {
            o.value = withSpring(0, {
                // damping=46&mass=16&stiffness=54
                // velocity: 0.02,
                stiffness: 15, // Adjust stiffness for the spring
                damping: 3, // Adjust damping for the spring
                mass: 1 / 200, // Adjust mass for the spring
                overshootClamping: true, // Prevent overshooting
                restDisplacementThreshold: 0.001, // When to stop the animation
                restSpeedThreshold: 0.001, // Speed threshold to stop the animation
            }, (f) => {
                if (f) {
                    o.value = withSpring(1, {
                        // velocity: 0.02,
                        stiffness: 15, // Adjust stiffness for the spring
                        damping: 3, // Adjust damping for the spring
                        mass: 1 / 200, // Adjust mass for the spring
                        overshootClamping: true, // Prevent overshooting
                        restDisplacementThreshold: 0.001, // When to stop the animation
                        restSpeedThreshold: 0.001, // Speed threshold to stop the animation
                    });
                }
            });
        }
    }, [isPressed])
    // transform: [{scaleY: o}]
    return <Animated.View style={{
        opacity: o,
        height: 'auto',
        marginTop: first ? scale(16) : 0,
    }}>
        <View style={{
            width: '100%',
            maxHeight: scale(48),
            height: scale(48),
            borderBottomColor: '#F0F2F8',
            borderBottomWidth: scale(3),
            position: 'relative',
            display: 'flex',
            alignContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'red'
        }}>
            <CommonRectButton onPress={handlePress} style={{
                ...PantrySectionLabelContainer,
                marginTop: 0,
                padding: 0,
                flex: 1,
                alignSelf: 'stretch',
                height: 'auto',
                minHeight: 'auto',
                maxHeight: 'auto'
            }} >
                <View style={{
                    display: 'flex', flexDirection: 'row',
                    height: '100%', width: '100%',
                    minHeight: '100%',

                    alignContent: 'center',
                    alignItems: 'center',

                }}>
                    <Image source={{ uri: 'https://i.imgur.com/JNmOLJY.png' }} style={{ ...PantrySectionIcon, transform: transform(0, 2.33) }} />
                    <PrerenderedText
                        style={PantrySectionLabel}
                        anchor="start"
                        lines={[name]}
                        width={92}
                        height={24}
                        quality={1}
                        viewStyle={{ transform: transform(0, 2.125) }}
                        isFocused={isFocused}
                    />
                </View>
                {/* <PrerenderedText
                        style={{ ...PantrySectionLabel, color: '#02733E' }}
                        anchor="start"
                        lines={['Empty']}
                        width={52}
                        height={24}
                        quality={1}
                        viewStyle={{ transform: transform(0, 2.125) }}
                        isFocused={isFocused}
                    /> */}

                {/* <Image resizeMode={newLocal} source={{uri: 'https://i.imgur.com/L5l0Mxj.png'}} style={{position: 'absolute', left: 0, top: 0, width: '100%', height: 48, opacity: 0.5,}} /> */}
            </CommonRectButton>
            <View pointerEvents="none" style={{ transform: transform(-7, 2.25), position: 'absolute', right: 0, left: 0, top: 0, bottom: 0, height: '100%', width: '100%' }}>
                <Image source={{ uri: 'https://i.imgur.com/PzomCTL.png' }} style={{ ...PantrySectionIconChevron, transform: [{ rotate: collapsed ? '0deg' : '180deg' }], transformOrigin: 'center center' }} />
            </View>
        </View>
        <>
            {collapsed && <View style={{ display: 'flex', flexDirection: 'column', marginTop: scale(5), gap: scale(6), alignContent: 'center', alignItems: 'center', backgroundColor: '' }}>
                <PantrySectionItem isFocused={isFocused} expire={2} expiringDate="Expired 1day ago" title="Cucumber 1" picture="https://i.imgur.com/TjbtAkS.png" percent="0%" />
                <PantrySectionItem isFocused={isFocused} expire={1} expiringDate="Expired 1day ago" title="Cucumber 2" picture="https://i.imgur.com/TjbtAkS.png" percent="0%" />
                <PantrySectionItem isFocused={isFocused} expire={0} expiringDate="Expired 1day ago" title="Cucumber" picture="https://i.imgur.com/TjbtAkS.png" percent="0%" />

                {/* <Image resizeMode="contain" source={{ uri: 'https://i.imgur.com/7jiSwKC.png' }} style={HomeEmptyPantryMessageIcon}></Image>
                    <PrerenderedText
                        style={HomeEmptyPantryMessageLabel}
                        anchor="middle"
                        lines={['Is your vegetables stash empty? maybe is time', 'to make a shopping list.']}
                        width={311}
                        height={36}
                        quality={1}
                        isFocused={isFocused}
                    /> */}
            </View>}
        </>

    </Animated.View>

}
export const SwitchLabel = ({ active, activeStyle, icon = <></>, viewStyle = null, style, anchor = 'start', width = 42, height = 21, lines = ['All(25)'], isFocused = true }) => {
    const o = useSharedValue(1);
    const [isActive, setIsActive] = useState(active);
    const animatedStyles = useAnimatedStyle(() => ({
        opacity: o.value,
    }));

    useEffect(() => {
        if (active !== isActive) {
            setTimeout(() => {
                setIsActive(active);
            }, 100)
            o.set(withSpring(0, {
                // velocity: 0.02,
                stiffness: 15, // Adjust stiffness for the spring
                damping: 5, // Adjust damping for the spring
                mass: 1 / 100, // Adjust mass for the spring
                overshootClamping: true,
            }, (finished) => {
                if (finished) {
                    o.set(withSpring(1, {
                        // velocity: 0.02,
                        stiffness: 15, // Adjust stiffness for the spring
                        damping: 5, // Adjust damping for the spring
                        mass: 1 / 200, // Adjust mass for the spring
                        overshootClamping: true,

                    }));
                }
            }));
        }
    }, [active]);

    return <Animated.View style={[{ display: 'flex', flexDirection: 'row' }, animatedStyles]}>
        <>
            {isActive ? icon : <></>}
        </>
        <PrerenderedText style={style}
            lines={lines}
            width={width}
            
            height={height}
            viewStyle={viewStyle || { transform: transform(-1.33, 2.8) }}
            isFocused={isFocused}
            anchor={anchor || "start"}
            preloadColor={[activeStyle]}
            pStyles={isActive ? 0 : -1}
        />
    </Animated.View>
}
export const AnimatedPantryBottomBorder = ({ active, left = scale(12.5), right = scale(12.5) }: {
    left?: number,
    right?: number,
    active: boolean
}) => {
    const o = useSharedValue(active ? 1 : 0);
    const animatedStyles = useAnimatedStyle(() => ({
        opacity: o.value,
    }));
    const {
        PantryCategoryLabelContainerBottomBar,
    } = useComponentStyles('Pantry');
    // const [_active, setActive] = useState(active ? 1 : 0);



    useEffect(() => {
        if (active === false) {
            o.value = withSpring(0);
        } else {
            o.value = withSpring(1);
        }
    }, [active]);

    return <Animated.View style={[PantryCategoryLabelContainerBottomBar,
        { left, right }, animatedStyles]} />;
}
export const Pantry = ({ }) => {

    const [selected, setSelected] = useState(0);
    const isFocused = true;

    const {
        PantryComponent,
        PantryTitleRow,
        PantryTitle,
        PantryTitleICon,
        PantrySearchInputContainer,
        PantrySearchInputIcon,
        PantrySearchInput,
        PantryCategoryLabelContainer,
        PantryCategoryLabelContainerBottomBar,
        PantryCategoryLabel,
        PantryCategoryLabelInactive,
        PantryCategoryRow,
        PantrySectionLabelContainer,
        PantrySectionIcon,
        PantrySectionIconChevron,
        PantrySectionLabel,
        PantryAbsoluteButton,
        PantryAbsoluteButtonIcon
    } = useComponentStyles('Pantry');

    const { goToSearchScreen, goToScanner } = useScreenRoutes();

    const {
        HomeEmptyPantryMessage,
        HomeEmptyPantryMessageLabel,
        HomeEmptyPantryMessageLabelBold,
        HomeEmptyPantryMessageIcon,
        HomeEmptyPantryMessageButton,
        HomeEmptyPantryMessageButtonLabel,
    } = useComponentStyles('Home');


    return <>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={PantryComponent}>
                <View style={PantryTitleRow} >
                    <PrerenderedText
                        style={PantryTitle}
                        anchor="start"
                        lines={['My Pantry']}
                        width={123}
                        height={36}
                        quality={1}
                        viewStyle={{ transform: transform(-0.1, 0.5) }}
                        isFocused={isFocused}
                        hot={true}
                    />
                    <Image source={{ uri: 'https://i.imgur.com/RrRU1Bp.png' }} style={{ ...PantryTitleICon, transform: transform(0, 6) }} />
                    {/* <Image resizeMode="contain" source={{uri: 'https://i.imgur.com/ngAAGEy.png'}} style={{position: 'absolute',opacity: 0.5, left: 0, top: 0, width: '100%', maxWidth: '100%', height: '100%'}} /> */}
                </View>
                <CommonRectButton onPress={goToSearchScreen} >
                    <View style={PantrySearchInputContainer} >
                        {/* Bitmap shadow */}
                        <Image resizeMode="stretch" source={{ uri: 'https://i.imgur.com/Zn28Idk.png' }} style={{ position: 'absolute', flex: 1, left: scale(-10), top: scale(-10), bottom: scale(-10), right: scale(-10), }} />
                        <Image resizeMode="stretch" style={{
                            position: 'absolute', flex: 1, height: '100%', left: 0, top: 0, bottom: 0, right: 0, backgroundColor: '#FDFEF4', borderRadius: scale(19),


                            borderWidth: scale(0.05),
                            borderColor: "rgba(216,38,106, 0.1)",
                        }} />
                        <Image source={{ uri: 'https://i.imgur.com/XPj9fuK.png' }} style={{ ...PantrySearchInputIcon, transform: transform(-1, 0) }} />
                        <PrerenderedText
                            style={PantrySearchInput}
                            anchor="start"
                            lines={['Do i have...']}
                            width={53}
                            height={15}
                            hot={true}
                            quality={1}
                            viewStyle={{ transform: transform(-2.75, 0.5) }}
                            isFocused={isFocused}
                        />
                        {/* <Image resizeMode="contain" source={{uri: 'https://i.imgur.com/5N75yNU.png'}} style={{position: 'absolute',opacity: 0.5, left: 0, top: 0, width: '100%', maxWidth: '100%', height: '100%'}} /> */}
                    </View>
                </CommonRectButton>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={PantryCategoryRow}>
                    <CommonRectButton onPress={() => setSelected(0)}  >
                        <View style={PantryCategoryLabelContainer} >
                            <SwitchLabel isFocused={isFocused} width={48} height={21} lines={['All(25)']} active={selected === 0} style={{ ...PantryCategoryLabelInactive }} activeStyle={PantryCategoryLabel} />

                            <AnimatedPantryBottomBorder key={'A0' + (selected === 0).toString()} active={selected === 0} />
                        </View>
                    </CommonRectButton>
                    <CommonRectButton onPress={() => setSelected(1)}  >
                        <View style={{ ...PantryCategoryLabelContainer, borderBottomColor: 'transparent' }} >
                            <SwitchLabel isFocused={isFocused} width={86} height={21} lines={['Leftovers(4)']} active={selected === 1} style={{ ...PantryCategoryLabelInactive }} activeStyle={PantryCategoryLabel} />

                            <AnimatedPantryBottomBorder key={'A1' + (selected === 1).toString()} active={selected === 1} />
                        </View>
                    </CommonRectButton>
                    <CommonRectButton onPress={() => setSelected(2)}  >
                        <View style={{ ...PantryCategoryLabelContainer, borderBottomColor: 'transparent' }} >
                            <SwitchLabel isFocused={isFocused} width={73} height={21} lines={['Expired(2)']} active={selected === 2} style={{ ...PantryCategoryLabelInactive }} activeStyle={PantryCategoryLabel} />
                            <AnimatedPantryBottomBorder key={'A2' + (selected === 2).toString()} active={selected === 2} />
                        </View>
                    </CommonRectButton>

                    <CommonRectButton onPress={() => setSelected(3)} style={{ marginRight: scale(32) }} >
                        <View style={{ ...PantryCategoryLabelContainer, borderBottomColor: 'transparent' }} >
                            <SwitchLabel isFocused={isFocused} width={75} height={21} lines={['Expiring(7)']} active={selected === 3} style={{ ...PantryCategoryLabelInactive }} activeStyle={PantryCategoryLabel} />
                            <AnimatedPantryBottomBorder key={'A3' + (selected === 3).toString()} active={selected === 3} />
                        </View>
                    </CommonRectButton>
                    {/* <Image resizeMode="contain" source={{uri: 'https://i.imgur.com/JdkKKYn.png'}} style={{position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', opacity: 0.5}} /> */}
                </ScrollView>

                <PantrySection first={true} isFocused={isFocused} />
                <PantrySection name="Fruits" isFocused={isFocused} />

                {/* <Image resizeMode="contain" source={{uri: 'https://i.imgur.com/LcNv3Z7.png'}} style={{height:scale(87)}} /> */}

                {/* <View style={{ display: 'flex', flexDirection: 'row', marginTop: scale(5), gap: scale(6), alignContent: 'center', alignItems: 'center' }}>
                    <Image resizeMode="contain" source={{ uri: 'https://i.imgur.com/7jiSwKC.png' }} style={HomeEmptyPantryMessageIcon}></Image>
                    <PrerenderedText
                        style={HomeEmptyPantryMessageLabel}
                        anchor="middle"
                        lines={['Is your fruits stash empty? maybe is time', 'to make a shopping list.']}
                        width={311}
                        height={36}
                        quality={1}
                    />
                </View> */}
                {/* <PantrySectionItem percent="10%" />
                    <PantrySectionItem expire={2} expiringDate="Expired 1day ago" title="Cucumber" picture="https://i.imgur.com/TjbtAkS.png" percent="0%" />
                    <PantrySectionItem expire={1} expiringDate="Expiring in 5 days" title="Tomato" picture="https://i.imgur.com/N9ggHqo.png" percent="50%" />
                    <PantrySectionItem expire={2} expiringDate="Expiring in 29 days" title="Spinach" picture="https://i.imgur.com/AKfUKDu.png" percent="100%" />
                    <PantrySectionItem title="Spinach" picture="https://i.imgur.com/AKfUKDu.png" percent="100%" />
                    <PantrySectionItem title="Spinach" picture="https://i.imgur.com/AKfUKDu.png" percent="100%" />
                    <PantrySectionItem title="Spinach" picture="https://i.imgur.com/AKfUKDu.png" percent="100%" /> */}



            </View>
        </ScrollView>
        <View style={PantryAbsoluteButton} >
            {/* Bitmap shadow */}
            <Image resizeMode="stretch" source={{ uri: 'https://i.imgur.com/WqIlMw0.png' }} style={{ position: 'absolute', opacity: 1, flex: 1, left: scale(-18), top: scale(-18), bottom: scale(-18), right: scale(-18), }} />
            <CommonRectButton onPress={() => goToScanner({ manually: false })} resizeMode="stretch" style={{
                position: 'absolute', opacity: 1, flex: 1, left: 0, top: 0, bottom: 0, right: 0, backgroundColor: '#FF8D51', borderRadius: scale(56),
                borderWidth: scale(0.05),
                borderColor: "#FF8D51",
            }} />

            <View pointerEvents="none" >
                <Image style={PantryAbsoluteButtonIcon} source={{ uri: 'https://i.imgur.com/GZbCIgW.png' }} />
            </View>
        </View>
    </>

}

function PantrySectionItem({
    expire = 0, picture = 'https://i.imgur.com/rGg88ol.png', title = 'Onions', expiringDate = 'Expiring in 29 days', amount = '1Kg', percent = '10%', isFocused = true
}) {

    const {
        PantrySectionItemContainer,
        PantrySectionItemExpireContainer,
        PantrySectionItemExpireLabel,
        PantrySectionItemExpireIcon,
        PantrySectionItemExpireMoreIcon,
        PantrySectionItemTitleRow,
        PantrySectionItemTitlePicture,
        PantrySectionItemTitleKgLabelC,
        PantrySectionItemTitleLabel,
        PantrySectionItemTitleKgLabel,
        PantrySectionItemTitleProgressContainer,
        PantrySectionItemTitleProgressContainerLabel,
        PantrySectionItemTitleProgressContainerUsedLabel,
    } = useComponentStyles('Pantry');


    const expiringIcon = {
        0: 'https://i.imgur.com/dA9dq19.png',
        1: 'https://i.imgur.com/GDv0qZl.png',
        2: 'https://i.imgur.com/zm0TvS3.png',
    };
    return <View style={PantrySectionItemContainer}>
        <View style={PantrySectionItemExpireContainer}>
            <View style={{ transform: transform(-0.33, -3), display: 'flex', flexDirection: 'row', alignContent: 'flex-end', alignItems: 'flex-end' }}>
                <Image resizeMode="contain" source={{ uri: expiringIcon[expire] }} style={{ ...PantrySectionItemExpireIcon, transform: transform(0, 1) }} />
                <PrerenderedText
                    style={PantrySectionItemExpireLabel}
                    anchor="middle"
                    hot={true}
                    lines={[expiringDate]}
                    width={101}
                    height={15}
                    quality={1}
                    viewStyle={{ transform: transform(0, -0.50) }}
                    isFocused={isFocused}
                />
            </View>
            <Image source={{ uri: 'https://i.imgur.com/oNlrEEA.png' }} style={{ ...PantrySectionItemExpireMoreIcon, transform: transform(-5, -4) }} />
        </View>
        <View style={PantrySectionItemTitleRow}>
            <View style={{ display: 'flex', flexDirection: 'row', transform: transform(0, 4) }}>
                <Image source={{ uri: picture }} style={PantrySectionItemTitlePicture} />
                <View style={{ display: 'flex', flexDirection: 'column' }}>
                    <PrerenderedText
                        style={PantrySectionItemTitleLabel}
                        anchor="start"
                        hot={true}
                        lines={[title]}
                        width={181}
                        height={21}
                        quality={1}
                        viewStyle={{ transform: transform(-1.4, -0.75) }}
                        isFocused={isFocused}
                    />
                    <View style={PantrySectionItemTitleKgLabelC}>
                        <PrerenderedText
                            style={PantrySectionItemTitleKgLabel}
                            anchor="start"
                            hot={true}
                            lines={[amount]}
                            width={100}
                            height={21}
                            quality={1}
                            viewStyle={{ transform: transform(-0.6, 1.5) }}
                            isFocused={isFocused}
                        />
                    </View>

                </View>
            </View>

            <View style={{ ...PantrySectionItemTitleProgressContainer, transform: transform(-5, -2) }}>
                <PrerenderedText
                    style={PantrySectionItemTitleProgressContainerLabel}
                    anchor="middle"
                    lines={[percent]}
                    hot={true}
                    width={41.06}
                    height={18}
                    quality={1}
                    viewStyle={{ transform: transform(-0.5, 5.125) }}
                    isFocused={isFocused}
                />
                <PrerenderedText
                    style={PantrySectionItemTitleProgressContainerUsedLabel}
                    anchor="middle"
                    hot={true}
                    lines={['Used']}
                    width={41.06}
                    height={18}
                    quality={1}
                    viewStyle={{ transform: transform(-0.25, 3.5) }}
                    isFocused={isFocused}
                />
            </View>
        </View>
        {/* <Image resizeMode="contain" source={{uri:"https://i.imgur.com/JCEkPJJ.png"}} style={{position: 'absolute', width: 361, maxWidth: '100%', height: 96, opacity: 0.4, left: 0, right: 0}} /> */}
    </View>;
}


// <View style={{ ...PantrySectionLabelContainer, position: 'relative', backgroundColor: '' }} >
//                     <View style={{ display: 'flex', flexDirection: 'row' }}>
//                         <Image source={{ uri: 'https://i.imgur.com/jZA7HuU.png' }} style={{ ...PantrySectionIcon, transform: transform(0, 2.33) }} />
//                         <PrerenderedText
//                             style={PantrySectionLabel}
//                             anchor="start"
//                             lines={['Fruits']}
//                             width={93}
//                             height={24}
//                             quality={1}
//                             viewStyle={{ transform: transform(0, 2.125) }}
//                             isFocused={isFocused}
//                         />
//                     </View>
//                     <PrerenderedText
//                         style={{ ...PantrySectionLabel, color: '#02733E' }}
//                         anchor="start"
//                         lines={['']}
//                         width={52}
//                         height={24}
//                         quality={1}
//                         viewStyle={{ transform: transform(0, 2.125) }}
//                         isFocused={isFocused}
//                     />
//                     {/* <Image source={{ uri: 'https://i.imgur.com/PzomCTL.png' }} style={{...PantrySectionIconChevron, transform: transform(-7,2.25)}} /> */}
//                     {/* <Image resizeMode={newLocal} source={{uri: 'https://i.imgur.com/L5l0Mxj.png'}} style={{position: 'absolute', left: 0, top: 0, width: '100%', height: 48, opacity: 0.5,}} /> */}
//                 </View>
//                 <View style={{
//                     ...HomeEmptyPantryMessage, position: 'relative',
//                     marginTop: scale(0), marginBottom: scale(24),
//                     maxHeight: 64
//                 }}>
//                     {/* Bitmap shadow */}
//                     {/* <Image resizeMode="stretch" source={{ uri: 'https://i.imgur.com/OcgiLnh.png' }} style={{ position: 'absolute', opacity: 1, flex: 1, left: scale(-16), top: scale(-16), bottom: scale(-16), right: scale(-16), }} /> */}
//                     {/* <Image resizeMode="stretch" style={{ position: 'absolute', opacity: 1, flex: 1, left: 0, top: 0, bottom: 0, right: 0, backgroundColor: '#fff', borderRadius: scale(19), }} /> */}

//                     <Image resizeMode="contain" source={{ uri: 'https://i.imgur.com/7jiSwKC.png' }} style={{ ...HomeEmptyPantryMessageIcon, borderWidth: 2, borderColor: "rgba(255, 141, 81,0.001)", borderRadius: scale(7) }}></Image>
//                     <PrerenderedText
//                         style={HomeEmptyPantryMessageLabel}
//                         anchor="middle"
//                         lines={['Need fruits? create a shopping list!']}
//                         width={312}
//                         height={18}
//                         quality={1}
//                         isFocused={isFocused}
//                     />

//                 </View>