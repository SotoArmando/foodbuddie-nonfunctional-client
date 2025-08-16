import { Image, Switch, Pressable, View } from "react-native";
import { useComponentStyles } from "../providers/StyleProvider";
import PrerenderedText from "../abstract/PrerenderedTextView";
import { useState } from "react";
import { scale } from "../abstract/StyleProvider";
import { TimePickerField } from "../abstract/Datetimepicker";
import { preferences_icons } from "../abstract/Preferences";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { transform } from "../helpers/styleStringHelper";
import { useScreenRoutes } from "../providers/NavigationProvider";
import { RectButton } from "react-native-gesture-handler";
import { CommonRectButton } from "../components/CommonRectButton";

const usePreferencesStage = () => {


    const [currentStage, setCurrentStage] = useState(0);
    const [selected, setSelected] = useState([]);
    const navigation = useNavigation();
    const { goToAllSet } = useScreenRoutes();
    const goAllSet = () => {
        goToAllSet();
    }

    const stages = [
        {
            title: ["Choose Your Dietary", "Preference"],
            subtitle: "Select your preference from various dietary styles.",
            options: [
                ['Vegan', 'Vegetarian'],
                ['Non-vegetarian', 'Eggetarian'],
                ['Jain', 'Pescatarian'],
                ['Other'],
            ]
        },
        {
            title: ["Tell Us About Your", "Allergies"],
            subtitle: "Stay safe by informing us about your allergies",
            options: [
                ['Peanut', 'Dairy'],
                ['Gluten', 'Soy/Soybean'],
                ['Seafood', 'Pulses/Legume'],
                ['Other', 'None'],
            ]
        },
        {
            title: ["Take Care of Your Health"],
            subtitle: "Select your medical condition for a healthy lifestyle",
            options: [
                ['Diabetes', 'Blood Presure (BP)'],
                ['Heart Disease', 'Thyroid'],
                ['Obesity', 'High Cholesterol'],
                ['Other', 'None'],
            ]
        },
        {
            title: ["Set Your Meal Schedule"],
            subtitle: "Choose your meal timings that fit your daily life",
            options: [
                // ['Diabetes', 'Blood Presure (BP)'],
                // ['Heart Disease', 'Thyroid'],
                // ['Obesity', 'High Cholesterol'],
                // ['Other', 'None'],
            ]
        },
    ]

    const goNext = () => {

        setCurrentStage(currentStage => {
            if (currentStage === 3) {
                goAllSet();
                return currentStage;
            }
            return (currentStage + 1) % 4
        });
    }

    const goPrev = () => {
        setCurrentStage((currentStage) => {

            let s = (currentStage - 1) % 4;
            if (s <= 0) {
                return 0;
            }
            return s;
        });
    }

    const addOrRemove = (arr, item) => arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item];

    const Select = (name) => {
        setSelected((s) => {
            const r = addOrRemove(s, name);
            return r;
        });
    }

    return {
        stages,
        currentStage,
        selected,
        Select,
        goNext,
        goPrev
    }
};

const useSwitchPreference = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return { isEnabled, toggleSwitch }
}

const PreferenceOptionCommon = (props) => {
    const { label, enableIcon, selected, Select } = props;
    const {
        PreferencesButtonCommon,
        PreferencesButtonCommonSelected,
        PreferencesButtonCommonSelectedLabel,
        PreferencesButtonCommonLabel,
        PreferencesButtonCommonIcon,
        PreferencesButtonCommonLabelContainer,
        PreferencesButtonCommonLabelContainerNoIcon
    } = useComponentStyles('Preferences1');

    return label &&
        <CommonRectButton key={label + `_${selected && 's'}`} style={{ ...(selected ? PreferencesButtonCommonSelected : PreferencesButtonCommon), transform: transform(0, 6) }} onPressIn={() => Select(label)}>
            {
                enableIcon && <Image style={{ ...PreferencesButtonCommonIcon as any, tintColor: selected ? '#fff' : 'background: #02733E', transform: transform(-1.5, 0) }}
                    source={{ uri: preferences_icons[label] }}
                    resizeMode="contain"
                />
            }
            <View style={enableIcon ? PreferencesButtonCommonLabelContainer : PreferencesButtonCommonLabelContainerNoIcon} >
                <PrerenderedText
                    style={selected ? PreferencesButtonCommonSelectedLabel : PreferencesButtonCommonLabel}
                    width={selected ? 139 : 140}
                    anchor="start"
                    height={20}
                    lines={[label]}

                    viewStyle={{ transform: transform(-1.5, 1) }}
                />
            </View>
        </CommonRectButton>
}

const PreferenceStage = (props) => {
    const { title, subtitle, stage_i, options } = props;
    const {
        selected,
        Select,
    } = usePreferencesStage();

    const {
        PreferencesTitle,
        PreferencesSubtitle,
        PreferencesSubtitleContainer,
        PreferencesButtonCommonContainer,
    } = useComponentStyles('Preferences1');

    return <>
        <PrerenderedText
            style={PreferencesTitle}
            width={301}
            anchor="start"
            height={title.length * 31}
            lines={title}
            viewStyle={{ transform: transform(0, 4) }}
        />
        <View style={{ paddingTop: scale(8) }} />
        <View style={PreferencesSubtitleContainer}>
            <PrerenderedText
                style={PreferencesSubtitle}
                width={350}
                anchor="start"
                height={18}
                lines={[subtitle]}
                quality={3}
                viewStyle={{ transform: transform(-2, 6) }}
            />
        </View>
        <View style={{ marginBottom: scale(stage_i === 3 ? 20 : 34) }} />
        {stage_i >= 2 && <View style={{ display: stage_i === 3 ? 'flex' : 'none' }}>
            <TimePickerField title="Breakfast" />
            <TimePickerField title="Lunch" />
            <TimePickerField title="Dinner" />
        </View>}
        {
            options.map((labels: string[], index: number) => (labels[0]) && <View style={{ ...PreferencesButtonCommonContainer, transform: (options.length === index + 1) ? transform(0, 4) : '' }}>
                {
                    labels.map(label =>
                        <PreferenceOptionCommon key={label + (selected.includes(label) && '_true')} {...{ label, enableIcon: stage_i !== 2, selected: selected.includes(label), Select }} />
                    )
                }
            </View>)
        }
    </>
}
const pressableRippleConfig = { color: '#FF7C36', borderless: false, radius: 200 };


export const Preferences = () => {
    const { isEnabled, toggleSwitch } = useSwitchPreference();
    const {
        stages,
        currentStage,
        goNext,
        goPrev
    } = usePreferencesStage();

    const {
        Preferences1Complement,
        ProgressBar,
        ProgressBarSibling,
        ProgressBarSiblingChild,
        ProgressBarLabelLeft,
        ProgressBarLabelRight,
        ProgressBarLabelBackbutton,
        Preferences1RowSibling,
        PreferencesNextButton,
        ProgressBarLabelContainer,
        PreferencesNextButtonPressable,
        PreferencesNextButtonLabel,
    } = useComponentStyles('Preferences1');

    const stagesComponents = stages.map(({ title, subtitle, options }, stage_i) => {
        const display = currentStage === stage_i ? 'flex' : 'none';
        return <View key={'stages_' + stage_i} style={{ display }} >
            <PreferenceStage {...{ stage_i, subtitle, options, title }} />
        </View>
    });

    const isFocused = useIsFocused();

    // if (!isFocused) return null;

    return <View style={Preferences1Complement}>
        <View style={{ position: 'relative', backgroundColor: '' }}>
            <View style={{ ...ProgressBar, transform: transform(5.5, 6) }}>
                <CommonRectButton hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }} onPress={goPrev}>
                    <Image style={ProgressBarLabelBackbutton as any}
                        source={{ uri: currentStage > 0 ? 'https://i.imgur.com/Fos2BiZ.png' : '' }}
                        resizeMode="contain"
                    />
                </CommonRectButton>

                <View style={Preferences1RowSibling} >
                    <View style={ProgressBarLabelContainer} >
                        <PrerenderedText
                            style={ProgressBarLabelLeft}
                            width={22}
                            anchor="start"
                            height={21}
                            lines={['0' + (currentStage + 1)]}
                        />
                    </View>

                    <View style={{ width: scale(2) }} />
                    <View style={ProgressBarSibling}>
                        <View style={{ ...ProgressBarSiblingChild, width: [scale(52), scale(104), scale(156), '100%'][currentStage] }} />
                    </View>
                    <View style={{ width: scale(3) }} />
                    <View style={ProgressBarLabelContainer} >
                        <PrerenderedText
                            style={ProgressBarLabelRight}
                            width={22}
                            anchor="start"
                            height={21}
                            lines={['04']}
                            viewStyle={{ transform: transform(6, 0) }}
                        />
                    </View>

                </View>
                <View style={ProgressBarLabelBackbutton} />
            </View>
            {stagesComponents[currentStage]}
            {stagesComponents[(currentStage + 1) % 4]}
            {/* <Image resizeMode="contain" source={{uri: 'https://i.imgur.com/grzTYb4.png'}} style={{position: 'absolute', left: 0, right: 0, top: 0, height: '100%', width: '100%', opacity: 0.5, flex: 1,  }}/> */}
        </View>
        {/* <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
        /> */}
        <View style={PreferencesNextButton}>
            {/* Bitmap shadow */}
            <Image resizeMode="stretch" source={{ uri: 'https://i.imgur.com/f9dSqZI.png' }} style={{ position: 'absolute', opacity: 1, flex: 1, left: scale(12 - 17), top: scale(7 - 17), bottom: scale(-7 - 17), right: scale(13 - 17), }} />
            <Image resizeMode="stretch" style={{ position: 'absolute', opacity: 1, flex: 1, left: 0, top: 0, bottom: 0, right: 0, backgroundColor: '#FF8D51', borderRadius: scale(15), }} />
            
            <CommonRectButton android_ripple={pressableRippleConfig} onPress={goNext} style={PreferencesNextButtonPressable}>

                <PrerenderedText
                    style={PreferencesNextButtonLabel}
                    width={111}
                    anchor="middle"
                    height={18}
                    lines={[currentStage === 3 ? 'Set preferences' : 'Next']}
                />
            </CommonRectButton>
        </View>
    </View>
};