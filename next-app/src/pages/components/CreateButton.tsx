import React from "react";
import styles from '../../styles/component/CreateButton.module.css'

const CreateButton = () => {
    return (
        <div className={styles.CreateButton}>
            <a href="../RoomForm">Créer une room</a>
        </div>
    );
};

export  default  CreateButton