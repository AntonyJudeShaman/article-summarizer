import { DM_Sans, JetBrains_Mono as FontMono, Inter as FontSans, Poppins } from "next/font/google"
import LocalFont from 'next/font/local'

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'latin-ext', 'devanagari'],
  variable: '--font-pops',
})

export const dm_sans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dmsans',
})

export const calSans = LocalFont({
  src: '../public/CalSans-SemiBold.ttf',
  variable: '--font-calsans',
})