import {useState, useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {getData} from 'services/Api'
import config from 'services/Config'
import styles from './BookingDetail.module.css'

import Time from 'utils/Time'
import {Copy} from 'Icons'
import Navbar from 'components/Navbar/Navbar'
import RoomSummary from 'components/RoomSummary/RoomSummary'
import UserSummary from 'components/UserSummary/UserSummary'
import BookingStep from 'components/BookingStep/BookingStep'
import BookingAction from 'components/BookingAction/BookingAction'
import Toast from 'components/Toast/Toast'
import Loader from 'components/Loader/Loader'

export default function BookingDetail() {
    const [booking, setBooking] = useState()
    const [loading, setLoading] = useState(true)
    let params = useParams()
    const history = useHistory()

    function copyCode() {
        navigator.clipboard.writeText(booking.bookingCode)
    }

    async function updateBooking(type) {
        setLoading(true)
        try {
            const res = await fetch(`${config.API_URL}/booking/${booking._id}/${type}`, {
                method: 'PATCH',
                credentials: 'include'
            })
            if (res.ok) {
                const data = await res.json()
                setBooking({...booking, ...data})
                setLoading(false)
            }
        } catch {
            setLoading(false)
        }
    }

    async function startChat() {
        setLoading(true)
        try {
            const res = await fetch(`${config.API_URL}/chat/start`, {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({user: booking.user._id})
            })
            if (res.ok) {
                const {_id} = await res.json()
                history.push(`/chat/${_id}`)
            }
        } catch {
            setLoading(false)
        }
    }

    useEffect(() => {
        async function fetchData() {
            const [data] = await getData(`booking/${params.id}`)
            if (data) {
                setBooking(data)
                setLoading(false)
            }
        }
        fetchData()
    }, [params.id])

    return (
        <>
            <Navbar/>
            {booking &&
            <div className={styles.container}>
                <h3>Detail Pesanan</h3>
                <RoomSummary room={booking.room}/>
                <div className={styles.detail}>
                    <span>Status:</span>
                    {booking.status === 'waiting' && <p>Menunggu Konfirmasi</p>}
                    {booking.status === 'confirmed' && <p>Menunggu Pembayaran</p>}
                    {booking.status === 'finished' && <p>Selesai</p>}
                    {booking.status === 'canceled' && <p>Dibatalkan</p>}

                    {booking.status === 'waiting' && <>
                        <span className={styles.title}>Sisa Waktu</span>
                        <p>{Time(booking.bookedAt).remaining(172800)}</p>
                    </>}
                    <span>Jumlah Pesanan</span>
                    <p>{booking.details.room} kamar</p>
                    <span>Total Pembayaran:</span>
                    <p className={styles.price}>Rp. {booking.payment.total.toLocaleString('id-ID')}</p>
                    <span>Kode Pesanan:</span>
                    <div className={styles.code}>
                        <p>{booking.details.code}</p>
                        <Toast message="Kode berhasil disalin!">
                            <i onClick={copyCode}><Copy/></i>
                        </Toast>
                    </div>
                </div>

                <h4>Riwayat</h4>
                <BookingStep booking={booking}/>

                <h4>{booking.user.type === 'owner' ? 'Pemilik' : 'Pemesan'}</h4>
                <UserSummary user={booking.user}/>
                <BookingAction booking={booking} update={updateBooking} startChat={startChat}/>
            </div>}
            {loading && <Loader/>}
        </>
    )
}