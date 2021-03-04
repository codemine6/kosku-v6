import {useState, useEffect} from 'react'
import {Icon} from 'leaflet'
import {MapContainer, TileLayer, Marker} from 'react-leaflet'
import {useDb} from 'services/Api'
import styles from './NearestLocation.module.css'

import RoomMarker from 'components/RoomMarker/RoomMarker'
import Loader from 'components/Loader/Loader'

export default function NearestLocation() {
    const [rooms, setRooms] = useState()
    const [myPosition, setMyPosition] = useState()

    const userIcon = new Icon({
        iconUrl: 'icons/user.svg',
        iconSize: [30, 30]
    })

    useEffect(() => {
        useDb.collection('rooms').get().then(res => {
            setRooms(res.docs.map(doc => doc.data()))
        })
        navigator.geolocation.getCurrentPosition(({coords}) => {
            setMyPosition([coords.latitude, coords.longitude])
        })
    }, [])

    return (
        <>
            {rooms && myPosition && <div className={styles.map}>
                <MapContainer center={myPosition} zoom={13}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                    <Marker position={myPosition} icon={userIcon}/>
                    {rooms.map(room => (
                        <RoomMarker key={room.id} room={room}/>
                    ))}
                </MapContainer>
            </div>}
            {!rooms && <Loader/>}
        </>
    )
}