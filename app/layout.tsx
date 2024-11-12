import { Metadata } from "next"
import { Header } from "../components/Header/Header"
import '../styles/globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | Testausserveri',
    default: 'Testausserveri',
  },
}

const pages = [
  { label: "Etusivu", path: "/" },
  //{ label: "Jäsenet", path: "/members" },
  { label: "Syslog", path: "/syslog" },
  { label: "Projektit", path: "/projects" },
  /*{ label: "Palvelintila", path: "/host" },
  { label: "Koneet kiertoon", path: "/koneet-kiertoon" },*/
  { label: "Tietoa meistä", path: "/about" },
  //{ label: "Tietoa", path: "/about-us" }
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fi">
      <body>
        <div className="main">
          <Header 
            pages={pages}
            authenticated={{}} />
          {children}
        </div>
      </body>
    </html>
  )
}
