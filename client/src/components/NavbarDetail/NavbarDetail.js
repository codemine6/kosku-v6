import {useState, useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {useAuthContext} from 'contexts/AuthContext'
import config from 'services/Config'
import styles from './NavbarDetail.module.css'

import {ChevronLeft, Heart, HeartFill, Share} from 'Icons'

export default function NavbarDetail({name}) {
    const {auth} = useAuthContext()
    const [favorited, setFavorited] = useState(false)
    let history = useHistory()
    let params = useParams()

    function goBack() {
        if (history.action === 'REPLACE') {
            history.go(- (history.length -1))
        } else {
            history.goBack()
        }
    }

    async function addFavorite() {
        try {
            const res = await fetch(`${config.API_URL}/favorite`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({room: params.id})
            })
            if (res.ok) {
                const data = await res.json()
                data.includes(params.id) ? setFavorited(true) : setFavorited(false)
            }
        } catch {}
    }

    function goShare() {
        if (navigator.share) {
            navigator.share({
                title: name,
                url: history.location.pathname
            })
        } else {
            window.open(history.location.pathname, '_blank')
        }
    }

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`${config.API_URL}/user/${auth._id}`)
            if (res.ok) {
                const {roomFavorites} = await res.json()
                roomFavorites.find(id => id === params.id) && setFavorited(true)
            }
        }
        auth?.type === 'customer' && fetchData()
    }, [auth, params.id])

    return (
        <nav className={styles.navbar}>
            <i className={styles.iconBack} onClick={(goBack)}><ChevronLeft/></i>
            <div className={styles.right}>
                {auth?.type === 'customer' && <i className={styles.iconLike} onClick={addFavorite}>{favorited ? <HeartFill/> : <Heart/>}</i>}
                <i className={styles.iconShare} onClick={goShare}><Share/></i>
            </div>
        </nav>
    )
}