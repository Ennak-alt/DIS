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
      <div className='h-screen flex items-center justify-center'>
         <section class="mb-40">
          <div class="text-center text-gray-800 py-24 px-6">
            <h1 class="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">The best used car market<br /><span class="text-blue-600">for you.</span></h1>
            <a class="inline-block px-7 py-3 mr-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="light" href="/posts/" role="button">Browse cars</a>
            <a class="inline-block px-7 py-3 bg-transparent text-blue-600 font-medium text-sm leading-snug uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="light" href="login" role="button">Register</a>
          </div>
        </section>
      </div>
  )
}
