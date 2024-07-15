import { Header } from "@/widgets/header";
import { Toaster } from "@/shared/ui/sonner";

export default function WithHeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
