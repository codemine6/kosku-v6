import {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useAuthContext} from 'contexts/AuthContext'
import config from 'services/Config'
import styles from './Sidebar.module.css'

import {Booking, ChatFill, ChevronRight, Dashboard, Login, Logout, Register, Settings, Star} from 'Icons'

export default function Sidebar(props) {
    const {auth, dispatch} = useAuthContext()
    let history = useHistory()

    async function logout() {
        const res = await fetch(`${config.API_URL}/auth/logout`, {
            method: 'GET',
            credentials: 'include'
        })
        if (res.ok) {
            dispatch(await res.json())
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => document.body.removeAttribute('style')
    }, [])

    return (
        <>
            <div className={styles.overlay} onClick={() => props.onClose()}/>
            <div className={styles.sidebar}>
                {auth &&
                <div className={styles.profile}>
                    <img src={auth.profileImage} alt="" onClick={() => history.push('/profile')}/>
                    <h3>{auth.username}</h3>
                    <p className={styles.status}>{auth.type === 'owner' ? 'Pemilik Kost' : 'Pencari Kost'}</p>
                </div>}

                {auth?.type === 'owner' &&
                <div className={styles.menu}>
                    <li onClick={() => history.push('/dashboard')}><Dashboard/>Dashboard</li>
                    <li onClick={() => history.push('/chats')}><ChatFill/>Diskusi</li>
                    <li onClick={() => history.push('/reviews?type=new')}><Star/>Reviews</li>
                    <li onClick={() => history.push('/settings')}><Settings/>Settings</li>
                    <li onClick={logout}><Logout/>Keluar</li>
                </div>}

                {auth?.type === 'customer' &&
                <div className={styles.menu}>
                    <li onClick={() => history.push('/chats')}><ChatFill/>Diskusi</li>
                    <li onClick={() => history.push('/bookings?status=waiting')}><Booking/>Pesanan</li>
                    <li onClick={() => history.push('/favorites')}><Star/>Favorites</li>
                    <li onClick={() => history.push('/settings')}><Settings/>Settings</li>
                    <li onClick={logout}><Logout/>Keluar</li>
                </div>}

                {!auth &&
                <div className={styles.menu}>
                    <li onClick={() => history.push('/login')}><Login/>Masuk</li>
                    <li onClick={() => history.push('/register')}><Register/>Daftar</li>
                </div>}
                <div className={styles.other}>
                    <li>Artikel<ChevronRight/></li>
                    <li>Bantuan<ChevronRight/></li>
                    <li>Syarat & Ketentuan<ChevronRight/></li>
                </div>
            </div>
        </>
    )
}