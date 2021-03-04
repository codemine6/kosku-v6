import styles from './RoomSummary.module.css'

import {Location} from 'Icons'

export default function RoomSummary({room}) {
    return (
        <div className={styles.room}>
            <img src={room.image} alt=""/>
            <div>
                <h4>{room.name}</h4>
                <div className={styles.location}>
                    <Location/>
                    <div>
                        <span>{room.location.city}</span>
                        <p>{room.location.address}</p>
                    </div>
                </div>
                <p className={styles.available}>{room.availableRooms ? room.availableRooms + ' Kamar tersedia' : 'Tidak tersedia'}</p>
            </div>
        </div>
    )
}