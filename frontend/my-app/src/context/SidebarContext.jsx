import { createContext, useState } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [isOpenSideBar, setIsOpenSideBar] = useState(true);

    const onToggleSideBar = (value) => {
        setIsOpenSideBar(value);
        console.log(value)
    }

    const contextData = {
        onToggleSideBar,
        isOpenSideBar
    };

    return (
        <SidebarContext.Provider value={contextData}>
            {children}
        </SidebarContext.Provider>
    );
}

export default SidebarContext;