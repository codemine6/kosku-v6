import {useState} from 'react'
import styles from './Confirm.module.css'

export default function Confirm(props) {
    const [open, setOpen] = useState(false)

    function confirm() {
        props.onConfirm()
        setOpen(false)
    }

    return (
        <>
            <div onClick={() => setOpen(true)}>{props.children}</div>
            {open &&
            <div className={styles.container}>
                <div className={styles.overlay} onClick={() => setOpen(false)}/>
                <div className={styles.confirm}>
                    <p>{props.title}</p>
                    <button onClick={confirm}>Ya</button>
                    <button onClick={() => setOpen(false)}>Tidak</button>
                </div>
            </div>}
        </>
    )
}