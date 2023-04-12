import React, { useState } from 'react';
import styles from '../styles/SignUp.module.css';
import {signUp} from "@/pages/api/signUp";


interface User {
    username: string;
    email: string;
    password: string;
}

const SignUpForm = () => {
    const [user, setUser] = useState<User>({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value,
        }));
    };


//*  La vérification des champs login et email se fait via un trigger dans la base de données qui vérifie si le login ou l'email existe déjà
//*  la verif peux etre faite cote client aussi ,mais j'ai des problemes a bien la mettre en place avec la redirection
//*  donc pour l'instant ,il y'a seulement cote serveur
    return (
        <form  onSubmit={()=>signUp(SignUpForm)} method={"Post"}  className={styles.box} action="/">
            <label className={styles.label}>
                UserName:
                <input  className={styles.input} required={true} type="text" name="username" value={user.username} onChange={handleChange} />
            </label>
            <label className={styles.label}>
                Email
                <input className={styles.input} required={true} type="email" name="email" value={user.email} onChange={handleChange} />
            </label>
            <label className={styles.label}>
                Password:
                <input className={styles.input} required={true} type="password" name="password" value={user.password} onChange={handleChange} />
            </label>
            <button className={styles.button}  type="submit">Sign Up</button>
        </form>
    );
};

export default SignUpForm;