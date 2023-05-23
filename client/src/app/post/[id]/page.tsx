"use client";
import Recommended from "./recommended";
import Post from "./post"
import React, { useState, useEffect } from 'react';
import CarService, {DefaultCar} from "@/app/api/hello/carService";

export default function Page({ params, searchParams }) {
  const [data, setData] = useState({car: DefaultCar, rec: [DefaultCar]});
  useEffect(() => {
    const car = CarService.GetPost(params.id).then(car => {
      CarService.GetRecommended(car).then(rec => {
        setData({car, rec});
      });
    });
  }, []);

  return(
    <div>
      <Post car={data.car}></Post>
      <hr />
      <h1>Recommnended cars:</h1>
      <Recommended cars={data.rec}></Recommended>
    </div>
  )
}