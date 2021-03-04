import {useHistory, useLocation} from 'react-router-dom'
import styles from './BookingFinish.module.css'

import {Check, Copy} from 'Icons'
import Button from 'components/Button/Button'
import Toast from 'components/Toast/Toast'

export default function BookingFinish() {
    let history = useHistory()
    let booking = useLocation().state.booking

    function copyCode() {
        navigator.clipboard.writeText(booking.bookingCode)
    }

    return (
        <>
            {booking && <div className={styles.container}>
                <i className={styles.checkIcon}><Check/></i>
                <h4>Pesananmu akan segera diproses oleh pemilik kost</h4>
                <p>{booking.payment.toLocaleString('id-ID')}</p>
                <div className={styles.code}>
                    <p>{booking.code}</p>
                    <Toast message="Kode berhasil disalin!">
                        <i onClick={copyCode}><Copy/></i>
                    </Toast>
                </div>
                <div className={styles.action}>
                    <Button onClick={() => history.go(-2)}>Selesai</Button>
                </div>
            </div>}
        </>
    )
}