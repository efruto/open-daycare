import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/app/components/mobile-header";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OpenDayCare",
  description: "El día de cada niño, compartido con su familia.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${fredoka.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MobileHeader />
        <div className="flex">
          <Sidebar />
          <main className="min-w-0 flex-1 lg:h-screen lg:overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
