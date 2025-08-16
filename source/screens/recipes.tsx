import { useComponentStyles } from "../providers/StyleProvider"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import PrerenderedText from "../abstract/PrerenderedTextView";
import { transform } from "../helpers/styleStringHelper";
import { Image, View, ScrollView, ImageBackground } from "react-native";
import { scale } from "../abstract/StyleProvider";
import { useIsFocused } from "@react-navigation/native";

export const Recipes = () => {
    const isFocused = useIsFocused();

    // if (!isFocused) return null;
    const {
        RecipesCallToActionContainer,
        RecipesCallToActionTitleLabel,
        RecipesCallToActionSubLabel,
        RecipesCallToActionSubLabelIcon,
        RecipesInventoryLabel,
        RecipesCallToActionContainerShadow,
    } = useComponentStyles('Recipes');

    const {
        PantryComponent,
        PantryTitleRow,
        PantryTitle,
        PantryTitleICon,
        PantrySearchInputContainer,
        PantrySearchInputIcon,
        PantrySearchInput,
    } = useComponentStyles('Pantry');

    return <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={PantryComponent}>
                <View style={PantryTitleRow} >
                    <PrerenderedText
                        style={PantryTitle}
                        anchor="start"
                        lines={['Recipes']}
                        width={123}
                        height={36}
                        quality={1}
                        viewStyle={{ transform: transform(-0.1, 0.5) }}
                        isFocused={isFocused}
                    />
                    <Image source={{ uri: 'https://i.imgur.com/RrRU1Bp.png' }} style={{ ...PantryTitleICon, transform: transform(0, 6) }} />
                    {/* <Image resizeMode="contain" source={{uri: 'https://i.imgur.com/ngAAGEy.png'}} style={{position: 'absolute',opacity: 0.5, left: 0, top: 0, width: '100%', maxWidth: '100%', height: '100%'}} /> */}
                </View>

                <View >
                    <View style={PantrySearchInputContainer} >
                        {/* Bitmap shadow */}
                        <Image resizeMode="stretch" source={{ uri: 'https://i.imgur.com/Zn28Idk.png' }} style={{ position: 'absolute', flex: 1, left: scale(-10), top: scale(-10), bottom: scale(-10), right: scale(-10), }} />
                        <Image resizeMode="stretch" style={{ position: 'absolute', flex: 1, height: '100%', left: 0, top: 0, bottom: 0, right: 0, backgroundColor: '#FDFEF4', borderRadius: scale(19), 
                                  borderWidth: scale(0.01), 
                                  borderColor: "#F5F6EC", 
                         }} />
                        <Image source={{ uri: 'https://i.imgur.com/XPj9fuK.png' }} style={{ ...PantrySearchInputIcon, transform: transform(-1, 0) }} />
                        <PrerenderedText
                            style={PantrySearchInput}
                            anchor="start"
                            lines={['Do i have...']}
                            width={53}
                            height={15}
                            quality={1}
                            viewStyle={{ transform: transform(-2.75, 0.5) }}
                            isFocused={isFocused}
                        />
                        {/* <Image resizeMode="contain" source={{uri: 'https://i.imgur.com/5N75yNU.png'}} style={{position: 'absolute',opacity: 0.5, left: 0, top: 0, width: '100%', maxWidth: '100%', height: '100%'}} /> */}
                    </View>
                </View>

             
                <View style={{ position: 'relative', overflow: 'visible' }}>
                    <View style={{ ...RecipesCallToActionContainer, ...RecipesCallToActionContainerShadow, paddingLeft: 0, paddingTop: 0, paddingBottom: 0, overflow: 'visible' }} >
                        {/* Bitmap shadow */}
                        <Image resizeMode="stretch" source={{ uri: 'https://i.imgur.com/VNEysNf.png' }} style={{ position: 'absolute', opacity: 1, flex: 1, left: scale(-12), top: scale(-12), bottom: scale(-12), right: scale(-12), }} />
                        {/* <Image resizeMode="stretch" style={{ position: 'absolute', opacity: 1, flex: 1, height: '100%', left: 0, top: 0, right: 0, backgroundColor: '#FDFEF4', borderRadius: scale(19), }} /> */}
                        <Image borderRadius={scale(19)} source={{ uri: 'https://i.imgur.com/GVE5fCU.png' }} style={{
                            position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, borderRadius: scale(19), overflow: 'visible', borderWidth: scale(0.05),
                            borderColor: "rgba(216,38,106, 0.1)", 
                        }} />


                        <View style={{ ...RecipesCallToActionContainer, position: 'absolute', width: '100%', height: '100%', left: 0, bottom: 0, backgroundColor: '', marginBottom: 0, marginTop: 0 }}>
                            <PrerenderedText
                                lines={['Generate recipes from', 'leftovers that you have!']}
                                style={RecipesCallToActionTitleLabel}
                                anchor="start"
                                width={191}
                                height={48}
                                quality={1}
                                viewStyle={{ transform: transform(0.25, -0.2) }}
                                isFocused={isFocused}
                            />
                            <View style={{ display: 'flex', flexDirection: 'row', marginLeft: scale(5) }}>
                                <PrerenderedText
                                    lines={['Generate now']}
                                    style={RecipesCallToActionSubLabel}
                                    anchor="start"
                                    width={100}
                                    height={21}
                                    quality={1}
                                    viewStyle={{ transform: transform(0.25, 1) }}
                                    isFocused={isFocused}
                                />
                                <Image style={{ ...RecipesCallToActionSubLabelIcon, transform: transform(0.5, 1.5) }} source={{ uri: 'https://i.imgur.com/i2yyM0B.png' }} />
                            </View>
                        </View>
                    </View>
                    <PrerenderedText
                        lines={['Based on inventory']}
                        style={RecipesInventoryLabel}
                        anchor="start"
                        width={195}
                        height={24}
                        quality={1}
                        viewStyle={{ transform: transform(-1.4, 0), marginBottom: scale(18) }}
                        isFocused={isFocused}
                    // viewStyle={{marginBottom: scale(18)}}
                    />
                    {/* <Image resizeMode="contain" source={{uri: 'https://i.imgur.com/d7loRKV.png'}} style={{ opacity: 0.5 ,position: 'absolute', left: 0, top: 0, width: '100%', height: '100%'}} /> */}
                </View>
                <RecipeElement isFocused={isFocused} />
                <RecipeElement isFocused={isFocused} picture="https://www.yummytummyaarthi.com/wp-content/uploads/2022/04/besan-chilla-1.jpg" title="Besan Cheela" description="You have all ingredients" time="45Min" />
                <RecipeElement isFocused={isFocused} picture="https://fitpiq.com/wp-content/uploads/2022/11/Cheera_Thoran.jpg" title="Sheera" description="You have all ingredients" time="15Min" />
            </View>
        </ScrollView>
    </SafeAreaView>

}

const RecipeElement = ({ title = 'Sabudana Khichdi', picture = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Upwas_Special_Sabudana_Khichadi.jpg/500px-Upwas_Special_Sabudana_Khichadi.jpg', description = 'You have 5 ingredients', time = '6Hrs 15Min', isFavorite = false, isFocused = true }) => {
    const {
        RecipesItemContainer,
        RecipesItemTitleRow,
        RecipesItemTitleLabel,
        RecipesItemDescriptionLabel,
        RecipesItemTimeRow,
        RecipesItemTimeRowIcon,
        RecipesItemContainerHeartIcon,
        RecipesItemTimeRowLabel,
        RecipesItemPicture,
        RecipesItemTimeRowPlusIcon
    } = useComponentStyles('Recipes');

    return <View style={RecipesItemContainer}>
        {/* Bitmap shadow */}
        <Image resizeMode="stretch" source={{ uri: 'https://i.imgur.com/HQOyAiW.png' }} style={{ position: 'absolute', opacity: 1, flex: 1, left: scale(-12), top: scale(-12), bottom: scale(-12), right: scale(-12), }} />
        <Image resizeMode="stretch" style={{ position: 'absolute', opacity: 1, flex: 1, height: '100%', left: 0, top: 0, right: 0, backgroundColor: '#fff', borderRadius: scale(19), }} />

        <Image source={{ uri: picture }} style={RecipesItemPicture} />
        <View style={{ display: 'flex', flexDirection: 'column', flex: 1, alignContent: 'flex-start', paddingTop: scale(11), paddingRight: scale(16) }}>
            <View style={{ ...RecipesItemTitleRow, }}>
                <PrerenderedText
                    lines={[title]}
                    style={RecipesItemTitleLabel}
                    anchor="start"
                    width={149}
                    height={24}
                    quality={1}
                    viewStyle={{ transform: transform(-0.5, -0.25) }}
                    isFocused={isFocused}
                />

                <Image source={{ uri: 'https://i.imgur.com/E3IMMe5.png' }} style={RecipesItemContainerHeartIcon} />
            </View>
            <PrerenderedText
                lines={[description]}
                style={{ ...RecipesItemDescriptionLabel }}
                anchor="start"
                width={115}
                height={15}
                quality={1}
                viewStyle={{ transform: transform(-0.75, 0.6) }}
                isFocused={isFocused}
            />

            <View style={RecipesItemTimeRow}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Image source={{ uri: 'https://i.imgur.com/yqWw3aQ.png' }} style={{ ...RecipesItemTimeRowIcon, transform: transform(0, 3) }} />
                    <PrerenderedText
                        lines={[time]}
                        style={RecipesItemTimeRowLabel}
                        anchor="start"
                        width={63}
                        height={18}
                        quality={1}
                        viewStyle={{ transform: transform(-0.75, 0.8) }}
                        isFocused={isFocused}
                    />
                </View>
                <Image source={{ uri: 'https://i.imgur.com/c1SLOpg.png' }} style={RecipesItemTimeRowPlusIcon} />
            </View>
        </View>
        {/* <Image source={{uri: 'https://i.imgur.com/vEdSHPB.png'}} style={{ opacity: 0.5,position: 'absolute', left: 0, top: 0, width: '100%', height: '100%'}} /> */}
    </View>
}