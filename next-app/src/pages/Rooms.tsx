import React, { useEffect, useState } from 'react';
import getRooms from "@/pages/api/room";
import getStory from "@/pages/api/story";

export default function Rooms() {
    const [roomName, setRoomName] = useState<any>([]);
    let [Story, setStory] = React.useState<any>([]);
    useEffect(() => {
        getRooms().then((data) => setRoomName(data)); //On affecte les données retourner avec la fonction getRooms a notre state
    },  [])
    useEffect(() => {
        getStory().then((data) => setStory(data)); //On affecte les données retourner avec la fonction getStory a notre state
    },  [])
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // empêche la soumission du formulaire d'actualiser la page
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
            return (
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nom de la Story :</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                    onChange={(event) => setName(event.target.value)}
                    required // champ obligatoire
                    />

                    <label htmlFor="description">Description :</label>
                    <textarea
                        id="description"
                        value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    required // champ obligatoire
                    />

                </div>
                <div>
                    <label htmlFor="points">nombre de point (0 de base) :</label>
                    <input
                        type="text"
                        id="points"
                        value={points}
                        onChange={(event) => setPoints(event.target.value)}
                        required // champ obligatoire
                    />
                </div>
                <div>
                    <label htmlFor="completed">nombre de point (0 de base) :</label>
                    <input
                        type="checkbox"
                        id="completed"
                        value={completed}
                        onChange={(event) => setCompleted(event.target.value)}
                        required // champ obligatoire
                    />
                </div>
                <div>
                <label htmlFor="idRoom">nombre de point (0 de base) :</label>
                <input
                    type="text"
                    id="idRoom"
                    value={idRoom}
                    onChange={(event) => setIdRoom(event.target.value)}
                    required // champ obligatoire
                />
                 </div>

            </form>



        </div>


    )
}}