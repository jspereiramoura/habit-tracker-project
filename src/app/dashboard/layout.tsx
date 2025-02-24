import { Metadata } from "next";
import Sidebar from "../_components/sidebar";

export const metadata: Metadata = {
  title: "Owl Dashboard",
  description: "Acompanhe seus hábitos e alcance seus objetivos!",
};

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="
      h-dvh w-dvw 
      flex flex-row
      overflow-x-hidden
    ">
      <Sidebar className="flex-none" />
      <div className="flex-grow">
        {children}
      </div>
    </main>
  );
}
