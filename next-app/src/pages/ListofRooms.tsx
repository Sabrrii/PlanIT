import React, { useEffect, useState } from 'react';
import getRooms from "@/pages/api/room";
import getStory from "@/pages/api/story";

export default function ListofRooms() {
    const [roomName, setRoomName] = useState<any>([]);

    useEffect(() => {
        getRooms().then((data) => setRoomName(data)); //On affecte les données retourner avec la fonction getRooms a notre state
    },  [])


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // empêche la soumission du formulaire d'actualiser la page
    }

    function handleClick(uuid: any, id: any){
        var jsonDatas = {uuid:uuid , idUser: id};
        var url='http://127.0.0.1:8090/api/rooms/' + uuid + '/users/' + id;
        fetch(url, {  // Enter your IP address here

            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(jsonDatas) // body data type must match "Content-Type" header

        })
        console.log(jsonDatas)
    }
    return (
        <div>
            <h1>Room</h1>
           {roomName.map((item:any, index:number)=>{ //On parcourt le state à l'aide de "map", on définit chaque clé du tableau sur item
               let UUID = item.uuid;
               let id = 1;//remplace le user co 
               return (
                    <div key={item.id}>
                        <h1 >{item.name}</h1>
                        <p id={UUID}>UUID: {item.uuid}</p>
                        <button onClick={
                            ()=>handleClick(UUID, id)
                        }>Se connecter a la room</button>
                    </div>
                )
                }
            )
           }
        </div>
    )
}