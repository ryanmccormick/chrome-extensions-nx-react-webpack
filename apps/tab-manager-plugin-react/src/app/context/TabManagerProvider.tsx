import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';

import { getBrowserTabs } from '../utils/get-browser-tabs.util';

const TabManagerContext = createContext<TabManagerProviderValue | undefined>(undefined);

interface TabManagerProviderValue {
  tabList: Array<chrome.tabs.Tab>;
  tabIdList: Array<number>;
}
interface TabManagerProviderProps {
  children?: ReactNode;
}

function TabManagerProvider(props: TabManagerProviderProps) {
  const [browserTabs, setBrowserTabs] = useState<Array<chrome.tabs.Tab>>([]);

  useEffect(() => {
    getBrowserTabs().then((data) => {
      setBrowserTabs(data);
    });
  }, []);

  const tabList: Array<chrome.tabs.Tab> = useMemo(() => {
    return browserTabs;
  }, [browserTabs]);

  const tabIdList: Array<number> = useMemo(() => {
    return (tabList ?? [])
      .map((tab, index) => {
        if (!tab.id) {
          return { ...tab, id: index + 1000 };
        }

        return tab;
      })
      .map((tab) => tab.id) as unknown as Array<number>;
  }, [tabList]);

  const value: TabManagerProviderValue = {
    tabList,
    tabIdList,
  };

  return <TabManagerContext.Provider value={value}>{props.children}</TabManagerContext.Provider>;
}

function useTabManager() {
  const context = useContext(TabManagerContext);
  if (typeof context === 'undefined') {
    throw new Error('useTabManager must be used in a TabManagerProvider');
  }

  return context;
}

export { TabManagerProvider, useTabManager };
export type { TabManagerProviderValue };
