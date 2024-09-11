import { Header } from "@/widgets/header";
import { Toaster } from "@/shared/ui/sonner";
import React from "react";
import { FOOTER_HEIGHT, HEADER_HEIGHT } from "@/shared/config/const";

export default function WithHeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <Header />
      <div
        style={{
          minHeight: `calc(100dvh - ${HEADER_HEIGHT})`,
        }}
      >
        {children}
      </div>
      <footer
        className="border border-t flex"
        style={{
          height: FOOTER_HEIGHT,
        }}
      >
        <div className="container flex-1 items-center flex flex-col py-8 md:flex-row text-sm text-muted-foreground">
          Created by @groupname
        </div>
      </footer>
    </div>
  );
}
