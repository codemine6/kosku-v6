import {useState, useEffect} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {getData} from 'services/Api'
import styles from './ReviewList.module.css'

import Navbar from 'components/Navbar/Navbar'
import ReviewAction from 'components/ReviewAction/ReviewAction'
import Loader from 'components/Loader/Loader'

export default function ReviewList() {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)
    let history = useHistory()
    let type = new URLSearchParams(useLocation().search).get('type')

    useEffect(() => {
        async function fetchData() {
            setReviews([])
            setLoading(true)
            const [data] = await getData(`reviews?type=${type}`)
            if (data) {
                setReviews(data)
                setLoading(false)
            }
        }
        fetchData()
    }, [type])

    return (
        <>
            <Navbar/>
            <div className={styles.container}>
                <div className={styles.menu}>
                    <button className={type === 'new' ? styles.selected : null} onClick={() => history.replace('/reviews?type=new')}>Baru</button>
                    <button className={type === 'replied' ? styles.selected : null} onClick={() => history.replace('/reviews?type=replied')}>Dibalas</button>
                </div>
                <div>
                    {reviews.map(review => (
                        <ReviewAction key={review._id} review={review}/>)
                    )}
                </div>
            </div>
            {loading && <Loader/>}
        </>
    )
}