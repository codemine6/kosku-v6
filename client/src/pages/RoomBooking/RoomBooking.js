import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useAuthContext} from 'contexts/AuthContext'
import {useDb} from 'services/Api'
import styles from './RoomBooking.module.css'

import {checkStatus} from 'utils/Booking'
import Navbar from 'components/Navbar/Navbar'
import BookingItem from 'components/BookingItem/BookingItem'
import Loader from 'components/Loader/Loader'

export default function RoomBooking() {
    const {auth} = useAuthContext()
    const [bookings, setBookings] = useState()
    let params = useParams()

    useEffect(() => {
        useDb.collection('bookings').where('roomId', '==', params.id).where('ownerId', '==', auth.id).get().then(res => {
            setBookings(res.docs.map(doc => doc.data()))
            checkStatus(res.docs.map(doc => doc.data()))
        })
    }, [params.id, auth.id])

    return (
        <>
            <Navbar/>
            <div className={styles.container}>
                <h3>Semua Pesanan</h3>
                <div>
                    {bookings?.map(booking => (
                        <BookingItem booking={booking} key={booking.id}/>
                    ))}
                </div>
            </div>
            {!bookings && <Loader/>}
        </>
    )
}