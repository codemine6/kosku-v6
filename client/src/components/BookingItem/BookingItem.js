import {useHistory} from 'react-router-dom'
import styles from './BookingItem.module.css'

import Time from 'utils/Time'
import {Location} from 'Icons'

export default function BookingItem({booking}) {
    let history = useHistory()

    return (
        <div className={styles.item} onClick={() => history.push(`/booking/${booking._id}`)}>
            <div className={styles.info}>
                {booking.status === 'waiting' && <p className={styles.waiting}>Menunggu Konfirmasi</p>}
                {booking.status === 'confirmed' && <p className={styles.confirmed}>Menunggu Pembayaran</p>}
                {booking.status === 'finished' && <p className={styles.confirmed}>Selesai</p>}
                {booking.status === 'canceled' && <p className={styles.canceled}>Dibatalkan</p>}

                {booking.status === 'waiting' && <span>{Time(booking.bookedAt).remaining(172800)}</span>}
            </div>
            <div className={styles.room}>
                <img src={booking.room.image} alt=""/>
                <div>
                    <h4>{booking.room.name}</h4>
                    <div className={styles.location}>
                        <Location/>
                        <div>
                            <span>{booking.room.location.city}</span>
                            <p>{booking.room.location.address}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.detail}>
                <div>
                    <p>Total pesanan:</p>
                    <span>Rp. {booking.payment.total.toLocaleString('id-ID')}</span>
                </div>
                {booking.customer && <div>
                    <p>Pemesan:</p>
                    <span>{booking.customer}</span>
                </div>}
            </div>
        </div>
    )
}