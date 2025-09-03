import { useEffect, useState } from "react";
import { Freeze } from "react-freeze";
import { InteractionManager } from "react-native";

export const Freezed = ({ children, manager, timeout, hot }: { children: any, timeout?: number, manager?: boolean, hot?: boolean }) => {
    const [isFreezed, setIsFreezed] = useState(true);

    useEffect(() => {
        if (manager === true) {
            InteractionManager.runAfterInteractions(() => {
                setIsFreezed(false)
            });
        } else {
            setTimeout(() => {
                setIsFreezed(false)
            }, timeout)
        }

    }, [])

    if (hot) {
        return children;
    }
    return <Freeze freeze={isFreezed}>
        {children}
    </Freeze>
}