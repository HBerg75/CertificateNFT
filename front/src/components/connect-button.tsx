"use client";

import { Loader2, Wallet } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import { SidebarMenuButton } from "./ui/sidebar";

interface WalletConnectModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect: () => void;
}

export function ConnectButton() {
  const { open } = useWeb3Modal();
  const { address } = useAccount();
  return (
    <>
      <SidebarMenuButton onClick={() => open()}>
        <Wallet className="mr-2 h-4 w-4" />
        {address ? "Wallet Connected" : "Connect Wallet"}
      </SidebarMenuButton>
    </>
  );
}

export function WalletModal({
  isOpen,
  onOpenChange,
  onConnect,
}: WalletConnectModalProps) {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate connection delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsConnecting(false);
    onConnect();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>
            Choose a wallet to connect to our app
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button onClick={handleConnect} disabled={isConnecting}>
            {isConnecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="mr-2 h-4 w-4" />
                Connect MetaMask
              </>
            )}
          </Button>
          {/* Add more wallet options here */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
