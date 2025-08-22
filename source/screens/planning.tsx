import { StyleProvider, useComponentStyles } from "../providers/StyleProvider"
import PrerenderedText from "../abstract/PrerenderedTextView";
import { Dimensions, Image, ImageBackground, Pressable, ScrollView, TextStyle, View, ViewStyle } from "react-native";
import { scale } from "../abstract/StyleProvider";
import { transform } from "../helpers/styleStringHelper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useScreenRoutes } from "../providers/NavigationProvider";
import { useSession } from "../providers/SessionProvider";
import { RectButton } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import Animated, { cancelAnimation, interpolateColor, runOnJS, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DaySelectionProvider, useDaySelection } from "../providers/DaySelectorProvider";
import { AnimatedPantryBottomBorder, SwitchLabel } from "./pantry";
import { Rect } from "react-native-svg";
import { CommonRectButton } from "../components/CommonRectButton";

const useDayListContainer = (props) => {
    const { isFocused } = props;
    const [day, updateDay] = useState(3);

    const progress = useSharedValue<number>(1);

    const days = ['Mo', 'Tu', 'Wed', 'Th', 'Fr', 'Sa', 'Su']



    const updateDay2 = useCallback(async (newDay: number) => {
        if (newDay !== day) {
            cancelAnimation(progress);
            progress.value = 0;
            // progress.value = withSpring(0, {
            //     stiffness: 15, // Adjust stiffness for the spring
            //     damping: 3, // Adjust damping for the spring
            //     mass: 1 / 400, // Adjust mass for the spring
            //     restDisplacementThreshold: 0.001, // When to stop the animation
            //     restSpeedThreshold: 0.001, // Speed threshold to stop the animation
            // }, (f) => {
            //     if (f) {
            //         runOnJS(updateDay)(newDay)
            //     }
            // });

            updateDay(newDay)
        }

    }, [day]);

    const newLocal = useCallback(({ item: { dayLabel, dayNumber, extraGapLeft, id } }) => <PlannerDaysRowElementW
        dayLabel={dayLabel}
        dayNumber={dayNumber}
        isThird={id % 7 === 2}
        current={day === id}
        // extraGapLeft={extraGapLeft}
        isFocused={isFocused}
        handleClick={updateDay2}
        progress={progress}
        index={id}
    />, [day]);

    const newLocal_1 = useCallback((event) => {
        const newLocal = Math.round(event.nativeEvent.contentOffset.x / scale(((24 + 31) * 7)));
        // // console.log('newLoc', newLocal, (newLocal * 7) + 7 - 4)
        updateDay2((newLocal * 7) + 7 - 4)
    }, [day]);

    const newLocal_2 = useCallback((item, item_i) => {

        // // console.log(`${item_i.toString()}_${(day === item_i).toString()}`);
        return `${item_i.toString()}_${(day === item_i).toString()}}`;
    }, [day]);

    const newLocal_3 = [
        ...(Array(7 * 6).fill(0).map((e, ei) => ({ "dayLabel": days[ei % 7], "dayNumber": ((ei % 31) + 1).toString(), "extraGapLeft": null }))).map((item, index) => ({
            id: index,
            ...item
        }))
    ];

    useEffect(() => {
        progress.value = withSpring(1, {
            stiffness: 15, // Adjust stiffness for the spring
            damping: 3, // Adjust damping for the spring
            mass: 1 / 20, // Adjust mass for the spring
            restDisplacementThreshold: 0.001, // When to stop the animation
            restSpeedThreshold: 0.001, // Speed threshold to stop the animation
        });
    }, [day])



    const memo = useMemo(() => ({ days, newLocal, newLocal_1, newLocal_2, newLocal_3, updateDay2 }), [day])
    return memo;
}

const DayListContainer = (props = { isFocused: true }) => {
    const { isFocused } = props;
    const {
        PlannerDaysRow,
    } = useComponentStyles('Planner');

    const { newLocal_2, newLocal_1, newLocal, newLocal_3 } = useDayListContainer({ isFocused });
    // console.log(newLocal_3)
    return <>
        <View style={{ marginBottom: -16, }}>
            {isFocused && <Animated.FlatList

                keyExtractor={newLocal_2}
                // windowSize={1}
                // initialNumToRender={5}
                // maxToRenderPerBatch={5}
                snapToInterval={(screenWidth * 1.07692307692 ) - (scale(32))}
                removeClippedSubviews={true}
                style={{ overflow: 'visible', marginLeft: scale(-8), paddingBottom: 16 }}
                contentContainerStyle={PlannerDaysRow}
                bounces={true}
                
                alwaysBounceHorizontal={true}
                // snapToInterval={scale(24 + 31)}
                // snapToOffsets={[0, scale(55), scale(113), scale(171), scale(227), scale(282), scale(337)]}
                pagingEnabled={false}
                // snapToAlignment={'center'} 
                // style={PlannerDaysRow}
                onMomentumScrollEnd={newLocal_1}
                decelerationRate={10}
                showsHorizontalScrollIndicator={false}
                snapToAlignment="start"
                // style={{overflow: 'visible'}}
                windowSize={3}
                horizontal
                data={newLocal_3} renderItem={newLocal} />

            }
        </View>
    </>
}

const PlannerMealRowComponent = ({ isFocused }) => {
    const {
        PlannerMealRow,
        PlannerMealRowElement,
        PlannerMealRowElementLabel,
        PlannerMealRowElementLabelContainer,
        PlannerMealRowElementLabelInactive,
        PlannerMealRowElementIcon,
    } = useComponentStyles('Planner');

    const [selected, setSelected] = useState(0);
    return <View style={PlannerMealRow}>
        <CommonRectButton onPress={() => setSelected(0)} style={PlannerMealRowElement}>
            <View style={{ ...PlannerMealRowElementLabelContainer, transform: transform(0, 0.75) }}>
                {/* {selected === 0 && } */}
                <SwitchLabel
                    icon={<Image source={{ uri: 'https://i.imgur.com/q6Azn1N.png' }} style={PlannerMealRowElementIcon}></Image>}
                    active={selected === 0}
                    style={{ ...PlannerMealRowElementLabelInactive }}
                    activeStyle={{ ...PlannerMealRowElementLabel, color: "#02733E" }}
                    anchor="middle"
                    lines={['Breakfast']}
                    width={69}
                    height={21}
                    // quality={0.75}
                    viewStyle={{ transform: transform(-0.5, 2.3) }}
                    isFocused={isFocused}
                />

            </View>
            <AnimatedPantryBottomBorder active={selected === 0} left={scale(16)} right={16} />
        </CommonRectButton>
        <CommonRectButton onPress={() => setSelected(1)} style={{ ...PlannerMealRowElement, borderBottomColor: 'transparent', }}>
            <SwitchLabel
                icon={<Image source={{ uri: 'https://i.imgur.com/sgihhdN.png' }} style={PlannerMealRowElementIcon} />}
                active={selected === 1}
                style={{ ...PlannerMealRowElementLabelInactive }}
                activeStyle={{ ...PlannerMealRowElementLabel, color: "#02733E" }}
                anchor="middle"
                lines={['Lunch']}
                width={43}
                height={21}
                viewStyle={{ transform: transform(-0.5, 2.3) }}
                isFocused={isFocused}
            />
            <AnimatedPantryBottomBorder active={selected === 1} left={scale(16)} right={scale(16)} />
        </CommonRectButton>
        <CommonRectButton onPress={() => setSelected(2)} style={{ ...PlannerMealRowElement, borderBottomColor: 'transparent', }}>
            <SwitchLabel
                icon={<Image source={{ uri: 'https://i.imgur.com/4FII06N.png' }} style={PlannerMealRowElementIcon} />}
                active={selected === 2}
                style={{ ...PlannerMealRowElementLabelInactive }}
                activeStyle={{ ...PlannerMealRowElementLabel, color: "#02733E" }}
                anchor="middle"
                lines={['Dinner']}
                width={47}
                height={21}
                viewStyle={{ transform: transform(-0.5, 2.3) }}
                isFocused={isFocused}
            />
            <AnimatedPantryBottomBorder active={selected === 2} left={scale(16)} right={scale(16)} />
        </CommonRectButton>
        {/* <Image source={{ uri: 'https://i.imgur.com//x5oCHuI.png' }} style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', opacity: 0.75 }}></Image> */}
    </View>
}
export const Planning = () => {
    const isFocused = useIsFocused();

    const {
        PlannerComponent,
        PlannerTitle,
        PlannerTitleRow,
        PlannerRowTitleIcon,
        PlannerWeeklyPlanLabel,
        PlannerDateLabel,
        PlannerTimeDayRow,
        PlannerTimeDayRowLabel,
        PlannerTimeDayRowIcon,
        PlannerRecipesColumn,
        PlannerWeeklyPlanLabelMargin,
        PlannerDateLabelMargin
    } = useComponentStyles('Planner');

    const {
        PantryAbsoluteButton,
        PantryAbsoluteButtonIcon
    } = useComponentStyles('Pantry');

    const { goToPlannerAdd } = useScreenRoutes();

    const {
        HomeEmptyPantryMessage,
        HomeEmptyPantryMessageLabel,
        HomeEmptyPantryMessageIcon,
    } = useComponentStyles('Home');

    return <SafeAreaView >
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ ...PlannerComponent, }}>
                <View style={{ position: 'relative', backgroundColor: '' }}>

                    <View style={PlannerTitleRow}>
                        <PrerenderedText
                            style={PlannerTitle}
                            anchor="start"
                            lines={['Meal Planner']}
                            width={159}
                            height={36}
                            viewStyle={{ transform: transform(-0.25, 0.5) }}
                            isFocused={isFocused}
                        />
                        <Image source={{ uri: 'https://i.imgur.com/1QkAHHW.png' }} style={PlannerRowTitleIcon}></Image>
                    </View>
                    <PrerenderedText
                        style={PlannerWeeklyPlanLabel}
                        anchor="start"
                        lines={['Weekly Plan']}
                        viewStyle={{ ...PlannerWeeklyPlanLabelMargin, transform: transform(-0.25, -0.5) }}
                        width={100}
                        height={24}
                        isFocused={isFocused}
                    />
                    <PrerenderedText
                        style={PlannerDateLabel}
                        anchor="start"
                        lines={['Sept 2024']}
                        width={69}
                        height={21}
                        viewStyle={{ ...PlannerDateLabelMargin, transform: transform(-0.25, 1.25) }}
                        isFocused={isFocused}
                    />
                    {/* <Image source={{ uri: 'https://i.imgur.com/KOGqWRW.png' }} resizeMode="stretch" style={{ position: 'absolute', opacity: 0.5, left: 0, top: 0, width: '100%', height: '100%' }} /> */}
                </View>

                <View style={{ position: 'relative' }}>
                    {/* <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: '', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} >
                        <Animated.View style={{ width: scale(53), transform: transform(12, 0), height: '100%', backgroundColor: color }} />
                    </View> */}
                    {/* const ranges = [
            { start: 0, end: 53 },
            { start: 55, end: 107 },
            { start: 113, end: 166 },
            { start: 171, end: 224 }, // Note: This range appears inverted
            { start: 227, end: 280 },
            { start: 282, end: 335 },
            { start: 337, end: 390 }
        ]; */}

                    {isFocused && <DayListContainer isFocused={isFocused} />}
                </View>



                <PlannerMealRowComponent isFocused={isFocused} />
                <View style={{ ...PlannerTimeDayRow, position: 'relative', overflow: 'visible' }}>
                    <Image resizeMode="contain" source={{ uri: 'https://i.imgur.com/PS9zE1d.png' }} style={{ ...PlannerTimeDayRowIcon, transform: transform(-0.5, -0.5) }}></Image>
                    <PrerenderedText
                        style={PlannerTimeDayRowLabel}
                        anchor="start"
                        lines={['09:00AM']}
                        width={60}
                        height={21}
                        viewStyle={{ transform: transform(-0.75, 1.5) }}
                        isFocused={isFocused}
                    />
                    {/* <Image source={{uri:'https://i.imgur.com/Zd89W7y.png'}} style={{position: 'absolute', left: 0, top: 0, width: '100%', height: '100%'}} /> */}
                </View>
                <View style={PlannerRecipesColumn}>
                    <View style={{
                        ...HomeEmptyPantryMessage, position: 'relative',
                        marginTop: scale(32), marginBottom: scale(24),
                        maxHeight: 64
                    }}>
                        {/* Bitmap shadow */}
                        {/* <Image resizeMode="stretch" source={{ uri: 'https://i.imgur.com/OcgiLnh.png' }} style={{ position: 'absolute', opacity: 1, flex: 1, left: scale(-16), top: scale(-16), bottom: scale(-16), right: scale(-16), }} /> */}
                        {/* <Image resizeMode="stretch" style={{ position: 'absolute', opacity: 1, flex: 1, left: 0, top: 0, bottom: 0, right: 0, backgroundColor: '#fff', borderRadius: scale(19), }} /> */}

                        <Image resizeMode="contain" source={{ uri: 'https://i.imgur.com/7jiSwKC.png' }} style={{ ...HomeEmptyPantryMessageIcon, borderWidth: 2, borderColor: "rgba(255, 141, 81,0.001)", borderRadius: scale(7) }}></Image>
                        <PrerenderedText
                            style={HomeEmptyPantryMessageLabel}
                            anchor="middle"
                            lines={['No plans?. Tap that button right there.']}
                            width={312}
                            height={18}
                            quality={1}
                            isFocused={isFocused}
                        />

                    </View>
                    {/* <Image resizeMode="contain" source={{ uri: 'https://i.imgur.com/fOCu6BA.png' }} style={{
                            height: scale(159), marginTop: scale(0), marginBottom: scale(24),
                            backgroundColor: "#fff",
                            // borderColor: '#333333',
                            // borderWidth: 3
                            // iOS shadow
                            shadowColor: 'rgb(121, 121, 121)',
                            shadowOffset: { width: 0, height: 10 },
                            shadowOpacity: 1, // Already included in rgba
                            shadowRadius: 8, // Approximation: 37px blur in CSS ~ 23 in RN
                            borderRadius: 19,
                            // Android shadow
                            elevation: 17, // Rough equivalent
                        }} /> */}
                    {/* <Image resizeMode="contain" source={{ uri: 'https://i.imgur.com/OB5xIWn.png' }} style={{ height: scale(87), marginTop: scale(0), marginBottom: scale(0) }} /> */}
                    {/* <MealPlannerRecipeElement />
                        <MealPlannerRecipeElement name="Ginger Tea" sourceImg="https://i.imgur.com/mlpO9sg.png" />
                        <MealPlannerRecipeElement name="Vegan Bowl" sourceImg="https://i.pinimg.com/736x/1d/00/87/1d008703c24de140361a6b97446b3272.jpg" />
                     */}
                </View>
            </View>
        </ScrollView>
        <View style={{ ...PantryAbsoluteButton, }}  >
            {/* Bitmap shadow */}
            <Image resizeMode="stretch" source={{ uri: 'https://i.imgur.com/WqIlMw0.png' }} style={{ position: 'absolute', opacity: 1, flex: 1, left: scale(-18), top: scale(-18), bottom: scale(-18), right: scale(-18), }} />
            <CommonRectButton onPress={goToPlannerAdd} resizeMode="stretch" style={{
                position: 'absolute', opacity: 1, flex: 1, left: 0, top: 0, bottom: 0, right: 0, backgroundColor: '#FF8D51', borderRadius: scale(56),
                borderWidth: scale(0.05),
                borderColor: "#FF8D51",
            }} />

            <View pointerEvents="none">
                <Image style={PantryAbsoluteButtonIcon} source={{ uri: 'https://i.imgur.com/GZbCIgW.png' }} />
            </View>
        </View>
    </SafeAreaView>

}
const MealPlannerRecipeElement = ({ sourceImg = 'https://i.pinimg.com/736x/67/38/f1/6738f1b39f19475ae08e6c6458671173.jpg',
    name = 'Onion Poha', time = '30Min', serves = '2Serve', isFocused = true }) => {
    const {
        PlannerRecipesColumnElement,
        PlannerRecipesColumnElementPicture,
        PlannerRecipesColumnElementTitleLabel,
        PlannerRecipesColumnElementHeartIcon,
        PlannerRecipesColumnElementDotsIcon,
        PlannerRecipesColumnElementTimeIcon,
        PlannerRecipesColumnElementDetailsRow,
        PlannerRecipesColumnElementDetailsRowDivider,
        PlannerRecipesColumnElementPeopleIcon,
        PlannerRecipesColumnElementTimeLabel,
        PlannerRecipesColumnElementTitleRow,
        PlannerRecipesColumnElementTimeRow,
    } = useComponentStyles('Planner');

    return <>

        <View style={{ ...PlannerRecipesColumnElement, position: 'relative' }} >
            <ImageBackground source={{ uri: sourceImg }} style={PlannerRecipesColumnElementPicture} >
                {/* <Image source={{ uri: 'https://i.imgur.com/OP2AMsS.png' }} style={{ position: 'absolute', opacity: 0.1, left: 0, top: 0, width: '100%', height: '100%' }} /> */}
            </ImageBackground>
            <View style={{ display: 'flex', justifyContent: 'space-between', flex: 1, height: scale(87), flexDirection: 'column' }}>
                <View style={PlannerRecipesColumnElementTitleRow}>
                    <PrerenderedText
                        style={PlannerRecipesColumnElementTitleLabel}
                        anchor="start"
                        lines={[name]}
                        width={174}
                        height={24}
                        quality={0.75}
                        viewStyle={{ transform: transform(-0.5, -0.9) }}
                        isFocused={isFocused}
                    // viewStyle={{backgroundColor: 'red'}}
                    />
                    <Image source={{ uri: 'https://i.imgur.com/lTxnjBY.png' }} style={{ ...PlannerRecipesColumnElementHeartIcon, transform: transform(0, -1) }}></Image>
                </View>
                <View style={PlannerRecipesColumnElementTimeRow}>
                    <View style={PlannerRecipesColumnElementDetailsRow}>
                        <Image source={{ uri: 'https://i.imgur.com/9rjjlck.png' }} style={PlannerRecipesColumnElementTimeIcon}></Image>
                        <PrerenderedText
                            style={PlannerRecipesColumnElementTimeLabel}
                            anchor="start"
                            lines={[time]}
                            width={36}
                            height={18}
                            viewStyle={{ transform: transform(-0.5, 1) }}
                            isFocused={isFocused}
                        />
                        <View style={PlannerRecipesColumnElementDetailsRowDivider} />
                        <Image source={{ uri: 'https://i.imgur.com/ArBkweT.png' }} style={PlannerRecipesColumnElementPeopleIcon}></Image>
                        <PrerenderedText
                            style={PlannerRecipesColumnElementTimeLabel}
                            anchor="start"
                            lines={[serves]}
                            width={41}
                            height={18}
                            viewStyle={{ transform: transform(-0.5, 1) }}
                            isFocused={isFocused}
                        />
                    </View>
                    <Image source={{ uri: 'https://i.imgur.com/rYpTEYD.png' }} style={PlannerRecipesColumnElementDotsIcon}></Image>
                </View>
            </View>
            {/* <Image source={{uri: 'https://i.imgur.com/MGHnF7x.png'}} style={{position: 'absolute', left: 0, top: 0, height: '100%', width: '100%', opacity: 0.5, }}/> */}
        </View>

    </>
};

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

function PlannerDaysRowElementW({
    progress = { value: 0 },
    handleClick = () => { },
    isThird = false,
    dayNumber = '18',
    dayLabel = 'Mo',
    active = false,
    extraGapRight = 0,
    extraGapLeft = 0,
    isFocused = true,
    current = false,
    index = 0 }) {

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: current ? progress.value : 0,
            backgroundColor: "#F09C33"
        };
    }, []);

    const {
        PlannerDaysRowElement,
        PlannerDaysRowElementInactive,
        PlannerDaysRowElementTitle,
        PlannerDaysRowElementDay,
        PlannerDaysRowElementDayActive,
        PlannerDaysRowElementDot,
    } = useComponentStyles('Planner');
    // console.log('am rerendering', dayLabel, dayNumber)

    const newLocal = useCallback(async () => handleClick(index), [current]);
    const focus = useMemo(() => current && <Animated.View style={[{ position: 'absolute', left: scale(-2), right: scale(-1), top: scale(4), bottom: scale(-8), borderRadius: scale(16) }, animatedStyle, { display: current ? 'flex' : 'none' }, {
        borderWidth: scale(0.05),
        borderColor: "#F09C33",
    }]} />, [current]);

    console.log(isFocused);
    
    return <CommonRectButton onPress={newLocal} style={[{ ...active ? PlannerDaysRowElement : PlannerDaysRowElementInactive, marginLeft: scale(extraGapLeft), marginRight: scale(extraGapRight), position: 'relative', overflow: 'visible', width: (screenWidth - (scale(32))) / 6.5 }]}>
        {focus}
        <PrerenderedText
            style={{...PlannerDaysRowElementTitle}}
            anchor="middle"
            lines={[dayNumber]}
            width={24}
            height={24}
            viewStyle={{ transform: transform(active ? 1 : 0, 0) }}
            quality={0.75}
            isFocused={isFocused}
            preloadColor={[{ fontWeight: '700', color: '#fff' }]}
            pStyles={current ? 0 : undefined}
        />

        <PrerenderedText
            style={{...PlannerDaysRowElementDay}}
            anchor="middle"
            lines={[dayLabel]}
            width={32}
            viewStyle={{ transform: transform(active ? 1.25 : 0, 4.5) }}
            height={14}
            quality={0.75}
            isFocused={isFocused}
            preloadColor={[{ fontWeight: '400', color: '#fff' }]}
            pStyles={current ? 0 : undefined}
        />

        <View style={{ ...PlannerDaysRowElementDot, backgroundColor: current ? "#FFF" : "#E1DDD4", transform: transform(active ? 1 : 0, 4.5), opacity: current ? 1 : 0 }}></View>
        {/* <Image style={{position:'absolute', left: 0, top: 0, width: '100%', height: '100%'}} source={{uri: 'https://i.imgur.com/CHINb0K.png'}} /> */}
    </CommonRectButton>;
}


// {<PlannerDaysRowElementW dayLabel="Mo" dayNumber="18" isFocused={isFocused} />}
// {<PlannerDaysRowElementW dayLabel="Tu" dayNumber="19" isFocused={isFocused} />}
// {<PlannerDaysRowElementW dayLabel="Wed" dayNumber="20" extraGapLeft={4} isFocused={isFocused} />}
// {<PlannerDaysRowElementW dayLabel="Th" dayNumber="21" extraGapLeft={3} isFocused={isFocused} active={true} />}
// {<PlannerDaysRowElementW dayLabel="Fr" dayNumber="22" extraGapLeft={1} isFocused={isFocused} />}
// {<PlannerDaysRowElementW dayLabel="Sa" dayNumber="23" isFocused={isFocused} />}
// {<PlannerDaysRowElementW dayLabel="Su" dayNumber="24" isFocused={isFocused} />}


// { "dayLabel": "Mo", "dayNumber": "18", "extraGapLeft": null },
// { "dayLabel": "Tu", "dayNumber": "19", "extraGapLeft": null },
// { "dayLabel": "Wed", "dayNumber": "20", "extraGapLeft": 4 },
// { "dayLabel": "Th", "dayNumber": "21", "extraGapLeft": 3 },
// { "dayLabel": "Fr", "dayNumber": "22", "extraGapLeft": 1 },
// { "dayLabel": "Sa", "dayNumber": "23", "extraGapLeft": null },
// { "dayLabel": "Su", "dayNumber": "24", "extraGapLeft": null },