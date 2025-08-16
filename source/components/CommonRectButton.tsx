import { TouchableNativeFeedback, TouchableNativeFeedbackProps } from "react-native";
import { BaseButton, BaseButtonProps, RectButton, RectButtonProps } from "react-native-gesture-handler";

export const CommonRectButton = ({ rippleColor = 'rgba(216,38,106,0.4)',...props }: BaseButtonProps) => {
    return <BaseButton rippleColor={rippleColor} {...props} >
        <>
         {props.children}
        </>
    </BaseButton>;
};