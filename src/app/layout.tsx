import { ReactNode } from "react";
import { Open_Sans } from "next/font/google";
import Header from "./components/Header";
import { Providers } from "@/redux/provider";
import "./styles/globals.css";

const OpenSans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Ecommerce.GG",
  description: "O maior e melhor site de periféricos gamer",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={OpenSans.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
