import { Image, ImageBackground, StatusBar, StyleSheet, View } from "react-native";
import { scaleStyles } from "../abstract/StyleProvider";
import { AppLayout } from "./app_layout";
import MorphingShape from "../screens/modulate/bottomnavbar/morphtest";
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

export const screensLayoutStyles = StyleSheet.create(
    scaleStyles({
        marginB: {
            paddingBottom: 95,
        },
        overlayBottomElementIcon: {
            color: 'black',
            fontFamily: 'BottomNavigatorIcons',
            width: 31,
            height: 31,
            opacity: 1,
            marginBottom: 6,
            marginTop: 16,
            overflow: 'visible',
        },
        overlayBottomElementText: {
            alignSelf: 'center',
            justifyContent: 'center',
            fontSize: 14,
            lineHeight: 18,
            fontWeight: '500',
            fontFamily: 'Epilogue',
            color: '#788280',
            opacity: 0.64,
        },
        overlayBottomElementTextActive: {
            alignSelf: 'center',
            justifyContent: 'center',
            fontSize: 14,
            lineHeight: 18,
            fontWeight: '500',
            fontFamily: 'Epilogue',
            color: '#0D1C17',
            opacity: 1,
        },
        overlayBottomElement: {
            display: 'flex',
            width: 65.2 + 8,
            justifyContent: 'flex-start',
            alignItems: 'center',
            textAlign: 'center',
            alignContent: 'center',
            justifyItems: 'center',
            paddingHorizontal: 4,
            // paddingTop: 19.5 - 2,
            flex: 1,
            borderWidth: 0,
            height: 95
            // backgroundColor: 'green'
        },
        overlayBottom: {
            height: 95,
            paddingHorizontal: 12,
            display: 'flex',
            elevation: 25,
            shadowOffset: { width: 0, height: -4 },
            backgroundColor: 'white',
            // borderTopColor: '#7B7D8D',
            // borderTopWidth: 1

            // backgroundColor: 'blue'
        },
        sectionContainer: {
            marginTop: 32,
            paddingHorizontal: 24,
        },
        sectionTitle: {
            fontSize: 24,
            fontWeight: '600',
        },
        sectionDescription: {
            marginTop: 8,
            fontSize: 18,
            fontWeight: '400',
        },
        highlight: {
            fontWeight: '700',
        },
        container: {
            flex: 1,
            backgroundColor: '#000', // Slightly blue-tinted background
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
        },
        content: {
            padding: 20,
            borderRadius: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Keeps text readable
        },
        text: {
            fontSize: 24,
            color: '#fff',
            fontWeight: 'bold',
        },
        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        },
        overlayB: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'transparent'
        },
        overlayC: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 95,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end'
        },
        filterImage: {
            width: '100%',
            height: '100%',
            // backgroundColor: "white",
            opacity: 0.01, // Adjust opacity for subtle effectnavigation
        },
        filterImageB: {
            width: '100%',
            height: '100%',
            // backgroundColor: "white",
            opacity: 1, // Adjust opacity for subtle effect
        },
    }),
);

export const ScreensLayout = () => {
    
    // return <MorphingShape />;
    return <>
        <View pointerEvents="none" style={screensLayoutStyles.overlayB}>
            <View pointerEvents="none"
                style={{ ...screensLayoutStyles.filterImageB}}
                //  backgroundColor: "#FDFEF4"
                // source={{
                //     uri: 'https://i.imgur.com/tzpLmwu.png', // Replace with any URL
                // }}
                // resizeMode="stretch"
                // imageStyle={{ opacity: 0.25 }}
            />
        </View>
        <StatusBar
            barStyle={true ? 'light-content' : 'light-content'}
            backgroundColor={'#FF8D51'}
            translucent={true}
        />
        <AppLayout />
        <View pointerEvents="none" style={screensLayoutStyles.overlay}>
            <Image
                style={screensLayoutStyles.filterImage}
                source={{
                    uri: 'https://i.imgur.com/cMhi03a.png', // Replace with any URL
                }}
                resizeMode="repeat"
            />
        </View>
        <View pointerEvents="none" style={screensLayoutStyles.overlay}>
            <Image
                style={[screensLayoutStyles.filterImage, { opacity: 0.00001, transform: 'rotate(0deg)' }]}
                
                source={{
                    uri: 'https://i.imgur.com/wy6frJW.png', // Replace with any URL
                }}
                resizeMode="stretch"
            />
        </View>
        <View pointerEvents="none" style={screensLayoutStyles.overlay}>
            <Image
                style={[screensLayoutStyles.filterImage, { opacity: 0.1, transform: 'rotate(0deg)' }]}
                
                source={{
                    uri: 'https://i.imgur.com/EZdC09A.png', // Replace with any URL
                }}
                resizeMode="stretch"
            />
        </View>
        
        <View pointerEvents="none" style={{...screensLayoutStyles.overlay, opacity: 0.01, backgroundColor: '#0011FF'}}>
        
        </View>
    </>
}