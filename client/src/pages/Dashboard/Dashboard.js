import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useAuthContext} from 'contexts/AuthContext'
import useFetch from 'utils/useFetch'
import {useDb} from 'services/Api'
import styles from './Dashboard.module.css'

import {Booking, Chat, ChevronRight, Home, Star} from 'Icons'
import Navbar from 'components/Navbar/Navbar'
import Loader from 'components/Loader/Loader'

export default function Dashboard() {
    const {auth} = useAuthContext()
    const [chat, setChat] = useState()
    const [room, setRoom] = useState()
    const [booking, setBooking] = useState()
    const [review, setReview] = useState()
    const [loading, setLoading] = useState(true)
    const [sb] = useFetch('room-count')
    console.log(sb)
    let history = useHistory()

    // useEffect(() => {
    //     useDb.collection('rooms').where('owner', '==', auth.id).get().then(res => {
    //         setRoom({all: res.size})

    //         let allReview = 0
    //         let newReview = 0
    //         if (res.docs.length) {
    //             res.docs.forEach((doc, i) => {
    //                 useDb.collection('rooms').doc(doc.id).collection('reviews').get().then(revRes => {
    //                     allReview += revRes.size
    //                     newReview += revRes.docs.map(doc => doc.data()).filter(item => !item.reply).length
    //                     res.size === i + 1 && setReview({all: allReview,new: newReview})
    //                 })
    //             })
    //         }
    //     })
    //     useDb.collection('chats').where('users', 'array-contains', auth.id).get().then(res => {
    //         let newMessage = 0
    //         res.docs.forEach((doc, index) => {
    //             useDb.collection('chats').doc(doc.id).collection('messages').orderBy('sendTime', 'desc').get().then(mesRes => {
    //                 const read = mesRes.docs[0].data().sender !== auth.id && !mesRes.docs[0].data().read
    //                 read && (newMessage += 1)
    //                 res.size === index + 1 && setChat({new: newMessage})
    //             })
    //         })
    //     })
    //     useDb.collection('bookings').where('owner', '==', auth.id).get().then(res => {
    //         const newBooking = res.docs.map(doc => doc.data()).filter(booking => booking.status === 'waiting').length
    //         setBooking({all: res.size, new: newBooking})
    //         setLoading(false)
    //     })
    // }, [auth.id])

    return (
        <>
            <Navbar/>
            <div className={styles.profile}>
                <img src={auth.profileImage} alt="" onClick={() => history.push('/profile')}/>
                <div>
                    <h4>{auth.username}</h4>
                    <p>{auth.email}</p>
                </div>
            </div>
            <div className={styles.info}>
                <div onClick={() => history.push('/rooms')}>
                    <Home/>
                    <p>{room?.all ?? 0} Kamar</p>
                </div>
                <div onClick={() => history.push('/bookings?status=waiting')}>
                    <Booking/>
                    <p>{booking?.all ?? 0} Pesanan</p>
                </div>
                <div onClick={() => history.push('/reviews')}>
                    <Star/>
                    <p>{review?.all ?? 0} Ulasan</p>
                </div>
            </div>
            <h3 className={styles.title}>Lainnya</h3>
            <div className={styles.list}>
                <div className={styles.item} onClick={() => history.push('/chats')}>
                    <i className={styles.icon}><Chat/></i>
                    <div>
                        <h4>Diskusi</h4>
                        <p>{chat?.new ?? 0} Pesan baru</p>
                    </div>
                    <i className={styles.more}><ChevronRight/></i>
                </div>
                <div className={styles.item} onClick={() => history.push('/bookings')}>
                    <i className={styles.icon}><Booking/></i>
                    <div>
                        <h4>Pesanan</h4>
                        <p>{booking?.new ?? 0} menunggu konfirmasi</p>
                    </div>
                    <i className={styles.more}><ChevronRight/></i>
                </div>
                <div className={styles.item} onClick={() => history.push('/reviews')}>
                    <i className={styles.icon}><Star/></i>
                    <div>
                        <h4>Ulasan</h4>
                        <p>{review?.new ?? 0} ulasan baru</p>
                    </div>
                    <i className={styles.more}><ChevronRight/></i>
                </div>
            </div>
            {loading && <Loader/>}
        </>
    )
}