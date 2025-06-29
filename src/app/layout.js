import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import UserProvider from "@/providers/UserProvider";
import { Nunito } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
//import "./theme.css";
import UserInitializer from "@/components/User-initializer/UserInitializer";
import NextTopLoader from "nextjs-toploader";
import { retrieveCurrentUser } from "@/api/user.api";
const nunito = Nunito({
  weight: ["300", "400", "500", "600", "700", "900"],
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata = {
  title: "Youtube Clone",
  description: "Explore || Enjoy || Share || Learn",
};

const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

export const viewport = {
  themeColor: META_THEME_COLORS.light,
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const { data: user, error } = await retrieveCurrentUser();
  console.log(" user:", user)
  console.log(" error:", error)

  const activeThemeValue = cookieStore.get("active_theme")?.value;
  const isScaled = activeThemeValue?.endsWith("-scaled");

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        className={cn(
          "bg-background overflow-hidden overscroll-none font-sans antialiased",
          activeThemeValue ? `theme-${activeThemeValue}` : "",
          isScaled ? "theme-scaled" : "",
          nunito.variable
        )}
      >
        <NextTopLoader color="#AE7AFF" showSpinner={false} />

        <UserProvider>
          <UserInitializer />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
            enableColorScheme
          >
            {children}
          </ThemeProvider>
        </UserProvider>
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
