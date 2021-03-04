import {useHistory, useParams} from 'react-router-dom'
import styles from './RoomDetailReview.module.css'

import Rating from 'components/Rating/Rating'
import Carousel from 'components/Carousel/Carousel'

export default function RoomDetailReview({reviews, count}) {
    let history = useHistory()
    let params = useParams()

    return (
        <div className={styles.review}>
            <h4>Ulasan Penyewa</h4>
            <p className={styles.count}>{count} Ulasan</p>
            <Carousel autoplay>
                {reviews.map((review, i) => (
                    <div className={styles.item} key={i}>
                        <Rating rate={review.rating}/>
                        <p>Oleh <b>{review.customer}</b></p>
                        <p>{review.text}</p>
                    </div>
                ))}
            </Carousel>
            <button onClick={() => history.push(`/room/${params.id}/reviews`)}>Lihat Semua</button>
        </div>
    )
}