import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { setSidebarTab, useSelectedSidebarTab } from '../../documents/editor/EditorContext';

import ConfigurationPanel from './ConfigurationPanel';
import StylesPanel from './StylesPanel';

export const INSPECTOR_DRAWER_WIDTH = 320;

export default function InspectorDrawer() {
  const selectedSidebarTab = useSelectedSidebarTab();

  const renderCurrentSidebarPanel = () => {
    switch (selectedSidebarTab) {
      case 'block-configuration':
        return <ConfigurationPanel />;
      case 'styles':
        return <StylesPanel />;
    }
  };

  return (
    <div
      className="fixed top-0 right-0 h-full bg-white shadow-lg z-50 transition-all duration-300 top-12"
      style={{ width: INSPECTOR_DRAWER_WIDTH }}
    >
      <Tabs value={selectedSidebarTab} onValueChange={setSidebarTab} className="w-full">
        <div className="p-4 border-b border-dashed border-neutral-100">
          <TabsList className="flex border-b">
            <TabsTrigger value="styles">Styles</TabsTrigger>
            <TabsTrigger value="block-configuration">Inspect</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={selectedSidebarTab}>
          <div className="overflow-auto h-[calc(100vh-97px)]">{renderCurrentSidebarPanel()}</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
