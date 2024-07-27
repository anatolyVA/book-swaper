import { Header } from "@/widgets/header";
import { Toaster } from "@/shared/ui/sonner";
import React from "react";

export default function WithHeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <Header />
      {children}
    </div>
  );
}
