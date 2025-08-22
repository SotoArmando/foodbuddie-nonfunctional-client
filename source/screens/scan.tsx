import { Image, ImageBackground, View } from "react-native";
import { useComponentStyles } from "../providers/StyleProvider"
import PrerenderedText from "../abstract/PrerenderedTextView";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Camera, CameraType, C, CameraApi, CaptureData } from 'react-native-camera-kit';
import { scale } from "../abstract/StyleProvider";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { RectButton } from "react-native-gesture-handler";
import RNFS from "react-native-fs";
import { useScreenRoutes } from "../providers/NavigationProvider";
import { useIsFocused } from "@react-navigation/native";
import { CommonRectButton } from "../components/CommonRectButton";
import { ManuallyTab } from "./modulate/scanner/manuallytab";

const usePerplexity = () => {

    const apiKey = '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';
    const url = 'https://api.perplexity.ai/chat/completions';

    const [image, setImage] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg'; // Your image base64 string
    const cameraRef = useRef<CameraApi>(null);

    const { goToScanner } = useScreenRoutes();
    async function identifyProduce(base64Image: String) {
        const payload = {
            model: 'sonar-pro',
            messages: [
                {
                    role: 'user',
                    content: [
                        { type: 'text', text: 'What fruits or vegetables are in this image?' },
                        { type: 'image_url', image_url: { url: base64Image || image } }
                    ]
                }
            ],
            response_format: {
                type: 'json_schema',
                json_schema: {
                    schema: {
                        type: 'object',
                        properties: {
                            items: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        name: { type: 'string' },
                                        count: { type: 'number' },
                                        isExpiring: { type: 'boolean' },
                                        type: { type: 'string', enum: ['fruit', 'vegetable'] }
                                    },
                                    required: ['name', 'type', 'count', 'isExpiring']
                                }
                            }
                        },
                        required: ['items']
                    }
                }
            }
        };
        setTimeout(() => {
            // goToScanner({ ...JSON.parse(item).items[0], manually: true });
            goToScanner({ ...{ name: 'Orange', count: 15, type: 'Fruit' }, manually: true });
        }, 2000)
        // try {
        //     const response = await fetch(url, {
        //         method: 'POST',
        //         headers: {
        //             'Authorization': `Bearer ${apiKey}`,
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(payload),
        //     });
        //     if (!response.ok) {
        //         throw new Error(`HTTP error! status: ${response.status}`);
        //     }
        //     const data = await response.json();

        //     const item = data.choices[0].message.content;

        //     console.log(data);
        //     console.log(item);
        //     console.log(JSON.parse(item).items[0]);

        //      // JSON string with your schema
        //     return data.choices[0].message.content;
        // } catch (error) {
        //     console.error('Error calling Perplexity API:', error);
        //     throw error;
        // }

    }

    async function takePicture() {
        let image: CaptureData | undefined;
        try {
            const options = {
                quality: 0.5, // Adjust quality as needed
                base64: true, // Crucial for getting the Base64 string
            };

            image = await cameraRef.current?.capture();
            // console.log(image);

            const base64String = await RNFS.readFile(image?.uri || '', 'base64');
            const base64Image = 'data:image/jpeg;base64,' + base64String;
            // data.base64 will contain the Base64 string
            //   console.log(image.base64);
            identifyProduce(base64Image)

        } catch (error) {
            console.error("Error taking picture:", error);
        }
    }

    return { identifyProduce, setImage, cameraRef, takePicture }
}
export const Scanner = ({ route }) => {
    // console.log("route", route)
    const { cameraRef, takePicture } = usePerplexity();
    const { goToLoadScreen, goToPantry } = useScreenRoutes();
    const isFocused = useIsFocused();
    const [manually, setManually] = useState(route?.params?.manually);
    console.log(route)
    const {
        ScannerScreenComponent,
        ScannerScreenTitleLabel,
        ScannerScreenTitleIcon,
        ScannerScreenTitleContainer,
        ScannerScreenTabContainer,
        ScannerScreenTabContainerButton,
        ScannerScreenTabContainerButtonBorder,
        ScannerScreenTabContainerButtonLabel,
        ScannerScreenTabContainerButtonLabelA,
        ScannerScreenPositionLabel,
        ScannerScreenScanner,
        ScannerScreenAddButton,
        ScannerScreenAddButtonLabel,
    } = useComponentStyles('ScannerScreen');

    const {
        HomeEmptyPantryMessageButton,
        HomeEmptyPantryMessageButtonLabel,
    } = useComponentStyles('Home');

    useEffect(() => {
        const { params } = route;
        if (params?.manually !== null && params?.manually !== manually) {
            setManually(params?.manually);
        }
    }, [route?.params]);

    // if (!hasPermission) return <PermissionsPage />
    // if (device == null) return <CameraRuntimeError />


    return <>
        <SafeAreaView>
            <View style={{ ...ScannerScreenComponent, backgroundColor: !manually ? ScannerScreenComponent.backgroundColor : "#FDFEF4" }}>
                <View style={ScannerScreenTitleContainer}>
                    <PrerenderedText isFocused={isFocused} style={ScannerScreenTitleLabel} />

                    <CommonRectButton onPress={goToPantry} style={ScannerScreenTitleIcon} hitSlop={20} >
                        <Image source={{ uri: 'https://i.imgur.com/w70PYuP.png' }} style={{ height: ScannerScreenTitleIcon.height, width: ScannerScreenTitleIcon.width }} />
                    </CommonRectButton>
                </View>
                <View style={{ ...ScannerScreenTabContainer, marginBottom: manually ? 0 : ScannerScreenTabContainer.marginBottom }}>
                    <CommonRectButton rippleColor={'rgba(0,0,0,0.1)'} onPress={() => setManually(true)} style={ScannerScreenTabContainerButton}>
                        {manually && <View style={ScannerScreenTabContainerButtonBorder} />}
                        <PrerenderedText style={manually ? ScannerScreenTabContainerButtonLabel : ScannerScreenTabContainerButtonLabelA} lines={['Add manually']} isFocused={isFocused} />
                    </CommonRectButton>
                    <CommonRectButton rippleColor={'rgba(0,0,0,0.1)'} onPress={() => setManually(false)} style={ScannerScreenTabContainerButton}>
                        {!manually && <View style={ScannerScreenTabContainerButtonBorder} />}
                        <PrerenderedText style={!manually ? ScannerScreenTabContainerButtonLabel : ScannerScreenTabContainerButtonLabelA} lines={['Scan the item']} isFocused={isFocused} />
                    </CommonRectButton>
                </View>

                {manually ?
                    <ManuallyTab params={route?.params} isFocused={isFocused} />
                    :

                    <>
                        <PrerenderedText style={ScannerScreenPositionLabel} isFocused={isFocused} />
                        <View style={ScannerScreenScanner}>
                            <Camera
                                ref={cameraRef}
                                style={{ minHeight: ScannerScreenScanner.height, marginBottom: 0, marginTop: 0, padding: 0, maxHeight: ScannerScreenScanner.height, width: ScannerScreenScanner.width }}
                                cameraType={CameraType.Back} // front/back(default)
                                flashMode="auto"
                            />
                            <Image source={{ uri: 'https://i.imgur.com/ptZZ2VZ.png' }} style={{ height: ScannerScreenScanner.height, width: ScannerScreenScanner.width, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} ></Image>
                        </View>

                        <View  style={{ ...HomeEmptyPantryMessageButton, marginTop: 0, position: 'absolute', bottom: scale(57), left: scale(16), right: scale(16), alignSelf: 'center' }} >
                            {/* Bitmap shadow */}
                            <Image resizeMode="stretch" source={{ uri: 'https://i.imgur.com/f9dSqZI.png' }} style={{ position: 'absolute', opacity: 1, flex: 1, left: scale(12 - 23), top: scale(7 - 23), bottom: scale(-7 - 23), right: scale(13 - 23), }} />
                            <CommonRectButton  onPress={() => { goToLoadScreen(); takePicture(); }} resizeMode="stretch" style={{ position: 'absolute', opacity: 1, flex: 1, left: 0, top: 0, bottom: 0, right: 0, backgroundColor: '#FF8D51', borderRadius: scale(16), }} />
                            <PrerenderedText
                                style={HomeEmptyPantryMessageButtonLabel}
                                anchor="middle"
                                lines={['Take picture']}
                                width={125}
                                height={18}
                                isFocused={isFocused}
                            />
                        </View>
                    </>

                }
                {/* <View style={ScannerScreenAddButton}>
                    <View style={ScannerScreenAddButtonLabel} />
                </View> */}
            </View>
        </SafeAreaView >
    </>
}