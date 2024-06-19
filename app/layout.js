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
  title: "Sell Up",
  description: "Market place for side projects",
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <NextAuthProvider>
          
<head>
  
<link rel="shortcut icon" href="images/favicon.jpg" />
<script async src="https://tally.so/widgets/embed.js"></script>

<meta property="og:image" content="https://i.ibb.co/Bc10XpB/sellup.jpg" />

</head>
      <body className={inter.className} >
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
					<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
				) : null}
      
          <div className="flex flex-col">
           
            <div className="flex-grow bg-page text-default-text">
       <AppRouterCacheProvider>
       <ThemeProvider theme={theme}>
   
       <Navbar />
 
       {children}
       <Footer/>
       </ThemeProvider>
        </AppRouterCacheProvider>  
      
   
    
    </div>





   

          </div>
     
       
      </body>



        </NextAuthProvider>
    </html>
  );
}
