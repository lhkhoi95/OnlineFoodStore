"use client"
import './globals.css'
import { Poppins } from 'next/font/google'
import LayoutProvider from './layoutProvider'
import { CartProvider } from 'use-shopping-cart'

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Grocer',
  description: 'A Quick and Safe Way of Online Groceries Store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} flex flex-col h-screen text-sm `}>
        <CartProvider
          mode="payment"
          cartMode="client-only"
          // Connects to your Stripe account
          stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
          // Redirected here after successful payments
          successUrl={`${process.env.NEXT_PUBLIC_URL}/success`}
          // Redirected here when you click back on Stripe Checkout
          cancelUrl={`${process.env.NEXT_PUBLIC_URL}/?success=false`}
          currency="GBP"
          // Only customers from UK will be able to purchase
          // Having this setting means that we will capture shipping address
          allowedCountries={["GB"]}
          // Enables local storage
          shouldPersist={true}
        >
          <LayoutProvider>
            <main className='container flex-grow'>{children}</main>
          </LayoutProvider>
        </CartProvider>
      </body>

    </html>
  )
}
