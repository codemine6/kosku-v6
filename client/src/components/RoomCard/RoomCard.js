import {useHistory} from 'react-router-dom'
import styles from './RoomCard.module.css'

import {Location} from 'Icons'

export default function RoomCard({room}) {
    let history = useHistory()

    function goDetail() {
        history.push(`/room/${room._id}`)
    }

    return (
        <div className={styles.card} onClick={goDetail}>
            <img src={room.image} alt=""/>
            <div className={styles.detail}>
                <div className={styles.type}>
                    {room.customerType === 'all' && <span className={styles.all}>Campur</span>}
                    {room.customerType === 'male' && <span className={styles.male}>Putra</span>}
                    {room.customerType === 'female' && <span className={styles.female}>Putri</span>}
                </div>
                <p className={styles.name}>{room.name}</p>
                <div className={styles.location}>
                    <Location/>
                    <div>
                        <span>{room.location.city}</span>
                        <p>{room.location.address}</p>
                    </div>
                </div>
                <p className={styles.price}>Rp. {room.pricing.price.toLocaleString('id-ID')}/{room.pricing.type}</p>
            </div>
        </div>
    )
}