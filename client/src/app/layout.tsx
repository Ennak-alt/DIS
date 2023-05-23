'use client';

import { Navbar } from "flowbite-react";
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="">
        <div className="bg-indigo-600 px-4 py-3 text-white">
          <p className="text-center text-sm font-medium">
            Love Alpine JS?
            <a href="#" className="inline-block underline">Check out this new course!</a>
          </p>
        </div>
        <Navbar
          fluid={true}
          rounded={true}
        >
          <Navbar.Brand href="https://flowbite.com/">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              PING!
            </span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Navbar.Link
              href="/www"
              active={true}
            >
              Home
            </Navbar.Link>
            <Navbar.Link href="/www/about.html">
              About
            </Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
        <div className="">
          {children}
        </div>
      </body>
    </html>
  )
}
