// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}
//URL d'ou les données sont récupérées
const ApiURL= "http://127.0.0.1:8090/api/user" ;
//L'url des suite dans une constante
const myApiUrl = 'http://127.0.0.1:8090/api/suite';
//Function qui récupère les données de l'API
export async function ApiCall(){
  return new Promise((resolve, reject) => {
    fetch(ApiURL).then((resp) => {
      resolve(resp.json().then((data) =>data ));
    });
  });
}

