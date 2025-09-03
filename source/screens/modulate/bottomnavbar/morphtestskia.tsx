import { Skia, Canvas, Circle, interpolatePaths, Line, Path, vec, usePathInterpolation, rrect, rect, Group, useImage, Image, useCanvasSize } from "@shopify/react-native-skia";
import React, { useEffect, useState } from "react";
import { Dimensions, InteractionManager, Pressable, StyleSheet, View, Image as ReactImage } from "react-native";
import {
  cancelAnimation,
  runOnJS,
  runOnUI,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { states } from "../../../abstract/BottomnavMorph";
import { BaseButton, RectButton } from "react-native-gesture-handler";
import { Button, Text, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
import { debounce } from "lodash";
import { useSession } from "../../../providers/SessionProvider";
import PrerenderedText from "../../../abstract/PrerenderedTextView";
import { useScreenRoutes } from "../../../providers/NavigationProvider";
import { scale } from "../../../abstract/StyleProvider";
import { CommonRectButton } from "../../../components/CommonRectButton";


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const springConfigB = {
  damping: 800, // How quickly the spring stops moving
  mass: 0.25 / 8, // Weight of the spring
  stiffness: 100, // How bouncy the spring is
  overshootClamping: true, // Whether to prevent overshooting
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 2,
};

const springConfigA = {
  damping: 800, // How quickly the spring stops moving
  mass: 0.25 / 8, // Weight of the spring
  stiffness: 100, // How bouncy the spring is
  overshootClamping: true, // Whether to prevent overshooting
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 2,
};

const springConfigC = {
  delay: 0,
  // velocity: 0.02,
  stiffness: 13, // Adjust stiffness for the spring
  damping: 13, // Adjust damping for the spring
  mass: 0.01, // Adjust mass for the spring
  restDisplacementThreshold: 0.1, // When to stop the animation
  restSpeedThreshold: 0.1, // Speed threshold to stop the animation
  overshootClamping: true,
};

export const SkiaTutorial = () => {
  const { goToHome, goToPlanning, goToPantry, goToRecipes, goToProfile } = useScreenRoutes();
  const { hasSession } = useSession();
  const progress = useSharedValue(0);
  const progressO = useSharedValue(0);
  const progress1 = useSharedValue(-1);
  const sharedCurrentActive = useSharedValue(0);
  const progress1d = useDerivedValue(() => {
    return progress1.value - (146 / 2)
  }, [progress1])
  const progress2d = useDerivedValue(() => {
    return progress1.value - (24 / 2)
  }, [progress1])
  const [currentActive, setcurrentActive] = useState(0);
  const circleOpacity = useDerivedValue(() => progressO.value);
  // const circleYPosition = useDerivedValue(() => progressO.value * 20);
  const imageShadow = useImage("https://i.imgur.com/zHwObzo.png");
  const label0 = useImage("https://maker-len-pirates-kerry.trycloudflare.com/static/3169106085.webp");
  const label1 = useImage("https://maker-len-pirates-kerry.trycloudflare.com/static/3834523372.webp");
  const label2 = useImage("https://maker-len-pirates-kerry.trycloudflare.com/static/3838130273.webp");
  const label3 = useImage("https://maker-len-pirates-kerry.trycloudflare.com/static/3936234647.webp");
  const label4 = useImage("https://maker-len-pirates-kerry.trycloudflare.com/static/4067652146.webp");
  const icon0 = useImage("https://i.imgur.com/5U0lJAC.png");
  const icon1 = useImage("https://i.imgur.com/Wy79JUg.png");
  const icon2 = useImage("https://i.imgur.com/G64woUg.png");
  const icon3 = useImage("https://i.imgur.com/qq4de40.png");
  const icon4 = useImage("https://i.imgur.com/4KeSEOA.png");
  const iconB0 = useImage("https://i.imgur.com/cUzT3m0.pngg");
  const iconB1 = useImage("https://i.imgur.com/kUZPnZA.png");
  const iconB2 = useImage("https://i.imgur.com/10XRGfo.png");
  const iconB3 = useImage("https://i.imgur.com/iftrVsW.png");
  const iconB4 = useImage("https://i.imgur.com/gyrYLba.png");

  const handleClick = debounce(async (active: number) => {
    [goToHome, goToPlanning, goToPantry, goToRecipes, goToProfile][active]()
    setTimeout(() => {
      if (currentActive !== active) {
        sharedCurrentActive.value = active;
        progress.value = 0;
        progressO.value = 1;
        progress1.value = -1;


        progress1.value = withSpring(-30, springConfigC, (finished) => {
          if (finished) {
          }
        });
        progressO.value = withSpring(0, springConfigC, (finished) => {
          if (finished) {


          }

        });
        progress.value = withSpring(1, springConfigC, (finished) => {
          if (finished) {
            runOnJS(setcurrentActive)(active);

          }

        });
      }
    }, 0)









  })

  useEffect(() => {


    progress.value = withSpring(0, springConfigC, (finished) => {

    });

    setTimeout(() => {

      progress1.value = withSpring(0, springConfigC, (finished) => {
        if (finished) {

        }

      });
      progressO.value = withSpring(1, springConfigC, (finished) => {
        if (finished) {


        }

      });
    }, 50)
  }, [currentActive]);

  const pathData = usePathInterpolation(progress, [0, 1], [states[currentActive][1], states[currentActive][0]]);
  // const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  // const {ref, size: {width:cWidth, height: cHeight}} = useCanvasSize();
  // console.log('currentActive', currentActive)
  return (
    <View pointerEvents={'box-none'} style={{ ...styles.container, opacity: hasSession === true ? 1 : 0 }}>
      <ReactImage resizeMode="stretch" source={{ uri: 'https://i.imgur.com/zmovmdT.png' }} style={{ position: 'absolute', opacity: 0.1, minHeight: scale(130), flex: 1, left: scale(-16), bottom: scale(0), right: scale(-16), mixBlendMode: 'exclusion' }} />
      {/* <Button<MyTabs.Screen
                    name="Home"
                    component={() => <Home />}
                    options={{ title: 'AllSet' }}
                />
                <MyTabs.Screen
                    name="Planning"
                    component={Planning}
                    options={{ title: 'Planning' }}
                />
                <MyTabs.Screen
                    name="Pantry"
                    component={Pantry}
                    options={{ title: 'Pantry' }}
                />
                <MyTabs.Screen
                    name="Recipes"
                    component={Recipes}
                    options={{ title: 'Recipes' }}
                />
                <MyTabs.Screen
                    name="Profile"
                    component={Profile}
                    options={{ title: 'Profile' }}
                />
        title="Press me 1"
        onPress={() => handleClick(0)}
      />
      <Button
        title="Press me 2"
        onPress={() => handleClick(1)}
      />
      <Button
        title="Press me 3"
        onPress={() => handleClick(2)}
      />progressO
      <Button
        title="Press me 4"
        onPress={() => handleClick(3)}
      />
      <Button
        title="Press me 5"
        onPress={() => handleClick(4)}
      /> */}

      <Canvas pointerEvents="box-only" style={{ flex: 1, maxWidth: width, width: 393, maxHeight: 136, overflow: 'visible', }}
      // onLayout={(e) => {
      //   const { width, height } = e.nativeEvent.layout;
      //   setCanvasSize({ width, height });
      // }}
      >

        <Group transform={[{ translateY: 50 }, { scale: (screenWidth / 393) * 1 }]}  >
          <Path
            path={pathData}
            color="#FF8D51"
            antiAlias={true}
          />
          <Group opacity={0.25}>
            <Image image={imageShadow} fit="contain" x={49.6445 - (146 / 2)} opacity={currentActive === 0 ? circleOpacity : 0} y={currentActive === 0 ? progress1d : 0} width={146} height={146} />
            <Image image={imageShadow} fit="contain" x={120.645 - (146 / 2)} opacity={currentActive === 1 ? circleOpacity : 0} y={currentActive === 1 ? progress1d : 0} width={146} height={146} />
            <Image image={imageShadow} fit="contain" x={191.645 - (146 / 2)} opacity={currentActive === 2 ? circleOpacity : 0} y={currentActive === 2 ? progress1d : 0} width={146} height={146} />
            <Image image={imageShadow} fit="contain" x={262.934 - (146 / 2)} opacity={currentActive === 3 ? circleOpacity : 0} y={currentActive === 3 ? progress1d : 0} width={146} height={146} />
            <Image image={imageShadow} fit="contain" x={333.934 - (146 / 2)} opacity={currentActive === 4 ? circleOpacity : 0} y={currentActive === 4 ? progress1d : 0} width={146} height={146} />
          </Group>
          <Circle opacity={currentActive === 0 ? circleOpacity : 0} cx={49.6445} cy={currentActive === 0 ? progress1 : 0} r={58 / 2} color="white" antiAlias={true} />
          <Circle opacity={currentActive === 1 ? circleOpacity : 0} cx={120.645} cy={currentActive === 1 ? progress1 : 0} r={58 / 2} color="white" antiAlias={true} />
          <Circle opacity={currentActive === 2 ? circleOpacity : 0} cx={191.645} cy={currentActive === 2 ? progress1 : 0} r={58 / 2} color="white" antiAlias={true} />
          <Circle opacity={currentActive === 3 ? circleOpacity : 0} cx={262.934} cy={currentActive === 3 ? progress1 : 0} r={58 / 2} color="white" antiAlias={true} />
          <Circle opacity={currentActive === 4 ? circleOpacity : 0} cx={333.934} cy={currentActive === 4 ? progress1 : 0} r={58 / 2} color="white" antiAlias={true} />
          <Image image={label0} fit="contain" opacity={currentActive === 0 ? circleOpacity : 0} y={50.5} x={49.6445 - 21} width={42} height={21} />
          <Image image={label1} fit="contain" opacity={currentActive === 1 ? circleOpacity : 0} y={50.5} x={120.645 - 27} width={54} height={21} />
          <Image image={label2} fit="contain" opacity={currentActive === 2 ? circleOpacity : 0} y={50.5} x={191.645 - 27} width={54} height={21} />
          <Image image={label3} fit="contain" opacity={currentActive === 3 ? circleOpacity : 0} y={50.5} x={262.934 - 24} width={48} height={21} />
          <Image image={label4} fit="contain" opacity={currentActive === 4 ? circleOpacity : 0} y={50.5} x={333.934 - 22} width={44} height={21} />
          <Image image={icon0} fit="contain" x={49.6445 - (24 / 2)} opacity={currentActive === 0 ? circleOpacity : 0} y={currentActive === 0 ? progress2d : 0} width={24} height={24} />
          <Image image={icon1} fit="contain" x={120.645 - (24 / 2)} opacity={currentActive === 1 ? circleOpacity : 0} y={currentActive === 1 ? progress2d : 0} width={24} height={24} />
          <Image image={icon2} fit="contain" x={191.645 - (24 / 2)} opacity={currentActive === 2 ? circleOpacity : 0} y={currentActive === 2 ? progress2d : 0} width={24} height={24} />
          <Image image={icon3} fit="contain" x={262.934 - (24 / 2)} opacity={currentActive === 3 ? circleOpacity : 0} y={currentActive === 3 ? progress2d : 0} width={24} height={24} />
          <Image image={icon4} fit="contain" x={333.934 - (24 / 2)} opacity={currentActive === 4 ? circleOpacity : 0} y={currentActive === 4 ? progress2d : 0} width={24} height={24} />
          <Image image={iconB0} fit="contain" x={49.6445 - 12} opacity={currentActive === 0 ? 0 : 1} y={50.5 - 20} width={24} height={24} />
          <Image image={iconB1} fit="contain" x={120.645 - 12} opacity={currentActive === 1 ? 0 : 1} y={50.5 - 20} width={24} height={24} />
          <Image image={iconB2} fit="contain" x={191.645 - 12} opacity={currentActive === 2 ? 0 : 1} y={50.5 - 20} width={24} height={24} />
          <Image image={iconB3} fit="contain" x={262.934 - 12} opacity={currentActive === 3 ? 0 : 1} y={50.5 - 20} width={24} height={24} />
          <Image image={iconB4} fit="contain" x={333.934 - 12} opacity={currentActive === 4 ? 0 : 1} y={50.5 - 20} width={24} height={24} />
        </Group>

      </Canvas>
      {/* goToHome, goToPlanning, goToPantry, goToRecipes, goToProfile  */}
      <View style={buttonsContainer}>
        <CommonRectButton rippleColor={'transparent'} style={button} onPress={() => { handleClick(0); }}></CommonRectButton>
        <CommonRectButton rippleColor={'transparent'} style={button} onPress={() => { handleClick(1); }}></CommonRectButton>
        <CommonRectButton rippleColor={'transparent'} style={button} onPress={() => { handleClick(2); }}></CommonRectButton>
        <CommonRectButton rippleColor={'transparent'} style={button} onPress={() => { handleClick(3); }}></CommonRectButton>
        <CommonRectButton rippleColor={'transparent'} style={button} onPress={() => { handleClick(4); }}></CommonRectButton>
      </View>
      {/* <PrerenderedText
                style={{ fontFamily: 'Poppins',fontWeight: '500', fontSize: 14, lineHeight: 21, letterSpacing: 0, color: '#fff' }}
                anchor="middle"
                lines={['Home']}
                width={42}
                height={21}
                quality={0.6}
            />
            <PrerenderedText
                style={{ fontFamily: 'Poppins', fontWeight: '500', fontSize: 14, lineHeight: 21, letterSpacing: 0, color: '#fff' }}
                anchor="middle"
                lines={['Planner']}
                width={54}
                height={21}
                quality={0.6}
            />
            <PrerenderedText
                style={{ fontFamily: 'Poppins', fontWeight: '500', fontSize: 14, lineHeight: 21, letterSpacing: 0, color: '#fff' }}
                anchor="middle"
                lines={['Pantry']}
                width={46}
                height={21}
                quality={0.6}
            />
            <PrerenderedText
                style={{ fontFamily: 'Poppins',fontWeight: '500', fontSize: 14, lineHeight: 21, letterSpacing: 0, color: '#fff' }}
                anchor="middle"
                lines={['Recipe']}
                width={48}
                height={21}
                quality={0.6}
            />
            <PrerenderedText
                style={{ fontFamily: 'Poppins',fontWeight: '500', fontSize: 14, lineHeight: 21, letterSpacing: 0, color: '#fff' }}
                anchor="middle"
                lines={['Profile']}
                width={44}
                height={21}
                quality={0.6}
            /> */}
    </View>
  );
};

const styles1 = StyleSheet.create(
  {
    parentComponent: {
      width: '100%', backgroundColor: 'transparent', position: 'absolute', bottom: 0, left: 0, height: 123 + 24
    },
    positionedImgContainer: {
      position: 'relative',
      width: '101%',
      height: 123 + 24,
      paddingBottom: 24,

    },
    reusableAbsolutePositionedImg: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      // backgroundColor:'red'
    },
    filler0: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: '101%',
      height: 24,
      backgroundColor: '#FF8D51'
    },
    buttonsContainer: {
      position: 'absolute',
      left: 0,
      bottom: -35,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
      // backgroundColor: 'red'
      // paddingLeft: 21,
      // paddingRight: 16
    },
    button: {
      flex: 1,
      height: 80,
      // backgroundColor: 'blue',
      // opacity: 0.5
    }
  }
);
const { filler0, buttonsContainer, button, parentComponent, positionedImgContainer, reusableAbsolutePositionedImg } = styles1;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "center",
    alignContent: 'center',
    alignItems: 'center',
    // backgroundColor: "black",
    // paddingTop: 200,
    maxWidth: width,
    height: 136,
    maxHeight: 136,
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderStartColor: 'blue'
    // alignContent: 'flex-end',
    // alignItems: 'flex-end'
  },
});