import {useHistory} from 'react-router-dom'
import {useAuthContext} from 'contexts/AuthContext'
import styles from './BookingAction.module.css'

import Button from 'components/Button/Button'

export default function BookingAction({booking, update, startChat}) {
    const {auth} = useAuthContext()
    let history = useHistory()

    return (
        <div className={styles.action}>
            {auth.type === 'owner' && booking.room.availableRooms < booking.details.room && booking.status === 'waiting' &&
                <p>Pesanan ini tidak dapat diproses karena ruangan yang tersedia tidak mencukupi</p>
            }
            {auth.type === 'owner' && booking.status === 'waiting' && booking.room.availableRooms >= booking.details.room &&
                <Button onClick={() => update('confirm')}>Konfirmsi Pesanan</Button>
            }
            {booking.status === 'waiting' &&
                <Button id={styles.cancel} onClick={() => update('cancel')}>Batalkan Pesanan</Button>
            }
            {auth.type === 'owner' && booking.status === 'confirmed' &&
                <Button onClick={() => update('finish')}>Selesai</Button>
            }
            {auth.type === 'customer' && booking.status === 'finished' &&
                <Button onClick={() => history.push(`/room/${booking.room._id}/my-review`)}>Berikan Ulasan</Button>
            }
            <Button id={styles.chat} onClick={startChat}>Hubungi {auth.userType === 'owner' ? 'Pemesan' : 'Pemilik'}</Button>
        </div>
    )
}