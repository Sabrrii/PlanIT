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
                    <button onClick={() => signIn()}>Sign in</button>
                </>
                )}
                {session && (
                    <>
                        Signed in as {session.user?.email} <br/>
                        <Link href="/api/auth/signout">
                            <a>Sign out</a>
                        </Link>
                    </>
                )}
                <div>
                </div>
                <Sidebar></Sidebar>
                <CreateButton></CreateButton>
            </main>
        </>
    )
}
