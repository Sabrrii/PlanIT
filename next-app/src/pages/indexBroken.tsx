import Head from 'next/head'

import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import App from "@/pages/_app";
import React, {useState} from "react";
import {ApiCall} from "@/pages/api/hello";
import {ApiCallSuite} from "@/pages/api/Suite"


export default function Home() {

    return(
    <Head>
        <title>Story Points Pro</title>
        <link rel="icon" href="/favicon.ico" />
    </Head>
    )

    //Variable qui récupere les données de l'API ,ICI des objets de type user
    const tab = ApiCallSuite();
    let [suite,setSuite]=useState<any>([]);
    const users= ApiCall();
    let [user, setUsers] = React.useState<any[]>([]);
    users.then((data: any) => {
        setUsers(data);
    })
    tab.then((data)=> {
        setSuite(data);
    })
  return (
    <>
         <main>
             {/*Foreach JSON qui parcours les objets de type user et les affiches dans un textarea*/}
             {user.map((p: any) => {
                 return <textarea key={p.id}>{p.username},{p.email}</textarea>
             })}
             {/*affichage test des tableau*/}
             {suite.map((item:any)=>{
                 return item.suitevalues;
             })}
         </main>
    </>
  )
}
