import React, { useEffect, useState} from 'react';
import getRooms from '@/pages/api/room';
import { useRouter } from 'next/router';
import {getSession, useSession} from "next-auth/react";
import {session} from "next-auth/core/routes";


export default function ListofRooms() {
    const [roomName, setRoomName] = useState<any>([]);
    const router = useRouter();
    const {data:session} = useSession();

    useEffect(() => {
        getRooms().then((data) => setRoomName(data)); //On affecte les données retourner avec la fonction getRooms a notre state
    },  [])


    function handleClick(idRoom:any,uuid: any, id: any){
        var jsonDatas = {idRoom:idRoom,uuid:uuid , idUser: id};
        var url='http://127.0.0.1:8090/api/rooms/' + uuid + '/users/' + id;
        fetch(url, {  // Enter your IP address here
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(jsonDatas) // body data type must match "Content-Type" header

        })
        console.log(jsonDatas)
        router.push({
            pathname: '/RoomPage',
            query: { idRoom: idRoom,idUser: id },
        })

    }
    return (
        <div>
            <h1>Room</h1>
           {roomName.map((item:any, index:number)=>{ //On parcours le state à l'aide de "map", on définit chaque clé du tableau sur item
               let UUID = item.uuid;
               let idRoom= item.id;
               let id = session?.user?.user.id;//remplace le user co
               console.log(id);
               return (
                    <div key={item.id}>
                        <h1 >{item.name}</h1>
                        <p id={UUID}>UUID: {item.uuid}</p>
                        <button onClick={
                            ()=>handleClick(idRoom,UUID, id)
                        }>Se connecter a la room</button>
                    </div>
                )
                }
            )
           }
        </div>
    )
}