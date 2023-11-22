import chef from "../../../assets/home/chef-service.jpg"

const About = () => {
    return (
        <div className="relative w-full">
            <div>
                <img className="md:h-96 h-[400px] w-full " src={chef} alt="" />
            </div>
            <div className="flex items-center justify-center flex-col">
            <div className="absolute  w-8/12 mx-auto top-16 flex flex-col items-center justify-center  px-12 py-14 bg-white">
            <p className="font-thin text-2xl text-center uppercase" style={{fontWeight: ""}}>Food Hub</p>
           <p className="text-center font-thin text-[12px]">We made a comprehensive list of fine dining restaurants in Dhaka City by checking Google Maps and other sources so you don’t have to! We gathered all the results in one place and ranked
           so that we obligue thereby</p>
              
        
        </div>
            </div>
        </div>
    );
};

export default About;