import { StyleSheet, TextStyle, ViewStyle, ImageStyle, PixelRatio } from 'react-native';
import { SearchScreen } from '../../screens/searchsmodal';

export type SearchScreen = {
    SearchScreenComponent: ViewStyle,
    SearchScreenFoundLabel: TextStyle,
    SearchScreenFoundLabelContainer: ViewStyle,
    SearchScreenComponentItemsContainer: ViewStyle,
}

export const SearchScreenStyle:SearchScreen = {
    SearchScreenComponent: {
        paddingTop: 48,
        paddingHorizontal: 16,
        overflow:'visible',
        paddingBottom: 300
    },
    SearchScreenFoundLabel: {
        fontSize: 14,
        lineHeight: 21,
        fontWeight: 500,
        fontFamily: 'Poppins',
        color: "#333333"
    },
    SearchScreenFoundLabelContainer: {
        marginTop: 15,
        marginBottom: 17,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    SearchScreenComponentItemsContainer: {
        display: 'flex',
        flexDirection:'column',
        gap: 15
    }
}