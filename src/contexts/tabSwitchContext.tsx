import { createContext, useContext, useEffect, useMemo, useState } from "react";

type TitleTexts = "Available Pets" | "About Us" | "Settings"|"Contact Us" | "Log In";

type ContextType = {
  tab: number;
  setTab: (tab: number) => void;
  titleText: TitleTexts;
  headings: string[];
};

type TabProviderProps = {
  children: React.ReactNode;
};

const HEADINGS = ["Available Pets", "About Us", "Contact Us","Settings", "Log In"];

const TabContext = createContext<ContextType>({
  tab: 0,
  setTab: () => {},
  titleText: "Available Pets",
  headings: HEADINGS,
});

export const NavTabProvider: React.FC<TabProviderProps> = (props) => {
  const [tab, setTab] = useState(0);
  const headings = useMemo(() => HEADINGS, []);

  const [titleText, setTitleText] = useState<TitleTexts>(
    "Available Pets"
  );

  useEffect(() => {
    setTitleText(headings[tab] as TitleTexts);
  }, [headings, tab]);

  return (
    <TabContext.Provider value={{ tab, setTab, titleText, headings }}>
      {props.children}
    </TabContext.Provider>
  );
};

export const useAdminstrationTab = () => useContext(TabContext);
