import { Fonts } from '@/fonts';
import './globals.css';

export const metadata = {
  title: 'casantiago',
  description: 'Personal site',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={Fonts.poppins.className} >{children}</body>
    </html>
  )
}
