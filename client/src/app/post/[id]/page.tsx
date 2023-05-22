"use client";
import Alike from "./alike";
import Single from "./single"
import React, { useState, useEffect } from 'react';
import CarService, {DefaultCar} from "@/app/api/hello/carService";

export default function Page({ params, searchParams }) {
  const [data, setData] = useState({car: DefaultCar, alike: [DefaultCar]});
  const {car, alike} = data;
  useEffect(() => {
      try {
      const car = CarService.GetPost(params.id).then(car => {
        CarService.GetAlike(car).then(alike => {
          setData({car, alike});
        });
      });
    } catch (e) {
      console.log(e)
    }
    }, []);

  return(
    <div>
      <Single car={data.car}></Single>
      <hr />
      <Alike cars={data.alike}></Alike>
    </div>
  )
}