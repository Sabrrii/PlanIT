import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

type Room = {
    id: number;
    name: string;
    description: string;
    idSuite: number;
    idOwner: number;
};

const Room = () => {
    const router = useRouter();
    const { id } = router.query; // récupère l'ID de la room dans l'URL

    const [room, setRoom] = useState<Room>();

    useEffect(() => {
        const fetchRoom = async () => {
            const response = await fetch(`http://127.0.0.1:8090/api/room/${id}`);
            const data = await response.json();
            setRoom(data);
        };
        if (id) {
            fetchRoom();
        }
    }, [id]);

    if (!room) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{room.name}</h1>
            <p>{room.description}</p>
            <p>Id de la suite : {room.idSuite}</p>
            <p>Id de lutilisateur propriétaire : {room.idOwner}</p>
        </div>
    );
};

export default Room;