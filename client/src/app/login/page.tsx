"use client";
import React, { useState } from 'react';
import LoginService from '../api/hello/loginService';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

async function onSubmit(router: AppRouterInstance, event: React.FormEvent<HTMLFormElement>, setColor: (color: string) => void) {
    event.preventDefault()
    const target = event.target as HTMLFormElement;

    // @ts-expect-error
    const success = await LoginService.Login(target.elements["email"].value, target.elements["password"].value);
    if(success) {
        router.push("/");
        router.refresh();
    } else {
        setColor("red");
    }
}

export default function Page() {
    const router = useRouter();
    const [color, setColor] = useState("gray");

    return (
        <section>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[calc(100vh-65px)] lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-black dark:text-black">
                    <img className="h-8 mr-2" src="/Logo.png" alt="logo" />
                    Berkild's Bimmer-Biks
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Log ind på din konto
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={e => onSubmit(router, e, setColor)}>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
                                <input type="email" name="email" id="email" className={`bg-gray-50 border border-${color}-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-${color}-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="lars@bilelsker.dk" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className={`bg-gray-50 border border-${color}-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-${color}-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                    <label className="text-gray-500 dark:text-gray-300">Husk mig</label>
                                    </div>
                                </div>
                                {/*<a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>*/}
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Log ind</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Har du ikke en konto endnu? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Registrer</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
