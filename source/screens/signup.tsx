import { Image, Pressable, View } from "react-native"
import { useComponentStyles } from "../providers/StyleProvider"
import PrerenderedText from "../abstract/PrerenderedTextView"
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { transform } from "../helpers/styleStringHelper";
import { useScreenRoutes } from "../providers/NavigationProvider";
import { RectButton } from "react-native-gesture-handler";
import { CommonRectButton } from "../components/CommonRectButton";
const usePreferencesScreen = () => {
    const {goToPreferences} = useScreenRoutes();

    const travel = () => {
        goToPreferences();
    }

    return { travel }
}

export const SignUp = () => {
   
    const { travel } = usePreferencesScreen();
    const {
        SignUpComplement,
        SignUpTitle,
        SignUpSubTitle,
        SignUpScreener,
        SignUpSocialButton,
        SignUpSocialButtonLabel,
        SignUpSocialButtonIcon,
        SignUpAgreementLabel,
        SignUpAgreementLabelMedium,
        SignUpComplementRowSibling
    } = useComponentStyles('SignUp')

    const isFocused = useIsFocused();
    
    // if (!isFocused) return null;

    return <View style={SignUpComplement}>
        <View style={{ position: 'relative' }}>
            <View style={SignUpComplementRowSibling}>
                <PrerenderedText
                    style={SignUpTitle}
                    width={146}
                    anchor="start"
                    height={36}
                    lines={['Welcome to']}
                />
                
                <PrerenderedText
                    style={{ ...SignUpTitle, color: "#333333" }}
                    width={168}
                    anchor="start"
                    height={36}
                    lines={['BhojanBuddy']}
                    viewStyle={{transform: transform(6,0)}}
                />
            </View>
            <PrerenderedText
                style={SignUpSubTitle}
                width={311}
                anchor="start"
                height={21}
                lines={['Empowering Sustainable Food Management']}
                viewStyle={{transform: transform(-3,1)}}
            />
            <Image
                source={{ uri: "https://i.imgur.com/7ogwAaf.png" }}
                resizeMode="contain"
                style={SignUpScreener as any} />
            {/* <Image source={{ uri: 'https://i.imgur.com/J0QwsdY.png' }} style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '100%', opacity: 0.5, }} /> */}
        </View>
        <View style={{ ...SignUpSocialButton, position: 'relative' }} >
            <Image
                source={{ uri: "https://i.imgur.com/CCyr3qw.png" }}
                resizeMode="contain"
                style={{ ...SignUpSocialButtonIcon as any }}
                
            />
            <PrerenderedText
                style={SignUpSocialButtonLabel}
                width={152}
                anchor="middle"
                height={18}
                lines={['Continue with Google']}
                viewStyle={{ transform: transform(-0.5, 1.5) }}
            />
            <View style={SignUpSocialButtonIcon} />
            {/* <Image source={{uri: 'https://i.imgur.com/MuZd5zW.jpeg'}} style={{position: 'absolute', left: 0, right: 0, top: 0, height: '100%', width: '100%', opacity: 0.1, flex: 1 }}/> */}
        </View>
        <View style={SignUpSocialButton} >
            <Image
                source={{ uri: "https://i.imgur.com/TohykMB.png" }}
                resizeMode="contain"
                style={SignUpSocialButtonIcon as any} />
            <PrerenderedText
                style={SignUpSocialButtonLabel}
                width={171}
                anchor="middle"
                height={18}
                lines={['Continue with Facebook']}
                viewStyle={{ transform: transform(-0.5, 1.5) }}
            />
            <View style={SignUpSocialButtonIcon} />
        </View>
        <View style={SignUpSocialButton} >
            <Image
                source={{ uri: "https://i.imgur.com/iUHjP0D.png" }}
                resizeMode="contain"
                style={SignUpSocialButtonIcon as any} />
            <PrerenderedText
                style={SignUpSocialButtonLabel}
                width={200}
                anchor="middle"
                height={18}
                lines={['Continue with Apple ID']}
                viewStyle={{ transform: transform(-0.5, 1.5) }}
            />
            <View style={SignUpSocialButtonIcon} />
        </View>
        <CommonRectButton onPress={travel} style={SignUpSocialButton} >
            <Image
                source={{ uri: "https://i.imgur.com/P5dDIza.png" }}
                resizeMode="contain"
                style={SignUpSocialButtonIcon as any} />
            <PrerenderedText
                style={SignUpSocialButtonLabel}
                width={144}
                anchor="middle"
                height={18}
                lines={['Continue as a Guest']}
                viewStyle={{ transform: transform(-0.5, 1.5) }}
            />
            <View style={SignUpSocialButtonIcon} />
        </CommonRectButton>
        <View style={SignUpComplementRowSibling}>
            <PrerenderedText
                style={SignUpAgreementLabel}
                width={139}
                anchor="middle"
                height={15}
                lines={['By continuing, I agree to the']}
            />
            <View style={{ marginLeft: 1.49 }} />
            <PrerenderedText
                style={SignUpAgreementLabelMedium}
                width={102}
                anchor="middle"
                height={15}
                lines={[' Terms & Conditions']}
                textDecoration="underline"
            />
            <View style={{ marginLeft: 1 }} />
            <PrerenderedText
                style={SignUpAgreementLabel}
                width={23}
                anchor="middle"
                height={15}
                lines={[' and']}
            />
            <View style={{ marginLeft: 1.49 }} />
            <PrerenderedText
                style={SignUpAgreementLabelMedium}
                width={72}
                anchor="middle"
                height={15}
                lines={[' Privacy Policy']}
                textDecoration="underline"
            />
        </View>

    </View>
}