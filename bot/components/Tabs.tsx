import { createContext, PropsWithChildren, ReactNode, useContext, useState } from "react";

export type TabsCtx = {
    tab: string;
    setTab: (id: string) => void;
};

export const TabContext = createContext<TabsCtx>({
    tab: "",
    setTab: () => {},
});

export const Tabs = ({
    children,
    initialTab,
}: PropsWithChildren & { initialTab: string }) => {
    const [tab, setTab] = useState(initialTab);

    return (
        <TabContext.Provider value={{
            tab,
            setTab,
        }}>
            {children}
        </TabContext.Provider>
    )
};

Tabs.Tab = ({
    children,
    value,
}: {
    value: string;
} & PropsWithChildren) => {
    const { tab } = useContext(TabContext);

    if(tab !== value) return null;
    return children;
};

Tabs.Buttons = ({
    data,
}: {
    data: (string | { value: string; label?: ReactNode })[];
}) => {
    const { tab: currentTab, setTab } = useContext(TabContext);

    return (
        <actionRow>
            {data.map((tab, i) => {
                const value = typeof tab == "string" ? tab : tab.value;
                const label = typeof tab == "string" ? tab : (tab.label || tab.value);
                const isActive = value === currentTab;

                return (
                    <button
                        onClick={() => setTab(value)}
                        style={isActive ? "primary" : "secondary"}
                    >
                        {label}
                    </button>
                );
            })}
        </actionRow>
    );
};
