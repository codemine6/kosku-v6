import {useHistory} from 'react-router-dom'
import styles from './NotFound.module.css'

import Button from 'components/Button/Button'

export default function NotFound() {
    let history = useHistory()

    return (
        <div className={styles.container}>
            <h1>404</h1>
            <h3>Nothing here..</h3>
            <Button onClick={() => history.replace('/')}>Go Home</Button>
        </div>
    )
}