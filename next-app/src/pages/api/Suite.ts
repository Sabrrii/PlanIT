// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {json} from "stream/consumers";

// implementation du type Suite
export type Suite = {
    id: number
    name: string
    suitevalues: string[]
    public: boolean
}
//L'url des suite dans une constante
const myApiUrl = 'http://127.0.0.1:8090/api/suite';
//fonction asyncrone (executable en même temps que les autres fonction acyncrone)
//fonction qui retourne le tableau en json pour pouvoir recuperer les données grace a .map
//[ ()=> ]-> reenvoie un call back
export async function ApiCallSuite(){

    return new Promise<Suite>((resolve)=>{
        fetch(myApiUrl).then((resp)=>{
            resolve(resp.json().then((data)=>data));
        });
    });
}

export async function getOneSuite(id: number){
    return fetch(`http://127.0.0.1:8090/api/suite/${id}`)
        .then(response => response.json())
        .then( responseJSON => {
            return responseJSON
        })
}