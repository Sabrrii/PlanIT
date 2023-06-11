import { useRouter } from 'next/router';
import React, { useState, useEffect, useContext } from 'react';
import {getOneSuite, Suite} from "./api/Suite";
import {getStoryFromRoom,Story} from "./api/Story";

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
    const [suite, setSuite] = useState<Suite>({} as Suite);
    const [story, setStory] = useState<any>([]);
    const [users, setUsers] = useState<any>([]);

    console.log("idRoom "+idRoom);
    console.log("idUSer "+idUser);
    useEffect(() => {
        const fetchRoom = async () => {
            const response = await fetch(`http://127.0.0.1:8090/api/room/${idRoom}`);
            const data = await response.json();
            setRoom(data);
            const dataSuite = getOneSuite(data.suite).then((res) => { setSuite(res) })
            const dataStory= getStoryFromRoom(data.id).then((res) => { setStory(res) })
            setUsers(JSON.parse(data.connectedUsers))
            console.log(data);
            console.log(dataStory);
        };


        if (idRoom) {
            fetchRoom();
        }
    }, [idRoom]);

    let suiteValues = [];
    if (suite.suitevalues) {
        suiteValues = JSON.parse(suite.suitevalues);
    }

    console.log("suiteValue "+ suiteValues)
    console.log("room "+  room)
    console.log("suite "+ suite)
    console.log("users "+ users)
    console.log("story  "+ story)

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
        <>
            <div>
                <CleanURLComponent />
                <h1> Nom de la Room: {room.name}</h1>
                <h1> Suite: {suite.name}</h1>
                <p>Description: {room.description}</p>
                <p>POints : {room.points}</p>
                <button onClick={
                    ()=>handleClick(room.uuid,idUser)
                }>Se déconnecter de la room</button>
            </div>
            <div>
                <h1>Utilisateur connecté</h1>
                {users.map((user: any, index: number) => {
                    return (
                        <div key={index}>
                            <p>{user.username}</p>
                        </div>
                    )
                })
                }
            </div>
            <div>
                <h1>Story</h1>
                {story.map((story: any, index: number) => {
                    return (
                        <tr>
                            <td>Nom: {story.name}</td>
                            <td>Desc: {story.description}</td>
                            <td>Points: {story.points}</td>
                        </tr>
                    )
                })
                }
            </div>
            {/*//Permet d'afficher les valeur de la suite dans la room
            <div>
                {suiteValues && suiteValues.map((value: any, index: number) => {
                    return (
                        <div key={index}>
                            <p>{value}</p>
                        </div>
                    )
                })
                }
            </div>*/}
        </>
    );
};

export default Room;
