import {useFormContext} from 'contexts/RoomFormContext'
import styles from './ImageInput.module.css'

export default function ImageInput() {
    const {form, dispatch} = useFormContext()

    function changeImage(e) {
        const newImages = []
        Array.from(e.target.files).forEach((file, i) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = img => {
                newImages.push(img.target.result)
                if (e.target.files.length === i+1) {
                    dispatch({type: 'SET_IMAGES', payload: [...form.images, ...newImages]})
                }
            }
        })
    }

    function removeImage(item) {
        dispatch({type: 'SET_IMAGES', payload: form.images.filter(img => img !== item)})
    }

    return (
        <div className={styles.form}>
            {form.images.map((img, i) => (
                <div className={styles.image} key={i}>
                    <img src={img} alt=""/>
                    <span onClick={() => removeImage(img)}><i/></span>
                </div>
            ))}
            <label htmlFor="input">+</label>
            <input id="input" type="file" accept="image/*" multiple onChange={changeImage}/>
        </div>
    )
}