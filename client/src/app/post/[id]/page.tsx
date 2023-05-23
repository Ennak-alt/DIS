"use client";
import Recommended from "./recommended";
import Post from "./post"
import React, { useState, useEffect } from 'react';
import CarService, {DefaultCar} from "@/app/api/hello/carService";

export default function Page({ params, searchParams }) {
  const [data, setData] = useState({car: DefaultCar, alike: [DefaultCar]});
  const {car, alike} = data;
  useEffect(() => {
    const car = CarService.GetPost(params.id).then(car => {
      CarService.GetAlike(car).then(alike => {
        setData({car, alike});
      });
    });
  }, []);

  return(
    <div>
      <Post car={data.car}></Post>
      <hr />
      <Recommended cars={data.alike}></Recommended>
    </div>
  )
}