import type React from "react"
import type { Metadata } from "next"
import { Quicksand, Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

// Load Quicksand for body text
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
})

// Load Inter for headings
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Mystic Services",
  description: "MysticGen | #1 Sites We are the best beaming site out there!",
  icons: {
  icon: "👑",        // <- Change this emoji or use a URL
  shortcut: "👑",    // <- Change this too
  apple: "👑",       // <- And this
},
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} ${inter.variable} font-sans`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
