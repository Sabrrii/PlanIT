import React from "react";
import { NextApiRequest, NextApiResponse } from "next";

export async  function signUp(user: any) {
    const newUser = {
        userName: user.userName,
        email: user.email,
        password: user.password,
    };

    //Fait la connexion avec l'api (peut etre effectuer depuis un autre fichier )
    const response = await fetch('http://127.0.0.1:8090/api/User', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    });
    if(response.ok) {
        alert('User created');
    }else {
        alert('User not created');
    }

};