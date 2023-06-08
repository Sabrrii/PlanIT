//Typer ici les attributs de la table de la BDD
type room = {
    id : number
    name : string
    description : string
    points : number
    uuid: number
    connectedUsers: []
    suite: number
    team: number
    user: number

}

const url = 'http://127.0.0.1:8090/api/room'


//Fonction getRooms qui permet de retourner une promesse depuis telle adresse des donées que l'on va convertir en tableau d'object vers JSON en tableau de données
/*export default function getRooms(){
  /*  return new Promise<room>((resolve) =>{
       fetch('http://127.0.0.1:8090/api/room').then((response) => {
            resolve(response.json().then((data) => data))
        })
    })}*/

/*  /*      fetch('http://127.0.0.1:8090/api/room',{ method: "GET", mode: 'cors', headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'}})
            .then(response => response.text())
                .then( (data) =>{
                    console.log(data)
                    return new Promise((resolve, reject) => {
                        resolve(data ? JSON.parse(data) : {} )
                    })

                })
            .catch(rejected => {
                console.log(rejected);
            });
    })

}*/

export default async function getRooms() {
    return fetch('http://127.0.0.1:8090/api/room')
        .then(response => response.json())
        .then( responseJSON => {
            return responseJSON
        })
}
