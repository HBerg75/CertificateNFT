"use client";

import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { ConnectButton } from "./connect-button";

export function NavUser() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <ConnectButton />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
