import React, { useState, useEffect } from 'react';

export default function Alike(props) {
    const [data, setData] = useState(null);

    const cards = [];
    useEffect(() => {
        fetch(`http://localhost:8088/alike_cars?type=${props.car.cartype}&paint_color=${props.car.paint_color}&price=${props.car.price}`)
          .then(response => response.json())
          .then(json => {
                setData(json)
                for(let a of data) {
                    cards.push(<Card id = {a.paint_color}></Card>)
                }
            })
          .catch(error => console.error(error));
      }, []);

    return (
        <div className="flex flex row">
            {cards}
        </div>
    )
}

export function Card(props) {
    return (
    <div>
        hello {props.id}
    </div>
    )
}