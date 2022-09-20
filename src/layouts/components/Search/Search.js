import { useRef, useState, useEffect } from 'react';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import { Wrapper as PopperWrapper } from '~/components/Popper'
import { SearchIcon } from '~/components/Icons';
import { useDebounce } from '~/hooks'
import AccountItem from '~/components/AccountItem';
import styles from './Search.module.scss'
import searchServices from '~/services/searchService';

const cx = classNames.bind(styles)

function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(searchValue, 800)

    const inputRef = useRef();

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([])
            return
        }

        const fetchApi = async () => {
            setLoading(true)
            const result = await searchServices(debouncedValue)
            setSearchResult(result)
            setLoading(false)
        }

        fetchApi()

    }, [debouncedValue]);

    const handleHideResult = () => {
        setShowResult(false)
    }

    const handleClear = () => {
        setSearchValue('')
        inputRef.current.focus()
    }

    const handleChange = e => {
        const searchValue = e.target.value;

        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        // Using a wrapper <div> tag around the reference element solves this by creating a new parentNode context. 
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={attrs => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <div className={cx('search-body')}>
                                <h4 className={cx('search-title')}>Accounts</h4>
                                {searchResult.map(item => {
                                    return (
                                        <AccountItem key={item.id} data={item} />
                                    )
                                })}
                            </div>

                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        placeholder='Search accouts and videos'
                        spellCheck={false}
                        value={searchValue}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />

                    {searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}

                    {loading && <button className={cx('loading')}>
                        <FontAwesomeIcon icon={faSpinner} />
                    </button>}

                    <button
                        className={cx('search-btn')}
                        onClick={handleSubmit}
                        onMouseDown={e => e.preventDefault()}
                    >
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;