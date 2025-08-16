import {
  Button,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {scaleStyles} from '../../providers/abstract/StyleProvider';
import PrerenderedText from './PrerenderedTextView';
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler';
import { CommonRectButton } from '../components/CommonRectButton';

const styles = StyleSheet.create(
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
      marginBottom: 5.5,
      overflow: 'visible',
    },
    overlayBottomElementText: {
      alignSelf: 'center',
      justifyContent: 'center',
      fontSize: 14,
      lineHeight: 18,
      fontWeight: '500',
      fontFamily: 'Epilogue',
      color: '#34433E',
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
    },
    overlayBottomElement: {
      display: 'flex',
      width: 65.2,
      justifyContent: 'flex-start',
      alignItems: 'center',
      textAlign: 'center',
      marginHorizontal: 4,
      paddingTop: 19.5 - 2,
      // backgroundColor: 'green'
    },
    overlayBottom: {
      left: 0,
      height: 95,
      paddingHorizontal: 12,
      backgroundColor: 'blue',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
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
      // backgroundColor: 'blue'
    },

    filterImage: {
      width: '100%',
      height: '100%',
      // backgroundColor: "white",
      opacity: 0.05, // Adjust opacity for subtle effect
    },
  }),
);

interface bottomnav {
  navigation?: any;
}

export default function BottomNavigation(props: bottomnav) {

  const navigation = useNavigation();
  return (
    <ImageBackground
      source={{uri: 'https://imgur.com/aLmWnoQ'}}
      resizeMethod='auto'
      style={styles.overlayBottom}>
      <CommonRectButton
        onPress={() => {
            navigation.navigate("Home");
        }}>
        <View style={styles.overlayBottomElement}>
          <Image
            style={[styles.overlayBottomElementIcon]}
            source={{
              uri: 'https://i.imgur.com/YCvCu9j.png', // Replace with any URL
            }}
            resizeMode="contain"
          />
          <PrerenderedText
            style={styles.overlayBottomElementTextActive}
            anchor="start"
            lines={['Home']}
            width={41}
            height={18}
          />
        </View>
      </CommonRectButton>
      <CommonRectButton
        onPress={() => {
          navigation.navigate("Profile");
        }}>
        <View style={styles.overlayBottomElement}>
          <Image
            style={[styles.overlayBottomElementIcon]}
            source={{
              uri: 'https://i.imgur.com/mpEDRVD.png', // Replace with any URL
            }}
            resizeMode="contain"
          />
          <PrerenderedText
            style={styles.overlayBottomElementText}
            anchor="start"
            lines={['Discover']}
            width={61}
            height={18}
          />
        </View>
      </CommonRectButton>
      <View style={styles.overlayBottomElement}>
        <Image
          style={[styles.overlayBottomElementIcon]}
          source={{
            uri: 'https://i.imgur.com/gdUnF0J.png', // Replace with any URL
          }}
          resizeMode="contain"
        />
        <PrerenderedText
          style={styles.overlayBottomElementText}
          anchor="start"
          lines={['Pantry']}
          width={45}
          height={18}
        />
      </View>
      <View style={styles.overlayBottomElement}>
        <Image
          style={[styles.overlayBottomElementIcon]}
          source={{
            uri: 'https://i.imgur.com/n4p21en.png', // Replace with any URL
          }}
          resizeMode="contain"
        />
        <PrerenderedText
          style={styles.overlayBottomElementText}
          anchor="start"
          lines={['Shopping']}
          width={66}
          height={18}
        />
      </View>
      <View style={styles.overlayBottomElement}>
        <Image
          style={[styles.overlayBottomElementIcon]}
          source={{
            uri: 'https://i.imgur.com/o1G8Aaj.png', // Replace with any URL
          }}
          resizeMode="contain"
        />
        <PrerenderedText
          style={styles.overlayBottomElementText}
          anchor="start"
          lines={['Account']}
          width={60}
          height={18}
        />
      </View>
    </ImageBackground>
  );
}
