import { Helmet } from "react-helmet-async";
import Cover from "../../../Shared/Cover/Cover";
import imgpopular from "../../../assets/menu/pizza-bg.jpg"
import imgdesert from "../../../assets/menu/dessert-bg.jpeg"
import imgpizza from "../../../assets/menu/pizza-bg.jpg"
import imgsalad from "../../../assets/menu/salad-bg.jpg"
import imgsoup from "../../../assets/menu/soup-bg.jpg"
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/Usemenu";
import MenuCategory from "./MenuCategory/MenuCategory";


const Menu = () => {

    const [menu] = useMenu();
    const offered = menu.filter(item => item.category === "offered")
    const popular = menu.filter(item => item.category === "popular")
    const desserts = menu.filter(item => item.category === "dessert")
    const pizza = menu.filter(item => item.category === "pizza")
    const salad = menu.filter(item => item.category === "salad")
    const soup = menu.filter(item => item.category === "soup")
    return (
        <div>
            <Helmet>
                <title className="text-orange-600">FOOD-HUB | Menu</title>
            </Helmet>
            <Cover img ='/src/assets/menu/banner3.jpg' title = 'Our menu'></Cover>
           {/** offer item*/}
            <SectionTitle subHeading= "--Don't miss" 
              heading = "Today's offer"></SectionTitle>
              {/* <MenuCategory items={offered}></MenuCategory> */}

              {/**popular item */}
              <MenuCategory 
              items={popular} 
              title = "popular" 
              img = {imgpopular}
              ></MenuCategory>
              {/**desserts item */}
              <MenuCategory 
              items={desserts} 
              title = "dessert" 
              img = {imgdesert}
              ></MenuCategory>

              {/**pizza item */}
              <MenuCategory 
              items={pizza} 
              title = "pizza" 
              img = {imgpizza}
              ></MenuCategory>

              {/**salad item */}
              <MenuCategory 
              items={salad} 
              title = "salad" 
              img = {imgsalad}
              ></MenuCategory>

              {/**soup item */}
              
              <MenuCategory 
              items={soup} 
              title = "soup" 
              img = {imgsoup}
              ></MenuCategory>
        </div>
        
    );
};

export default Menu;