import {useState, useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {useFormContext} from 'contexts/RoomFormContext'
import {getData} from 'services/Api'
import config from 'services/Config'
import styles from './EditRoom.module.css'

import Navbar from 'components/Navbar/Navbar'
import RoomForm from 'components/RoomForm/RoomForm'
import Button from 'components/Button/Button'
import Loader from 'components/Loader/Loader'

export default function EditRoom() {
    const {form, dispatch} = useFormContext()
    const [loading, setLoading] = useState(true)
    let history = useHistory()
    let params = useParams()

    async function editKost() {
        setLoading(true)
        try {
            const res = await fetch(`${config.API_URL}/room/${params.id}`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(form)
            })
            if (res.ok) {
                history.go(-1)
            }
        } catch {
            setLoading(false)
        }
    }

    useEffect(() => {
        async function fetchData() {
            const [data] = await getData(`room/${params.id}`)
            if (data) {
                dispatch({type: 'SET_ALL', payload: data})
                setLoading(false)
            }
        }
        fetchData()
    }, [params.id, dispatch])

    return (
        <>
            <Navbar/>
            {form.name && <div className={styles.edit}>
                <RoomForm/>
                <Button onClick={!loading && editKost}>Edit</Button>
            </div>}
            {loading && <Loader/>}
        </>
    )
}