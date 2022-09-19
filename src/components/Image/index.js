import { useState, forwardRef } from 'react'
import classNames from 'classnames/bind';

import styles from './Image.module.scss'
import images from '~/assets/images';

const Images = forwardRef(({ src, alt, className, fallBack: customFallBack = images.noImage, ...props }, ref) => {
    const [fallBack, setFallBack] = useState('');

    const handleError = () => {
        setFallBack(customFallBack)
    }

    return (
        <img className={classNames(styles.wrapper, className)} src={fallBack || src} ref={ref} alt={alt} onError={handleError} {...props} />
    );
})

export default Images;