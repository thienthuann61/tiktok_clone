import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import { Wrapper as PopperWrapper } from '~/components/Popper'
import Header from './Header';
import styles from './Menu.module.scss'
import MenuItem from './MenuItem';

const cx = classNames.bind(styles)

const defaultFn = () => { }

function Menu({ items = [], children, onChange = defaultFn }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];
    const renderItems = () => {

        return current.data.map((item, index) => {
            const isParent = item.children
            return <MenuItem key={index} data={item} onClick={() => {
                if (isParent) {
                    setHistory(pre => [...pre, item.children])
                } else {
                    onChange(item)
                }
            }} />
        })
    }

    return (
        <Tippy
            offset={[12, 8]}
            interactive
            delay={[0, 700]}
            placement='bottom-end'
            onHide={() => setHistory(pre => pre.slice(0, 1))}
            render={attrs => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {history.length > 1 && <Header title='Language' onBack={() => {
                            setHistory(pre => pre.slice(0, pre.length - 1))
                        }} />}
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;