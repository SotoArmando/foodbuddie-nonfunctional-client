import { Image, ScrollView, StatusBar, View } from "react-native"
import { scale } from "../abstract/StyleProvider"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { useComponentStyles } from "../providers/StyleProvider"
import { PlannerAddItems } from "./modulate/planner/planner_add"
import PrerenderedText from "../abstract/PrerenderedTextView"
import { RectButton } from "react-native-gesture-handler"
import { useScreenRoutes } from "../providers/NavigationProvider"
import { transform } from "../helpers/styleStringHelper"
import { CommonRectButton } from "../components/CommonRectButton"

export const SearchScreen = () => {
    const {
        SearchScreenComponent,
        SearchScreenFoundLabel,
        SearchScreenFoundLabelContainer,
        SearchScreenComponentItemsContainer
    } = useComponentStyles('SearchScreen');

    const {
        PantrySearchInputContainer,
        PantrySearchInputIcon,
        PantrySearchInput,
    } = useComponentStyles('Pantry');

    const { goToPlanning, goToSearchScreen } = useScreenRoutes();
    return <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={SearchScreenComponent}>
            <CommonRectButton onPress={goToSearchScreen} style={{ ...PantrySearchInputContainer, marginBottom: scale(24), marginTop: scale(18) }} >
                <Image resizeMode="stretch" source={{ uri: 'https://i.imgur.com/Zn28Idk.png' }} style={{ position: 'absolute', opacity: 1, flex: 1, left: scale(-10), top: scale(-10), bottom: scale(-10), right: scale(-10), }} />
                <Image resizeMode="stretch" style={{ position: 'absolute', opacity: 1, flex: 1, height: '100%', left: 0, top: 0, bottom: 0, right: 0, backgroundColor: '#fff', borderRadius: scale(19), }} />
                <Image source={{ uri: 'https://i.imgur.com/XPj9fuK.png' }} style={{ ...PantrySearchInputIcon, transform: transform(-1, 0) }} />
                <PrerenderedText
                    style={{...PantrySearchInput, color: "#333333"}}
                    anchor="start"
                    lines={['Upma']}
                    width={200}
                    height={15}
                    quality={1}
                // viewStyle={{ transform: transform(-2.75, 0.5) }}
                />
                {/* <Image resizeMode="contain" source={{uri: 'https://i.imgur.com/5N75yNU.png'}} style={{position: 'absolute',opacity: 0.5, left: 0, top: 0, width: '100%', maxWidth: '100%', height: '100%'}} /> */}
            </CommonRectButton>

                <View style={SearchScreenFoundLabelContainer} >
                    <PrerenderedText
                        style={SearchScreenFoundLabel}
                        anchor="middle"
                        lines={['3 Found Recipes']}
                        width={168}
                        height={24}
                        quality={1}
                    />
                </View>
                <View style={SearchScreenComponentItemsContainer}>
                    <PlannerAddItems />
                    <PlannerAddItems />
                    <PlannerAddItems />
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>

}