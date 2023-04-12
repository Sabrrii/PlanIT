import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

type Room = {
    id: number;
    name: string;
    description: string;
    idSuite: number; // champ obligatoire pour la base de données
    idOwner: number; // champ obligatoire pour la base de données
};

const CreateRoomForm = () => {
    // état local pour stocker les valeurs des champs du formulaire
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [idSuite, setIdSuite] = useState(0); // valeur initiale arbitraire
    const [idOwner, setIdOwner] = useState(0); // valeur initiale arbitraire

    const router = useRouter(); // on récupère l'objet router de Next.js

    // fonction qui sera appelée à la soumission du formulaire
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // empêche la soumission du formulaire d'actualiser la page

        const newRoom: Room = {
            id: 0, // la base de données générera un nouvel ID automatiquement
            name,
            description,
            idSuite,
            idOwner
        };

        // requête POST à l'API pour enregistrer la nouvelle room dans la base de données
        const response = await fetch("http://127.0.0.1:8090/api/room", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newRoom),
        });

        if (response.ok) {
            // si la requête a réussi, on affiche un message de succès et on vide les champs du formulaire
            alert("Room créée avec succès !");
            setName("");
            setDescription("");
            setIdSuite(0);
            setIdOwner(0);
            router.push("/dashboard"); // on redirige vers la page d'accueil
        } else {
            // sinon, on affiche un message d'erreur
            alert("Une erreur est survenue lors de la création de la room.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Nom de la room :</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required // champ obligatoire
                />
            </div>
            <div>
                <label htmlFor="description">Description :</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    required // champ obligatoire
                />
            </div>
            <div>
                <label htmlFor="idSuite">ID de la suite :</label>
                <input
                    type="number"
                    id="idSuite"
                    value={idSuite}
                    onChange={(event) => setIdSuite(Number(event.target.value))}
                    required // champ obligatoire
                />
            </div>
            <div>
                <label htmlFor="idOwner">ID de lutilisateur propriétaire :</label>
                <input
                    type="number"
                    id="idOwner"
                    value={idOwner}
                    onChange={(event) => setIdOwner(Number(event.target.value))}
                    required // champ obligatoire
                />
            </div>
            <button type="submit">Créer la room</button>
        </form>
    );
};

export default CreateRoomForm;