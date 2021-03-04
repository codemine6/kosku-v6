import {useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import useFetch from 'utils/useFetch'
import config from 'services/Config'
import styles from './RoomDetail.module.css'

import NavbarDetail from 'components/NavbarDetail/NavbarDetail'
import Carousel from 'components/Carousel/Carousel'
import RoomDetailMain from 'components/RoomDetailMain/RoomDetailMain'
import RoomFacilities from 'components/RoomFacilities/RoomFacilities'
import UserSummary from 'components/UserSummary/UserSummary'
import RoomDetailReview from 'components/RoomDetailReview/RoomDetailReview'
import RoomAction from 'components/RoomAction/RoomAction'
import Loader from 'components/Loader/Loader'

export default function RoomDetail() {
    let params = useParams()
    const [room, pending] = useFetch(`room/${params.id}/detail`)
    const [loading, setLoading] = useState(false)
    const [showAll, setShowAll] = useState(false)
    let history = useHistory()

    async function startChat() {
        setLoading(true)
        try {
            const res = await fetch(`${config.API_URL}/chat/start`, {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({user: room.owner._id})
            })
            if (res.ok) {
                const {_id} = await res.json()
                history.push(`/chat/${_id}`)
            }
        } catch {
            setLoading(false)
        }
    }

    return (
        <>
            <NavbarDetail/>
            {room && <>
            <div className={styles.images}>
                <Carousel>
                    {room.images.map((img, i) => (
                        <img src={img} alt="" key={i}/>
                    ))}
                </Carousel>
            </div>

            <div className={styles.detail}>
                <RoomDetailMain room={room} startChat={startChat}/>
                <RoomFacilities facilities={room.facilities}/>

                <div className={styles.description}>
                    <h4>Deskripsi</h4>
                    <p className={showAll ? styles.showAll : null}>{room.description}</p>
                    <span onClick={() => setShowAll(!showAll)}>{showAll ? 'Sembunyikan' : 'Selengkapnya'}</span>
                </div>

                <div className={styles.rules}>
                    <h4>Kebijakan & Aturan tempat tinggal</h4>
                    <p>{room.rules}</p>
                </div>
                <div className={styles.owner}>
                    <UserSummary user={room.owner}/>
                </div>
                <RoomDetailReview reviews={room.reviews} count={room.reviewsCount}/>
            </div>
            <RoomAction room={room}/>
            </>}
            {(pending || loading) && <Loader/>}
        </>
    )
}