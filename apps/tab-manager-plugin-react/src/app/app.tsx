import { GroupTabsButton } from './GroupTabsButton';
import { PluginPopup } from './PluginPopup';
import { TabManagerProvider } from './context/TabManagerProvider';

export function App() {
  return (
    <TabManagerProvider>
      <div className="p-3 w-[30rem]">
        <h1 className="text-2xl font-bold mb-2 text-gray-700">Google Dev Docs</h1>
        <GroupTabsButton />
        <PluginPopup />
      </div>
    </TabManagerProvider>
  );
}
