import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import App from "@/pages/_app";
import React from "react";
import {ApiCall} from "@/pages/api/hello";


export default function Home() {
    //Variable qui récupere les données de l'API ,ICI des objets de type user
    const users= ApiCall();
    let [user, setUsers] = React.useState<any[]>([]);
    users.then((data: any) => {
        setUsers(data);
    })
  return (
    <>
         <main>
             {/*Foreach JSON qui parcours les objets de type user et les affiches dans un textarea*/}
             {user.map((p: any) => {
                 return <textarea key={p.id}>{p.username},{p.email}</textarea>
             })}
         </main>
    </>
  )
}
