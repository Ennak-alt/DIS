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
    fetch('http://localhost:8080/ping/')
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
      <React.Fragment>
        <Table>
          <Table.Head>
            <Table.HeadCell>
              Call
            </Table.HeadCell>
            <Table.HeadCell>
              Ping
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {datalist.map((value, index) => {
              return (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {index}
                  </Table.Cell>
                  <Table.Cell>
                    {value}
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
        <Button size="xl" onClick={() => { setClosed(true); pong() }}>
          PING IT!
        </Button>
        <Modal
          show={closed}
          onClose={() => setClosed(false)}
        >
          <Modal.Header>
            Pong message
          </Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {data}
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setClosed(false)}>
              Nice!
            </Button>
            {/* <Button
              color="gray"
              onClick={() => setClosed(false)}
            >
              Decline
            </Button> */}
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    </div>

  )
}
