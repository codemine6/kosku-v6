export default function Rating (props) {
    const styles = {
        color: 'transparent',
        backgroundImage: `linear-gradient(to right, #fab700 ${props.rate * 20}%, #ccc 0%)`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text'
    }

    return (
        <span className={props.className} style={styles}>★★★★★</span>
    )
}