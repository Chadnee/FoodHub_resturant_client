import React from 'react';
import MenuItem from '../../../../Shared/MenuItem/MenuItem';
import { Parallax } from 'react-parallax';
import { Link } from 'react-router-dom';

const MenuCategory = ({ items, img, title }) => {
    console.log(title)
    return (
        <div className='flex flex-col'>
            {title && 
             <Parallax
                 bgImage={img}
                 bgImageAlt={title}
                 strength={-200}
                 className='mb-12'
             >
                 <div className="hero h-[500px]">
                     <div className="hero-overlay "></div>
                     <div className="hero-content text-center text-neutral-content">
                         <div className="max-w-md bg-black bg-opacity-40 py-5 px-12">
                             <h1 className="mb-5 text-white uppercase text-5xl font-bold">{title}</h1>
                             <p className="mb-5">Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
     
                         </div>
                     </div>
                 </div>
             </Parallax>}
            <div className='grid md:grid-cols-2 mb-8 lg:grid-cols-2 space-y-4 gap-2'>
                {
                    // eslint-disable-next-line react/prop-types
                    items.map(item => <MenuItem
                        key={item._id} item={item}></MenuItem>)
                }
            </div>
            
              <Link to = {`/order/${title}`} className='mx-auto'>
              <button className='btn btn-outline text-center mt-14 mb-20 mx-auto uppercase border-0 border-b-4'>Order your favourite food</button>
              </Link>
             </div>
    );
};

export default MenuCategory;