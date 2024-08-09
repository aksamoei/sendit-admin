import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../css/NavBar.css'



function NavBar({isAdmin, setIsAdmin}){
    const navigate = useNavigate()

    function handleAdminLogout(event){
        event.preventDefault()
        
        // fetch('/logout', {
        //     method : 'DELETE'
        // })
        // .then(()=>{
        //     navigate('/login')
        //     setIsAdmin(false)
        // })
        
    }

    return(
        <div>
            <NavLink className="nav-link" activeClassName="active" to='/manage/orders'>Manage Orders</NavLink>
            <NavLink className="nav-link" activeClassName="active" to='/search'>View Orders</NavLink>
            <NavLink className='logout' onClick={handleAdminLogout}>Logout</NavLink>
        </div>
    );
}

export default NavBar;