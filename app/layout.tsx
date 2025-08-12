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
    icon: "https://media.discordapp.net/attachments/1401727715564064963/1404962977043447981/mystic_gen_pulse_final.gif?ex=689d193c&is=689bc7bc&hm=9feefea11ae165ed12e420a091d1ea41c16c4f7f6ea5a7b012730e3b15ae3bef&=",
    shortcut:
      "https://media.discordapp.net/attachments/1401727715564064963/1404962977043447981/mystic_gen_pulse_final.gif?ex=689d193c&is=689bc7bc&hm=9feefea11ae165ed12e420a091d1ea41c16c4f7f6ea5a7b012730e3b15ae3bef&=",
    apple:
      "https://media.discordapp.net/attachments/1401727715564064963/1404962977043447981/mystic_gen_pulse_final.gif?ex=689d193c&is=689bc7bc&hm=9feefea11ae165ed12e420a091d1ea41c16c4f7f6ea5a7b012730e3b15ae3bef&=",
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
