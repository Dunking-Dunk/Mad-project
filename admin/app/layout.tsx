import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Script from "next/script"
import ThemeProvider from '@/components/theme-provider'
import Header from '@/components/Header'
import { getUser } from '@/service/authService'
import Provider from '@/components/state-provider'
import BusProvider from '@/components/BusProvider'
import { getAllBus } from '@/service/bus'
import { getAllTracker } from '@/service/bus'
import { getAllStops } from "@/service/stop"
import { getAllDrivers } from '@/service/driver'
import { getAllAnnouncements } from '@/service/announcement'
import { Toaster } from "@/components/ui/toaster"

const inter = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Real Time Tracking',
  description: 'Public transport tracking',
}

export default async function RootLayout({
  children, login
}: {
  children: React.ReactNode,
  login: React.ReactNode
}) {
  const user = await getUser()
  const buses = await getAllBus()
  const stops = await getAllStops()
  const trackers = await getAllTracker()
  const drivers = await getAllDrivers()
  const announcements = await getAllAnnouncements()

  const Main = () => {
    return (
      <div className='px-12 h-full w-full'>
        <BusProvider buses={buses} stops={stops} trackers={trackers} drivers={drivers} announcements={announcements}>
          <Header user={user} />
          {children}
        </BusProvider>
      </div>
    )
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <Script
          async
          defer
          strategy='beforeInteractive'
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAaCWjzUJ1XziqSuWycOTNorOmfe2swDIc&libraries=places&callback=Function.prototype"
        />
        <ThemeProvider attribute='class' defaultTheme="system" enableSystem>
          <Provider>
            {user.currentUser ? <Main /> : login}
          </Provider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
