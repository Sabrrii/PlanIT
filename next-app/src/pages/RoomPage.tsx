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
    const [users, setUsers] = useState<any>([]);

    const [story, setStory] = useState<any>([]);
    const [CompletedStory, setCompletedStory] = useState<any>([]);
    const [CurrentStory, setCurrentStory] = useState<any>();
    const [storyIndex, setStoryIndex] = useState<number>(0);

    const [selectedValue, setSelectedValue] = useState('');



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
            setCurrentStory(story[storyIndex]);
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
    console.log("Story en cours "+CurrentStory);

    if (!room) {
        return <div>Loading...</div>;
    }

    function  UpdateStory (){
        let limite:number= story.length;
        if (storyIndex < limite) {
            setCurrentStory(story[storyIndex]);
        }
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

    const handleClickStory=(event)=>{
        event.preventDefault();
        console.log("La valeur sélectionnée est :", selectedValue);
        var jsonDatas = { idUser: idUser, story: CurrentStory.id, points: selectedValue };
        var url='http://127.0.0.1:8090/api/voter';
        fetch(url, {  // Enter your IP address here
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(jsonDatas) // body data type must match "Content-Type" header
        })
        console.log(jsonDatas)
        if(suite.id==2 || suite.id==4){
            //Implementer la logique pour calculer la moyenne
            // si la suite utiliser comprend aiutre que des nombes
            //lopique = faire moyenne des position des vote , pour avoir la position du vote moyen
            // dans la liste des valeurs  de la suite
        }else{
            let result:number=0;
            let nbVote:number=0;
            for(let i=0;i<users.length;i++){
                if(users[i].voters!=null){
                    result+=users[i].voter.points;
                    nbVote++;
                }
            } 
            result=result/nbVote;
            CurrentStory.points=result;
            console.log("result "+result);
        }
        CurrentStory.Completed = true;
        var jsonData = {points: selectedValue, Completed: true};
        var URL='http://127.0.0.1:8090/api/story/'+CurrentStory.id;
        fetch(URL, {  // Enter your IP address here
            method: 'UPDATE',
            mode: 'cors',
            body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
        })

        CompletedStory.push(CurrentStory);
        setStoryIndex(storyIndex+1);
        UpdateStory();
    }

    const handleCheckboxChange = (value) => {
        if (selectedValue === value) {
            setSelectedValue(''); // Désélectionne la case à cocher si elle est déjà sélectionnée
        } else {
            setSelectedValue(value); // Sélectionne la case à cocher
        }
    };

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
                <h1>Story a voter</h1>
                <p>Nom: {CurrentStory?.name}</p>
                <p>Description: {CurrentStory?.description}</p>
            </div>
            {/* //Permet d'afficher les valeurs de la suite d'attribuer une valeur a la story*/}
            <div>
                {suiteValues && suiteValues.map((value: any) => {
                    return (
                        <div key={value}>
                            <label>
                                <input
                                    type="checkbox"
                                    value={value}
                                    checked={selectedValue === value}
                                    onChange={() => handleCheckboxChange(value)}
                                />
                                {value}
                            </label>
                        </div>
                    )
                })
                }
            </div>

            <button onClick={handleClickStory}>Valider le vote </button>

        </>
    );
};

export default Room;
