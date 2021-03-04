import {useHistory} from 'react-router-dom'
import {useAuthContext} from 'contexts/AuthContext'
import styles from './ChatItem.module.css'

export default function ChatItem({chat}) {
    const {auth} = useAuthContext()
    let history = useHistory()

    return (
        <div className={styles.item} onClick={() => history.push(`/chat/${chat._id}`)}>
            <img src={chat.user.profileImage} alt=""/>
            <div>
                <h4>{chat.user.username}</h4>
                <span>{chat.message.sendedAt.toString().substr(11, 5)}</span>
                {chat.message.sender !== auth._id && chat.message.read === false ?
                <b>{chat.message.text}</b> : <p>{chat.message.text}</p>}
            </div>
        </div>
    )
}