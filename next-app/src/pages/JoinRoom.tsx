import React from 'react';
import {useState, useEffect} from "react";

import getRooms from "@/pages/api/room";

import Room from "@/pages/Room";



export default function Rooms() {
    const [rooms,setRooms] = useState([]);

    useEffect(() => {
        getRooms().then((data) => setRooms(data))
    }, [])


    return (
        <div id="container">
            <h1>Rooms</h1>
            {rooms.map((item, index) => {
                <Room key={item.id} props={item}/>
            })}
        </div>
    );

}
