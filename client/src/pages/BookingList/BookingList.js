import {useState, useEffect} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {useAuthContext} from 'contexts/AuthContext'
import {getData} from 'services/Api'
import styles from './BookingList.module.css'

import Navbar from 'components/Navbar/Navbar'
import BookingItem from 'components/BookingItem/BookingItem'
import Loader from 'components/Loader/Loader'

export default function BookingList() {
    const {auth} = useAuthContext()
    const [bookings, setBookings] = useState([])
    const [error, setError] = useState()
    const [loading, setLoading] = useState(true)
    const history = useHistory()
    const status = new URLSearchParams(useLocation().search).get('status')

    useEffect(() => {
        async function fetchData() {
            setBookings([])
            setError(null)
            setLoading(true)
            const [data, error] = await getData(`bookings?status=${status}`)
            if (data) {
                setBookings(data)
                setLoading(false)
            } else {
                setError(error)
                setLoading(false)
            }
        }
        fetchData()
    }, [status])

    return (
        <>
            <Navbar/>
            <div className={styles.menu}>
                <button className={status === 'waiting' ? styles.selected : null} onClick={() => history.replace('/bookings?status=waiting')}>Menunggu Konfirmasi</button>
                <button className={status === 'confirmed' ? styles.selected : null} onClick={() => history.replace('/bookings?status=confirmed')}>Menunggu Pembayaran</button>

                {auth.type === 'owner' && <>
                    <button className={status === 'finished' ? styles.selected : null} onClick={() => history.replace('/bookings?status=finished')}>Selesai</button>
                    <button className={status === 'canceled' ? styles.selected : null} onClick={() => history.replace('/bookings?status=canceled')}>Dibatalkan</button>
                </>}

                <button className={status === "all" ? styles.selected : null} onClick={() => history.replace('/bookings?status=all')}>Semua</button>
            </div>
            <div className={styles.list}>
                {bookings.map((booking, i) => (
                    <BookingItem booking={booking} key={i}/>
                ))}
            </div>
            <p className={styles.empty}>{error}</p>
            {loading && <Loader/>}
        </>
    )
}