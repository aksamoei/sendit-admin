import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import '../css/OrderDetails.css'


function OrderDetails({parcels, setTheParcels}){
    const params = useParams()
    const orderId = params.id;

    const [displayParcel, setDisplayParcel] = useState({});
    const [displayStatus, setDisplayStatus] = useState('');
    const [parcelLocation, setParcelLocation] = useState('')

    useEffect(()=>{
        fetch(`/parcels/${orderId}`)
        .then((re)=>{
            if(!re.ok){
                throw Error('Issue fetching')
            }
            else{
                return re.json()
            }
        })
        .then((data)=>{
            setDisplayParcel(data)
            setDisplayStatus(data.status)
        })
    },[orderId])
    
    

    ///handle status change
    function handleStatusChange(event){
        setDisplayStatus(event.target.value)

        fetch(`/parcels/${orderId}`,{
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({status : event.target.value})
        })
        .then((response)=>{
            if(!response.ok){
                throw Error('Issue with patching')
            }
            else{
                return response.json()
            }
        })
        .then((data)=>{
            const updatedParcels = {...displayParcel, status : event.target.value}
            setDisplayParcel(updatedParcels)

            //update the main parcel lists
            const updatedParcelList = parcels.map((parcel)=>{
                if(parcel.id === orderId){
                    return updatedParcels
                }
                else{
                    return parcel
                }
            })
            setTheParcels(updatedParcelList)

        })
    }


    ///parcel location change
    function updateParcelLocation(event){
        setParcelLocation(event.target.value)
    }
    
    ///handle parcel location submition
    function handleLocationChange(event){
        event.preventDefault()
        fetch(`/parcels/${orderId}`, {
            method : "PATCH",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({parcelLocation : parcelLocation})
        })
        .then((response)=>{
            if(!response.ok){
                throw Error('Issue patching location')
            }
            else{
                return response.json()
            }
        })
        .then((data)=>{
            const updateParcels = {...displayParcel, parcelLocation : parcelLocation}
            setDisplayParcel(updateParcels)
            setParcelLocation('')


            ///update the main parcel list
            const updateMainParcelList = parcels.map((parcel)=>{
                if(parcel.id===orderId){
                    return updateParcels
                }
                else{
                    return parcel
                }
            })

            setTheParcels(updateMainParcelList)
        })
    }

    ////color status
    const getBackgroundColor = () => {
        switch (displayParcel.status) {
            case 'accepted':
                return '#14AE5C';
            case 'out for delivery':
                return '#65558F';
            case 'delivered':
                return '#32ADE6D9';
            default:
                return '#FFFFFF'; // Default background color
        }
    };

    const style = { backgroundColor: getBackgroundColor() };
    

    if(!displayParcel){
        return <p>Loading....</p>
    }
    return(
        <>
            <div className="order-container">
                <div className="row-1">
                    <h2>Tracking Number:</h2>
                    <p>{displayParcel.orderNumber}</p>
                </div>
                <div className="order-grid-cont">
                    <div className="order-item-1">
                        <div className="parcel-details">
                            <h3>Parcel Details</h3>
                        </div>
                        <div className="status">
                            <h4>Status</h4>
                            <div>
                            <p style={style}>{displayParcel.status}</p>
                            <select onChange={handleStatusChange} value={displayStatus}>
                                <option value='accepted'>Accepted</option>
                                <option value='out for delivery'>Out for Delivery</option>
                                <option value='delivered'>Delivered</option>
                            </select>
                            </div>
                        </div>
                        <div className='dimensions'>
                            <div >
                                <p>Width:</p>
                                <p>{displayParcel.width}</p>
                            </div>
                            <div>
                                <p>Height</p>
                                <p>{displayParcel.height}</p>
                            </div>
                            <div>
                                <p>Weight</p>
                                <p>{displayParcel.weight}</p>
                            </div>
                            <div>
                                <p>Length</p>
                                <p>{displayParcel.length}</p>
                            </div>
                            <div className="total">
                                <p>Total</p>
                                <p>value</p>
                            </div>
                        </div>
                        <div className="location">
                            <div className="location-details">
                                <p>Parcel Location:</p>
                                <p className="the-location">{displayParcel.parcelLocation}</p>
                            </div>
                            <form onSubmit={handleLocationChange}>
                            <input className='location-input' type="text" onChange={updateParcelLocation} value={parcelLocation}/>
                            <button className='location-change' type='submit'>Change</button>
                            </form>
                        </div>

                    </div>
                    <div className="order-item-2">
                        <div>
                            <div>
                                <h3>Receiver Details</h3>
                            </div>
                            <div>
                                <div className="details-item">
                                    <h4>Name:</h4>
                                    <p>{displayParcel.receiverName}</p>
                                </div>
                                <div className="details-item">
                                    <h4>Telephone:</h4>
                                    <p>{displayParcel.receiverTelephone}</p>
                                </div>
                                <div className="details-item">
                                    <h4>Delivery Address:</h4>
                                    <p>{displayParcel.receiverLocation}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div>
                                    <h3>Sender Details</h3>
                                </div>
                                <div>
                                    <div className="details-item">
                                        <h4>Name</h4>
                                        <p>{displayParcel.senderName}</p>
                                    </div>
                                    <div className="details-item">
                                        <h4>Telephone</h4>
                                        <p>{displayParcel.senderTelephone}</p>
                                    </div>
                                    <div className="details-item">
                                        <h4>Sender Address</h4>
                                        <p>{displayParcel.senderLocation}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>
        </>
    )
}

export default OrderDetails;