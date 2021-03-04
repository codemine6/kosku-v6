import {useState, useEffect} from 'react'
import {MapContainer, TileLayer, Marker, useMapEvent} from 'react-leaflet'
import {useFormContext} from 'contexts/RoomFormContext'
import styles from './SetPosition.module.css'

import {Gps} from 'Icons'

export default function SetPosition() {
    const {form, dispatch} = useFormContext()
    const [input, setInput] = useState('')
    const [results, setResults] = useState([])

    function selectResult(e) {
        setResults([])
        dispatch({type: 'SET_COORDS', payload: [e.lat, e.lon]})
    }

    function handleChange(e) {
        setInput(e.target.value)
        fetch(`https://nominatim.openstreetmap.org/search/id/${e.target.value}?format=json&limit=5&accept-language=id`)
            .then(res => res.json()).then(setResults)
    }

    function getMyPosition() {
        navigator.geolocation.getCurrentPosition(({coords}) => {
            dispatch({type: 'SET_COORDS', payload: [coords.latitude, coords.longitude]})
        })
    }

    const Markers = () => {
        const drager = {
            dragend: ({target}) => {
                dispatch({type: 'SET_COORDS', payload: [target._latlng.lat, target._latlng.lng]})
            }
        }

        const map = useMapEvent('click', ({latlng}) => {
            dispatch({type: 'SET_COORDS', payload: [latlng.lat, latlng.lng]})
        })
        map.flyTo(form.location.coords, map.getZoom())

        return <Marker position={form.location.coords} draggable eventHandlers={drager}/>
    }

    useEffect(() => {
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${form.location.coords[0]}&lon=${form.location.coords[1]}&accept-language=id`)
            .then(res => res.json()).then(data => {
                setInput(data.display_name)
                setResults([])
            })
    }, [form.location.coords])

    return (
        <>
            <div className={styles.search}>
                <input placeholder="Cari tempat.." value={input} onChange={handleChange} onFocus={e => e.target.select()}/>
                <div className={styles.results}>
                    {results.map(place => (
                        <div key={place.place_id} onClick={() => selectResult(place)}>
                            <p>{place.display_name}</p>
                            <img src={place.icon} alt=""/>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.map}>
                <MapContainer center={form.location.coords} zoom={15}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                    <Markers/>
                </MapContainer>
                <i onClick={getMyPosition}><Gps/></i>
            </div>
        </>
    )
}