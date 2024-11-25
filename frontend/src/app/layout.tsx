import type { Metadata } from "next";
import "../styles/globals.css";
import { jost } from "./fonts";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jost.className} bg-black`}
      >
        {children}
      </body>
    </html>
  );
}
