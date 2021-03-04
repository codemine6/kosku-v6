import useFetch from 'utils/useFetch'
import styles from './Favorites.module.css'

import Navbar from 'components/Navbar/Navbar'
import RoomCard from 'components/RoomCard/RoomCard'
import Loader from 'components/Loader/Loader'

export default function Favorites() {
    const [rooms, loading] = useFetch('rooms/favorite')

    return (
        <>
            <Navbar/>
            <div className={styles.container}>
                <h3>Kost favorite kamu</h3>
                <div className={styles.list}>
                    {rooms?.map((room, i) => (
                        <RoomCard room={room} key={i}/>
                    ))}
                </div>
            </div>
            {loading && <Loader/>}
        </>
    )
}