import { PluginPopup } from './PluginPopup';
import { TabManagerProvider } from './context/TabManagerProvider';

export function App() {
  return (
    <TabManagerProvider>
      <div className="p-3 w-[30rem]">
        <h1 className="text-2xl font-bold mb-2 text-gray-700">Google Dev Docs</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mb-2 text-sm">
          Group Tabs
        </button>
        <PluginPopup />
      </div>
    </TabManagerProvider>
  );
}
