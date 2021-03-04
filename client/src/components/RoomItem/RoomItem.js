import {useState, useEffect, useRef} from 'react'
import {useHistory} from 'react-router-dom'
import styles from './RoomItem.module.css'

import {Location, More} from 'Icons'
import RoomMenu from './RoomMenu/RoomMenu'

export default function RoomItem({room}) {
    const [menu, setMenu] = useState(false)
    const toggleRef = useRef()
    const menuRef = useRef()
    let history = useHistory()

    function closeMenu(e) {
        !toggleRef.current?.contains(e.target) && !menuRef.current?.contains(e.target) && setMenu(false)
    }

    useEffect(() => {
        document.addEventListener('click', closeMenu)

        return () => document.removeEventListener('click', closeMenu)
    }, [room.id, room.owner])

    return (
        <div className={styles.item}>
            <i className={styles.moreIcon} ref={toggleRef} onClick={() => setMenu(!menu)}><More/></i>
            <div className={styles.main}>
                <img src={room.image} alt=""/>
                <div className={styles.detail}>
                    <h3>{room.name}</h3>
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
            <div className={styles.other}>
                <p onClick={() => history.push(`/room/${room.id}/bookings`)}>
                    <b>{room.bookings}</b>Pesanan
                </p>
                <p onClick={() => history.push(`/room/${room.id}/reviews`)}>
                    <b>{room.reviews}</b>Ulasan
                </p>
            </div>

            {menu && <RoomMenu id={room._id} menuRef={menuRef}/>}
        </div>
    )
}