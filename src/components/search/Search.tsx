import classNames from 'classnames';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import './Search.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes,faSearch,faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';
import { HOST_SERVER_API } from 'contants';
import axios, { AxiosResponse } from 'axios';
import { useAppDispatch } from 'app/hooks';
import { getWeather } from 'redux/weatherSlice';

interface Props {
    show: boolean
    showSearch: () => void
}
interface ListLocation {
    latt_long: string
    location_type: string
    title: string,
    woeid: number
}

const Search:React.FC<Props> = ({show,showSearch}) => {
    const dispatch = useAppDispatch();
    const [search,setSearch] = useState<string>('')
    const [listLocation,setListLocation] = useState<ListLocation[]>([])

    const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) =>{
        setSearch(event.target.value)
    }

    const handleClickSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const url = `${HOST_SERVER_API}/location/search/?query=${search}`;
        axios.get(url)
        .then((response: AxiosResponse) =>{
            setListLocation(response.data)
        })
    }

    const handleClickLocation = (location: ListLocation) => {
        dispatch(getWeather(location.woeid))
        showSearch()
    }
    
    const renderListLocation = listLocation.map((location,index) => {
        return  <div key={index} className="search__result-item" onClick={() => handleClickLocation(location)}>
                    <h1>{location.title}</h1>
                    <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                </div>
    })
    return (
        <div className={classNames({'search':true, 'show__search': show })}>
            <div className="search__close">
                <FontAwesomeIcon onClick={() => showSearch()} icon={faTimes}></FontAwesomeIcon>
            </div>
            <form className="search__input"  onSubmit={handleClickSearch}>
                <div className="search__input-text">
                    <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                    <input type="text" placeholder="Enter your location" onChange={handleChangeSearch}/>
                </div>
                <Button color="primary" type="submit">Search</Button>
            </form>
            <div className="search__result">
                {renderListLocation}
            </div>
        </div>
    );
}

export default Search;