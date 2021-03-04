import {useFormContext} from 'contexts/RoomFormContext'
import styles from './RoomForm.module.css'

import RoomMenu from 'components/RoomMenu/RoomMenu'
import ImageInput from 'components/ImageInput/ImageInput'
import FacilitiesForm from 'components/FacilitiesForm/FacilitiesForm'
import LocationForm from 'components/LocationForm/LocationForm'
import PricingForm from 'components/PricingForm/PricingForm'

export default function RoomForm() {
    const {form, dispatch} = useFormContext()

    function setRoomType(type) {
        dispatch({type: 'SET_ROOM_TYPE', payload: type})
    }

    function setName(e) {
        dispatch({type: 'SET_NAME', payload: e.target.value})
    }

    function setCustomerType(e) {
        dispatch({type: 'SET_CUSTOMER', payload: e.target.value})
    }

    return (
        <div className={styles.form}>
            <label>Tipe</label>
            <div className={styles.type}>
                <RoomMenu default={form.roomType} onChange={setRoomType}/>
            </div>
            <label>Name</label>
            <input type="text" placeholder="Nama kost" value={form.name} onChange={setName}/>

            <ImageInput/>
            <FacilitiesForm/>

            <label>Tipe</label>
            <div className={styles.customer}>
                {['all', "male", 'female'].map((item, i) => (
                    <div key={i}>
                        <input id={i} type="radio" name="type" value={item} checked={item === form.customerType} onChange={setCustomerType}/>
                        <label htmlFor={i}>{item === 'all' && 'Campur'}{item === 'male' && 'Putra'}{item === 'female' && 'Putri'}</label>
                    </div>
                ))}
            </div>

            <label>Deskripsi</label>
            <textarea placeholder="Deskripsi" rows="5" value={form.description} onChange={e => dispatch({type: 'SET_DESCRIPTION', payload: e.target.value})}/>
            <label>Kebijakan & Peraturan</label>
            <textarea placeholder="-&#10;-&#10;-" rows="7" value={form.rules} onChange={e => dispatch({type: 'SET_RULES', payload: e.target.value})}/>
            <LocationForm/>
            <PricingForm/>
            <div className={styles.available}>
                <input type="number" value={form.availableRooms} onChange={e => dispatch({type: 'SET_AVAILABLE', payload: e.target.value})}/>
                <label>Kamar Tersedia</label>
            </div>
        </div>
    )
}