import React from "react";
import { useNavigate } from "react-router-dom";
import '../../css/SearchItem.css'



function SearchItem({parcelId, parcelNumber}){
    const navigate = useNavigate()

    function handleClickedOrder(){
        navigate(`/order/${parcelId}/details`)
    }

    

    return(
        <>
            <div className="search-item">
                <p onClick={handleClickedOrder}>Order {parcelNumber}</p>
            </div>
        </>
    );
}

export default SearchItem;