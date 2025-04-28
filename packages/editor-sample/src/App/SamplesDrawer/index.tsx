import React from 'react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent } from '@/components/ui/sheet';

import { useSamplesDrawerOpen } from '../../documents/editor/EditorContext';

import SidebarButton from './SidebarButton';
import logo from './waypoint.svg';

export const SAMPLES_DRAWER_WIDTH = 240;

export default function SamplesDrawer() {
  const samplesDrawerOpen = useSamplesDrawerOpen();

  return (
    <Sheet open={samplesDrawerOpen}>
      <SheetContent side="left" className="w-[240px] p-0">
        <div className="flex flex-col py-1 px-2 w-[240px] justify-between h-full space-y-3">
          <div className="space-y-2">
            EmailBuilder.js

            <div className="flex flex-col items-start">
              <SidebarButton href="#">Empty</SidebarButton>
              <SidebarButton href="#sample/welcome">Welcome email</SidebarButton>
              <SidebarButton href="#sample/one-time-password">One-time passcode (OTP)</SidebarButton>
              <SidebarButton href="#sample/reset-password">Reset password</SidebarButton>
              <SidebarButton href="#sample/order-ecomerce">E-commerce receipt</SidebarButton>
              <SidebarButton href="#sample/subscription-receipt">Subscription receipt</SidebarButton>
              <SidebarButton href="#sample/reservation-reminder">Reservation reminder</SidebarButton>
              <SidebarButton href="#sample/post-metrics-report">Post metrics</SidebarButton>
              <SidebarButton href="#sample/respond-to-message">Respond to inquiry</SidebarButton>
            </div>

            <Separator />

            <div className="flex flex-col">
              <Button size="sm" variant="ghost" asChild>
                <a href="https://www.usewaypoint.com/open-source/emailbuilderjs" target="_blank">
                  Learn more
                </a>
              </Button>
              <Button size="sm" variant="ghost" asChild>
                <a href="https://github.com/usewaypoint/email-builder-js" target="_blank">
                  View on GitHub
                </a>
              </Button>
            </div>
          </div>
          <div className="space-y-2 px-3 py-3">
            <a href="https://usewaypoint.com?utm_source=emailbuilderjs" target="_blank" className="inline-block leading-none">
              <img src={logo} width={32} alt="Waypoint logo" />
            </a>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1">
                Looking to send emails?
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Waypoint is an end-to-end email API with a &apos;pro&apos; version of this template builder with dynamic
                variables, loops, conditionals, drag and drop, layouts, and more.
              </p>
            </div>
            <Button variant="default" className="w-full justify-center" asChild>
              <a href="https://usewaypoint.com?utm_source=emailbuilderjs" target="_blank">
                Learn more
              </a>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
