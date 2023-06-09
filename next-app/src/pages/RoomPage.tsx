import { useRouter } from 'next/router';
import React, { useState, useEffect, useContext } from 'react';

type Room = {
    id: number;
    name: string;
    description: string;
    points: number;
    uuid: string;
};

const CleanURLComponent = () => {
    useEffect(() => {
        const cleanURL = () => {
            const cleanURL = window.location.protocol + '//' + window.location.host + window.location.pathname;
            window.history.replaceState({}, document.title, cleanURL);
        };

        cleanURL();
    }, []);

    return null; // Composant vide, aucun rendu à l'écran
};

const Room = () => {

   const router = useRouter();
   let idRoom  = router.query.idRoom as string;
   let idUser = router.query.idUser as string;

    const [room, setRoom] = useState<any>();
    console.log("idRoom "+idRoom);
    console.log("idUSer "+idUser);
    useEffect(() => {
        const fetchRoom = async () => {
            const response = await fetch(`http://127.0.0.1:8090/api/room/${idRoom}`);
            const data = await response.json();
            setRoom(data);
            console.log(data);
        };
        if (idRoom) {
            fetchRoom();
        }
    }, [idRoom]);
    console.log(room)
    if (!room) {
        return <div>Loading...</div>;
    }
    
    function handleClick(uuid:any, id: any){
        var jsonDatas = {uuid:uuid , idUser: idUser};
        var url='http://127.0.0.1:8090/api/rooms/' + uuid + '/users/' + idUser;
        fetch(url, {  // Enter your IP address here
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify(jsonDatas) // body data type must match "Content-Type" header
        })
        console.log(jsonDatas)
        window.location.href = "http://localhost:3000/";

    }

    return (
        <div>
            <CleanURLComponent />
            <h1>{room.name}</h1>
            <p>{room.description}</p>
            <p>{room.points}</p>
            <p>{room.uuid}</p>
            <button onClick={
                ()=>handleClick(room.uuid,idUser)
            }>Se déconnecter de la room</button>
        </div>
    );
};

export default Room;
