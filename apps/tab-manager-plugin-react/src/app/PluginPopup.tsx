import { useTabManager } from './context/TabManagerProvider';

export function PluginPopup() {
  const { tabList } = useTabManager();

  const renderTabList = () => {
    return (
      <ul>
        {tabList.map((tab) => {
          return (
            <li className="odd:bg-gray-300" key={tab.id}>
              <a href="/" className="block hover:bg-blue-500 p-1 hover:text-white">
                <h3 className="font-bold text-sm ">{tab.title}</h3>
                <p className="text-xs ">{tab.pathname}</p>
              </a>
            </li>
          );
        })}
      </ul>
    );
  };

  return renderTabList();
}
