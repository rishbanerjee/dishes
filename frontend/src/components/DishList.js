
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import './DishList.css';

function DishList() {
    const [dishes, setDishes] = useState([]);

    const fetchDishes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/dishes');
            setDishes(response.data);
        } catch (error) {
            console.error('Error fetching dishes:', error);
        }
    };

    useEffect(() => {

        fetchDishes();

        const pusher = new Pusher('88ea6ffc3450eda711f2', {
            cluster: 'ap2',
            
        });

        const channel = pusher.subscribe('dishes');
        channel.bind('update', function (data) {
            
            setDishes((prevDishes) => {
                
                const updatedDishes = prevDishes.map((dish) =>
                    dish._id === data._id ? data : dish
                );
                return updatedDishes;
            });
        });

       
        return () => {
            pusher.unsubscribe('dishes');
        };
    }, []); 

   
    const togglePublish = async (id) => {
        try {
            await axios.post(`http://localhost:3001/api/dishes/${id}/toggle`);
            fetchDishes(); 
        } catch (error) {
            console.error('Error toggling publish:', error);
            
        }
    };

    
    return (
        <div className="dish-list-container">
            <h1 className="dish-list-title">Dish Dashboard</h1>
            <ul className="dish-list">
                {dishes.map((dish) => (
                    <li key={dish._id} className="dish-item">
                        <img src={dish.imageUrl} alt={dish.dishName} />
                        <div className="dish-item-details">
                            <h2>{dish.dishName}</h2>
                            <p>Published: {dish.isPublished.toString()}</p>
                        </div>
                        <button onClick={() => togglePublish(dish._id)}>Publish</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DishList;
