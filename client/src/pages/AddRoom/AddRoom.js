import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useFormContext} from 'contexts/RoomFormContext'
import config from 'services/Config'
import styles from './AddRoom.module.css'

import Navbar from 'components/Navbar/Navbar'
import RoomForm from 'components/RoomForm/RoomForm'
import Button from 'components/Button/Button'
import Loader from 'components/Loader/Loader'

export default function AddRoom() {
    const {form} = useFormContext()
    const [loading, setLoading] = useState(false)
    let history = useHistory()

    async function addRoom() {
        setLoading(true)
        try {
            const res = await fetch(`${config.API_URL}/room`, {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(form)
            })
            if (res.ok) {
                history.replace('/rooms')
            } else {
                const {message} = await res.json()
                throw new Error(message)
            }
        } catch (err) {
            setLoading(false)
            console.log(err.message)
        }
    }

    return (
        <>
            <Navbar/>
            <div className={styles.add}>
                <RoomForm/>
                <Button onClick={!loading && addRoom}>Tambah</Button>
            </div>

            {loading && <Loader/>}
        </>
    )
}