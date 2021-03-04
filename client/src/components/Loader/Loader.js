import styles from './Loader.module.css'

export default function Loader() {
    return (
        <div className={styles.loader}>
            <svg viewBox="0 0 100 100">
                <circle r="40" cx="50%" cy="50%" fill="none" strokeWidth="10" stroke="#01cc9d" strokeLinecap="round"/>
            </svg>
        </div>
    )
}