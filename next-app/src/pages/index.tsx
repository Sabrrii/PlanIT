import Head from 'next/head'
import Sidebar from './components/Sidebar'
import CreateButton from "./components/CreateButton";
import styles from '../styles/component/index.module.css'
export default function Home() {
    return (
        <>
            <Head>
                <title>Story Points Pro</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div>
                </div>
                <Sidebar></Sidebar>
                <CreateButton></CreateButton>
            </main>
        </>
    )
}
