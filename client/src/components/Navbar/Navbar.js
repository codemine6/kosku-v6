import {useHistory} from 'react-router-dom'
import styles from './Navbar.module.css'

import {ChevronLeft} from 'Icons'

export default function Navbar() {
    let history = useHistory()

    return (
        <nav className={styles.navbar}>
            <i onClick={() => history.goBack()}><ChevronLeft/></i>
        </nav>
    )
}