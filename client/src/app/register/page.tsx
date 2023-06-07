"use client";
import React, { useState } from 'react';
import LoginService from '../api/loginService';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import Link from 'next/link';

interface RegisterFormColors {
    namecolor: string,
    emailcolor: string,
    passwordcolor: string,
    passwordrcolor: string,
    acceptcolor: string,
}
const DefaultColors: RegisterFormColors = {
    namecolor: "gray",
    emailcolor: "gray",
    passwordcolor: "gray",
    passwordrcolor: "gray",
    acceptcolor: "gray",
}

async function onSubmit(router: AppRouterInstance, event: React.FormEvent<HTMLFormElement>, setColor: (color: RegisterFormColors) => void) {
    event.preventDefault()
    const target = event.target as HTMLFormElement;

    // @ts-expect-error
    let [name, email, password, passwordr, accept] = [target.elements["name"].value, target.elements["email"].value, target.elements["password"].value, target.elements["passwordr"].value, target.elements["remember"].checked];

    if(name.split(" ") < 2 || !/^[A-Za-zÆØÅæøå\- ]+$/.test(name)) {
        setColor({...DefaultColors, namecolor: 'red'});
        return;
    } else if(!/^[A-Za-z0-9+\-_~]+@[A-Za-z0-9+\-_~]+\.[A-Za-z0-9+\-_~]+$/.test(email)) {
        setColor({...DefaultColors, emailcolor: 'red'});
        return;
    } else if(password.length < 4) {
        setColor({...DefaultColors, passwordcolor: 'red'});
        return;
    } else if(password != passwordr) {
        setColor({...DefaultColors, passwordrcolor: 'red'});
        return;
    } else if(!accept) {
        setColor({...DefaultColors, acceptcolor: 'red'});
        return;
    }
    
    const success = await LoginService.Register(name, email, password);
    if(success) {
        router.push("/");
        router.refresh();
    } else {
        // User most likely already exists
        setColor({...DefaultColors, emailcolor: 'red'});
    }
}

export default function Page() {
    const router = useRouter();
    const [{namecolor, emailcolor, passwordcolor, passwordrcolor, acceptcolor}, setColor] = useState(DefaultColors);

    return (
        <section>
            <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-[calc(100vh-65px)] lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-black dark:text-black">
                    <img className="h-8 mr-2" src="/Logo.png" alt="logo" />
                    Berkild's Bimmer-Biks
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Register new account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={e => onSubmit(router, e, setColor)}>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full name</label>
                                <input type="name" name="name" id="name" className={`bg-gray-50 border border-${namecolor}-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-${namecolor}-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="Lars Hurtigkarl" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
                                <input type="email" name="email" id="email" className={`bg-gray-50 border border-${emailcolor}-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-${emailcolor}-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="lars@carlover.com" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className={`bg-gray-50 border border-${passwordcolor}-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-${passwordcolor}-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat Password</label>
                                <input type="password" name="passwordr" id="passwordr" placeholder="••••••••" className={`bg-gray-50 border border-${passwordrcolor}-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-${passwordrcolor}-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                    <label className={`text-${acceptcolor}-500 dark:text-${acceptcolor}-300`}>I accept the privacy policy, and know, that I am actively opting to sell my soul, and my firstborn to Berkild</label>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Register</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Do you already have an account? <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Log in</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
