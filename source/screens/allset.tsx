import { Image, Pressable, View } from "react-native";
import { useComponentStyles } from "../providers/StyleProvider"
import { useIsFocused, useNavigation } from "@react-navigation/native";
import PrerenderedText from "../abstract/PrerenderedTextView";
import { useSession } from "../providers/SessionProvider";
import { useScreenRoutes } from "../providers/NavigationProvider";
import { scale } from "../abstract/StyleProvider";
import { RectButton } from "react-native-gesture-handler";
import { CommonRectButton } from "../components/CommonRectButton";

const pressableRippleConfig = { color: '#FF7C36', borderless: false, radius: 200 };

export const AllSet = () => {
    const { updateSession } = useSession();
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

    const { goToHome } = useScreenRoutes();

    const handleButtonClick = () => {
        updateSession(true);
        goToHome();
    };

    const isFocused = useIsFocused();

    // if (!isFocused) return null;

    return <View style={AllSetComponent}>
        <View style={AllSetComponentColSibling}>
            <View style={AllSetComponentColCommonSibling}>
                <Image resizeMode="contain"
                    source={{ uri: "https://i.imgur.com/SQQk8G0.png" }}
                    style={AllSetScreener as any} />
                <PrerenderedText
                    style={AllSetTitle}
                    width={328}
                    anchor="middle"
                    height={31}
                    lines={['You are all set!']}
                />
                <View style={AllSetIntroductionMargin} />
                <PrerenderedText
                    style={AllSetIntroduction}
                    width={340}
                    anchor="middle"
                    height={42}
                    lines={['Start planning your meals and managing your', ' inventory now.']}
                />
            </View>
            <View style={AllSetButtonsContainer}>
                <View style={AllSetButtonCommon}>
                    {/* Bitmap shadow */}
                    <Image resizeMode="stretch" source={{ uri: 'https://i.imgur.com/V7pnN7u.png' }} style={{ position: 'absolute', opacity: 1, flex: 1, left: scale(12 - 23), top: scale(7 - 23), bottom: scale(-7 - 23), right: scale(13 - 23), }} />
                    <Image resizeMode="stretch" style={{
                        position: 'absolute', opacity: 1, flex: 1, left: 0, top: 0, bottom: 0, right: 0, backgroundColor: '#FFFFFF', borderRadius: scale(15), borderWidth: 1,
                        borderColor: "#02733E",
                    }} />

                    <CommonRectButton style={AllSetButtonCommonContainer} android_ripple={pressableRippleConfig} >
                        <PrerenderedText
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

                    <CommonRectButton android_ripple={pressableRippleConfig} style={AllSetButtonCommonContainer} onPress={handleButtonClick}>

                        <PrerenderedText
                            style={AllSetButtonCallLabel}
                            width={101}
                            anchor="middle"
                            height={18}
                            lines={['Start planning']}
                        />
                    </CommonRectButton>
                </View>
            </View>
        </View>
    </View>
}