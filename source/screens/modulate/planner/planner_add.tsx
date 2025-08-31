import { Image, Pressable, View } from "react-native"
import { useComponentStyles } from "../../../providers/StyleProvider"
import PrerenderedText from "../../../abstract/PrerenderedTextView";
import { transform } from "../../../helpers/styleStringHelper";
import { scale } from "../../../abstract/StyleProvider";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { useSession } from "../../../providers/SessionProvider";
import { useScreenRoutes } from "../../../providers/NavigationProvider";
import { useIsFocused } from "@react-navigation/native";
import { CommonRectButton } from "../../../components/CommonRectButton";

export const PlannerAdd = () => {


    const { PlannerComponent,
        PlannerTitleRow,
        PlannerTitleRowLabel,
        PlannerTitleRowIcon,
        PlannerSearchContainer,
        PlannerSearchInput,
        PlannerSearchInputLabel,
        PlannerSearchInputRow,
        PlannerSelectLabel,
        PlannerSelectSubLabel,
        PlannerElementsContainer,
        PlannerElementsContainerItem,
        PlannerElementsContainerItemTitle,
        PlannerElementsContainerItemLabel,
        PlannerElementsContainerItemTimeContainer,
        PlannerElementsContainerItemTimeContainerIcon,
        PlannerElementsContainerItemTimeContainerLabel,
        PlannerElementsContainerItemHeartIcon,
        PlannerElementsContainerItemPicture,
        PlannerElementsContainerItemAddIcon,
        PlannerCompleteActivityButton,
        PlannerCompleteActivityButtonLabel
    } = useComponentStyles('PlannerAdd');

    const {
        PantrySearchInputContainer,
        PantrySearchInputIcon,
        PantrySearchInput,
    } = useComponentStyles('Pantry');


    // const { updateSession } = useSession();
    const isFocused = true;
    const { goToPlanning, goToSearchScreen } = useScreenRoutes();
    const {
        HomeEmptyPantryMessageButton,
        HomeEmptyPantryMessageButtonLabel,
    } = useComponentStyles('Home');

    return <SafeAreaView style={{height: '100%'}} >
        <ScrollView style={{...PlannerComponent,position: 'relative'}}>
            {/* <View style={{ height: scale(69) }} /> */}
            <View style={{ ...PlannerTitleRow }}>
                <CommonRectButton hitSlop={12} onPress={goToPlanning} >
                <Image source={{ uri: 'https://i.imgur.com/pS7nCui.png' }} style={PlannerTitleRowIcon} />

                </CommonRectButton>
                <PrerenderedText
                    style={PlannerTitleRowLabel}
                    anchor="start"
                    lines={['Add Breakfast']}
                    width={173}
                    height={36}
                    quality={1}
                    hot={true}
                    viewStyle={{ transform: transform(-1, 1) }}
                    isFocused={isFocused}
                // viewStyle={{ transform: transform(-2.75, 0.5) }}
                />
            </View>
            <CommonRectButton onPress={goToSearchScreen} style={{ ...PantrySearchInputContainer, marginBottom: scale(24), marginTop: scale(18) }} >
                <Image resizeMode="stretch" source={{ uri: 'https://i.imgur.com/Zn28Idk.png' }} style={{ position: 'absolute', opacity: 1, flex: 1, left: scale(-10), top: scale(-10), bottom: scale(-10), right: scale(-10), }} />
                <Image resizeMode="stretch" style={{ position: 'absolute', opacity: 1, flex: 1, height: '100%', left: 0, top: 0, bottom: 0, right: 0, backgroundColor: '#FDFEF4', borderRadius: scale(19), }} />
                <Image source={{ uri: 'https://i.imgur.com/XPj9fuK.png' }} style={{ ...PantrySearchInputIcon, transform: transform(-1, 0) }} />
                <PrerenderedText
                    style={PantrySearchInput}
                    anchor="start"
                    lines={['Do i have...']}
                    width={53}
                    height={15}
                    quality={1}
                    // hot={true}
                    isFocused={isFocused}
                // viewStyle={{ transform: transform(-2.75, 0.5) }}
                />
                {/* <Image resizeMode="contain" source={{uri: 'https://i.imgur.com/5N75yNU.png'}} style={{position: 'absolute',opacity: 0.5, left: 0, top: 0, width: '100%', maxWidth: '100%', height: '100%'}} /> */}
            </CommonRectButton>

            <PrerenderedText style={PlannerSelectLabel}
                anchor="start"
                lines={['Select recipes']}
                width={115}
                height={24}
                hot={true}
                viewStyle={{ transform: transform(-0.5, -0.5) }}
                isFocused={isFocused}
            />

            <PrerenderedText style={PlannerSelectSubLabel}
                anchor="start"
                lines={['Auto suggested recipes based on your inventory', 'and leftovers.']}
                width={345}
                height={42}
                viewStyle={{ transform: transform(-0.75, -1) }}
                isFocused={isFocused}
            />
            {/* <Image resizeMode="contain" source={{uri: 'https://i.imgur.com/vxKMrfG.png'}} style={{position: 'absolute', left: 0, right: 0, top: 0, height: '100%', width: '100%', opacity: 0.75, flex: 1, backgroundColor: 'transparent'  }}/> */}
            <View style={PlannerElementsContainer} >
                <View style={{ ...PlannerElementsContainerItem }} >
                    {/* Bitmap shadow */}
                    <Image resizeMode="stretch" source={{ uri: 'https://i.imgur.com/HQOyAiW.png' }} style={{ position: 'absolute', opacity: 1, flex: 1, left: scale(-12), top: scale(-12), bottom: scale(-12), right: scale(-12), }} />
                    <Image resizeMode="stretch" style={{ position: 'absolute', opacity: 1, flex: 1, height: '100%', left: 0, top: 0, right: 0, backgroundColor: '#fff', borderRadius: scale(19), }} />

                    <View style={PlannerElementsContainerItemPicture}></View>
                    <View style={{
                        position: 'relative', display: 'flex', flexDirection: 'column', paddingLeft: scale(18), paddingTop: scale(11), flex: 1
                    }}>
                        <PrerenderedText style={PlannerElementsContainerItemTitle}
                            anchor="start"
                            lines={['Upma']}
                            width={51}
                            height={24}
                            viewStyle={{ transform: transform(-1, -0.75) }}
                            isFocused={isFocused}
                        />
                        <PrerenderedText style={PlannerElementsContainerItemLabel}
                            anchor="start"
                            lines={['You have all ingredients']}
                            width={120}
                            height={15}
                            viewStyle={{ transform: transform(-1.5, 0) }}
                            isFocused={isFocused}
                        />
                        <View style={PlannerElementsContainerItemTimeContainer} >
                            <Image source={{ uri: 'https://i.imgur.com/OSQceM4.png' }} style={PlannerElementsContainerItemTimeContainerIcon} />
                            <PrerenderedText style={PlannerElementsContainerItemTimeContainerLabel}
                                anchor="start"
                                lines={['15Min']}
                                width={33}
                                height={18}
                                viewStyle={{ transform: transform(-1, 0.25) }}
                                isFocused={isFocused}
                            />
                        </View>
                        <Image source={{ uri: 'https://i.imgur.com/Y3IpqYm.png' }} style={PlannerElementsContainerItemAddIcon}></Image>
                        <Image source={{ uri: 'https://i.imgur.com/GMJ0Nm8.png' }} style={PlannerElementsContainerItemHeartIcon}></Image>
                    </View>
                    {/* <Image resizeMode="contain" source={{uri: 'https://i.imgur.com/1n4MJii.png'}} style={{position: 'absolute', left: 0, right: 0, top: 0, height: '100%', width: '100%', opacity: 0.75, flex: 1, backgroundColor: 'transparent'  }}/> */}
                </View>
                <View style={PlannerElementsContainerItem} >
                    {/* Bitmap shadow */}
                    <Image resizeMode="stretch" source={{ uri: 'https://i.imgur.com/HQOyAiW.png' }} style={{ position: 'absolute', opacity: 1, flex: 1, left: scale(-12), top: scale(-12), bottom: scale(-12), right: scale(-12), }} />
                    <Image resizeMode="stretch" style={{ position: 'absolute', opacity: 1, flex: 1, height: '100%', left: 0, top: 0, right: 0, backgroundColor: '#fff', borderRadius: scale(19), }} />
                    <View style={PlannerElementsContainerItemPicture}></View>
                    <View style={{
                        position: 'relative', display: 'flex', flexDirection: 'column', paddingLeft: scale(18), paddingTop: scale(11), flex: 1
                    }}>
                        <PrerenderedText style={PlannerElementsContainerItemTitle}
                            anchor="start"
                            lines={['Upma']}
                            width={50}
                            height={24}
                            viewStyle={{ transform: transform(-1, -0.75) }}
                            isFocused={isFocused}
                        />
                        <PrerenderedText style={PlannerElementsContainerItemLabel}
                            anchor="start"
                            lines={['You have all ingredients']}
                            width={120}
                            height={15}
                            viewStyle={{ transform: transform(-1.5, 0) }}
                            isFocused={isFocused}
                        />
                        <View style={PlannerElementsContainerItemTimeContainer} >
                            <Image source={{ uri: 'https://i.imgur.com/OSQceM4.png' }} style={PlannerElementsContainerItemTimeContainerIcon} />
                            <PrerenderedText style={PlannerElementsContainerItemTimeContainerLabel}
                                anchor="start"
                                lines={['15Min']}
                                width={33}
                                height={18}
                                viewStyle={{ transform: transform(-1, 0.25) }}
                                isFocused={isFocused}
                            />
                        </View>
                        <Image source={{ uri: 'https://i.imgur.com/Y3IpqYm.png' }} style={PlannerElementsContainerItemAddIcon}></Image>
                        <Image source={{ uri: 'https://i.imgur.com/GMJ0Nm8.png' }} style={PlannerElementsContainerItemHeartIcon}></Image>
                    </View>
                    {/* <Image resizeMode="contain" source={{uri: 'https://i.imgur.com/1n4MJii.png'}} style={{position: 'absolute', left: 0, right: 0, top: 0, height: '100%', width: '100%', opacity: 0.75, flex: 1, backgroundColor: 'transparent'  }}/> */}
                </View>


            </View>

            
        </ScrollView>
        <CommonRectButton style={{ ...HomeEmptyPantryMessageButton, marginTop: 0, maxWidth: '90%', position: 'absolute', bottom: scale(57), left: scale(16), right: scale(16), alignSelf: 'center' }} onPress={() => { goToLoadScreen(); takePicture(); }}>
                            {/* Bitmap shadow */}
                            <Image resizeMode="stretch" source={{ uri: 'https://i.imgur.com/f9dSqZI.png' }} style={{ position: 'absolute', opacity: 1, flex: 1, left: scale(12 - 23), top: scale(7 - 23), bottom: scale(-7 - 23), right: scale(13 - 23), }} />
                            <Image resizeMode="stretch" style={{ position: 'absolute', opacity: 1, flex: 1, left: 0, top: 0, bottom: 0, right: 0, backgroundColor: '#FF8D51', borderRadius: scale(16), }} />
                            <PrerenderedText
                                style={HomeEmptyPantryMessageButtonLabel}
                                anchor="middle"
                                lines={['Select your choices']}
                                width={137}
                                height={18}
                                isFocused={isFocused}
                            />
                        </CommonRectButton>
    </SafeAreaView>
    {/* <RectButton onPress={goToPlanning} style={PlannerCompleteActivityButton} >
            <PrerenderedText style={PlannerCompleteActivityButtonLabel} lines={[
                'Add (1) Recipes'
            ]}
                height={18}
                width={110}
            />
        </RectButton> */}

}

export const PlannerAddItems = ({isFocused = true}) => {
    const {
        PlannerElementsContainerItem,
        PlannerElementsContainerItemTitle,
        PlannerElementsContainerItemLabel,
        PlannerElementsContainerItemTimeContainer,
        PlannerElementsContainerItemTimeContainerIcon,
        PlannerElementsContainerItemTimeContainerLabel,
        PlannerElementsContainerItemHeartIcon,
        PlannerElementsContainerItemPicture,
        PlannerElementsContainerItemAddIcon,
    } = useComponentStyles('PlannerAdd');

    return <View style={PlannerElementsContainerItem} >
        {/* Bitmap shadow */}
        <Image resizeMode="stretch" source={{ uri: 'https://i.imgur.com/HQOyAiW.png' }} style={{ position: 'absolute', opacity: 1, flex: 1, left: scale(-12), top: scale(-12), bottom: scale(-12), right: scale(-12), }} />
        <Image resizeMode="stretch" style={{ position: 'absolute', opacity: 1, flex: 1, height: '100%', left: 0, top: 0, right: 0, backgroundColor: '#fff', borderRadius: scale(19), }} />

        <View style={PlannerElementsContainerItemPicture}></View>
        <View style={{
            position: 'relative', display: 'flex', flexDirection: 'column', paddingLeft: scale(18), paddingTop: scale(11), flex: 1
        }}>
            <PrerenderedText style={PlannerElementsContainerItemTitle}
                anchor="start"
                lines={['Upma']}
                width={50}
                height={24}
                viewStyle={{ transform: transform(-1, -0.75) }}
                isFocused={isFocused}
            />
            <PrerenderedText style={PlannerElementsContainerItemLabel}
                anchor="start"
                lines={['You have all ingredients']}
                width={120}
                height={15}
                viewStyle={{ transform: transform(-1.5, 0) }}
                isFocused={isFocused}
            />
            <View style={PlannerElementsContainerItemTimeContainer} >
                <Image source={{ uri: 'https://i.imgur.com/OSQceM4.png' }} style={PlannerElementsContainerItemTimeContainerIcon} />
                <PrerenderedText style={PlannerElementsContainerItemTimeContainerLabel}
                    anchor="start"
                    lines={['15Min']}
                    width={33}
                    height={18}
                    viewStyle={{ transform: transform(-1, 0.25) }}
                    isFocused={isFocused}
                />
            </View>
            <Image source={{ uri: 'https://i.imgur.com/Y3IpqYm.png' }} style={PlannerElementsContainerItemAddIcon}></Image>
            <Image source={{ uri: 'https://i.imgur.com/GMJ0Nm8.png' }} style={PlannerElementsContainerItemHeartIcon}></Image>
        </View>
        {/* <Image resizeMode="contain" source={{uri: 'https://i.imgur.com/1n4MJii.png'}} style={{position: 'absolute', left: 0, right: 0, top: 0, height: '100%', width: '100%', opacity: 0.75, flex: 1, backgroundColor: 'transparent'  }}/> */}
    </View>
}