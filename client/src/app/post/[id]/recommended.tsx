import {Car} from "@/app/api/hello/carService";
import Image from 'next/image'
import Link from 'next/link';
import { Card } from "../card";

export default function Alike(props: {cars: Car[]}) {
    const cards = [];
    for(let c of props.cars) {
        cards.push(<Card car={c}/>)
    }

    return (
        <div className="flex flex row">
            {cards}
        </div>
    )
}