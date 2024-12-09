import { ReactNode, createContext, useContext, useMemo } from 'react';

import { tempTabList } from './temp-tab-list.constants';

const TabManagerContext = createContext<TabManagerProviderValue | undefined>(undefined);

interface TabManagerProviderValue {
  tabList: Array<{ title: string; pathname: string; id: number }>;
}
interface TabManagerProviderProps {
  children?: ReactNode;
}

function TabManagerProvider(props: TabManagerProviderProps) {
  const tabList: Array<{ title: string; pathname: string; id: number }> = useMemo(() => {
    return tempTabList.map((tab, index) => {
      return {
        ...tab,
        id: index + 1,
      };
    });
  }, []);

  const value: TabManagerProviderValue = {
    tabList,
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
