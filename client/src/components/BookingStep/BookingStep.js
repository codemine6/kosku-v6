import styles from './BookingStep.module.css'

import Time from 'utils/Time'

export default function BookingStep({booking}) {
    return (
        <div>
            <div className={styles.step}>
                <span className={booking.bookedAt ? styles.pass : null}/>
                <h5>Dipesan</h5>
                <p>{Time(booking.bookedAt).toDateTime()}</p>
            </div>

            {booking.status === 'canceled' &&
            <div className={styles.step}>
                <span className={booking.canceledAt ? styles.pass : null}/>
                <h5>Dibatalkan</h5>
                <p>{booking.canceledAt ? Time(booking.canceledAt).toDateTime() : 'Dibatalkan'}</p>
            </div>}

            {booking.status !== 'canceled' && <>
            <div className={styles.step}>
                <span className={booking.confirmedAt ? styles.pass : null}/>
                <h5>Dikonfirmasi</h5>
                <p>{booking.confirmedAt ? Time(booking.confirmedAt).toDateTime() : 'Menunggu konfirmasi'}</p>
            </div>
            <div className={styles.step}>
                <span className={booking.finishedAt ? styles.pass : null}/>
                <h5>Selesai</h5>
                <p>{booking.finishedAt ? Time(booking.finishedAt).toDateTime() : 'Menunggu pembayaran'}</p>
            </div></>}
        </div>
    )
}