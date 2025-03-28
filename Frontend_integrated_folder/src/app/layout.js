// import Head from "next/head"; // (Commented out) Can be used for custom metadata handling

import { Geist, Geist_Mono } from "next/font/google"; // Importing Google Fonts
import "./globals.css"; // Global CSS for styling
import Header from "../Components/home_components/Header"; // Header component
import Footer from "@/Components/home_components/Footer.components"; // Footer component
import Newsletter from "@/Components/home_components/Newsletter.components"; // Newsletter subscription component
import { SessionProvider } from "next-auth/react"; // NextAuth session provider for authentication (currently not in use)
import CountdownBanner from "@/Components/home_components/countDown_banner";

// Applying custom fonts with variable names
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata configuration for SEO
export const metadata = {
  title: "Diabetes | Free Website", // Page title for SEO
  description:
    "A free website dedicated to providing valuable information, resources, and products for managing diabetes. Stay informed, eat healthily, and live better with expert tips and organic product recommendations.", // Meta description for better search visibility
  icons: {
    icon: "/favicon.ico", // Website favicon
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CountdownBanner /> {/* Count Down banner */}
        {/* <SessionProvider> (Uncomment if authentication is required) */}
        <Header /> {/* Website header with navigation */}
        {children} {/* Dynamic page content */}
        <Newsletter /> {/* Newsletter subscription section */}
        <Footer /> {/* Footer section */}
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
