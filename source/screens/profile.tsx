import { useComponentStyles } from "../providers/StyleProvider"
import PrerenderedText from "../abstract/PrerenderedTextView";
import { Image, View } from "react-native";
import { scale } from "../abstract/StyleProvider";
import { transform } from "../helpers/styleStringHelper";
import { useIsFocused } from "@react-navigation/native";

export const Profile = () => {
    const isFocused = true;

    // if (!isFocused) return null;
    const {
        ProfileComponent,
        ProfileTitleIcon,
        ProfileTitleSubIcon,
        ProfileHouseholdNameLabel,
        ProfileHouseholdIcon,
        ProfileAddMembersLabel,
        ProfileAddMembersIcon,
        ProfileHelpTipsContainer,
        ProfileHelpTipsContainerTitleRow,
        ProfileHelpTipsContainerTitleLabel,
        ProfileHelpTipsContainerTitleIcon,
        ProfileHelpTipsElement,
        ProfileHelpTipsElementIcon,
        ProfileHelpTipsElementLogoutIcon,
        ProfileHelpTipsElementLogoutLabel,
        ProfileHelpTipsElementChevronIcon,
        ProfileHelpTipsElementLabel,
    } = useComponentStyles('Profile');
    return <View style={ProfileComponent}>
        <View style={{ backgroundColor: '', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            

            <View style={{ ...ProfileTitleIcon, position: 'relative' }}>
                {/* Bitmap shadow */}
                <Image resizeMode="stretch" source={{ uri: 'https://i.imgur.com/MhnEi9L.png' }} style={{ position: 'absolute', opacity: 1, flex: 1, left: scale(-5), top: scale(-5), bottom: scale(-5), right: scale(-5), }} />
                {/* <Image resizeMode="stretch" style={{ position: 'absolute', opacity: 1, flex: 1, left: 0, top: 0, bottom: 0, right: 0, backgroundColor: '#fff', borderRadius: scale(50), }} /> */}
                <Image style={ProfileTitleIcon} source={{ uri: 'https://i.imgur.com/LthMtkp.png' }} />
            </View>
            <View style={ProfileTitleSubIcon}>
                {/* Bitmap shadow */}
                <Image resizeMode="stretch" source={{ uri: 'https://i.imgur.com/qOM691R.png' }} style={{ position: 'absolute', opacity: 1, flex: 1, left: scale(-11), top: scale(-11), bottom: scale(-11), right: scale(-11), }} />
                <Image resizeMode="stretch" style={{ position: 'absolute', opacity: 1, flex: 1, left: 0, top: 0, bottom: 0, right: 0, backgroundColor: '#fff', borderRadius: scale(14.5), }} />
                <Image source={{ uri: 'https://i.imgur.com/Hlj6bey.png' }} style={{ ...ProfileTitleSubIcon, margin: 0, transform: '' }} />
            </View>

            {/* <Image  resizeMode="contain" source={{uri:'https://i.imgur.com/VtA5QH8.png'}} style={{position:'absolute', opacity: 1, width: scale(86), height: scale(103), left: 0, top: 0, maxHeight: 103, maxWidth: 86}} /> */}
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center', gap: scale(4), marginBottom: scale(3.72), backgroundColor: '', position: 'relative' }}>
            <PrerenderedText
                style={ProfileHouseholdNameLabel}
                anchor="start"
                lines={['Household Name']}
                width={215}
                height={36}
                viewStyle={{ transform: transform(1, 1.25) }}
                hot={true}
                isFocused={isFocused}
            />
            <Image source={{ uri: 'https://i.imgur.com/k1Ih47T.png' }} style={{ ...ProfileHouseholdIcon, transform: transform(-2, 0) }} />
            {/* <Image resizeMode="contain" source={{ uri: 'https://i.imgur.com/uzucEDj.png' }} style={{ position: 'absolute', opacity: 0.5, width: scale(237), height: scale(36), left: 0, top: 0,  }} /> */}
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center', gap: scale(1.5), marginBottom: scale(27.28), backgroundColor: '', position: 'relative' }}>
            <Image source={{ uri: 'https://i.imgur.com/Wgg9e5u.png' }} style={{ ...ProfileAddMembersIcon, transform: transform(1, 0.25) }} />
            <PrerenderedText
                style={ProfileAddMembersLabel}
                anchor="start"
                lines={['Add members']}
                width={107}
                height={21}
                hot={true}
                viewStyle={{ transform: transform(-0.25, 1.75) }}
                isFocused={isFocused}
            />
            {/* <Image  resizeMode="contain" source={{uri:'https://i.imgur.com/F3SFOAh.png'}} style={{position:'absolute', opacity: 0.5, width: scale(122.5), height: scale(21), left: 0, top: 0, backgroundColor:''}} /> */}
        </View>
        <View style={{ ...ProfileHelpTipsContainer, position: 'relative' }} >
            {/* Bitmap shadow */}
            <Image resizeMode="stretch" source={{ uri: 'https://i.imgur.com/mu1a6VW.png' }} style={{ position: 'absolute', opacity: 1, flex: 1, left: scale(-10), top: scale(-10), bottom: scale(-10), right: scale(-10), }} />
            <Image resizeMode="stretch" style={{ position: 'absolute', opacity: 1, flex: 1, left: 0, top: 0, bottom: 0, right: 0, backgroundColor: '#fff', borderRadius: scale(19), }} />

            <View style={ProfileHelpTipsContainerTitleRow} >
                <Image resizeMode="stretch" source={{ uri: 'https://i.imgur.com/wMnThSQ.png' }} style={{ ...ProfileHelpTipsContainerTitleIcon, transform: transform(0.5, 2) }} />
                <PrerenderedText
                    style={ProfileHelpTipsContainerTitleLabel}
                    anchor="start"
                    lines={['Help & tips']}
                    width={87}
                    height={24}
                    viewStyle={{ transform: transform(1.5, 0) }}
                    isFocused={isFocused}
                />
            </View>
            <View style={ProfileHelpTipsElement} >
                <PrerenderedText
                    style={ProfileHelpTipsElementLabel}
                    anchor="start"
                    lines={['Watch tutorials']}
                    width={107}
                    height={21}
                    viewStyle={{ transform: transform(0, 2.75) }}
                    isFocused={isFocused}
                />
                <Image source={{ uri: 'https://i.imgur.com/NFZZ3Kp.png' }} style={ProfileHelpTipsElementIcon} />
            </View>
            {/* <Image  resizeMode="contain" source={{uri:'https://i.imgur.com/XjqztdZ.png'}} style={{position:'absolute', opacity: 0.5, width: scale(361), height: scale(113), left: 0, top: 0, backgroundColor:''}} /> */}
        </View>

        <View style={ProfileHelpTipsContainer} >
            {/* Bitmap shadow */}
            <Image resizeMode="stretch" source={{ uri: 'https://i.imgur.com/OS4Q9uY.png' }} style={{ position: 'absolute', opacity: 1, flex: 1, left: scale(-10), top: scale(-10), bottom: scale(-10), right: scale(-10), }} />
            <Image resizeMode="stretch" style={{ position: 'absolute', opacity: 1, flex: 1, left: 0, top: 0, bottom: 0, right: 0, backgroundColor: '#fff', borderRadius: scale(19), }} />

            <View style={ProfileHelpTipsContainerTitleRow} >
                <Image source={{ uri: 'https://i.imgur.com/BlT663p.png' }} style={{ ...ProfileHelpTipsContainerTitleIcon, transform: transform(0.5, 2) }} />
                <PrerenderedText
                    style={ProfileHelpTipsContainerTitleLabel}
                    anchor="start"
                    lines={['Settings']}
                    width={87}
                    height={24}
                    viewStyle={{ transform: transform(1.5, 0) }}
                    isFocused={isFocused}
                />
            </View>
            <View style={ProfileHelpTipsElement} >
                <PrerenderedText
                    style={ProfileHelpTipsElementLabel}
                    anchor="start"s
                    lines={['Expiry date reminders']}
                    width={152}
                    height={21}
                    isFocused={isFocused}
                />
                <Image source={{ uri: 'https://i.imgur.com/NFZZ3Kp.png' }} style={ProfileHelpTipsElementIcon} />
            </View>
            <View style={ProfileHelpTipsElement} >
                <PrerenderedText
                    style={ProfileHelpTipsElementLabel}
                    anchor="start"
                    lines={['About foodbuddie']}
                    width={152}
                    height={21}
                    isFocused={isFocused}
                />
                <Image source={{ uri: 'https://i.imgur.com/NFZZ3Kp.png' }} style={ProfileHelpTipsElementIcon} />
            </View>
            <View style={ProfileHelpTipsElement} >
                <PrerenderedText
                    style={ProfileHelpTipsElementLabel}
                    anchor="start"
                    lines={['Preferences']}
                    width={152}
                    height={21}
                    isFocused={isFocused}
                />
                <Image source={{ uri: 'https://i.imgur.com/NFZZ3Kp.png' }} style={ProfileHelpTipsElementIcon} />
            </View>
            <View style={ProfileHelpTipsElement} >
                <PrerenderedText
                    style={ProfileHelpTipsElementLogoutLabel}
                    anchor="start"
                    lines={['Logout']}
                    width={152}
                    height={21}
                    isFocused={isFocused}
                />
                <Image source={{ uri: 'https://i.imgur.com/GGko0GO.png' }} style={ProfileHelpTipsElementIcon} />
            </View>
        </View>

    </View>
}