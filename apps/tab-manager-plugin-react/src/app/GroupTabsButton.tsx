import { useMemo } from 'react';

import { useTabManager } from './context/TabManagerProvider';

export function GroupTabsButton() {
  const { tabIdList } = useTabManager();

  const hasTabs = useMemo(() => {
    return tabIdList.length > 0;
  }, [tabIdList]);

  const handleGroupTabsClick = async () => {
    if (hasTabs) {
      // @ts-ignore
      const group = await chrome.tabs.group({ tabIds: tabIdList });
      if (group) {
        await chrome.tabGroups.update(group, { title: 'DOCS (React)' });
      }
    }
  };

  return (
    <button
      onClick={handleGroupTabsClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mb-2 text-sm"
    >
      Group Tabs
    </button>
  );
}
