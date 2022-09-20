import { useState, forwardRef } from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Image.module.scss'
import images from '~/assets/images';

const Image = forwardRef(({ src, alt, className, fallBack: customFallBack = images.noImage, ...props }, ref) => {
    const [fallBack, setFallBack] = useState('');

    const handleError = () => {
        setFallBack(customFallBack)
    }

    return (
        <img className={classNames(styles.wrapper, className)} src={fallBack || src} ref={ref} alt={alt} onError={handleError} {...props} />
    );
})

Image.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    className: PropTypes.string,
    fallBack: PropTypes.string,
}

export default Image;