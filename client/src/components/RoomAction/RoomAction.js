import {useHistory} from 'react-router-dom'
import {useAuthContext} from 'contexts/AuthContext'
import styles from './RoomAction.module.css'

import Button from 'components/Button/Button'

export default function RoomAction({room}) {
    const {auth} = useAuthContext()
    let history = useHistory()

    function goBooking() {
        history.push('/new-booking', {id: room._id})
    }

    return (
        <div className={styles.action}>
            <div className={styles.price}>
                <p>Rp. {room.pricing.price.toLocaleString('id-ID')}/{room.pricing.type}</p>
                {room.availableRooms === 0 && <span>Tidak tersedia</span>}
            </div>
            <Button disabled={!auth || auth.type === 'owner' || room.availableRooms === 0} onClick={goBooking}>Pesan Sekarang</Button>
        </div>
    )
}