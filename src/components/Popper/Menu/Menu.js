import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { Wrapper as PopperWrapper } from '~/components/Popper'
import Header from './Header';
import styles from './Menu.module.scss'
import MenuItem from './MenuItem';

const cx = classNames.bind(styles)

const defaultFn = () => { }

function Menu({ items = [], children, hideOnClick = false, onChange = defaultFn }) {
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

    const handleBack = () => {
        setHistory(pre => pre.slice(0, pre.length - 1))
    }

    const renderResult = attrs => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>

                {history.length > 1 &&
                    <Header
                        title={current.title}
                        onBack={handleBack}
                    />
                }

                <div className={cx('menu-body')}>{renderItems()}</div>
            </PopperWrapper>
        </div>
    )

    // Reset to first page
    const handleReset = () => {
        setHistory(pre => pre.slice(0, 1))
    }

    return (
        <Tippy
            offset={[12, 8]}
            interactive
            delay={[0, 700]}
            hideOnClick={hideOnClick}
            placement='bottom-end'
            onHide={handleReset}
            render={renderResult}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    items: PropTypes.array,
    children: PropTypes.node.isRequired,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func
}

export default Menu;