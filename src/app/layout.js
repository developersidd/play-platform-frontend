import { Toaster } from "@/components/ui/sonner";
import UserProvider from "@/providers/UserProvider";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-opensans",
});

export const metadata = {
  title: "Youtube Clone",
  description: "Explore || Enjoy || Share || Learn",
};

export default function RootLayout({ children }) {
  console.log("RootLayout");
  return (
    <html lang="en">
      <body className={`${openSans.variable} `}>
        <UserProvider>{children}</UserProvider>
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
