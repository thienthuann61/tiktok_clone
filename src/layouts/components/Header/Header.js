import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faEarthAsia, faCircleQuestion, faKeyboard, faUser, faCoins, faGear, faSignOut } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { InboxIcon, MessageIcon, UploadIcon } from '~/components/Icons';
import styles from './Header.module.scss'
import images from '~/assets/images'
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';
import Search from '~/layouts/components/Search';
import config from '~/config'

const cx = classNames.bind(styles)

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English'
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt'
                },
            ]
        }

    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback'
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts'
    },
]

function Header() {
    const currentUser = true;

    const handleMenuChange = (menuItem) => {
        console.log(menuItem);
    }

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/@_linhhkaa_'
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
            to: '/coins'
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/settings'
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            to: '/logout',
            separate: true
        },
    ]

    return (
        <>
            <header className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('logo')}>
                        <Link to={config.routes.home} className={cx('logo-link')}>
                            <img src={images.logo} alt='TikTok' />
                        </Link>
                    </div>

                    <Search />

                    <div className={cx('actions')}>
                        {
                            currentUser ?
                                <>
                                    <Tippy delay={[0, 200]} content='Upload Video' placement='bottom'>
                                        <button className={cx('action-btn')}>
                                            <UploadIcon />
                                        </button>
                                    </Tippy>
                                    <Tippy delay={[0, 200]} content='Messages' placement='bottom'>
                                        <button className={cx('action-btn')}>
                                            <MessageIcon />
                                        </button>
                                    </Tippy>
                                    <Tippy delay={[0, 200]} content='Inbox' placement='bottom'>
                                        <button className={cx('action-btn')}>
                                            <InboxIcon />
                                            <span className={cx('badge')}>12</span>
                                        </button>
                                    </Tippy>

                                </>

                                :
                                <>
                                    <Button text>Upload</Button>
                                    <Button primary>Log in</Button>

                                </>
                        }
                        <Menu
                            items={currentUser ? userMenu : MENU_ITEMS}
                            onChange={handleMenuChange}
                        >
                            {
                                currentUser ?
                                    <Image className={cx('user-avatar')} src='https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tiktok-obj/1662473062930434.jpeg?x-expires=1663660800&x-signature=lSOkE%2FUBYxQjuaeQBaR%2F8QreFJE%3D' alt='Linh Ka' />
                                    :
                                    <button className={cx('more-btn')}>
                                        <FontAwesomeIcon icon={faEllipsisVertical} />
                                    </button>
                            }
                        </Menu>
                    </div>


                </div>
            </header>
        </>
    );
}

export default Header;