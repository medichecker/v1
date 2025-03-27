import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import CustomCursor from "@/components/custom-cursor"

const poppins = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
})

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "veyra",
  description: "Save money on your medical bills with expert advocacy",
    generator: 'v0.dev'
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


// export default function RootLayout({ children }: RootLayoutProps): React.ReactElement {
//   return (
//     <html lang="en">
//       <body>
//         {children}
//         <CustomCursor />
//       </body>
//     </html>
//   )
// }



import './globals.css'