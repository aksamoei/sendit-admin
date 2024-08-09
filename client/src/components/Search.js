import React from "react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import SearchItem from './carditems/SearchItem';
import '../css/Search.css'


function Search({parcels}){
    // const {parcels} = useOutletContext()
    const [searchValue, setSearchValue] = useState('')
    const [parcelOrders, setParcelOrders] = useState(parcels)

    function handleSearch(event){
        setSearchValue(event.target.value)
    }

    const filterParcelOrders = parcelOrders.filter((parcel)=>{
        return parcel.orderNumber.toLowerCase().includes(searchValue.toLowerCase())
    })

    const displayParcelOrders = filterParcelOrders.map((parcel)=>{
        return < SearchItem key={parcel.orderNumber} parcelId={parcel.id} parcelNumber={parcel.orderNumber}/>
    })

    return(
        <div className="search-container">
            <form>
                <input type='text' value={searchValue} onChange={handleSearch} placeholder="Search by Order Number"/>
            </form>
            <div className="item-numbers">
                {displayParcelOrders}
            </div>
        </div>
    )
}

export default Search;