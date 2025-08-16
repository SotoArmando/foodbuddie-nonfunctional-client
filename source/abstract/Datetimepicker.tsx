import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { View, Pressable, Image } from 'react-native';

import { useComponentStyles } from '../providers/StyleProvider';
import PrerenderedText from './PrerenderedTextView';
import { transform } from '../helpers/styleStringHelper';
import { RectButton } from 'react-native-gesture-handler';
import { CommonRectButton } from '../components/CommonRectButton';

const useCircularTimePicker = () => {
    const [date, setDate] = useState(new Date(1598051730000));

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            design: 'default',
            mode: currentMode,
            is24Hour: false,
        });
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return { showDatepicker, showTimepicker, date: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) }
};

const TimePickerFieldValue = ({ value }: { value: string }) => {
    const {
        TimePickerFieldLabel,
    } = useComponentStyles('Preferences1')

    return <PrerenderedText
        style={TimePickerFieldLabel}
        width={150}
        anchor="start"
        height={21}
        lines={[value]}
        quality={0.8}
        // viewStyle={{transform: transform(0, 0)}}
    />
}

export const TimePickerField = ({ title }: { title: string }) => {
    const {
        TimePickerField,
        TimePickerFieldIcon,
        TimePickerFieldTitle,
        TimePickerFieldContainer,
        TimePickerFieldTitleContainer
    } = useComponentStyles('Preferences1')

    const {
        showTimepicker, date
    } = useCircularTimePicker();

    return <CommonRectButton onPress={showTimepicker}>
        <View style={{...TimePickerFieldContainer, position: 'relative', backgroundColor: ''}}>
            <View style={TimePickerFieldTitleContainer} >
                <PrerenderedText
                    style={TimePickerFieldTitle}
                    width={150}
                    anchor="start"
                    height={21}
                    lines={[title]}
                    quality={0.8}
                    viewStyle={{transform: transform(0, 3)}}
                />
            </View>

            <View style={TimePickerField}>
                <TimePickerFieldValue value={date} />
                <Image source={{ uri: 'https://i.imgur.com/1FZX94n.png' }} style={TimePickerFieldIcon} />
            </View>
            {/* <Image resizeMode="contain" source={{uri: 'https://i.imgur.com/l0ynLy9.png'}} style={{position: 'absolute', left: 0, right: 0, top: 0, height: '100%', width: '100%', opacity: 0.5, flex: 1,  }}/> */}
        </View>
    </CommonRectButton>
}



export default TimePickerField;
