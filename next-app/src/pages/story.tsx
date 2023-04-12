import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

type Story = {
    id: number
    name: string
    description:string
    points:number
    completed:number
    idRoom:number
}

const CreateStoryForm = () => {
    // état local pour stocker les valeurs des champs du formulaire
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [points, setPoints] = useState(0); // valeur initiale arbitraire
    const [completed, setCompleted] = useState(0)
    const [idRoom, setIdRoom] = useState(0); // valeur initiale arbitraire

    const router = useRouter(); // on récupère l'objet router de Next.js
    // fonction qui sera appelée à la soumission du formulaire
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // empêche la soumission du formulaire d'actualiser la page

        const newStory: Story = {
            id: 0, // la base de données générera un nouvel ID automatiquement
            name,
            description,
            points,
            completed,
            idRoom
        };

        // requête POST à l'API pour enregistrer la nouvelle room dans la base de données
        const response = await fetch("http://127.0.0.1:8090/api/story", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newStory),
        });

        if (response.ok) {
            // si la requête a réussi, on affiche un message de succès et on vide les champs du formulaire
            alert("Room créée avec succès !");
            setName("");
            setDescription("");
            setPoints(0);
            setCompleted(0);
            setIdRoom(0);
            router.push("/dashboard"); // on redirige vers la page d'accueil
        } else {
            // sinon, on affiche un message d'erreur
            alert("Une erreur est survenue lors de la création de la room.");
        }
    };

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
                    onChange={(event) => setPoints(Number(event.target.value))}
                    required // champ obligatoire
                />
            </div>
            <div>
                <label htmlFor="completed">implementer à 0 à la création :</label>
                <input
                    type="text"
                    id="completed"
                    value={completed}
                    onChange={(event) => setCompleted(Number(event.target.value))}
                    required // champ obligatoire
                />
            </div>
            <div>
                <label htmlFor="idRoom">IDRoom :</label>
                <input
                    type="text"
                    id="idRoom"
                    value={idRoom}
                    onChange={(event) => setIdRoom(Number(event.target.value))}
                    required // champ obligatoire
                />
            </div>
            <button type="submit">Créer la room</button>
        </form>

    );
};

export default CreateStoryForm;