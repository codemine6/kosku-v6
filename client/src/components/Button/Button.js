import styles from './Button.module.css'

export default function Button(props) {
    function handleClick(e) {
        const circle = document.createElement('div')
        e.target.appendChild(circle)

        circle.classList.add(styles.ripple)
        circle.style.width = e.target.clientWidth + 'px'
        circle.style.height = e.target.clientWidth + 'px'
        circle.style.left = e.clientX - e.target.offsetLeft - e.target.clientWidth / 2 + 'px'
        circle.style.top = e.clientY - e.target.offsetTop - e.target.clientWidth / 2 + 'px'

        setTimeout(() => circle.remove(), 600)
        props.onClick && props.onClick()
    }

    return (
        <button id={props.id} className={styles.button} disabled={props.disabled} onClick={handleClick}>{props.children}</button>
    )
}