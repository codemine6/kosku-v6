import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useFormContext} from 'contexts/RoomFormContext'
import useFetch from 'utils/useFetch'
import styles from './RoomList.module.css'

import Navbar from 'components/Navbar/Navbar'
import Button from 'components/Button/Button'
import RoomItem from 'components/RoomItem/RoomItem'
import Loader from 'components/Loader/Loader'

export default function RoomList() {
    const form = useFormContext()
    const [results, setResults] = useState([])
    const [rooms, loading] = useFetch('my-rooms')
    let history = useHistory()

    function onSearch(e) {
        const data = rooms.filter(room => room.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setResults(data)
    }

    useEffect(() => {
        setResults(rooms ?? [])
        form.dispatch({type: 'SET_DEFAULT'})
    }, [form, rooms])

    return (
        <>
            <Navbar/>
            <div className={styles.my}>
                <Button onClick={() => history.push('/add-room')}>Tambah</Button>
                <div className={styles.search}>
                    <input placeholder="Search.." spellCheck={false} onChange={onSearch}/>
                </div>
                <div>
                    {results.map(room => (
                        <RoomItem key={room._id} room={room}/>
                    ))}
                </div>
            </div>
            {loading && <Loader/>}
        </>
    )
}