import {useState, useEffect, useRef} from 'react'
import {useParams} from 'react-router-dom'
import {io} from 'socket.io-client'
import {useAuthContext} from 'contexts/AuthContext'
import useFetch from 'utils/useFetch'
import Time from 'utils/Time'
import config from 'services/Config'
import styles from './ChatDetail.module.css'

import NavbarChat from 'components/NavbarChat/NavbarChat'
import MessageItem from 'components/MessageItem/MessageItem'
import MessageForm from 'components/MessageForm/MessageForm'
import Loader from 'components/Loader/Loader'

export default function ChatDetail() {
    const {auth} = useAuthContext()
    let params = useParams()
    const [data, loading] = useFetch(`chat/${params.id}`)
    const [user, setUser] = useState()
    const [messages, setMessages] = useState([])
    const [menu, setMenu] = useState(false)
    const messagesRef = useRef(messages)
    const listRef = useRef()
    let date

    async function deleteChat() {
        setMenu(false)
        setMessages([])
        fetch(`${config.API_URL}/chat/${params.id}/delete`, {
            method: 'DELETE',
            credentials: 'include'
        })
    }

    useEffect(() => {
        setMessages(data?.messages)
        setUser(data?.user)
    }, [data])

    useEffect(() => {
        messagesRef.current = messages
        listRef.current.scrollTop = listRef.current.scrollHeight
    }, [messages])

    useEffect(() => {
        const socket = io(`${config.API_URL}/chat`)
        socket.emit('messages', {chat: params.id, user: auth._id})
        socket.on('new_message', message => {
            message.receiver === auth._id && socket.emit('read', message._id)
            setMessages([...messagesRef.current, message])
        })
        socket.on('readed', id => {
            const readed = messagesRef.current.map(message => message._id === id ? {...message, read: true} : message)
            setMessages(readed)
        })

        return () => socket.close()
    }, [params.id])

    return (
        <>
            <NavbarChat user={user} toggleMenu={() => setMenu(!menu)}/>
            {menu && <div className={styles.menu}>
                <p>Blokir Pengguna</p>
                <p>Laporkan Pengguna</p>
                <p onClick={deleteChat}>Hapus Percakapan</p>
            </div>}
            <div className={styles.list} ref={listRef} onClick={() => setMenu(false)}>
                {messages?.map(message => {
                    if (date !== new Date(message.sendTime).toString().substr(8,2)) {
                        date = new Date(message.sendTime).toString().substr(8,2)
                        return (
                            <div key={message._id}>
                                <p className={styles.date}>{Time(message.sendedAt).toDate()}</p>
                                <MessageItem message={message}/>
                            </div>
                        )
                    }
                    return <MessageItem message={message} key={message._id}/>
                })}
            </div>
            <MessageForm user={user?._id}/>
            {loading && <Loader/>}
        </>
    )
}