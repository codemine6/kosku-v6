import {useAuthContext} from 'contexts/AuthContext'
import styles from './MessageItem.module.css'

import {Check, DoubleCheck} from 'Icons'

export default function MessageItem({message}) {
    const {auth} = useAuthContext()

    return (
        <>
            {auth._id === message.sender ?
            <div className={styles.myMessage}>
                <p>{message.text}</p>
                <div>
                    <i>{message.read ? <DoubleCheck/> : <Check/>}</i>
                    <span>{new Date(message.sendedAt).toString().substr(15, 6)}</span>
                </div>
            </div> :
            <div className={styles.otherMessage}>
                <p>{message.text}</p>
                <span>{new Date(message.sendedAt).toString().substr(15, 6)}</span>
            </div>}
        </>
    )
}