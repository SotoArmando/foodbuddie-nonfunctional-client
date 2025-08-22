import { Image, ImageBackground, Pressable, Text, View } from "react-native"
import { useMemo, useState } from "react"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { RectButton } from "react-native-gesture-handler"
import { useComponentStyles } from "../../../providers/StyleProvider"
import { useScreenRoutes } from "../../../providers/NavigationProvider"
import { scale } from "../../../abstract/StyleProvider"
import PrerenderedText from "../../../abstract/PrerenderedTextView"
import { transform } from "../../../helpers/styleStringHelper"
import { CommonRectButton } from "../../../components/CommonRectButton"

const OnboardingPhaseDisplayItemComponent = ({ active = false }) => {
    const {
        OnboardingPhaseDisplayItem,
    } = useComponentStyles('Onboarding')
    return <View style={[OnboardingPhaseDisplayItem, { width: active ? 50 : 10, backgroundColor: active ? '#F09C33' : '#EBEFF1' }]}></View>
}

const useOnboardingPage = () => {
    const [currentPage, setPage] = useState(0);

    const navigation = useNavigation();
    const { goToSignUp } = useScreenRoutes();
    const pages = [
        {
            screener: 'https://i.imgur.com/HWgG55z.png',
            title: 'Intelligent Meal Planner',
            lines: ['Plan your meals for the week with personalized', 'suggestions and easy-to-follow recipes.']
        },
        {
            screener: 'https://i.imgur.com/JyZQQm0.png',
            title: 'Real-Time Inventory Tracker',
            lines: ['Keep track of your grocery items and receive', 'alerts before they expire.']
        },
        {
            screener: 'https://i.imgur.com/PDk1aLH.png',
            title: 'Leftover Optimizer',
            lines: ['Get creative recipes to use up leftovers and', 'reduce food waste.']
        },
    ]
    const goToNext = () => {
        console.log("currentPage",currentPage);
        if (currentPage > 1) {
            goToSignUp();
        } else {
            setPage((page) => (page + 1) % 3);
        }
    }

    return { currentPage, goToNext, pages }
}

export const Onboarding = () => {

    const {
        OnboardingComponent,
        OnboardingScreener,
        OnboardingTitle,
        OnboardingDescription,
        OnboardingPhaseDisplay,
        OnboardingMenu,
        OnboardingMenu1,
        OnboardingMenu1Label,
        OnboardingMenuSkip,
        OnboardingMenuNext,
        OnboardingComponentSibling
    } = useComponentStyles('Onboarding')

    const { currentPage, goToNext, pages } = useOnboardingPage();

    const onboardingPages = pages.map(({ screener, title, lines }, page_i) => {
        const display = currentPage === page_i ? 'flex' : 'none';
        return <>
            <ImageBackground
                style={[OnboardingScreener, { display, height: scale([326, 326, 326][currentPage]) }]}
                source={{
                    uri: screener, // Replace with any URL
                }}
                imageStyle={{
                    maxHeight: scale([347, 308.86, 294.05][currentPage]),
                    maxWidth: '100%'
                }}
                resizeMode="contain"
            />
            <View style={[{ marginTop: scale([-4, -4, -4][currentPage]), display: display }]} />
            <PrerenderedText
                style={{ ...OnboardingTitle, display }}
                width={325}
                anchor="middle"
                height={27}
                lines={[title]}
                viewStyle={{ "transform": transform(10.9, -0.1) }}
            />
            <View style={{ marginTop: scale(currentPage > 0 ? 13.5 : 12), display }} />
            {lines.map(e => <PrerenderedText
                style={{ ...OnboardingDescription, display }}
                width={339}
                anchor="middle"
                height={18}
                lines={[e]}
                viewStyle={{ "transform": transform(4.5, 0.5) }}
            />)}
            <View style={{ marginBottom: scale(currentPage > 0 ? 59.21 : 61), display }}></View>
        </>
    });

    const isFocused = useIsFocused();

    // if (!isFocused) return null;

    return <View style={OnboardingComponent}>
        <View style={OnboardingComponentSibling}>
            <View style={{ backgroundColor: '', position: 'relative' }}>
                {
                    onboardingPages
                }
                {/* <Image source={{uri: 'https://i.imgur.com/h5Znw6N.png'}} style={{position: 'absolute', left: 0, top: 0, height: '100%', width: '100%', opacity: 0.5, }}/> */}
            </View>

            <View style={OnboardingPhaseDisplay}>
                <OnboardingPhaseDisplayItemComponent active={currentPage === 0} />
                <OnboardingPhaseDisplayItemComponent active={currentPage === 1} />
                <OnboardingPhaseDisplayItemComponent active={currentPage === 2} />
            </View>
        </View>
        <View style={[OnboardingMenu, { display: currentPage !== 2 ? 'flex' : 'none' }]}>
            <PrerenderedText
                style={OnboardingMenuSkip}
                width={35}
                anchor="start"
                height={18}
                lines={[currentPage > 0 ? 'Back' : 'Skip']}
            />
            <CommonRectButton android_ripple={null} onPress={goToNext}>

                <View pointerEvents="none" style={OnboardingMenuNext}>
                    {/* Bitmap shadow */}
                    <Image resizeMode="stretch" source={{ uri: 'https://i.imgur.com/oqJXQFs.png' }} style={{ position: 'absolute', opacity: 1, flex: 1, left: scale(-46), top: scale(-44), bottom: scale(-48), right: scale(-46), }} />
                    <Image source={{
                        uri: 'https://i.imgur.com/pRuBUBk.png', // Replace with any URL
                    }} resizeMode="stretch" style={{ position: 'absolute', opacity: 1, flex: 1, left: 0, top: 0, bottom: 0, right: 0, backgroundColor: '#FF8D51', borderRadius: scale(29), }} />
                </View>
            </CommonRectButton>
        </View>

        <CommonRectButton onPress={goToNext} style={[OnboardingMenu1, { display: currentPage === 2 ? 'flex' : 'none' }]}>
            {/* Bitmap shadow */}
            <Image resizeMode="stretch" source={{ uri: 'https://i.imgur.com/f9dSqZI.png' }} style={{ position: 'absolute', opacity: 1, flex: 1, left: scale(12 - 17), top: scale(7 - 17), bottom: scale(-7 - 17), right: scale(13 - 17), }} />
            <Image resizeMode="stretch" style={{ position: 'absolute', opacity: 1, flex: 1, left: 0, top: 0, bottom: 0, right: 0, backgroundColor: '#FF8D51', borderRadius: scale(16), }} />
            <PrerenderedText
                style={OnboardingMenu1Label}
                width={80}
                anchor="middle"
                height={21}
                lines={['Get started']}
            />
        </CommonRectButton>

    </View>
}