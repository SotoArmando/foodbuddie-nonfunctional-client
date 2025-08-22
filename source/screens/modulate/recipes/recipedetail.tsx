import { Image, ImageBackground, View } from "react-native"
import { useComponentStyles } from "../../../providers/StyleProvider"
import PrerenderedText from "../../../abstract/PrerenderedTextView";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { scale } from "../../../abstract/StyleProvider";
import { useIsFocused } from "@react-navigation/native";
import { CommonRectButton } from "../../../components/CommonRectButton";
import chunk from 'chunk-text';
import { transform } from "../../../helpers/styleStringHelper";

export const RecipesDetails = () => {
    const isFocused = useIsFocused();
    const {
        RecipeDetailComponent,
        RecipeDetailTitleRow,
        RecipeDetailTitleRowLabel,
        RecipeDetailTitleRowBackIcon,
        RecipeDetailTitleRowBackHeartIcon,
        RecipeDetailTitleRowBackShareIcon,
        RecipeDetailPictureScreen,
        RecipeDetailDescription,
        RecipeDetailDescriptionRow,
        RecipeDetailDescriptionRowIon20x20,
        RecipeDetailDescriptionRowIon24x24,
        RecipeDetailDescriptionRowLabel,
        RecipeDetailInputRowContainer,
        RecipeDetailInputColContainer,
        RecipeDetailInputRowContainerPlusIcon,
        RecipeDetailInputRowContainerNumberField,
        RecipeDetailInputRowContainerNumberFieldLabel,
        RecipeDetailInputRowContainerTextField,
        RecipeDetailInputRowContainerTextFieldLabel,
        RecipeDetailInputRowContainerTextFieldIcon,
        RecipeDetailNutritionColContainer,
        RecipeDetailNutritionRowContainer,
        RecipeDetailNutritionColContainerLabel,
        RecipeDetailNutritionLabelsColContainer,
        RecipeDetailNutritionLabelsColContainerItem,
        RecipeDetailNutritionLabelsColContainerItemBar,
        RecipeDetailNutritionLabelsColContainerItemLabel,
        RecipeDetailNutritionLabelsColContainerItemSubLabel,
        RecipeDetailNutritionEllipseProgressContainer,
        RecipeDetailNutritionEllipseProgressLabel,
        RecipeDetailIngredientsColContainer,
        RecipeDetailIngredientsColContainerTitleRowContainer,
        RecipeDetailIngredientsColContainerTitle,
        RecipeDetailIngredientsColContainerSubTitle,
        RecipeDetailIngredientsColContainerViewLess,
        RecipeDetailIngredientsColContainerViewLessIcon,
        RecipeDetailIngredientsColContainerViewLessRow,
        RecipeDetailIngredientsColContainerLabel,
        RecipeDetailIngredientsColContainerGrid4xH,
        RecipeDetailIngredientsColContainerGridColItem,
        RecipeDetailIngredientsColContainerGridColItemPicture,
        RecipeDetailIngredientsColContainerGridColItemLabel,
        RecipeDetailIngredientsColContainerGridColItemSubLabel,
    } = useComponentStyles('RecipeDetail');

    const {
        AllSetComponent,
        AllSetComponentColSibling,
        AllSetScreener,
        AllSetTitle,
        AllSetIntroduction,
        AllSetButtonsContainer,
        AllSetButtonCall,
        AllSetButtonCallLabel,
        AllSetButtonCommonLabel,
        AllSetComponentColCommonSibling,
        AllSetIntroductionMargin,
        AllSetButtonCommonContainer,
        AllSetButtonCommon
    } = useComponentStyles('AllSet');

    const recipeTitleString = "Brisket Burger with Grilled Onions and Blue Cheese Sauce";
    const recipeDescription = "Salty, funky bleu cheese and caramely, herby onions add savory depth to a classic burger.";
    return <SafeAreaView style={{}}>
        <ScrollView showsVerticalScrollIndicator={false} removeClippedSubviews={true}>
            <View style={RecipeDetailComponent}>
                <View style={{ ...RecipeDetailTitleRow, marginBottom: scale(13) }}>
                    <View style={{ ...RecipeDetailTitleRow, justifyContent: '' }}>
                        <Image source={{ uri: 'https://i.imgur.com/fupEVh4.png' }} style={{ ...RecipeDetailTitleRowBackIcon, transform: transform(0, 0) }} />
                        <PrerenderedText height={chunk(recipeTitleString, 22).length * 36} width={270} lines={chunk(recipeTitleString, 22)} style={RecipeDetailTitleRowLabel} isFocused={isFocused} viewStyle={{ transform: transform(-0.5, 1) }}></PrerenderedText>
                    </View>
                    <View style={{ ...RecipeDetailTitleRow, justifyContent: '' }}>
                        <Image resizeMode="contain" source={{ uri: 'https://i.imgur.com/QWVJpl4.png' }} style={{ ...RecipeDetailTitleRowBackHeartIcon, width: scale(20), height: scale(20) }} />
                        <Image resizeMode="contain" source={{ uri: 'https://i.imgur.com/FzkcTvx.png' }} style={RecipeDetailTitleRowBackShareIcon} />
                    </View>
                    {/* <Image source={{ uri: 'https://i.imgur.com//Nu3ebOB.png' }}  resizeMode='contain' style={{ position: 'absolute', opacity: 0.5, width: 'auto', maxHeight: scale(36), left: 0, top: 0, bottom: 0, right: 0 }} /> */}
                </View>

                <Image source={{ uri: 'https://www.tastemade.com/_next/image?url=https%3A%2F%2Fassets.tastemadecdn.net%2Fimages%2F7c343b%2Ff042ac4a138000706335%2F4b8242.webp&w=640&q=50' }} style={RecipeDetailPictureScreen} />
                <PrerenderedText
                    width={361}
                    height={24 * chunk(recipeDescription, 42).length}
                    anchor="start"
                    // timeout={600}
                    lines={chunk(recipeDescription, 42)} isFocused={isFocused} style={RecipeDetailDescription}></PrerenderedText>
                <View style={{ minHeight: scale(110), marginTop: scale(17), backgroundColor: '', position: 'relative' }}>

                    <View style={{ ...RecipeDetailDescriptionRow, width: 'auto', justifyContent: 'space-between', maxHeight: scale(24), height: scale(24), marginBottom: scale(22), transform: transform(-0.75, 3) }} >
                        <View style={{ ...RecipeDetailDescriptionRow, gap: scale(4) }}>
                            <Image source={{ uri: 'https://i.imgur.com/eWrA8Ii.png' }} style={{ ...RecipeDetailDescriptionRowIon20x20, marginBottom: scale(-1) }} />
                            <PrerenderedText
                                width={88}
                                height={21}
                                lines={[
                                    '5Min to prep',
                                ]} isFocused={isFocused} style={RecipeDetailDescriptionRowLabel}></PrerenderedText>
                        </View>
                        <View style={{ ...RecipeDetailDescriptionRow, width: 'auto', gap: scale(4), maxHeight: scale(24), height: scale(24) }}>
                            <Image source={{ uri: 'https://i.imgur.com/cSHk7wx.png' }} style={{ ...RecipeDetailDescriptionRowIon24x24, marginTop: scale(-2), transform: transform(0, -1) }} />
                            <PrerenderedText
                                width={93}
                                height={21}
                                viewStyle={{ transform: transform(-1, 0) }}
                                lines={[
                                    '10Min to cook',
                                ]} isFocused={isFocused} style={RecipeDetailDescriptionRowLabel}></PrerenderedText>
                        </View>
                        <View style={{ ...RecipeDetailDescriptionRow, gap: scale(4), width: 'auto' }}>
                            <Image source={{ uri: 'https://i.imgur.com/n2KaMuT.png' }} style={{ ...RecipeDetailDescriptionRowIon20x20, marginBottom: scale(-1), transform: transform(-1, 0) }} />
                            <PrerenderedText
                                width={77}
                                height={21}
                                viewStyle={{ transform: transform(-3, 0) }}
                                lines={[
                                    '15Min Total',
                                ]} isFocused={isFocused} style={RecipeDetailDescriptionRowLabel}></PrerenderedText>
                        </View>
                    </View>
                    <View style={{ ...RecipeDetailInputRowContainer }}>
                        {/* Servings Field Container */}
                        <View style={{ ...RecipeDetailInputColContainer, marginRight: scale(31), flex: 0.5702 }}>
                            <View style={{ ...RecipeDetailInputRowContainer, gap: scale(4) }}>
                                <Image source={{ uri: 'https://i.imgur.com/jFPfUTW.png' }} style={RecipeDetailDescriptionRowIon24x24} />
                                <PrerenderedText
                                    width={64}
                                    height={21}
                                    viewStyle={{ transform: transform(-0.5, 2) }}
                                    lines={[
                                        'Servings',
                                    ]} isFocused={isFocused} style={RecipeDetailDescriptionRowLabel}></PrerenderedText>
                            </View>
                            <View style={{ ...RecipeDetailInputRowContainer, alignItems: 'center', alignContent: 'center', gap: scale(8) }}>
                                <Image resizeMode="contain" source={{ uri: 'https://i.imgur.com/AbDKA0q.png' }} style={{ ...RecipeDetailInputRowContainerPlusIcon, transform: transform(0, 3) }} />
                                <View style={{ ...RecipeDetailInputRowContainerNumberField, borderBottomColor: '#02733E', borderBottomWidth: scale(1) }}>
                                    <PrerenderedText
                                        width={30}
                                        height={36}
                                        anchor="middle"
                                        viewStyle={{ transform: transform(0, 2) }}
                                        lines={[
                                            '1',
                                        ]} isFocused={isFocused} style={RecipeDetailInputRowContainerNumberFieldLabel}></PrerenderedText>
                                    {/* <View style={RecipeDetailInputRowContainerNumberFieldLabel} /> */}
                                </View>
                                <Image resizeMode="contain" source={{ uri: 'https://i.imgur.com/APYip49.png' }} style={{ ...RecipeDetailInputRowContainerPlusIcon, transform: transform(0, 3) }} />
                            </View>
                        </View>
                        {/* Scale To Field Container */}
                        <View style={{ ...RecipeDetailInputColContainer, gap: scale(8), flex: 1, backgroundColor: '' }}>
                            <View style={{ ...RecipeDetailInputRowContainer, gap: scale(4), flex: 1 }}>
                                {/* <View style={{ ...RecipeDetailDescriptionRowIon24x24, opacity: 0 }} /> */}
                                <PrerenderedText
                                    width={64}
                                    height={21}
                                    viewStyle={{ transform: transform(-1, 2) }}
                                    lines={[
                                        'Scale to',
                                    ]} isFocused={isFocused} style={RecipeDetailDescriptionRowLabel}></PrerenderedText>
                            </View>
                            <View style={{ ...RecipeDetailInputRowContainer }}>
                                {/* <View style={{ ...RecipeDetailDescriptionRowIon24x24, opacity: 0 }} /> */}
                                <View style={{ ...RecipeDetailInputRowContainerTextField, position: 'relative', borderBottomColor: '#02733E', borderBottomWidth: scale(1), flex: 1 }}>
                                    <PrerenderedText
                                        width={68}
                                        height={24}
                                        anchor="middle"
                                        viewStyle={{ transform: transform(2, 0) }}
                                        lines={[
                                            'Servings',
                                        ]} isFocused={isFocused} style={RecipeDetailInputRowContainerTextFieldLabel}></PrerenderedText>
                                    <Image source={{ uri: 'https://i.imgur.com/2cl4hWK.png' }} style={{ ...RecipeDetailInputRowContainerTextFieldIcon, transform: transform(-0.5, 1.5) }} />
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* <Image source={{ uri: 'https://i.imgur.com/q9WrqvQ.png' }} resizeMode='contain' style={{ position: 'absolute', opacity: 0.5, width: 'auto', maxHeight: scale(110), left: 0, top: 0, bottom: 0, right: 0, backgroundColor: 'rgba(0,0,244,0)' }} /> */}
                </View>

                <View style={{ ...RecipeDetailNutritionColContainer, marginTop: scale(23) }}>
                    <PrerenderedText viewStyle={{ transform: transform(1.75, 0) }} isFocused={isFocused} lines={['Nutrition Info. (per serving)']} width={218} height={24} style={RecipeDetailNutritionColContainerLabel} />
                    <View style={RecipeDetailNutritionRowContainer}>
                        <ImageBackground resizeMode="contain" source={{ uri: 'https://i.imgur.com/GqL8tDE.png' }} style={RecipeDetailNutritionEllipseProgressContainer}>
                            <PrerenderedText isFocused={isFocused} lines={['434 Cal']} width={93} height={36} style={RecipeDetailNutritionEllipseProgressLabel}></PrerenderedText>
                        </ImageBackground>
                        <View style={{ ...RecipeDetailNutritionLabelsColContainer, transform: transform(-1.75, 0.5) }}>
                            {/* Nutrition info label item */}
                            <View style={RecipeDetailNutritionLabelsColContainerItem}>
                                <View style={RecipeDetailNutritionLabelsColContainerItemBar} />
                                <PrerenderedText isFocused={isFocused} lines={['05gm']} width={42} height={21} style={RecipeDetailNutritionLabelsColContainerItemLabel} />
                                <PrerenderedText isFocused={isFocused} lines={['Fiber']} width={34} height={21} style={RecipeDetailNutritionLabelsColContainerItemSubLabel} />
                            </View>
                            <View style={RecipeDetailNutritionLabelsColContainerItem}>
                                <View style={{ ...RecipeDetailNutritionLabelsColContainerItemBar, backgroundColor: "#FF8D51" }} />
                                <PrerenderedText isFocused={isFocused} lines={['12gm']} width={42} height={21} style={RecipeDetailNutritionLabelsColContainerItemLabel} />
                                <PrerenderedText isFocused={isFocused} lines={['Protein']} width={49} height={21} style={RecipeDetailNutritionLabelsColContainerItemSubLabel} />
                            </View>
                            <View style={RecipeDetailNutritionLabelsColContainerItem}>
                                <View style={{ ...RecipeDetailNutritionLabelsColContainerItemBar, backgroundColor: "#730202" }} />
                                <PrerenderedText isFocused={isFocused} lines={['16gm']} width={42} height={21} style={RecipeDetailNutritionLabelsColContainerItemLabel} />
                                <PrerenderedText isFocused={isFocused} lines={['Fat']} width={43} height={21} style={RecipeDetailNutritionLabelsColContainerItemSubLabel} />
                            </View>
                            <View style={RecipeDetailNutritionLabelsColContainerItem}>
                                <View style={{ ...RecipeDetailNutritionLabelsColContainerItemBar, backgroundColor: "#02733E" }} />
                                <PrerenderedText isFocused={isFocused} lines={['63gm']} width={42} height={21} style={RecipeDetailNutritionLabelsColContainerItemLabel} />
                                <PrerenderedText isFocused={isFocused} lines={['Carbs']} width={43} height={21} style={RecipeDetailNutritionLabelsColContainerItemSubLabel} />
                            </View>
                            {/* Rinse and Repeat */}
                        </View>

                    </View>
                    <Image source={{ uri: 'https://i.imgur.com/BEaxzwA.png' }} resizeMode='contain' style={{ position: 'absolute', opacity: 0.5, width: 'auto', maxHeight: scale(204), left: 0, top: 0, bottom: 0, right: 0, backgroundColor: 'rgba(0,0,244,0)' }} />
                </View>
                <View style={RecipeDetailIngredientsColContainer}>
                    <View style={{ maxHeight: scale(59), position: 'relative', backgroundColor: '' , marginTop: scale(11)}}>

                        <View style={RecipeDetailIngredientsColContainerTitleRowContainer} >
                            <PrerenderedText viewStyle={{transform: transform(-0.5, -0.5)}} isFocused={isFocused} lines={['Ingredients']} width={92} height={24} style={RecipeDetailIngredientsColContainerTitle}></PrerenderedText>
                            <View style={RecipeDetailIngredientsColContainerViewLessRow}>
                                <PrerenderedText viewStyle={{transform: transform(-1, 1.5)}} isFocused={isFocused} lines={['View less']} width={65} height={21} style={RecipeDetailIngredientsColContainerViewLess} />
                                <Image source={{ uri: 'https://i.imgur.com/Hu3FlIM.png' }} style={RecipeDetailIngredientsColContainerViewLessIcon} />
                            </View>
                        </View>
                        <PrerenderedText viewStyle={{transform: transform(-2, 1.5)}} isFocused={isFocused} viewStyle={{ marginBottom: scale(2), marginTop: scale(14) }} lines={['Dry ingredients']} style={RecipeDetailIngredientsColContainerSubTitle} />
                        {/* <Image source={{ uri: 'https://i.imgur.com/BEaxzwA.png' }}  resizeMode='contain' style={{ position: 'absolute', opacity: 0.5, width: 'auto', maxHeight: scale(59), left: 0, top: 0, bottom: 0, right: 0, backgroundColor: 'rgba(0,0,255,0)' }} /> */}
                    </View>
                    <View style={RecipeDetailIngredientsColContainerGrid4xH} >
                        <View style={RecipeDetailIngredientsColContainerGridColItem} >
                            <Image source={{ uri: 'https://i.imgur.com/ZCgL43O.png' }} style={RecipeDetailIngredientsColContainerGridColItemPicture} />
                            <PrerenderedText isFocused={isFocused} anchor="middle" lines={['Oil']} width={89} height={18} style={RecipeDetailIngredientsColContainerGridColItemLabel} />
                            <PrerenderedText isFocused={isFocused} anchor="middle" lines={['1 pinch']} width={62} height={15} style={RecipeDetailIngredientsColContainerGridColItemSubLabel} />
                        </View>
                        <View style={RecipeDetailIngredientsColContainerGridColItem} >
                            <Image source={{ uri: 'https://i.imgur.com/ZCgL43O.png' }} style={RecipeDetailIngredientsColContainerGridColItemPicture} />
                            <PrerenderedText isFocused={isFocused} anchor="middle" lines={['Mustard Seeds']} width={89} height={18} style={RecipeDetailIngredientsColContainerGridColItemLabel} />
                            <PrerenderedText isFocused={isFocused} anchor="middle" lines={['1 pinch']} width={62} height={15} style={RecipeDetailIngredientsColContainerGridColItemSubLabel} />
                        </View>
                        <View style={RecipeDetailIngredientsColContainerGridColItem} >
                            <Image source={{ uri: 'https://i.imgur.com/ZCgL43O.png' }} style={RecipeDetailIngredientsColContainerGridColItemPicture} />
                            <PrerenderedText isFocused={isFocused} anchor="middle" lines={['Hing']} width={89} height={18} style={RecipeDetailIngredientsColContainerGridColItemLabel} />
                            <PrerenderedText isFocused={isFocused} anchor="middle" lines={['1 pinch']} width={62} height={15} style={RecipeDetailIngredientsColContainerGridColItemSubLabel} />
                        </View>
                        <View style={RecipeDetailIngredientsColContainerGridColItem} >
                            <Image source={{ uri: 'https://i.imgur.com/ZCgL43O.png' }} style={RecipeDetailIngredientsColContainerGridColItemPicture} />
                            <PrerenderedText isFocused={isFocused} anchor="middle" lines={['Urad Dal']} width={89} height={18} style={RecipeDetailIngredientsColContainerGridColItemLabel} />
                            <PrerenderedText isFocused={isFocused} anchor="middle" lines={['1 pinch']} width={62} height={15} style={RecipeDetailIngredientsColContainerGridColItemSubLabel} />
                        </View>

                        <View style={RecipeDetailIngredientsColContainerGridColItem} >
                            <Image source={{ uri: 'https://i.imgur.com/ZCgL43O.png' }} style={RecipeDetailIngredientsColContainerGridColItemPicture} />
                            <PrerenderedText isFocused={isFocused} anchor="middle" lines={['Oil']} width={89} height={18} style={RecipeDetailIngredientsColContainerGridColItemLabel} />
                            <PrerenderedText isFocused={isFocused} anchor="middle" lines={['1 pinch']} width={62} height={15} style={RecipeDetailIngredientsColContainerGridColItemSubLabel} />
                        </View>



                    </View>
                    <PrerenderedText isFocused={isFocused} viewStyle={{ marginBottom: scale(2), marginTop: scale(14) }} lines={['Fruits & Vegetables']} style={RecipeDetailIngredientsColContainerSubTitle} />
                    <View style={RecipeDetailIngredientsColContainerGrid4xH}>
                        <View style={RecipeDetailIngredientsColContainerGridColItem} >
                            <Image source={{ uri: 'https://i.imgur.com/ZCgL43O.png' }} style={RecipeDetailIngredientsColContainerGridColItemPicture} />
                            <PrerenderedText isFocused={isFocused} anchor="middle" lines={['Oil']} width={89} height={18} style={RecipeDetailIngredientsColContainerGridColItemLabel} />
                            <PrerenderedText isFocused={isFocused} anchor="middle" lines={['1 pinch']} width={62} height={15} style={RecipeDetailIngredientsColContainerGridColItemSubLabel} />
                        </View>
                        <View style={RecipeDetailIngredientsColContainerGridColItem} >
                            <Image source={{ uri: 'https://i.imgur.com/ZCgL43O.png' }} style={RecipeDetailIngredientsColContainerGridColItemPicture} />
                            <PrerenderedText isFocused={isFocused} anchor="middle" lines={['Mustard Seeds']} width={89} height={18} style={RecipeDetailIngredientsColContainerGridColItemLabel} />
                            <PrerenderedText isFocused={isFocused} anchor="middle" lines={['1 pinch']} width={62} height={15} style={RecipeDetailIngredientsColContainerGridColItemSubLabel} />
                        </View>
                        <View style={RecipeDetailIngredientsColContainerGridColItem} >
                            <Image source={{ uri: 'https://i.imgur.com/ZCgL43O.png' }} style={RecipeDetailIngredientsColContainerGridColItemPicture} />
                            <PrerenderedText isFocused={isFocused} anchor="middle" lines={['Hing']} width={89} height={18} style={RecipeDetailIngredientsColContainerGridColItemLabel} />
                            <PrerenderedText isFocused={isFocused} anchor="middle" lines={['1 pinch']} width={62} height={15} style={RecipeDetailIngredientsColContainerGridColItemSubLabel} />
                        </View>
                        <View style={RecipeDetailIngredientsColContainerGridColItem} >
                            <Image source={{ uri: 'https://i.imgur.com/ZCgL43O.png' }} style={RecipeDetailIngredientsColContainerGridColItemPicture} />
                            <PrerenderedText isFocused={isFocused} anchor="middle" lines={['Urad Dal']} width={89} height={18} style={RecipeDetailIngredientsColContainerGridColItemLabel} />
                            <PrerenderedText isFocused={isFocused} anchor="middle" lines={['1 pinch']} width={62} height={15} style={RecipeDetailIngredientsColContainerGridColItemSubLabel} />
                        </View>
                    </View>
                    <PrerenderedText isFocused={isFocused} viewStyle={{ marginBottom: scale(2), marginTop: scale(14) }} lines={['Other']} style={RecipeDetailIngredientsColContainerSubTitle} />
                    <View style={RecipeDetailIngredientsColContainerGrid4xH}>
                        <View style={RecipeDetailIngredientsColContainerGridColItem} >
                            <Image source={{ uri: 'https://i.imgur.com/ZCgL43O.png' }} style={RecipeDetailIngredientsColContainerGridColItemPicture} />
                            <PrerenderedText isFocused={isFocused} anchor="middle" lines={['Oil']} width={89} height={18} style={RecipeDetailIngredientsColContainerGridColItemLabel} />
                            <PrerenderedText isFocused={isFocused} anchor="middle" lines={['1 pinch']} width={62} height={15} style={RecipeDetailIngredientsColContainerGridColItemSubLabel} />
                        </View>
                        <View style={RecipeDetailIngredientsColContainerGridColItem} >
                            <Image source={{ uri: 'https://i.imgur.com/ZCgL43O.png' }} style={RecipeDetailIngredientsColContainerGridColItemPicture} />
                            <PrerenderedText isFocused={isFocused} anchor="middle" lines={['Mustard Seeds']} width={89} height={18} style={RecipeDetailIngredientsColContainerGridColItemLabel} />
                            <PrerenderedText isFocused={isFocused} anchor="middle" lines={['1 pinch']} width={62} height={15} style={RecipeDetailIngredientsColContainerGridColItemSubLabel} />
                        </View>
                        <View style={RecipeDetailIngredientsColContainerGridColItem} >
                            <Image source={{ uri: 'https://i.imgur.com/ZCgL43O.png' }} style={RecipeDetailIngredientsColContainerGridColItemPicture} />
                            <PrerenderedText isFocused={isFocused} anchor="middle" lines={['Hing']} width={89} height={18} style={RecipeDetailIngredientsColContainerGridColItemLabel} />
                            <PrerenderedText isFocused={isFocused} anchor="middle" lines={['1 pinch']} width={62} height={15} style={RecipeDetailIngredientsColContainerGridColItemSubLabel} />
                        </View>

                    </View>
                    <PrerenderedText isFocused={isFocused} viewStyle={{ marginBottom: scale(2), marginTop: scale(14) }} lines={['You might also add']} style={RecipeDetailIngredientsColContainerSubTitle} />
                    <View style={RecipeDetailIngredientsColContainerGrid4xH}>
                        <View style={RecipeDetailIngredientsColContainerGridColItem} >
                            <Image source={{ uri: 'https://i.imgur.com/ZCgL43O.png' }} style={RecipeDetailIngredientsColContainerGridColItemPicture} />
                            <PrerenderedText isFocused={isFocused} anchor="middle" lines={['Oil']} width={89} height={18} style={RecipeDetailIngredientsColContainerGridColItemLabel} />
                            <PrerenderedText isFocused={isFocused} anchor="middle" lines={['1 pinch']} width={62} height={15} style={RecipeDetailIngredientsColContainerGridColItemSubLabel} />
                        </View>
                        <View style={RecipeDetailIngredientsColContainerGridColItem} >
                            <Image source={{ uri: 'https://i.imgur.com/ZCgL43O.png' }} style={RecipeDetailIngredientsColContainerGridColItemPicture} />
                            <PrerenderedText isFocused={isFocused} anchor="middle" lines={['Mustard Seeds']} width={89} height={18} style={RecipeDetailIngredientsColContainerGridColItemLabel} />
                            <PrerenderedText isFocused={isFocused} anchor="middle" lines={['1 pinch']} width={62} height={15} style={RecipeDetailIngredientsColContainerGridColItemSubLabel} />
                        </View>

                    </View>
                </View>

                <View style={{ ...AllSetButtonsContainer, marginTop: scale(35) }}>
                    <View style={AllSetButtonCommon}>
                        {/* Bitmap shadow */}
                        <Image resizeMode="stretch" source={{ uri: 'https://i.imgur.com/V7pnN7u.png' }} style={{ position: 'absolute', opacity: 1, flex: 1, left: scale(12 - 23), top: scale(7 - 23), bottom: scale(-7 - 23), right: scale(13 - 23), }} />
                        <Image resizeMode="stretch" style={{
                            position: 'absolute', opacity: 1, flex: 1, left: 0, top: 0, bottom: 0, right: 0, backgroundColor: '#FFFFFF', borderRadius: scale(15), borderWidth: 1,
                            borderColor: "#02733E",
                        }} />

                        <CommonRectButton style={AllSetButtonCommonContainer}  >
                            <PrerenderedText
                                isFocused={isFocused}
                                style={AllSetButtonCommonLabel}
                                width={83}
                                anchor="middle"
                                height={18}
                                lines={['Go to home']}
                            />
                        </CommonRectButton>
                    </View>
                    <View style={AllSetButtonCall}>
                        {/* Bitmap shadow */}
                        <Image resizeMode="stretch" source={{ uri: 'https://i.imgur.com/f9dSqZI.png' }} style={{ position: 'absolute', opacity: 1, flex: 1, left: scale(12 - 23), top: scale(7 - 23), bottom: scale(-7 - 23), right: scale(13 - 23), }} />
                        <Image resizeMode="stretch" style={{
                            position: 'absolute', opacity: 1, flex: 1, left: 0, top: 0, bottom: 0, right: 0, backgroundColor: '#FF8D51', borderRadius: scale(15),
                        }} />

                        <CommonRectButton style={AllSetButtonCommonContainer} >

                            <PrerenderedText
                                isFocused={isFocused}
                                style={AllSetButtonCallLabel}
                                width={101}
                                anchor="middle"
                                height={18}
                                lines={['Start cooking']}
                            />
                        </CommonRectButton>
                    </View>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>

}

