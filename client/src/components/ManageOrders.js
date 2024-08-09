import React, { useState } from 'react';
import AllParcels from './carditems/AllParcels';
import Delivered from './carditems/Delivered';
import OutForDelivery from './carditems/OutForDelivery';
import '../css/ManageOrders.css';

function ManageOrders({parcels}) {
    
    const [activeTab, setActiveTab] = useState('all');
    

    const displayParcels = parcels.map((parcel, index) => (
        <AllParcels
            key={parcel.id}
            theNumber={index + 1}
            orderNumber={parcel.orderNumber}
            senderName={parcel.senderName}
            receiverName={parcel.receiverName}
            parcelLocation={parcel.parcelLocation}
            status={parcel.status}
            id={parcel.id}
        />
    ));

    const delivered = parcels
        .filter((parcel) => parcel.status === 'delivered')
        .map((parc, index) => (
            <Delivered
                key={parc.id}
                theNumber={index + 1}
                orderNumber={parc.orderNumber}
                senderName={parc.senderName}
                receiverName={parc.receiverName}
                parcelLocation={parc.parcelLocation}
                status={parc.status}
            />
        ));

    const inTransit = parcels
        .filter((parcel) => parcel.status === 'out for delivery')
        .map((parc, index) => (
            <OutForDelivery
                key={parc.id}
                theNumber={index + 1}
                orderNumber={parc.orderNumber}
                senderName={parc.senderName}
                receiverName={parc.receiverName}
                parcelLocation={parc.parcelLocation}
                status={parc.status}
                id={parc.id}
            />
        ));

    const [displayPanel, setDisplayPanel] = useState(displayParcels);

    function handleAll() {
        setDisplayPanel(displayParcels);
        setActiveTab('all');
    }

    function handleDelivered() {
        setDisplayPanel(delivered);
        setActiveTab('delivered');
    }

    function handleInTransit() {
        setDisplayPanel(inTransit);
        setActiveTab('inTransit');
    }
    if (!parcels){
        return <p>Loading...</p>
    }

    return (
        <div className="grid-container">
            <div className="grid-item-1">
                <div className={`item ${activeTab === 'all' ? 'active' : ''}`} onClick={handleAll}>
                    <p>All Parcels</p>
                </div>
                <div className={`item ${activeTab === 'delivered' ? 'active' : ''}`} onClick={handleDelivered}>
                    <p>Delivered</p>
                </div>
                <div className={`item ${activeTab === 'inTransit' ? 'active' : ''}`} onClick={handleInTransit}>
                    <p>Out for Delivery</p>
                </div>
            </div>
            <div className="grid-item-2">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Order Number</th>
                            <th>Sender Name</th>
                            <th>Receiver Name</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>{displayPanel}</tbody>
                </table>
            </div>
        </div>
    );
}

export default ManageOrders;
