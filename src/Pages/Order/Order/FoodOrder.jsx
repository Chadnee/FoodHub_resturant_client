import React from 'react';
import ItemFood from './ItemFood';

const FoodOrder = ({items}) => {
    return (
        <div className='grid md:grid-cols-3 mx-auto lg:grid-cols-3 justify-center items-center gap-5'>
            {
                items.map(item => <ItemFood
                key = {item._id} 
                item = {item}></ItemFood>)
            }
            
        </div>
    );
};

export default FoodOrder;