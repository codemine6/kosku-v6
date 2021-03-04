import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import L, {Icon} from 'leaflet'
import {MapContainer, TileLayer, Marker, useMap} from 'react-leaflet'
import 'leaflet-routing-machine'
import {useDb} from 'services/Api'
import styles from './RoomLocation.module.css'

import {Home, User} from 'Icons'
import RoomMarker from 'components/RoomMarker/RoomMarker'
import Loader from 'components/Loader/Loader'

export default function RoomLocation() {
    const [room, setRoom] = useState()
    const [roomPosition, setRoomPosition] = useState()
    const [myPosition, setMyPosition] = useState()
    const [center, setCenter] = useState()
    const [totalDistance, setTotalDistance] = useState()
    const [totalTime, setTotalTime] = useState()
    let params = useParams()

    const userIcon = new Icon({
        iconUrl: '/icons/user.svg',
        iconSize: [30, 30]
    })

    function Routing() {
        const map = useMap()
        map.flyTo(center, map.getZoom())
        const routeControl = L.Routing.control({
            createMarker: () => null,
            waypoints: [L.latLng(myPosition), L.latLng(roomPosition)],
            lineOptions: {
                styles: [{color: '#378ccd'}]
            }
        }).addTo(map)

        routeControl.on('routesfound', ({routes}) => {
            setTotalDistance(routes[0].summary.totalDistance)
            setTotalTime(routes[0].summary.totalTime)
        })
        return (
            <div className={styles.detail}>
                <i onClick={() => setCenter(myPosition)}><User/></i>
                <div>
                    <p>{totalDistance} meter</p>
                    <p>{totalTime} menit</p>
                </div>
                <i onClick={() => setCenter(roomPosition)}><Home/></i>
            </div>
        )
    }

    useEffect(() => {
        useDb.collection('rooms').doc(params.id).get().then(res => {
            setRoom(res.data())
            setRoomPosition(res.data().location.coords)
            setCenter(res.data().location.coords)
        })
        navigator.geolocation.getCurrentPosition(({coords}) => {
            setMyPosition([coords.latitude, coords.longitude])
        })
    }, [params.id])

    return (
        <>
            {center && myPosition ? <div className={styles.map}>
                <MapContainer center={center} zoom={15}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                    <RoomMarker room={room}/>
                    <Marker position={myPosition} icon={userIcon}/>
                    <Routing/>
                </MapContainer>
            </div> : <Loader/>}
        </>
    )
}