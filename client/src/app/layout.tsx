'use client';

import './globals.css'
import Image from 'next/image';
import UserCard from './user/userCard';
import LoginService from './api/loginService';
import Link from 'next/link';
import NoSsr from './noSsr';

function CardOrLogin() {
    const logindata = LoginService.GetLoginData();

    if(logindata != null) {
        return <UserCard own={true} clickable={true} {...logindata}></UserCard>
    }
    else {
        return (
            <div className="sm:flex sm:gap-4">
                <Link className="block rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700" href="/login">
                    Login
                </Link>
                <Link className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-blue-600 transition hover:text-teal-600/75 sm:block" href="/register">
                    Register
                </Link>
            </div>
        );
    }
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className="">
            <header aria-label="Site Header" className="bg-white top-0 sticky z-50">
            <div
                className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8"
            >
                <a className="block text-teal-600" href="/">
                <span className="sr-only">Home</span>
                <Image src="/Logo.png" width={80} height={80}/>
                </a>

                <div className="flex flex-1 items-center justify-end md:justify-between">
                <nav aria-label="Site Nav" className="hidden md:block">
                    <ul className="flex items-center gap-6 text-sm">
                    <li>
                        <a className="text-gray-500 transition hover:text-gray-500/75" href="/posts">
                        All cars
                        </a>
                    </li>
                    <li>
                        <a className="text-gray-500 transition hover:text-gray-500/75" href="/">
                        SUVs
                        </a>
                    </li>
                    <li>
                        <a className="text-gray-500 transition hover:text-gray-500/75" href="/">
                        Pickups
                        </a>
                    </li>
                    <li>
                        <a className="text-gray-500 transition hover:text-gray-500/75" href="/">
                        Coupes
                        </a>
                    </li>
                    <li>
                        <a className="text-gray-500 transition hover:text-gray-500/75" href="/">
                        Hatchbacks
                        </a>
                    </li>
                    <li>
                        <a className="text-gray-500 transition hover:text-gray-500/75" href="/">
                        Mini-vans
                        </a>
                    </li>
                    <li>
                        <a className="text-gray-500 transition hover:text-gray-500/75" href="/">
                        Sedans
                        </a>
                    </li>
                    <li>
                        <a className="text-gray-500 transition hover:text-gray-500/75" href="/">
                        Offroaders
                        </a>
                    </li>
                    <li>
                        <a className="text-gray-500 transition hover:text-gray-500/75" href="/">
                        Convertibles
                        </a>
                    </li>
                    <li>
                        <a className="text-gray-500 transition hover:text-gray-500/75" href="/">
                        Buses
                        </a>
                    </li>
                    </ul>
                </nav>

                <div className="flex items-center gap-4">
                    <NoSsr><CardOrLogin></CardOrLogin></NoSsr>

                    <button
                    className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
                    >
                    <span className="sr-only">Toggle menu</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                    </button>
                </div>
                </div>
            </div>
            </header>

            <div className="">
            {children}
            </div>
        </body>
        </html>
    )
}
