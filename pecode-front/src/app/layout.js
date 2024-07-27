import './globals.css'

export const metadata = {
  title: 'Pecode | Blog',
  description: 'Test project for Pecode',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
