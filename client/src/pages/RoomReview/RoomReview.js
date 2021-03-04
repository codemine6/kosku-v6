import {useParams} from 'react-router-dom'
import useFetch from 'utils/useFetch'
import styles from './RoomReview.module.css'

import Navbar from 'components/Navbar/Navbar'
import ReviewItem from 'components/ReviewItem/ReviewItem'
import Loader from 'components/Loader/Loader'

export default function RoomReview() {
    let params = useParams()
    const [reviews, loading] = useFetch(`reviews/${params.id}`)

    return (
        <>
            <Navbar/>
            <div className={styles.container}>
                <h3>Semua Ulasan</h3>
                <div>
                    {reviews?.map((review, i) => (
                        <ReviewItem review={review} key={i}/>
                    ))}
                </div>
            </div>
            {loading && <Loader/>}
        </>
    )
}