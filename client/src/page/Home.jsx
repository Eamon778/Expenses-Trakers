import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIUrl, handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState({});
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('Logged out successfully');
        setTimeout(() => {
            navigate('/login')
        }, 1000)
    }

    const fetchProducts = async () => {
        try {
            const url = `${APIUrl}/products`;
            const headers = {
                'Authorization': `${localStorage.getItem('token')}`
            }

            const response = await fetch(url, headers);
            const result = await response.json();
            console.log(result);
            setProducts(result);
        } catch (error) {
            handleError(err);
        }
    }
    useEffect(() => {
        fetchProducts();
    }, [])

    return (
        <div>
            <h1>Welcome {loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button>
            <div>
                {
                    products && products.map((product, index) => (
                        <ul key={index}>
                            <span>{product.name} : {product.price}</span>
                        </ul>
                    ))
                }
            </div>
            <ToastContainer />
        </div>
    )
}

export default Home;