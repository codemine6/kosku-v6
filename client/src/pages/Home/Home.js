import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import useFetch from 'utils/useFetch'
import styles from './Home.module.css'

import {ChevronBottom, ChevronTop} from 'Icons'
import NavbarHome from 'components/NavbarHome/NavbarHome'
import Carousel from 'components/Carousel/Carousel'
import SearchForm from 'components/SearchForm/SearchForm'
import RoomMenu from 'components/RoomMenu/RoomMenu'
import RoomCard from 'components/RoomCard/RoomCard'
import Loader from 'components/Loader/Loader'

import cities from 'source/cities.json'

export default function Home() {
    const [promo] = useFetch('promo')
    const [recommended, loading] = useFetch('rooms/recommended')
    const [city, setCity] = useState('Bandung')
    const [around, setAround] = useState()
    const [citiesOpen, setCitiesOpen] = useState(false)
    let history = useHistory()

    function changeCity(e) {
        setCity(e)
        setAround(recommended.filter(room => room.location.city === e))
    }

    function changeType(type) {
        console.log(type)
    }

    useEffect(() => {
        // fetch('https://ipapi.co/json').then(res => console.log(res))
    }, [])

    return (
        <>
            <NavbarHome/>
            <div className={styles.promo}>
                <Carousel autoplay>
                    {promo?.map(promo => (
                        <img key={promo._id} src={promo.image} alt=""/>
                    ))}
                </Carousel>
            </div>
            <div className={styles.sticky}>
                <div onClick={() => history.push('/search')}><SearchForm/></div>
                <RoomMenu onChange={changeType}/>
            </div>
            <div className={styles.add}>
                <p>Anda Pemilik Kost?</p>
                <button onClick={() => history.push('/add-room')}>Pasang Iklan</button>
            </div>
            <h4 className={styles.title}>Rekomendasi untukmu</h4>
            <div className={styles.list}>
                {recommended?.map(room => (
                    <RoomCard key={room._id} room={room}/>
                ))}
            </div>

            <div className={styles.cities}>
                <h4>Kost daerah</h4>
                <div onClick={() => setCitiesOpen(!citiesOpen)}>
                    <span>{city}</span>
                    <i>{citiesOpen ? <ChevronTop/> : <ChevronBottom/>}</i>

                    {citiesOpen && <div className={styles.cityList}>
                        {cities.map((city, i) => (
                            <p key={i} onClick={() => changeCity(city)}>{city}</p>
                        ))}
                    </div>}
                </div>
            </div>
            {around?.length === 0 && <p className={styles.empty}>Upps, sepertinya belum ada kost di daerah ini.</p>}
            <div className={styles.list}>
                {recommended?.reverse().map(room => (
                    <RoomCard key={room._id} room={room}/>
                ))}
            </div>
            {loading && <Loader/>}
        </>
    )
}