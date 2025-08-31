import { StyleSheet, TextStyle, ViewStyle, ImageStyle, PixelRatio } from 'react-native';


export type PrerenderedTextStyle = TextStyle & { anchor?: String, lines?: any | string, width?: number, height?: number, routeName?: string };

export type ScannerScreen = {
    ScannerScreenComponent: ViewStyle,
    ScannerScreenTitleLabel: PrerenderedTextStyle,
    ScannerScreenTitleIcon: ViewStyle,
    ScannerScreenTitleContainer: ViewStyle,
    ScannerScreenTabContainer: ViewStyle,
    ScannerScreenTabContainerButton: ViewStyle,
    ScannerScreenTabContainerButtonBorder: ViewStyle,
    ScannerScreenTabContainerButtonLabel: PrerenderedTextStyle,
    ScannerScreenTabContainerButtonLabelA: PrerenderedTextStyle,
    ScannerScreenPositionLabel: PrerenderedTextStyle,
    ScannerScreenScanner: ViewStyle,
    ScannerScreenAddButton: ViewStyle,
    ScannerScreenAddButtonLabel: PrerenderedTextStyle,
}

export const ScannerScreenStyle: ScannerScreen = {
    ScannerScreenComponent: {
        paddingHorizontal: 16,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 69,
        backgroundColor: "#EFF0E5",
         height: '100%'
    },
    ScannerScreenTitleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative'
    },
    ScannerScreenTitleIcon: {
        height: 24,
        width: 24,
        position: 'absolute',
        right: 0,
        top: 6,
        bottom: 6
    },
    ScannerScreenTitleLabel: {
        fontSize: 24,
        lineHeight: 36,
        fontWeight: 600,
        fontFamily: 'Poppins',
        color: "#333333",
        width: 182,
        height: 36,
        lines: ['Add Ingredient'],
        anchor: 'start'
    },
    ScannerScreenTabContainer: {
        height: 48,
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 38,
        marginHorizontal: -16,
        gap: 1,
        // backgroundColor: '#EFF0E5',
        marginTop: 10
    },
    ScannerScreenTabContainerButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: "#FDFEF4",
        display: "flex",
        position: 'relative'
    },
    ScannerScreenTabContainerButtonBorder: {
        position: 'absolute',
        left: 15,
        right: 14,
        bottom:0,
        top: 0,
        borderBottomColor: "#02733E",
        borderBottomWidth: 2
    },

    ScannerScreenTabContainerButtonLabel: {
        fontSize: 14,
        lineHeight: 21,
        color: "#02733E",
        fontWeight: 500,
        fontFamily: "Poppins",
        anchor: 'middle',
        width: 105,
        height: 21,

    },
    ScannerScreenTabContainerButtonLabelA: {
        fontSize: 14,
        lineHeight: 21,
        color: "#9095A1",
        fontWeight: 500,
        fontFamily: "Poppins",
        anchor: 'middle',

        width: 105,
        height: 21
    },
    ScannerScreenPositionLabel: {
        fontSize: 14,
        lineHeight: 21,
        color: "#9095A1",
        fontWeight: 500,
        width: 325,
        height: 21,
        lines: ['Position the barcode within the frame to scan.'],
        anchor: 'start'
    },
    ScannerScreenScanner: {
        marginTop: 65,
        height: 328,
        width: 328,
        // backgroundColor: 'grey',
        alignSelf: 'center',
        position: 'relative',
        maxHeight: 328,
        borderRadius: 25,
        overflow: 'hidden',

    },
    ScannerScreenAddButton: {
        marginTop: 124,
    },
    ScannerScreenAddButtonLabel: {}
}