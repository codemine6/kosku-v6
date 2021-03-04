import {useState} from 'react'

import {useHistory} from 'react-router-dom'
import {MapContainer, TileLayer, Marker} from 'react-leaflet'
import {useFormContext} from 'contexts/RoomFormContext'
import styles from './LocationForm.module.css'

import cities from 'source/cities.json'

export default function LocationForm() {
    const {form, dispatch} = useFormContext()
    const [input, setInput] = useState()
    const [list, setList] = useState()
    let history = useHistory()

    function handleChange(e) {
        const value = e.target.value
        const result = cities.filter(city => city.toLowerCase().includes(value.toLowerCase()))
        setInput(value)
        setList(result)
    }

    function setCity(city) {
        setInput(city)
        setList(null)
        dispatch({type: 'SET_CITY', payload: city})
    }

    function setAddress(e) {
        dispatch({type: 'SET_ADDRESS', payload: e.target.value})
    }

    return (
        <div>
            <div className={styles.form}>
                <label>Alamat</label>
                <input className={list?.length === 0 ? styles.error : null} type="text" placeholder="Kota" value={input ?? form.location.city} onChange={handleChange}/>
                {list?.length === 0 && <p className={styles.message}>* Kota tidak ditemukan</p>}
                <textarea placeholder="Alamat lengkap" value={form.location.address} onChange={setAddress}/>

                {list?.length > 0 && <div className={styles.list}>
                    {list.map((city, i) => (
                        <p onClick={() => setCity(city)} key={i}>{city}</p>
                    ))}
                </div>}
            </div>
            <div className={styles.map} onClick={() => history.push('/set-position')}>
                <MapContainer center={form.location.coords} zoom={15} zoomControl={false} dragging={false} doubleClickZoom={false} scrollWheelZoom={false}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                    <Marker position={form.location.coords}/>
                </MapContainer>
            </div>
        </div>
    )
}