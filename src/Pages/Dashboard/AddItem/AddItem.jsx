import { useForm } from 'react-hook-form';
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';
import Swal from 'sweetalert2';


const img_hosting_token = import.meta.env.VITE_Image_Token;
const AddItem = () => {
     const [axiosSecure] = useAxiosSecure()
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`

    const onSubmit = data => {
        console.log(data);
        const formData =  new FormData();
        formData.append('image', data.image[0])

        fetch(img_hosting_url, {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(imgResponse => {
            if(imgResponse.success){
                const imgURL = imgResponse.data.display_url;
               const {name, price, category, recipe} = data;
               const newItem = {name, price: parseFloat(price), category, recipe, image: imgURL};
               console.log(newItem);
               axiosSecure.post("/menu", newItem)
               .then(data => {
                console.log("after posting", data.data)
                if(data.data.insertedId){
                    reset();
                    Swal.fire({
                        title: 'Item added succesfully',
                        showClass: {
                          popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                          popup: 'animate__animated animate__fadeOutUp'
                        }
                      })
                }
               })
            }
        })
    }
    console.log(errors);
    console.log(img_hosting_token);

    return (
        <div className='w-full md:px-16 px-7 h-full py-7  '>
            <SectionTitle subHeading="What's new" heading="Add an item"></SectionTitle>

            <form onSubmit={handleSubmit(onSubmit)} className='bg-[#E8E8E8] rounded-lg px-10 py-7'>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text font-bold">Recipe name</span>
                    </label>
                    <input type="text" {...register("name", { required: true })} placeholder="Recipe name" className="input input-bordered w-full " />
                </div>

                <div className='flex gap-4'>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text font-bold">Category*</span>
                        </label>
                        <select defaultValue="Pick one" {...register("category", { required: true })} className="select select-bordered">
                            <option disabled>Select one</option>
                            <option>Salad</option>
                            <option>Pizza</option>
                            <option>Soup</option>
                            <option>Desert</option>
                        </select>
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text font-bold">Price*</span>
                        </label>
                        <input type="number" {...register("price", { required: true, maxLength: 80 })} placeholder="Price" className="input input-bordered w-full " />
                    </div>
                </div>
                <div className="form-control h-16">
                    <label className="label">
                        <span className="label-text font-bold">Recipe Details*</span>
                    </label>
                    <textarea {...register("recipe", { required: true, maxLength: 200 })} className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>
                </div>
                <div className="form-control w-full max-w-xs mt-10 mb-10">
                    <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full max-w-xs" />
                </div>
                <input type="submit" className='bg-amber-800 rounded-lg py-2 md:px-7 mb-10 text-white  btn-sm btn font-semibold ' value="Add Item" />
            </form>

        </div>
    );
};

export default AddItem;