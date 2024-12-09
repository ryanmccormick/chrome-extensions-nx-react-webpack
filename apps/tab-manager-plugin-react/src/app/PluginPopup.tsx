import { SyntheticEvent } from 'react';

import { useTabManager } from './context/TabManagerProvider';

export function PluginPopup() {
  const { tabList } = useTabManager();

  const handleTabClick = async (event: SyntheticEvent<HTMLAnchorElement>, tab: chrome.tabs.Tab) => {
    if (event) {
      event.preventDefault();
    }

    await chrome.tabs.update(tab.id!, { active: true });
    await chrome.windows.update(tab.windowId, { focused: true });
  };

  const renderTabList = () => {
    return (
      <ul>
        {tabList.map((tab) => {
          const titleStr = (tab.title ?? '').split('-')[0].trim();
          const pathnameStr = new URL(tab.url ?? '').pathname.slice('/docs'.length);

          return (
            <li className="odd:bg-gray-300" key={tab.id}>
              <a
                href="/"
                className="block hover:bg-blue-500 p-1 hover:text-white"
                onClick={(event) => handleTabClick(event, tab)}
              >
                <h3 className="font-bold text-sm ">{titleStr}</h3>
                <p className="text-xs ">{pathnameStr}</p>
              </a>
            </li>
          );
        })}
      </ul>
    );
  };

  return renderTabList();
}
