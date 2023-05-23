'use client';
import './globals.css'
// import { Inter } from 'next/font/google'
import React, { useEffect, useState } from 'react'
import { Card, Modal, Button, Table } from "flowbite-react";

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [data, setData] = useState("")

  const [datalist, setDataList] = useState<string[]>([])

  const [closed, setClosed] = useState(false)

  // useEffect(() => {
  //   fetch('http://localhost:8080/ping/')
  //     .then((res) => {
  //       return res.json()
  //     })
  //     .then((data) => {
  //       console.log(data)
  //       setData(data.message)
  //       datalist.push(data.message)
  //       setDataList(datalist)
  //     })
  //   console.log(data)
  // }, [])

  const pong = () => {
    fetch('http://localhost:8088/ping')
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log(data)
        setData(data.message)
        datalist.push(data.message)
        setDataList(datalist)
      })
  }

  return (
    <div className="">
      <section
        className="relative bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)] bg-cover bg-center bg-no-repeat"
      >
        <div
          className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
        ></div>

        <div
          className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
        >
          <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Let us find your

              <strong className="block font-extrabold text-rose-700">
                Forever Home.
              </strong>
            </h1>

            <p className="mt-4 max-w-lg sm:text-xl/relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo
              tenetur fuga ducimus numquam ea!
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-center">
              <a
                href="#"
                className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
              >
                Get Started
              </a>

              <a
                href="#"
                className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>




    </div>

  )
}
