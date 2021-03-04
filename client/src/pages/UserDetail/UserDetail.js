import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useDb} from 'services/Api'
import styles from './UserDetail.module.css'

import Navbar from 'components/Navbar/Navbar'
import RoomCard from 'components/RoomCard/RoomCard'
import Loader from 'components/Loader/Loader'

export default function UserDetail() {
    const [user, setUser] = useState()
    const [rooms, setRooms] = useState()
    const [loading, setLoading] = useState(true)
    let params = useParams()

    useEffect(() => {
        useDb.collection('users').doc(params.id).get().then(res => {
            const result = res.data()
            setUser(result)
            if (result.userType === 'owner') {
                useDb.collection('rooms').where('owner', '==', result.id).get().then(res => {
                    setRooms(res.docs.map(doc => doc.data()))
                    setLoading(false)
                })
            } else {
                setLoading(false)
            }
        })
    }, [params.id])

    return (
        <>
            <Navbar/>
            {user && <>
            <div className={styles.main}>
                <img src={user.profilePhoto ?? 'https://placeimg.com/100/100/people'} alt=""/>
                <div>
                    <h3>{user.username}</h3>
                    <p>{user.userType === 'owner' ? 'Pemilik kost' : 'Penyewa kost'}</p>
                </div>
            </div>
            <div className={styles.detail}>
                <p>Email: <span>{user.email}</span></p>
                <p>Phone: <span>{user.phone}</span></p>
            </div></>}
            <h3>Kost</h3>
            {rooms && <div className={styles.list}>
                {rooms.map(room => (
                    <RoomCard room={room} key={room.id}/>
                ))}
            </div>}
            {loading && <Loader/>}
        </>
    )
}