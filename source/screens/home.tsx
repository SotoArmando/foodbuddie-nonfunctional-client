import { FlatList, Image, ImageBackground, Pressable, Text, TextStyle, View, ViewStyle } from "react-native"
import { useComponentStyles } from "../providers/StyleProvider"
import PrerenderedText from "../abstract/PrerenderedTextView";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { scale } from "../abstract/StyleProvider";
import { HomeDash } from "../abstract/HomeDash";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { transform } from "../helpers/styleStringHelper";
import { useIsFocused } from "@react-navigation/native";
import { useScreenRoutes } from "../providers/NavigationProvider";
import { useEffect, useState } from "react";
import { CommonRectButton } from "../components/CommonRectButton";
import { useRecipes } from "./modulate/recipes/container/RecipesContainer";
import chunk from 'chunk-text';
const RowStyle: ViewStyle = { display: 'flex', flexDirection: 'row' };


export const Home = () => {

    const isFocused = useIsFocused();
    const {
        HomeComponent,
        HomeHeadingRow,
        HomeHeadingTitle,
        HomeHeadingDate,
        HomeHeadingIcon,
        HomeHeadingBellIcon,
        HomeUpcomingRow,
        HomeUpcomingLabel,
        HomeUpcomingIcon,
        HomeUpcomingMealColumn,
        HomeUpcomingMealHeadingRow,
        HomeUpcomingMealHeadingRowTimeLabel,
        HomeUpcomingMealHeadingTimeIcon,
        HomeUpcomingMealHeadingHeartIcon,
        HomeUpcomingMealHeadingDotsIcon,
        HomeUpcomingMealTitleRow,
        HomeUpcomingMealTitleLabel,
        HomeUpcomingMealTitleIcon,
        HomeUpcomingMealItemsRow,
        HomeUpcomingMealItemsMeal,
        HomeUpcomingMealItemsMealPicture,
        HomeUpcomingMealItemsMealTitle,
        HomeUpcomingMealItemsMealTimeLabel,
        HomeUpcomingMealItemsMealServeLabel,
        HomeUpcomingMealItemsMealIcon,
        HomeUpcomingMealItemsMealCRow,
        HomeQuickInventoryLabel,
        HomeQuickInventoryItemsContainer,
        HomeQuickInventoryItemsQuickSummary,
        HomeQuickInventoryItemsQuickSummarySmall,
        HomeQuickInventoryItemsQuickSummaryTitle,
        HomeQuickInventoryItemsQuickSummaryLabel,
        HomeQuickInventoryItemsQuickSummaryLabelRoundedContainer,
        HomeQuickInventoryItemsQuickSummaryLabelRoundedContainerBig,
        HomeLeftOverSuggestionsRow,
        HomeLeftOverSuggestionsLabel,
        HomeLeftOverSuggestionsViewAllButtonIcon,
        HomeLeftOverSuggestionsViewAllButton,
        HomeLeftOverSuggestionsViewAllButtonLabel,
        HomeLeftOverSuggestionsMealsRow,
        HomeLeftOverSuggestionsMealsItem,
        HomeLeftOverSuggestionsMealsItemPicture,
        HomeLeftOverSuggestionsMealsItemTextContainer,
        HomeLeftOverSuggestionsMealsItemTitle,
        HomeLeftOverSuggestionsMealsItemDescription,
        HomeLeftOverSuggestionsMealsItemIconContainer,
        HomeLeftOverSuggestionsMealsItemIcon,
        HomeQuickInventoryItemsQuickSummaryTitleCenter,
        HomeEmptyPantryMessage,
        HomeEmptyPantryMessageLabel,
        HomeEmptyPantryMessageLabelBold,
        HomeEmptyPantryMessageIcon,
        HomeEmptyPantryMessageButton,
        HomeEmptyPantryMessageButtonLabel,
    } = useComponentStyles('Home');

    const { goToRecipeDetails, navigation } = useScreenRoutes();
    const { recipes, loading } = useRecipes('https://antonio-constant-intranet-field.trycloudflare.com/recipes');

    const [horizontalisScrolling, setIsHorizontalScrolling] = useState(false);
    useEffect(() => {
        // navigation.preload('RecipesDetails') 
    }, [])
    return <SafeAreaView>
        <ScrollView scrollEnabled={!horizontalisScrolling}>
            <View style={{ ...HomeComponent }}>
                <View style={{ display: 'flex', flexDirection: 'column', position: 'relative', }}>
                    <View style={{ maxHeight: scale(48), height: scale(48), marginBottom: scale(20), backgroundColor: '', position: 'relative' }}>
                        <View style={{ alignContent: 'center', alignItems: 'center', height: scale(36), minHeight: scale(36), flexDirection: 'row', flex: 1, justifyContent: 'space-between', position: 'relative' }}>
                            <View style={{ transform: 'translate(1px,2px)' }}>
                                <PrerenderedText
                                    style={{ ...HomeHeadingTitle, }}
                                    anchor="start"
                                    lines={['Welcome, Atharva!']}
                                    width={236}
                                    height={36}
                                    quality={3}
                                    viewStyle={{ transform: transform(-1.25, -1.25) }}
                                    isFocused={isFocused}
                                />
                            </View>

                            <Image source={{ uri: 'https://i.imgur.com/Cis134r.png' }} style={HomeHeadingBellIcon} />


                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', marginTop: scale(-4.75), marginLeft: scale(4) }}>
                            <Image source={{ uri: 'https://i.imgur.com/S7FaTPB.png' }} style={{ ...HomeHeadingIcon, marginRight: scale(4) }} />
                            <PrerenderedText
                                style={HomeHeadingDate}
                                anchor="start"
                                lines={['21 Sept, Thursday']}
                                width={103}
                                height={36}
                                quality={1}
                                viewStyle={{ transform: transform(0, -0.15) }}
                                isFocused={isFocused}
                            />
                        </View>
                        {/* <Image source={{ uri: 'https://i.imgur.com/ESJBzAk.png' }}  resizeMode='stretch' style={{ position: 'absolute', opacity: 1, width: 'auto', height: scale(48), left: 0, top: 0, right: 0, }} /> */}
                    </View>
                    <View style={HomeUpcomingRow}>
                        <PrerenderedText
                            style={HomeUpcomingLabel}
                            anchor="start"
                            lines={['Upcoming Meal Plan']}
                            width={168}
                            height={24}
                            quality={1}
                            isFocused={isFocused}
                        />
                        <Image source={{ uri: 'https://i.imgur.com/Sp3z2pt.png' }} style={HomeUpcomingIcon} />
                    </View>
                    {/* <HomeDash /> */}
                    <View style={HomeUpcomingMealColumn}>
                        {/* Bitmap shadow */}
                        <Image resizeMode="stretch" source={{ uri: 'https://i.imgur.com/OcgiLnh.png' }} style={{ position: 'absolute', opacity: 1, flex: 1, left: scale(-16), top: scale(-16), bottom: scale(-16), right: scale(-16), }} />

                        <Image resizeMode="stretch" style={{ position: 'absolute', opacity: 1, flex: 1, height: '100%', left: 0, top: 0, right: 0, backgroundColor: '#fff', borderRadius: scale(19), }} />

                        <View style={{ height: scale(20) }} />

                        <View style={HomeUpcomingMealHeadingRow} >
                            <View style={{ ...RowStyle, alignContent: 'center', alignItems: 'center', transform: 'translateY(-1px)' }} >
                                <Image source={{ uri: 'https://i.imgur.com/8F1B3Jx.png' }} style={HomeUpcomingMealHeadingTimeIcon} />
                                <PrerenderedText
                                    style={HomeUpcomingMealHeadingRowTimeLabel}
                                    anchor="start"
                                    lines={['09:00AM']}
                                    width={52}
                                    height={18}
                                    quality={1}
                                    viewStyle={{ transform: 'translateY(1px)' }}
                                    isFocused={isFocused}
                                />
                            </View>
                            <View style={RowStyle}>
                                <Image source={{ uri: 'https://i.imgur.com/W5aGjNq.png' }} style={HomeUpcomingMealHeadingHeartIcon} />
                                <Image source={{ uri: 'https://i.imgur.com/IZPCUTA.png' }} style={HomeUpcomingMealHeadingDotsIcon} />
                            </View>
                        </View>
                        <View style={HomeUpcomingMealTitleRow}>
                            <Image style={{ ...HomeUpcomingMealTitleIcon }} source={{ uri: 'https://i.imgur.com/Toze5kn.png' }} />
                            <PrerenderedText
                                style={HomeUpcomingMealTitleLabel}
                                anchor="start"
                                lines={['Breakfast']}
                                width={67}
                                height={21}
                                quality={1}
                                viewStyle={{ transform: 'translate(-0.25px, 0.25px)' }}
                                isFocused={isFocused}
                            />
                        </View>
                        <View style={HomeUpcomingMealItemsRow}>

                            {/* mealUri="https://i.imgur.com/ME5KTDW.png" */}
                            <HomeUpcomingMealItemMeal title="Breakfast" isFocused={isFocused} />
                            {/* mealUri="https://i.imgur.com/bR0PUQ8.png"  */}
                            <HomeUpcomingMealItemMeal second={true} title="Lunch" isFocused={isFocused} />
                        </View>

                        {/* <Image  source={{uri:'https://i.imgur.com/ik7PCv5.png'}} style={{position:'absolute', opacity: 0.5, width: '', height: HomeUpcomingMealColumn.height, left: 0, top: 0, right: 0, }} /> */}
                    </View>

                    <PrerenderedText
                        style={HomeQuickInventoryLabel}
                        anchor="start"
                        lines={['Quick Inventory Summery']}
                        width={212}
                        height={24}
                        quality={1}
                        isFocused={isFocused}
                    />

                    <View style={{
                        ...HomeEmptyPantryMessage, marginTop: scale(22), marginBottom: scale(24), position: 'relative'

                    }}>
                        {/* Bitmap shadow */}
                        <Image resizeMode="stretch" source={{ uri: 'https://i.imgur.com/OcgiLnh.png' }} style={{ position: 'absolute', opacity: 1, flex: 1, left: scale(-16), top: scale(-16), bottom: scale(-16), right: scale(-16), }} />
                        <Image resizeMode="stretch" style={{ position: 'absolute', opacity: 1, flex: 1, left: 0, top: 0, bottom: 0, right: 0, backgroundColor: '#fff', borderRadius: scale(19), }} />

                        <Image resizeMode="contain" source={{ uri: 'https://i.imgur.com/7jiSwKC.png' }} style={{ ...HomeEmptyPantryMessageIcon, }}></Image>
                        <PrerenderedText
                            style={HomeEmptyPantryMessageLabel}
                            anchor="middle"
                            lines={['Is your pantry empty? maybe is time to make a list.']}
                            width={311}
                            height={18}
                            quality={1}
                            isFocused={isFocused}
                        />
                        <View style={HomeEmptyPantryMessageButton}>
                            {/* Bitmap shadow */}
                            <Image resizeMode="stretch" source={{ uri: 'https://i.imgur.com/f9dSqZI.png' }} style={{ position: 'absolute', opacity: 1, flex: 1, left: scale(12 - 23), top: scale(7 - 23), bottom: scale(-7 - 23), right: scale(13 - 23), }} />
                            <Image resizeMode="stretch" style={{ position: 'absolute', opacity: 1, flex: 1, left: 0, top: 0, bottom: 0, right: 0, backgroundColor: '#FF8D51', borderRadius: scale(16), }} />

                            <PrerenderedText
                                style={HomeEmptyPantryMessageButtonLabel}
                                anchor="middle"
                                lines={['Check now']}
                                width={125}
                                height={18}
                                quality={1}
                                isFocused={isFocused}
                            />
                        </View>
                    </View>


                    <View style={HomeLeftOverSuggestionsRow}>
                        <PrerenderedText
                            style={HomeLeftOverSuggestionsLabel}
                            anchor="start"
                            lines={['Leftover suggestions']}
                            width={169}
                            height={24}
                            quality={1}
                            isFocused={isFocused}
                        />

                        <View style={HomeLeftOverSuggestionsViewAllButton}>
                            <PrerenderedText
                                style={HomeLeftOverSuggestionsViewAllButtonLabel}
                                anchor="start"
                                lines={['View all']}
                                width={55}
                                height={21}
                                isFocused={isFocused}
                            />
                            <Image source={{ uri: 'https://i.imgur.com/spboATi.png' }} style={HomeLeftOverSuggestionsViewAllButtonIcon} />

                        </View>
                    </View>

                    <View style={{ position: 'relative', height: 186, }} >

                        <FlatList
                            keyExtractor={(item, index) => index.toString()}
                            data={recipes}
                            style={HomeLeftOverSuggestionsMealsRow}
                            removeClippedSubviews={true} showsHorizontalScrollIndicator={false}
                            // onScrollBeginDrag={() => setIsHorizontalScrolling(true)}
                            // onScrollEndDrag={() => setIsHorizontalScrolling(false)} 
                            alwaysBounceHorizontal={false} horizontal
                            contentContainerStyle={{ overflow: 'visible', padding: 20 }}
                            style={{ position: 'absolute', overflow: 'visible', left: -20, right: -20, top: -20, bottom: -20 }}
                            renderItem={({ item }) => <View style={({ ...HomeLeftOverSuggestionsMealsItem })}>
                                {/* Bitmap shadow */}
                                <Image resizeMode="stretch" source={{ uri: 'https://i.imgur.com/ExB68BA.png' }} style={{ position: 'absolute', opacity: 1, flex: 1, left: scale(-20), top: scale(-20), bottom: scale(-20), right: scale(-20), }} />
                                <CommonRectButton onPress={goToRecipeDetails} resizeMode="stretch" style={({
                                    position: 'absolute', opacity: 1, flex: 1, height: '100%', left: 0, top: 0, right: 0, backgroundColor: '#fff', borderRadius: scale(19),

                                })} />

                                <View pointerEvents="none">
                                    <Image source={{ uri: item["Alt Picture-src"] || (item.Picture.length > 0 && item.Picture) || "https://i.imgur.com/Pk1U5Jx.png" }} style={HomeLeftOverSuggestionsMealsItemPicture} />
                                </View>
                                <View pointerEvents="none" style={HomeLeftOverSuggestionsMealsItemTextContainer}>
                                    <PrerenderedText
                                        style={HomeLeftOverSuggestionsMealsItemTitle}
                                        anchor="start"
                                        lines={chunk(item.Title, 21).slice(0, 2)}
                                        width={159}
                                        height={chunk(item.Title, 21).slice(0, 2).length * 21}
                                        quality={1}
                                        viewStyle={{ transform: transform(-0.25, 0.25) }}
                                        isFocused={isFocused}
                                    />
                                    <PrerenderedText
                                        style={HomeLeftOverSuggestionsMealsItemDescription}
                                        anchor="start"
                                        lines={chunk(item.Description, 29).slice(0, (chunk(item.Title, 21).slice(0, 2).length > 1 ? 1 : 2))}
                                        width={160}
                                        height={(chunk(item.Title, 21).slice(0, 2).length > 1 ? 1 : 2) * 15}
                                        quality={1}
                                        viewStyle={{ transform: transform(-0.5, -0.75) }}
                                        isFocused={isFocused}
                                    />
                                </View>
                                <View pointerEvents="none" style={HomeLeftOverSuggestionsMealsItemIconContainer}>
                                    {/* Bitmap shadow */}
                                    <Image resizeMode="stretch" source={{ uri: 'https://i.imgur.com/pL5hWvV.png' }} style={{ position: 'absolute', opacity: 1, flex: 1, left: scale(-20), top: scale(-20), bottom: scale(-20), right: scale(-20), }} />
                                    <Image resizeMode="stretch" style={{
                                        position: 'absolute', opacity: 1, flex: 1, left: 0, top: 0, bottom: 0, right: 0, backgroundColor: '#FFFFFF', borderRadius: scale(35), borderWidth: 1,
                                        borderColor: "#FFFFFF",
                                    }} />
                                    <Image source={{ uri: "https://i.imgur.com/Y90joeL.png" }} style={HomeLeftOverSuggestionsMealsItemIcon} />
                                </View>
                                <View pointerEvents="none" style={{
                                    borderWidth: scale(0.05),
                                    borderColor: "rgba(216,38,106, 0.1)",
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                    borderRadius: scale(19),
                                }} />
                                {/* <Image resizeMode="contain" source={{uri: 'https://i.imgur.com/jaxqjan.png'}} style={{position: 'absolute', left: 0, right: 0, top: 0, height: '100%', width: '100%', opacity: 0.5, flex: 1,  }}/> */}
                            </View>}

                        />
                    </View>

                    {/* <Image resizeMode="contain"  source={{uri: 'https://i.imgur.com/GxoWsfj.png'}} style={{position: 'absolute', left: 0, right: 0, top: 0, height: '100%', width: '100%', opacity: 0.5, flex: 1,   }}/> */}
                </View>
                <View style={{ backgroundColor: 'transparent', height: '200' }} />
            </View>
        </ScrollView>
    </SafeAreaView>

}


{/* <View style={}></View> */ }

function HomeUpcomingMealItemMeal({ second = false, time = '', serves = '', title = 'Onion Poha', mealUri = 'https://i.imgur.com/hYz33Wj.png', isFocused }: { title?: string, mealUri?: string, second?: boolean, serves?: string, time?: string, isFocused?: boolean }) {
    const {
        HomeUpcomingMealItemsMeal,
        HomeUpcomingMealItemsMealPicture,
        HomeUpcomingMealItemsMealTitle,
        HomeUpcomingMealItemsMealTimeLabel,
        HomeUpcomingMealItemsMealServeLabel,
        HomeUpcomingMealItemsMealIcon,
        HomeUpcomingMealItemsMealIconB,
        HomeUpcomingMealItemsMealCRow,
        HomeUpcomingMealItemsMealCRowB,
        HomeUpcomingMealItemsMealIconC,
        HomeUpcomingMealItemsMealP
    } = useComponentStyles('Home');

    return <View style={second ? HomeUpcomingMealItemsMeal : HomeUpcomingMealItemsMealP}>
        <ImageBackground resizeMode="contain" style={HomeUpcomingMealItemsMealPicture} >
            {/* Bitmap shadow */}
            {/* <Image resizeMode="stretch" source={{ uri: 'https://i.imgur.com/n5UFpbN.png' }} style={{ position: 'absolute', opacity: 1, flex: 1, left: scale(-0.7), top: scale(-1), bottom: scale(-0.33), right: scale(-0.03), }} /> */}
            <Image resizeMode="stretch" source={{ uri: 'https://i.imgur.com/otKR2Mx.png' }} style={{ position: 'absolute', opacity: 1, flex: 1, left: scale(12 - 23), top: scale(7 - 23), bottom: scale(-7 - 23), right: scale(13 - 23), }} />
            <Image source={{ uri: mealUri }} resizeMode="stretch" style={{ position: 'absolute', opacity: 1, flex: 1, left: 0, top: 0, bottom: 0, right: 0, backgroundColor: '#FF8D51', borderRadius: scale(7), borderWidth: 2, borderColor: "rgba(255, 141, 81,0.001)" }} />

            {/* <Image style={{ borderColor: '#560405', borderWidth: 0.001, borderRadius: scale(7), position: 'absolute', backgroundColor: 'transparent', mixBlendMode: 'soft-light', opacity: 1, left: 0, top: 0, height: '100%', width: '100%' }} /> */}
        </ImageBackground>
        <View>
            <PrerenderedText
                style={HomeUpcomingMealItemsMealTitle}
                anchor="start"
                lines={[title]}
                width={124}
                height={24}
                quality={second ? 0.7 : 0.6}
                viewStyle={{ transform: transform(second ? -0 : -1, 0.5) }}
                isFocused={isFocused}
            />
            <View style={{ ...second ? HomeUpcomingMealItemsMealCRowB : HomeUpcomingMealItemsMealCRow, transform: second ? 'translateY(0.25px)' : 'translateY(0.25px)' }}>
                {time && <>
                    <Image source={{ uri: 'https://i.imgur.com/8F1B3Jx.png' }} style={{ ...HomeUpcomingMealItemsMealIcon, marginLeft: second ? 1.25 : 0 }} />
                    <PrerenderedText
                        style={HomeUpcomingMealItemsMealTimeLabel}
                        anchor="start"
                        lines={[time]}
                        width={36}
                        height={18}
                        quality={1}
                    // viewStyle={{ transform: 'translateY(1px)' }}
                    />
                </>}
                {serves && <>
                    <Image source={{ uri: 'https://i.imgur.com/03XkzTc.png' }} style={{ ...(second ? HomeUpcomingMealItemsMealIconC : HomeUpcomingMealItemsMealIconB) }} />
                    <PrerenderedText
                        style={HomeUpcomingMealItemsMealServeLabel}
                        anchor="start"
                        lines={[serves]}
                        width={41}
                        height={18}
                        quality={1}
                        viewStyle={{ transform: transform(second ? -1.5 : 0, 0) }}
                        isFocused={isFocused}
                    />
                </>}
            </View>
        </View>
    </View>;
}
