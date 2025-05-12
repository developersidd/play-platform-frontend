import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import UserProvider from "@/providers/UserProvider";
import { Nunito } from "next/font/google";
import "./globals.css";
const nunito = Nunito({
  weight: ["300", "400", "500", "600", "700", "900"],
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata = {
  title: "Youtube Clone",
  description: "Explore || Enjoy || Share || Learn",
};

export default function RootLayout({ children }) {
  console.log("RootLayout");
  return (
    <html lang="en">
      <body className={`${nunito.variable}`}>
        <UserProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </UserProvider>
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
