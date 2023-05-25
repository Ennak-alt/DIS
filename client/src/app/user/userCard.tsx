'use client';

import Link from "next/link"
import LoginService from "../api/hello/loginService"
import { useRouter } from "next/navigation";
import { useState } from "react";
import UserService from "../api/hello/userService";

function ConditionalLink(props: {children: JSX.Element | JSX.Element[], href: string | null, onClick?: () => Promise<void>}) {
    if(props.href != null) {
        return <Link href={props.href} onClick={props.onClick}>{props.children}</Link>
    } else if(props.onClick != undefined) {
        return <a onClick={props.onClick}>{props.children}</a>;
    }
    return <a>{props.children}</a>;
}

function Rating(props: {rating: number, numRatings: number, userRating: number, uid: string}) {
    let [{overwriteRating, overwriteUserRating}, setState] = useState<{overwriteRating?: number | null, overwriteUserRating: number | null}>({overwriteRating: null, overwriteUserRating: null});
    const userdata = LoginService.GetLoginData();

    function resetRating() {
        setState({overwriteRating: null, overwriteUserRating});
    }
    function setRating(rating: number) {
        if(userdata == null || userdata.uid == props.uid) return;
        setState({overwriteRating: rating, overwriteUserRating});
    }
    function addRating(userRating: number) {
        if(userdata == null || userdata.uid == props.uid) return;
        UserService.SetRating(props.uid, userRating).then(success => {
            if(success) {
                //alert("Rating submitted");
                setState({overwriteRating, overwriteUserRating: userRating});
            }
            //else alert("Error"); TODO
        });
    }
    let rating = overwriteRating ?? props.rating;
    let userRating = overwriteUserRating ?? props.userRating;
    let numRatings = props.numRatings;
    if(userRating != -1) {
        if(overwriteRating == null) rating = (rating * props.numRatings + userRating) / (props.numRatings + 1);
        ++numRatings;
    }

    const stars = [];
    for(let i = 0; i < Math.floor(rating); ++i) {
        stars.push(<img src="/full_star.svg" onMouseEnter={() => setRating(i+1)} onClick={() => addRating(i+1)} onMouseLeave={resetRating} className="inline h-3 aspect-square border-none w-4 cursor-pointer"></img>);
    }
    if(stars.length < 5) {
        const rest = rating - Math.floor(rating);
        if(rest >= 0.75) {
            stars.push(<img src="/full_star.svg" onMouseMove={() => setRating(Math.floor(rating + 1))} onClick={() => addRating(Math.floor(rating + 1))} onMouseLeave={resetRating} className="inline h-3 aspect-square border-none w-4 cursor-pointer"></img>);
        } else if(rest < 0.25) {
            stars.push(<img src="/empty_star.svg" onMouseMove={() => setRating(Math.floor(rating + 1))} onClick={() => addRating(Math.floor(rating + 1))} onMouseLeave={resetRating} className="inline h-3 aspect-square border-none w-4 cursor-pointer"></img>);
        } else {
            stars.push(<img src="/half_star.svg" onMouseMove={() => setRating(Math.floor(rating + 1))} onClick={() => addRating(Math.floor(rating + 1))} onMouseLeave={resetRating} className="inline h-3 aspect-square border-none w-4 cursor-pointer"></img>);
        }
        
        for(let i = stars.length; i < 5; ++i) {
            stars.push(<img src="/empty_star.svg" onMouseMove={() => setRating(i + 1)} onClick={() => addRating(i + 1)} onMouseLeave={resetRating} className="inline h-3 aspect-square border-none w-4 cursor-pointer"></img>);
        }
    }

    return <a style={rating == -1 ? {"opacity": 0.5} : {}}>{stars}<span className="text-xs">({numRatings})</span></a>;
}

export default function UserCard(props: {uid: string, name: string, userRating?: number, rating?: number, numRatings: number, own: boolean, clickable: boolean}) {
    const router = useRouter();

    let extra;
    if(props.own) {
        extra = <ConditionalLink href={null} onClick={() => LoginService.Logout().then(router.refresh)}><span className="text-xs cursor-pointer">Log off</span></ConditionalLink>
    } else if(props.rating != undefined) {
        extra = <Rating rating={props.rating} numRatings={props.numRatings} userRating={props.userRating ?? -1} uid={props.uid}></Rating>
    }

    return (
        <div className="flex flex-wrap justify-center">
            <div className="m-auto h-12">
                <span>
                    <ConditionalLink href={props.clickable ? `/user/${props.uid}` : null}><img src="/Cars/SUV.jpeg" className="inline h-full rounded-full aspect-square border-none" /></ConditionalLink>
                </span>
                <div className="align-middle text-center" style={{display: "inline-block", lineHeight: "1.1em", paddingLeft: "0.75em"}}>
                    <ConditionalLink href={props.clickable ? `/user/${props.uid}` : null}><span className="font-semibold">{props.name}</span><br/></ConditionalLink>
                    {extra}
                </div>
            </div>
        </div>
    )
}
