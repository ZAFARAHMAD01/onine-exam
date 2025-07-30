import React, { useState } from "react";
import '../css/Categories.css'
import {
  FaCar,
  FaHome,
  FaMobileAlt,
  FaBriefcase,
  FaBicycle,
  FaTv,
  FaTruck,
  FaCouch,
  FaTshirt,
  FaBook,
  FaDog,
  FaTools,
} from "react-icons/fa";

const categories = [
  { name: "Cars", icon: <FaCar />, subcategories: ["SUV", "Sedan", "Hatchback"] },
  { name: "Properties", icon: <FaHome />, subcategories: ["House", "Flat", "Land"] },
  { name: "Mobiles", icon: <FaMobileAlt />, subcategories: ["Smartphones", "Feature Phones"] },
  { name: "Jobs", icon: <FaBriefcase />, subcategories: ["IT", "Sales", "Marketing"] },
  { name: "Bikes", icon: <FaBicycle />, subcategories: ["Sports", "Cruiser", "Scooter"] },
  { name: "Electronics & Appliances", icon: <FaTv />, subcategories: ["TV", "Fridge", "AC"] },
  { name: "Commercial Vehicles & Spares", icon: <FaTruck />, subcategories: ["Truck", "Bus", "Parts"] },
  { name: "Furniture", icon: <FaCouch />, subcategories: ["Bed", "Sofa", "Table"] },
  { name: "Fashion", icon: <FaTshirt />, subcategories: ["Men", "Women", "Kids"] },
  { name: "Books, Sports & Hobbies", icon: <FaBook />, subcategories: ["Books", "Gym", "Music"] },
  { name: "Pets", icon: <FaDog />, subcategories: ["Dog", "Cat", "Fish"] },
  { name: "Services", icon: <FaTools />, subcategories: ["Plumber", "Electrician"] },
];

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setActiveCategory(category.name);
    console.log("Category Selected:", category.name);
    console.log("Subcategories:", category.subcategories);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-center text-xl font-bold mb-4">POST YOUR AD</h2>
      <div className="border rounded-lg shadow-sm flex overflow-hidden">
        <div className="w-1/2 border-r">
          {categories.map((cat, index) => (
            <div
              key={index}
              className={`flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-100 ${
                activeCategory === cat.name ? "bg-gray-300" : ""
              }`}
              onClick={() => handleCategoryClick(cat)}
            >
              <div className="flex items-center gap-2">
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </div>
              <span>&gt;</span>
            </div>
          ))}
        </div>
        <div className="w-1/2 p-4">
          <h3 className="font-semibold mb-2">{activeCategory}</h3>
          <ul className="list-disc list-inside">
            {categories
              .find((cat) => cat.name === activeCategory)?.subcategories.map((sub, i) => (
                <li key={i}>{sub}</li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
