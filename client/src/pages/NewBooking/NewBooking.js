import {useState} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {useAuthContext} from 'contexts/AuthContext'
import useFetch from 'utils/useFetch'
import config from 'services/Config'
import styles from './NewBooking.module.css'

import Navbar from 'components/Navbar/Navbar'
import RoomSummary from 'components/RoomSummary/RoomSummary'
import Button from 'components/Button/Button'
import Loader from 'components/Loader/Loader'

export default function NewBooking() {
    const {auth} = useAuthContext()
    let roomId = useLocation().state.id
    const [room, pending] = useFetch(`room/${roomId}/summary`)
    const [roomCount, setRoomCount] = useState(1)
    const [timeCount, setTimeCount] = useState(1)
    const [loading, setLoading] = useState(false)
    let history = useHistory()

    async function goBooking() {
        setLoading(true)
        const code = `BO/${String(new Date().getDate()).padStart(2, '0')}${String(new Date().getMonth() + 1).padStart(2, '0')}${new Date().getFullYear()}/${room._id.substr(0,5)}/${auth._id.substr(0,5)}`
        const data = {
            customer: auth._id,
            details: {
                code,
                room: roomCount,
                time: timeCount,
                type: room.pricing.type
            },
            owner: room.owner,
            payment: {
                total: room.pricing.price * roomCount * timeCount,
                type: 'direct_pay'
            },
            room: room._id
        }

        try {
            setLoading(true)
            const res = await fetch(`${config.API_URL}/new-booking`, {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
            if (res.ok) {
                const booking = await res.json()
                history.push('/booking-finish', {booking})
            }
        } catch {
            setLoading(false)
        }
    }

    return (
        <>
            <Navbar/>
            {room && <div className={styles.container}>
                <h3>Lanjutkan Pemesanan</h3>
                <RoomSummary room={room}/>
                <h4>Harga</h4>
                <p className={styles.price}>Rp. {room.pricing.price.toLocaleString('id-ID')}/{room.pricing.type}</p>

                <div className={styles.detail}>
                    <div>
                        <button disabled={roomCount === 1} onClick={() => setRoomCount(roomCount - 1)}>-</button>
                        <span>{roomCount}</span>
                        <button disabled={roomCount === room.availableRooms} onClick={() => setRoomCount(roomCount + 1)}>+</button>
                        <p>Pesan {roomCount} kamar</p>
                    </div>
                    <div>
                        <button disabled={timeCount === 1} onClick={() => setTimeCount(timeCount - 1)}>-</button>
                        <span>{timeCount}</span>
                        <button disabled={timeCount === 12} onClick={() => setTimeCount(timeCount + 1)}>+</button>
                        <p>Pesan untuk {timeCount} {room.pricing.type}</p>
                    </div>
                </div>

                <h4>Total Bayar</h4>
                <p className={styles.price}>Rp. {(room.pricing.price * roomCount * timeCount).toLocaleString('id-ID')}</p>
                <h4>Metode Pembayaran</h4>
                <div className={styles.payment}>
                    <i/>
                    <p>Bayar Langsung</p>
                </div>
            </div>}
            <div className={styles.action}>
                    <Button onClick={goBooking}>Pesan Sekarang</Button>
                    <p>Dengan melanjutkan, Anda setuju dengan kebijakan kami.</p>
                    <b>Syarat & Kebijakan</b>
                </div>
            {(pending ||loading) && <Loader/>}
        </>
    )
}