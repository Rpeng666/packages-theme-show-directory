'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { ScrollArea, ScrollBar } from '../../components/scroll-area';
import {
  Tabs as TabsComponent,
  TabsList,
  TabsTrigger,
} from '../../components/tabs';
import { useConsoleBridge } from '../console/bridge';
import { cn } from '../../lib/utils';
import { Tab } from '../../contracts/features/common';

export function Tabs({
  tabs,
  size,
}: {
  tabs: Tab[];
  size?: 'sm' | 'md' | 'lg';
}) {
  const router = useRouter();
  const { routerPush } = useConsoleBridge();
  const push = routerPush ?? ((url: string) => router.push(url));
  const [tabName, setTabName] = useState(
    tabs?.find((tab) => tab.is_active)?.name || ''
  );
  const [tab, setTab] = useState({} as Tab);

  useEffect(() => {
    if (tabName) {
      const currentTab =
        tabs?.find((tab) => tab.name === tabName) || ({} as Tab);
      if (currentTab.url) {
        push(currentTab.url);
        // setTab(currentTab);
      }
    }
  }, [tabName]);

  return (
    <div className="relative mb-8">
      <ScrollArea className="w-full lg:max-w-none">
        <div className="flex items-center space-x-2">
          <TabsComponent value={tabName} onValueChange={setTabName}>
            <TabsList className={cn(size === 'sm' && 'h-8')}>
              {tabs.map((tab, idx) => (
                <TabsTrigger key={idx} value={tab.name || ''}>
                  {tab.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </TabsComponent>
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
}
