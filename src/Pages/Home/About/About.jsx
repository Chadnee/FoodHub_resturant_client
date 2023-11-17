import chef from "../../../assets/home/chef-service.jpg"

const About = () => {
    return (
        <div className="relative w-full">
            <div>
                <img className="h-96 w-full " src={chef} alt="" />
            </div>
            <div className="absolute w-8/12 mx-auto left-56 flex items-center   justify-center top-28  px-12 py-14 bg-white">
            <div className="px-12 ">
                <p className="font-thin text-2xl text-center uppercase" style={{fontWeight: ""}}>Food Hub</p>
               <p className="text-center font-thin text-[12px]">We made a comprehensive list of fine dining restaurants in Dhaka City by checking Google Maps and other sources so you don’t have to! We gathered all the results in one place and ranked <br />
               so that we obligue thereby</p>
                  
            </div>
            </div>
        </div>
    );
};

export default About;