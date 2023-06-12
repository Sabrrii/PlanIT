import Head from 'next/head'
import Sidebar from './components/Sidebar'
import CreateButton from "./components/CreateButton";
import Link from 'next/link';
import {signIn, useSession} from "next-auth/react";



import styles from '../styles/component/index.module.css'
export default function Home() {
    const {data: session, status} = useSession();
    return (
        <>
            <Head>
                <title>Story Points Pro</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                {!session && (
                <>
                    Not signed in <br/>
                    <a href="http://127.0.0.1:3000/loginSign">Sign in</a>
                </>
                )}
                {session && (
                    <>
                        Signed in as {session.user?.user.email} <br/>
                        <div>
                            <a href="/api/auth/signout">Sign out</a>
                            <br/>
                            <a href="http://127.0.0.1:3000/ListofRooms">Afficher la liste des rooms</a>
                        </div>
                    </>
                )}
                <div>
                </div>
                <CreateButton></CreateButton>
            </main>
        </>
    )
}
