import { SafeAreaView } from "react-native-safe-area-context";
import { useComponentStyles } from "../providers/StyleProvider"
import { Image, View } from "react-native";
import PrerenderedText from "../abstract/PrerenderedTextView";
import { useScreenRoutes } from "../providers/NavigationProvider";
import { RectButton } from "react-native-gesture-handler";
import { scale } from "../abstract/StyleProvider";
import { CommonRectButton } from "../components/CommonRectButton";
export const EntryFieldInput = (props) => {
    const { fieldname, placeholder, chevronIcon, calendarIcon, type, text, isFocused = true } = props;
    const {
        AddManuallyIngredientScreenComponentFieldContainer,
        AddManuallyIngredientScreenComponentFieldContainerLabel,
        AddManuallyIngredientScreenComponentFieldContainerLabelRed,
        AddManuallyIngredientScreenComponentFieldContainerEntry,
        AddManuallyIngredientScreenComponentFieldContainerChevronIcon,
        AddManuallyIngredientScreenComponentFieldContainerCalendarIcon,
        AddManuallyIngredientScreenComponentFieldContainerEntryTextPlaceholder,
        AddManuallyIngredientScreenComponentFieldContainerEntryText,
    } = useComponentStyles('AddManuallyIngredientScreen');
    return <View style={AddManuallyIngredientScreenComponentFieldContainer} >
        <PrerenderedText lines={[fieldname]} style={AddManuallyIngredientScreenComponentFieldContainerLabel}  isFocused={isFocused}/>
        <View style={AddManuallyIngredientScreenComponentFieldContainerEntry} >
            <PrerenderedText lines={[text || placeholder]} style={text ? AddManuallyIngredientScreenComponentFieldContainerEntryText : AddManuallyIngredientScreenComponentFieldContainerEntryTextPlaceholder} isFocused={isFocused} />
            {chevronIcon && <Image source={{uri: 'https://i.imgur.com/fwblGNO.png'}} style={AddManuallyIngredientScreenComponentFieldContainerChevronIcon} />}
        {calendarIcon && <Image source={{uri: 'https://i.imgur.com/vhhaadE.png'}} style={AddManuallyIngredientScreenComponentFieldContainerCalendarIcon} />}
        </View>
        
    </View>
}


const UnitEntry = {
    fieldname: 'Unit*',
    placeholder: 'Select unit',
    chevronIcon: true
}

const PurchaseEntry = {
    fieldname: 'Purchase Date',
    placeholder: 'dd/mm/yyyy',
    calendarIcon: true
}

const ExpirationEntry = {
    fieldname: 'Expiration Date',
    placeholder: 'dd/mm/yyyy',
    calendarIcon: true
}

const ItemNameEntry = (params) => ({
    fieldname: 'Item name*',
    placeholder: 'e.g., Apple, Rice',
    text: params?.name,
})

const CategoryEntry = (params) => ({
    fieldname: 'Category*',
    placeholder: 'Select category',
    text: params?.type,
    chevronIcon: true
})

const QuantityEntry = (params) => ({
    fieldname: 'Quantity*',
    placeholder: 'e.g., 4pcs, 2lits',
    text: params?.count,
})

export const AddManuallyIngredientScreen = ({ params, isFocused = true }) => {
    const {
        AddManuallyIngredientScreenComponent,
        AddManuallyIngredientScreenComponentRowSeparator
    } = useComponentStyles('AddManuallyIngredientScreen');
    const {
        HomeEmptyPantryMessageButton,
        HomeEmptyPantryMessageButtonLabel,
    } = useComponentStyles('Home');
    return <>
        <View style={AddManuallyIngredientScreenComponent}>
            <EntryFieldInput {...ItemNameEntry(params)}  isFocused={isFocused}/>
            <EntryFieldInput {...CategoryEntry(params)}  isFocused={isFocused}/>

            <View style={AddManuallyIngredientScreenComponentRowSeparator}>
                <EntryFieldInput {...QuantityEntry(params)} isFocused={isFocused} />
                <EntryFieldInput {...UnitEntry} isFocused={isFocused} />
            </View>
            <EntryFieldInput {...PurchaseEntry} isFocused={isFocused} />
            <EntryFieldInput {...ExpirationEntry} isFocused={isFocused} />

            <CommonRectButton style={{ ...HomeEmptyPantryMessageButton, marginTop: 0, position: 'absolute', bottom: scale(57), left: scale(16), right: scale(16), alignSelf: 'center' }} onPress={() => { goToLoadScreen(); takePicture(); }}>
                {/* Bitmap shadow */}
                <Image resizeMode="stretch" source={{ uri: 'https://i.imgur.com/f9dSqZI.png' }} style={{ position: 'absolute', opacity: 1, flex: 1, left: scale(12 - 23), top: scale(7 - 23), bottom: scale(-7 - 23), right: scale(13 - 23), }} />
                <Image resizeMode="stretch" style={{ position: 'absolute', opacity: 1, flex: 1, left: 0, top: 0, bottom: 0, right: 0, backgroundColor: '#FF8D51', borderRadius: scale(16), }} />
                <PrerenderedText
                    style={HomeEmptyPantryMessageButtonLabel}
                    anchor="middle"
                    lines={['Add item']}
                    width={125}
                    height={18}
                    isFocused={isFocused}
                />
            </CommonRectButton>
        </View>
    </>
}