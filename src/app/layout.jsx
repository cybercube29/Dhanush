import { Providers } from "@/store/providers";
import NextTopLoader from 'nextjs-toploader';
import MyApp from './app';
import GlobalUserLoader from "./components/shared/GlobalUserLoader";
import "./global.css";
import { Lato, Montserrat, JetBrains_Mono } from "next/font/google";


const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["400", "700"], // normal + bold
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["500", "700"], // medium + bold
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${lato.variable} ${montserrat.variable} ${jetbrains.variable}`}>
      <body>
        <NextTopLoader color="#5D87FF" />
        <Providers>
          <GlobalUserLoader />
          <MyApp>{children}</MyApp>
        </Providers>
      </body>
    </html>
  );
}