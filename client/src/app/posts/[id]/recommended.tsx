import {Car} from "@/app/api/hello/carService";
import { Card } from "../card";

export default function Alike(props: {cars: Car[]}) {
    const cards = [];
    for(let c of props.cars) {
        cards.push(<Card car={c}/>)
    }

    return (
        <div className='flex gap-7 justify-around'>
            <div className='grid grid-cols-1 md:grid-cols-2 place-content-center'>
            {cards}
            </div>
        </div>
    )
}