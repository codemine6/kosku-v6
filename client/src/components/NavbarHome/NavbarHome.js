import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {io} from 'socket.io-client'
import {useAuthContext} from 'contexts/AuthContext'
import config from 'services/Config'
import styles from './NavbarHome.module.css'

import {Bell, Chat, Close, Menu} from 'Icons'
import Sidebar from 'components/Sidebar/Sidebar'

export default function NavbarHome() {
    const {auth} = useAuthContext()
    const [chats, setChats] = useState([])
    const [notifications, setNotifications] = useState(0)
    const [greating, setGreating] = useState()
    const [open, setOpen] = useState(false)
    let history = useHistory()

    function changeGreating() {
        const hour = new Date().getHours()
        if (hour > 0 && hour < 11) setGreating('pagi')
        else if (hour < 14) setGreating('siang')
        else if (hour < 18) setGreating('sore')
        else setGreating('malam')
    }

    useEffect(() => {
        if (auth) {
            const socketChat = io(`${config.API_URL}/chat`)
            socketChat.emit('count', auth._id, setChats)
            socketChat.on('new_count', setChats)

            const socketNotif = io(`${config.API_URL}/notification`)
            socketNotif.emit('count', auth._id, setNotifications)
            socketNotif.on('new_count', setNotifications)

            return () => {
                socketChat.close()
                socketNotif.close()
            }
        }

        changeGreating()
    }, [auth])

    return (
        <>
            <nav className={styles.navbar}>
                {auth ? <div className={styles.user}>
                    <img src={auth.profilePhoto ?? "https://placeimg.com/100/100/people"} alt="" onClick={() => history.push('/profile')}/>
                    <div>
                        <p>Selamat {greating},</p>
                        <h4>{auth.username}</h4>
                    </div>
                </div> :
                    <h4 className={styles.guest}>Selamat {greating}</h4>
                }
                <div className={styles.menu}>
                    {auth && <>
                        <i onClick={() => history.push('/chats')}><Chat/>{chats > 0 && <span>{chats}</span>}</i>
                        <i><Bell/>{notifications > 0 && <span>{notifications}</span>}</i>
                    </>}
                    <i onClick={() => setOpen(!open)}>{open ? <Close/> : <Menu/>}</i>
                </div>
            </nav>
            {open && <Sidebar onClose={() => setOpen(false)}/>}
        </>
    )
}