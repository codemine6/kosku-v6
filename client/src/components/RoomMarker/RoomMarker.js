import {Icon} from 'leaflet'
import {Marker, Popup} from 'react-leaflet'
import styles from './RoomMarker.module.css'

export default function RoomMarker({room}) {
    const roomIcon = new Icon({
        iconUrl: '/icons/home.svg',
        iconSize: [30, 30]
    })

    return (
        <Marker position={room.location.coords} icon={roomIcon}>
            <Popup>
                <div className={styles.popup}>
                    <div className={styles.detail}>
                        <img src={room.images[0]} alt=""/>
                        <div>
                            <h3>{room.name}</h3>
                            <p>Rp. {room.pricing.price.toLocaleString()}</p>
                        </div>
                    </div>
                    <button>Detail</button>
                </div>
            </Popup>
        </Marker>
    )
}