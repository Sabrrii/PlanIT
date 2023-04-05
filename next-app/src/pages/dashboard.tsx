import { useState, useEffect } from "react";
import Link from "next/link";

type Room = {
    id: number;
    name: string;
    description: string;
    idSuite: number; // champ obligatoire pour la base de données
    idOwner: number; // champ obligatoire pour la base de données
};

const Dashboard = () => {
    // état local pour stocker les salles de l'utilisateur
    const [rooms, setRooms] = useState<Room[]>([]);

    // fonction pour récupérer les salles de l'utilisateur
    const fetchRooms = async () => {
        // récupérer l'ID de l'utilisateur à partir de l'authentification (si nécessaire)
        const userId = 1; // exemple d'ID d'utilisateur

        // requête GET à l'API pour récupérer les salles de l'utilisateur
        const response = await fetch(`http://127.0.0.1:8090/api/user/${userId}/rooms`);

        if (response.ok) {
            // si la requête a réussi, on met à jour l'état local des salles
            const rooms = await response.json();
            setRooms(rooms);
        } else {
            // sinon, on affiche un message d'erreur
            alert("Une erreur est survenue lors de la récupération des salles.");
        }
    };

    // appeler fetchRooms au chargement de la page
    useEffect(() => {
        fetchRooms();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <div className="room-list">
                {rooms.map((room) => (
                    <Link key={room.id} href={`/room/${room.id}`}>
                        <a className="room-card">
                            <h2>{room.name}</h2>
                            <p>{room.description}</p>
                        </a>
                    </Link>
                ))}
            </div>
            <style jsx>{`
                .room-list {
                    display: flex;
                    flex-wrap: wrap;
                }
                .room-card {
                    width: 300px;
                    height: 200px;
                    margin: 20px;
                    padding: 20px;
                    background-color: #fff;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
                    border-radius: 4px;
                    text-decoration: none;
                    color: #000;
                    transition: all 0.3s ease-in-out;
                }
                .room-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                }
            `}</style>
        </div>
    );
};

export default Dashboard;