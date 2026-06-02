import Icon from "../atoms/Icon";
import { useState } from "react";

const ToggleButton = ({isOn, handleToggle }: { isOn: boolean; handleToggle: () => void }) => {

    let [isToggled, setIsToggled] = useState(isOn);
    handleToggle = () => {
        console.log("Toggled:", !isToggled);
        document.documentElement.classList.toggle('dark', !isToggled);
        setIsToggled(!isToggled);
    }

    return (
        <button onClick={handleToggle} className={`absolute bottom-4 right-4 w-auto h-auto cursor-pointer p-2 rounded-full transition-colors duration-300 bg-gray-700 text-white hover:bg-surface dark:bg-gray-300 dark:text-gray-800 dark:hover:bg-background`}>
            <Icon name={isToggled ? 'sun' : 'moon'} size="1.5rem"/>
        </button>
    );
};


export default ToggleButton;