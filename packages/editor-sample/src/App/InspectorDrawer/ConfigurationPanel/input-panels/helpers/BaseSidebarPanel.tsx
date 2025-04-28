import React from 'react';

type SidebarPanelProps = {
  title: string;
  children: React.ReactNode;
};
export default function BaseSidebarPanel({ title, children }: SidebarPanelProps) {
  return (
    <div className="p-4">
      <div className="text-xs uppercase text-muted-foreground mb-2 tracking-wider">{title}</div>
      <div className="flex flex-col gap-5 mb-3">
        {children}
      </div>
    </div>
  );
}
