import {useState} from 'react'
import {useFormContext} from 'contexts/RoomFormContext'
import styles from './FacilitiesForm.module.css'

import facilitiesData from 'source/facilities.json'

export default function FacilitiesForm() {
    const {form, dispatch} = useFormContext()
    const [input, setInput] = useState('')
    const [options, setOptions] = useState([])

    function showOption(e) {
        setInput(e.target.value)
        const data = facilitiesData.filter(facility => (
            facility.name.toLowerCase().includes(e.target.value.toLowerCase()) &&
            !form.facilities.some(item => item.id === facility.id)
        ))
        setOptions(data)
    }

    function selectOption(facility) {
        setInput('')
        setOptions([])
        dispatch({type: 'SET_FACILITIES', payload: [...form.facilities, facility]})
    }

    function removeFacility(facility) {
        dispatch({type: 'SET_FACILITIES', payload: form.facilities.filter(item => item !== facility)})
    }

    return (
        <div className={styles.facilities}>
            <input type="text" placeholder="Fasilitas.." value={input} onChange={showOption} onFocus={showOption}/>
            {options.length > 0 && <div className={styles.options}>
                {options.map((option, i) => (
                    <p key={i} onClick={() => selectOption(option)}>{option.name}</p>
                ))}
            </div>}
            <div className={styles.list}>
                {form.facilities.map((facility, i) => (
                    <span key={i}>{facility.name} <b onClick={() => removeFacility(facility)}>x</b></span>
                ))}
            </div>
        </div>
    )
}