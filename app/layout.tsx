import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

// 1. Initialize the Nunito font
const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {  
  title: {
    default: "FLOW | Modern Financial Dashboard",
    template: "%s | FLOW",
  },
  
  description: "Track your cash flow, manage transactions, and analyze your financial health with FLOW's intuitive and secure dashboard.",
  
  // Keywords (Less critical for Google today, but still good practice for other engines)
  keywords: ["finance", "dashboard", "expense tracker", "cash flow", "personal finance", "fintech"],
  
  authors: [{ name: "Your Name/Company" }],
  creator: "Your Name/Company",
  
  // Open Graph (For sharing links on iMessage, Slack, Discord, LinkedIn, Facebook)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "FLOW | Modern Financial Dashboard",
    description: "Track your cash flow, manage transactions, and analyze your financial health.",
    siteName: "FLOW",
    images: [
      {
        url: "/og-image.png", // Create a 1200x630 image and put it in your /public folder
        width: 1200,
        height: 630,
        alt: "FLOW Dashboard Preview",
      },
    ],
  },
  
  // Twitter Cards (For sharing links on X/Twitter)
  twitter: {
    card: "summary_large_image",
    title: "FLOW | Modern Financial Dashboard",
    description: "Track your cash flow, manage transactions, and analyze your financial health.",
    images: ["/og-image.png"], // Uses the same image from the public folder
    creator: "@yourtwitterhandle",
  },
  
  // Best practice for crawler indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      // 2. Apply nunito.className here to make it the default font for the whole app
      className={`${nunito.className} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}