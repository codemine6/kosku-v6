import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useDb} from 'services/Api'
import styles from './Search.module.css'

import NavbarHome from 'components/NavbarHome/NavbarHome'
import SearchForm from 'components/SearchForm/SearchForm'
import RoomMenu from 'components/RoomMenu/RoomMenu'
import RoomCard from 'components/RoomCard/RoomCard'
import Loader from 'components/Loader/Loader'

export default function Search() {
    const [rooms, setRooms] = useState([])
    const [loading, setLoading] = useState(false)
    let history = useHistory()

    function changeType(type) {
        console.log(type)
    }

    function getSearch(query) {
        setLoading(true)
        useDb.collection('rooms').get().then(res => {
            const result = res.docs.map(doc => doc.data())
            const data = result.filter(({name}) => name.toLowerCase().includes(query.toLowerCase()))
            setRooms(data)
            setLoading(false)
        })
    }

    return (
        <>
            <NavbarHome/>
            <div className={styles.sticky}>
                <SearchForm onSearch={getSearch}/>
                <RoomMenu onChange={changeType}/>
                {rooms.length > 0 && <h4>Results: {rooms.length}</h4>}
            </div>
            <button className={styles.nearest} onClick={() => history.push('/nearest')}>Kost Disekitarmu..</button>
            <div className={styles.list}>
                {rooms.map(room => (
                    <RoomCard key={room.id} room={room}/>
                ))}
            </div>
            {loading && <Loader/>}
        </>
    )
}