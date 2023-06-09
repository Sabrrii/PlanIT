import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';

type Room = {
    id: number;
    name: string;
    description: string;
    points: number;
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
   let id  = router.query.idRoom as string;

    const [room, setRoom] = useState<Room>();
    console.log(id);
    useEffect(() => {
        const fetchRoom = async () => {
            const response = await fetch(`http://127.0.0.1:8090/api/room/${id}`);
            const data = await response.json();
            setRoom(data);
            console.log(data);
        };
        if (id) {
            fetchRoom();
        }
    }, [id]);
    console.log(room)
    if (!room) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <CleanURLComponent/>
            <h1>{room.name}</h1>
            <p>Description: {room.description}</p>
            <p>Points : {room.points}</p>
        </div>
    );
};

export default Room;
