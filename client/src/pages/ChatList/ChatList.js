import {useState, useEffect, useRef} from 'react'
import {io} from 'socket.io-client'
import {useAuthContext} from 'contexts/AuthContext'
import useFetch from 'utils/useFetch'
import config from 'services/Config'
import styles from './ChatList.module.css'

import Navbar from 'components/Navbar/Navbar'
import ChatItem from 'components/ChatItem/ChatItem'
import Loader from 'components/Loader/Loader'

export default function ChatList() {
    const {auth} = useAuthContext()
    const [data, loading] = useFetch('chats')
    const [chats, setChats] = useState([])
    const chatsRef = useRef(chats)

    useEffect(() => {
        chatsRef.current = data
        setChats(data)
    }, [data])

    useEffect(() => {
        const socket = io(`${config.API_URL}/chat`)
        socket.emit('chats', auth._id)
        socket.on('new_chat', data => {
            if (chatsRef.current.some(chat => chat._id === data._id)) {
                setChats(chatsRef.current.map(chat => chat._id === data._id ? {...chat, ...data} : chat))
            } else {
                setChats([...chatsRef.current, data])
            }
        })

        return () => socket.close()
    }, [auth._id])

    return (
        <>
            <Navbar/>
            <div className={styles.list}>
                {chats?.map(chat => (
                    <ChatItem chat={chat} key={chat._id}/>
                ))}
            </div>
            {chats?.length === 0 && <p className={styles.empty}>Kamu belum memiliki percakapan</p>}
            {loading && <Loader/>}
        </>
    )
}