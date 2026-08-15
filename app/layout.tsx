import type { Metadata } from "next";
import {
  Montserrat,
  Poppins,
  Albert_Sans,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AttendTrack",
  description: "An attendance system for students and teachers.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`
        ${montserrat.variable}
        ${poppins.variable}
        ${albertSans.variable}
        ${spaceGrotesk.variable}
        h-screen antialiased
      `}
    >
      <body className="min-h-screen h-screen flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
