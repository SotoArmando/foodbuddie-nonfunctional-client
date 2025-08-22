import { StyleSheet, TextStyle, ViewStyle, ImageStyle, PixelRatio } from 'react-native';
import { SearchScreen } from '../../screens/search';
import { PrerenderedTextStyle } from './ScannerScreen';

export type LoadingScreen = {
    LoadingSreenComponent: ViewStyle,
    LoadingSreenComponentTitle: PrerenderedTextStyle,
    LoadingSreenComponentTitlePicture: ViewStyle,
    LoadingSreenComponentTitleDescriptionLabel: PrerenderedTextStyle,
    LoadingSreenComponentTitleLoadingBar: ViewStyle,

}

export const LoadingScreenStyle: LoadingScreen = {
    LoadingSreenComponent: {
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: 17,
        alignContent:'center',
        alignItems: 'center',
        paddingTop: 144
    },
    LoadingSreenComponentTitle: {
        fontSize: 24,
        lineHeight: 36,
        fontWeight: 600,
        fontFamily: 'Poppins',
        width: 310,
        height: 36,
        anchor: 'middle',
        lines: ['Cooking Up Your Recipe...'],
        color: "#000000",
    },
    LoadingSreenComponentTitlePicture: {
        height: 308,
        width: 305,
        marginTop: 31,
        marginBottom: 43
    },
    LoadingSreenComponentTitleDescriptionLabel: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: 400,
        fontFamily: 'Poppins',
        width: 360,
        height: 48,
        anchor: 'middle',
        lines: ['Gathering your ingredients and creating', 'something delicious!'],
        color: "#000000",
    },
    LoadingSreenComponentTitleLoadingBar: {
        height: 14,
        width: '100%',
        maxWidth: '100%',
        borderRadius: 10,
        backgroundColor: "#D9D9D9",
        marginTop: 78
    }
}