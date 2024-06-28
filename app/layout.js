import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "./Providers";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../app/theme'
import Footer from '../components/Footer'
import GoogleAnalytics from "@/lib/googleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GitBlog",
  description: "Turn code commits into compelling blog posts ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="images/favicon.png" />

        <meta property="og:image" content="https://i.ibb.co/XW9nnjg/gitblog-logo-custom.png" />
      </head>
      <body className={inter.className}>
        <NextAuthProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <div className="flex flex-col">
                <div className="flex-grow bg-page text-default-text">
                  <Navbar />
                  {children}
                  <Footer />
                </div>
              </div>
              {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
                <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
              ) : null}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}