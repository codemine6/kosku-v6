import styles from './AuthOption.module.css'

import {Facebook, GooglePLus} from 'Icons'

export default function AuthOption() {
    return (
        <div className={styles.options}>
            <i><Facebook/></i>
            <i><GooglePLus/></i>
        </div>
    )
}