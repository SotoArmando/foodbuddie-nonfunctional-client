import { TouchableNativeFeedback, TouchableNativeFeedbackProps } from "react-native";
import { BaseButton, BaseButtonProps, RectButton, RectButtonProps } from "react-native-gesture-handler";

export const CommonRectButton = ({ rippleColor = '#E0DEDA',...props }: BaseButtonProps) => {
    return <BaseButton rippleColor={rippleColor} {...props} >
        <>
         {props.children}
        </>
    </BaseButton>;
};