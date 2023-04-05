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