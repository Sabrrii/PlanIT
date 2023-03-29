// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {json} from "stream/consumers";

// implementation du type Suite
type Suite = {
    id: number
    name: string
    public: boolean
    suitevalues: string
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