import React, {useEffect, useRef, useState} from 'react';
import styles from '../../styles/component/Sidebar.module.css'
import { motion } from "framer-motion"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <motion.div whileHover={{width : '200px'}}
                    onHoverStart={e => {
                        setOpen(true)}}
                    onHoverEnd={e => {
                        setOpen(false)}}
                    className={styles.sidebar}>
            <ul>
                <>
                    <li><a href=""><FontAwesomeIcon icon={faUser}></FontAwesomeIcon>{open && <p>Accueil</p>}</a></li>
                    <li><a href=""><FontAwesomeIcon icon={faUser}></FontAwesomeIcon>{open && <p>About</p>}</a></li>
                    <li><a href=""><FontAwesomeIcon icon={faUser}></FontAwesomeIcon>{open && <p>Contact</p>}</a></li>
                </>
            </ul>
        </motion.div>
    );
};

export default Sidebar;