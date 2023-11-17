import React from 'react';

const MenuItem = ({item}) => {
    const {name, image, price, recipe} = item;
    return (
        <div className='flex space-x-4 items-center'>
            <img className='w-[80px]' style= {{borderRadius:"0 70% 70% 70%"}} src={image} alt="" />
            <div>
                <h3 className='uppercase'>{name}---------</h3>
                <p className='text-sm '>{recipe}</p>
            </div>
            <p className='text-amber-400'>${price}</p>
        </div>
    );
};

export default MenuItem;