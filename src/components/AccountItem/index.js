import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";

import styles from './AccountItem.module.scss'

const cx = classNames.bind(styles)

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img className={cx('avatar')} src='https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tiktok-obj/1662473062930434.jpeg?x-expires=1663484400&x-signature=sRjLi6nreUAXd6bZF0nsu0JdgC0%3D' alt='Hoaa' />
            <div className={cx('info')}>
                <h4 className={cx('username')}>
                    _linhhkaa_
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </h4>
                <p className={cx('name')}>Linh Ka</p>
            </div>
        </div>
    );
}

export default AccountItem;