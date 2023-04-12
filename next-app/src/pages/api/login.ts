//Typer ici les attributs de la table de la BDD
type user = {
    id : number
    email : string
    password : string
}

//Fonction getRooms qui permet de retourner une promesse depuis telle adresse des donées que l'on va convertir en tableau d'object vers JSON en tableau de données
export default function getUser(){
    return new Promise<user>((resolve) =>{
        fetch('http://127.0.0.1:8090/api/login').then((response) => {
            resolve(response.json().then((data) => data))
        })
    })

}