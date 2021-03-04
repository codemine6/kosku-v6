import {useHistory} from 'react-router-dom'
import {useAuthContext} from 'contexts/AuthContext'
import styles from './RoomDetailMain.module.css'

import {Chat, Location, Map} from 'Icons'
import Rating from 'components/Rating/Rating'

export default function RoomDetailMain({room, startChat}) {
    const {auth} = useAuthContext()
    let history = useHistory()

    return (
        <div className={styles.main}>
            {auth && auth.id !== room.owner && <i className={styles.chatLink} onClick={startChat}><Chat/></i>}
            <div className={styles.type}>
                {room.customerType === 'all' && <h4 className={styles.all}>Kost Campur</h4>}
                {room.customerType === 'male' && <h4 className={styles.male}>Kost Putra</h4>}
                {room.customerType === 'female' && <h4 className={styles.female}>Kost Putri</h4>}
            </div>
            <h3>{room.name}</h3>
            <div className={styles.rating}>
                <Rating rate={room.rating}/>
                <p>({room.reviewsCount})</p>
            </div>
            <div className={styles.location}>
                <i className={styles.locationIcon}><Location/></i>
                <div>
                    <h4>{room.location.city}</h4>
                    <p>{room.location.address}</p>
                </div>
                <button className={styles.mapIcon} onClick={() => history.push(`/room/${room.id}/location`)}><Map/></button>
            </div>

            <div className={styles.detail}>
                <p>Rp. {room.pricing.price.toLocaleString('id-ID')}/{room.pricing.type}</p>
                <span>{room.availableRooms ? room.availableRooms + ' Kamar tersedia' : 'Tidak tersedia'}</span>
            </div>
        </div>
    )
}