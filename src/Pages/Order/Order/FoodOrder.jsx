import ItemFood from './ItemFood';

const FoodOrder = ({items}) => {
       const item = items.map(item => item.length)
       console.log(item)
    return (
        <div className=''>
            <div className= 'grid md:grid-cols-3 mr-0  lg:grid-cols-3 justify-center items-center md:gap-5'>
            {
                items.map(item => <ItemFood
                key = {item._id} 
                item = {item}></ItemFood>)
            }
            
        </div>
        </div>
    );
};

export default FoodOrder;