import { useEffect, useState } from 'react';
import getRooms from "@/pages/api/room";

export default function Rooms() {
    const [roomName, setRoomName] = useState<any>([]);

    useEffect(() => {
        getRooms().then((data) => setRoomName(data)); //On affecte les données retourner avec la fonction getRooms a notre state
    },  [])

    return (
        <div>
            <h1>Room</h1>
            {roomName.map((item:any, index:number)=>{ //On parcourt le state à l'aide de "map", on définit chaque clé du tableau sur item
                return (
                    <div key={item.id}> {/*Clé unique, ici id qui permet d'identifier l'élément du DOM (site)*/}
                        {item.name} {/*On peut utliser item + la clé*/}
                        {item.description}
                        {item.points}
                    </div>
                )
            })}
        </div>
    )
}