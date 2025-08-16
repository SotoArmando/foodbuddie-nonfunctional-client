import { StyleSheet, TextStyle, ViewStyle, ImageStyle, PixelRatio } from 'react-native';
import { SearchScreen } from '../../screens/searchscreen';
import { PrerenderedTextStyle } from './ScannerScreen';

export type AddManuallyIngredientScreen = {
    AddManuallyIngredientScreenComponent: ViewStyle,
    AddManuallyIngredientScreenComponentRowSeparator: ViewStyle,
    AddManuallyIngredientScreenComponentFieldContainer: ViewStyle,
    AddManuallyIngredientScreenComponentFieldContainerLabel: PrerenderedTextStyle,
    AddManuallyIngredientScreenComponentFieldContainerLabelRed: PrerenderedTextStyle,
    AddManuallyIngredientScreenComponentFieldContainerEntry: ViewStyle,
    AddManuallyIngredientScreenComponentFieldContainerChevronIcon: ViewStyle,
    AddManuallyIngredientScreenComponentFieldContainerCalendarIcon: ViewStyle,
    AddManuallyIngredientScreenComponentFieldContainerEntryTextPlaceholder: PrerenderedTextStyle,
    AddManuallyIngredientScreenComponentFieldContainerEntryText: PrerenderedTextStyle,
}

export const AddManuallyIngredientScreenStyle: AddManuallyIngredientScreen = {
    AddManuallyIngredientScreenComponent: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        backgroundColor: '#FDFEF4',
        marginHorizontal: -16,
        paddingHorizontal: 16,
        minHeight: 600,
        paddingTop: 22
    },
    AddManuallyIngredientScreenComponentRowSeparator: {
        display: 'flex',
        flexDirection: 'row',
        gap: 12,
        
    },

    AddManuallyIngredientScreenComponentFieldContainer: {
        gap: 6,
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 10,
        flex: 1,
        height: 80,
        maxHeight: 80,
        minHeight: 80,
    },
    AddManuallyIngredientScreenComponentFieldContainerLabel: {
        width: 110,
        anchor: 'start',
        height: 18,
        fontSize: 12,
        lineHeight: 18,
        fontFamily: 'Poppins',
        fontWeight: 400,
        color: "#333333"
    },
    AddManuallyIngredientScreenComponentFieldContainerLabelRed: {
        width: 110,
        anchor: 'start',
        height: 18,
        fontSize: 12,
        lineHeight: 18,
        fontFamily: 'Poppins',
        fontWeight: 400,
        color: "#DC2626"
    },
    AddManuallyIngredientScreenComponentFieldContainerEntry: {
        width: '100%',
        
        backgroundColor: "#F0F2F8",
        paddingLeft: 10,
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        height: 56,
        marginLeft: -10,
        borderRadius: 14,
    },
    AddManuallyIngredientScreenComponentFieldContainerEntryText: {
        width: 100,
        anchor: 'start',
        height: 21,
        fontSize: 14,
        lineHeight: 21,
        fontFamily: 'Poppins',
        fontWeight: 400,
        color: "#000000"
    },
    AddManuallyIngredientScreenComponentFieldContainerEntryTextPlaceholder: {
        width: 110,
        anchor: 'start',
        height: 21,
        fontSize: 14,
        lineHeight: 21,
        fontFamily: 'Poppins',
        fontWeight: 400,
        color: "#9095A1"
    },
    AddManuallyIngredientScreenComponentFieldContainerChevronIcon: {
        width: 20,
        height: 20,
        position: 'absolute',
        right: 16,
        top: 16,
        bottom: 16,
    },
    AddManuallyIngredientScreenComponentFieldContainerCalendarIcon: {
        width: 24,
        height: 24,
        position: 'absolute',
        right: 16,
        top: 18,
        bottom: 18,
    }
}