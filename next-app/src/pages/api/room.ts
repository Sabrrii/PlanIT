//Typer ici les attributs de la table de la BDD
type room = {
    id : number
    name : string
    description : string
    points : number

}

//Fonction getRooms qui permet de retourner une promesse depuis telle adresse des donées que l'on va convertir en tableau d'object vers JSON en tableau de données
export default function getRooms(){
    return new Promise<room>((resolve) =>{
        fetch('http://127.0.0.1:8090/api/room').then((response) => {
            resolve(response.json().then((data) => data))
        })
    })

}