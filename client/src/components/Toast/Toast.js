import {useState} from 'react'
import styles from './Toast.module.css'

export default function useToast(props) {
    const [show, setShow] = useState(false)

    function showToast() {
        setShow(true)
        setTimeout(() => setShow(false), 2000)
    }

    return (
        <>
            <span onClick={showToast}>{props.children}</span>
            {show && <div className={styles.message}>
                <p>{props.message}</p>
            </div>}
        </>
    )
}