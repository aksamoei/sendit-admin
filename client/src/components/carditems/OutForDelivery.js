import React from "react"; 
import { useNavigate } from "react-router-dom";


function OutForDelivery({theNumber, orderNumber, senderName, receiverName, parcelLocation, status, id}){

    const navigate = useNavigate()

    function handleEdit(){
        console.log(id)
        navigate(`/order/${id}/details`)
    }

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
                <td className="edit-cell" onClick={handleEdit}>Edit</td>
            </tr>
        </>
    );
}

export default OutForDelivery;