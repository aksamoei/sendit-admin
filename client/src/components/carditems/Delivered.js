import React from "react";


function Delivered({theNumber, orderNumber, senderName, receiverName, parcelLocation, status}){

    const getBackgroundColor = () => {
        switch (status) {
            case 'accepted':
                return '#14AE5C';
            case 'out for delivery':
                return '#65558F';
            case 'delivered':
                return '#32ADE6D9';
            default:
                return '#FFFFFF'; 
        }
    };

    const style = { backgroundColor: getBackgroundColor() };

    return(
        <>
            <tr>
                <td>{theNumber}</td>
                <td>{orderNumber}</td>
                <td>{senderName}</td>
                <td>{receiverName}</td>
                <td>{parcelLocation}</td>
                <td style={style}>{status}</td>
                <td style={{color: "lightgray", cursor: "not-allowed"}}>Edit</td>
            </tr>
        </>
    );
}

export default Delivered;