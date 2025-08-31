import { useEffect, useState } from "react"
import { InteractionManager } from "react-native";

const Delayed = ({ children, timeout, manager = false}: { children: any, timeout?: number, manager?: boolean }) => {
    const [render, setRender] = useState(false);

    useEffect(() => {
        if (manager) {
            InteractionManager.runAfterInteractions(() => {
                setRender(true)
            });
        } else {
            setTimeout(() => {
                setRender(true)
            }, timeout)
        }

    }, [])

    return render && <>
        {children}
    </>
}

export default Delayed;