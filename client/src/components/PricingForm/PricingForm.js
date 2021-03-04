import {useState} from 'react'
import {useFormContext} from 'contexts/RoomFormContext'
import styles from './PricingForm.module.css'

import {ChevronBottom, ChevronTop} from 'Icons'

export default function PricingForm() {
    const {form, dispatch} = useFormContext()
    const [open, setOpen] = useState(false)

    function changePrice(e) {
        dispatch({type: 'SET_PRICE', payload: Number(e.target.value)})
    }

    function changeType(type) {
        setOpen(false)
        dispatch({type: 'SET_PRICING_TYPE', payload: type})
    }

    return (
        <>
            <label>Harga Sewa</label>
            <div className={styles.form}>
                <span>Rp.</span>
                <input type="number" value={form.pricing.price === 0 ? '' : form.pricing.price} onChange={changePrice}/>
                <div onClick={() => setOpen(!open)}>
                    <p>Per{form.pricing.type}</p>
                    <i>{open ? <ChevronTop/> : <ChevronBottom/>}</i>
                </div>
            </div>
            {open && <div className={styles.types}>
                {['hari', 'minggu', 'bulan', 'tahun'].map((type, i) => (
                    <p key={i} onClick={() => changeType(type)}>Per{type}</p>
                ))}
            </div>}
        </>
    )
}