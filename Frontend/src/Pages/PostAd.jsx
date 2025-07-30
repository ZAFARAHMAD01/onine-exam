import React, { useState } from "react";
import '../css/PostAd.css';
import {
  FaCar, FaHome, FaMobileAlt, FaBriefcase, FaMotorcycle, FaTv,
  FaTruck, FaCouch, FaTshirt, FaBook, FaDog, FaTools,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function PostAd() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { name: "Cars", icon: <FaCar />, subcategories: [] },
    { name: "Properties", icon: <FaHome />, subcategories: [] },
    { name: "Mobiles", icon: <FaMobileAlt />, subcategories: ["Mobile Phones", "Accessories", "Tablets"] },
    { name: "Jobs", icon: <FaBriefcase />, subcategories: [] },
    { name: "Bikes", icon: <FaMotorcycle />, subcategories: [] },
    { name: "Electronics & Appliances", icon: <FaTv />, subcategories: [] },
    { name: "Commercial Vehicles & Spares", icon: <FaTruck />, subcategories: [] },
    { name: "Furniture", icon: <FaCouch />, subcategories: [] },
    { name: "Fashion", icon: <FaTshirt />, subcategories: [] },
    { name: "Books, Sports & Hobbies", icon: <FaBook />, subcategories: [] },
    { name: "Pets", icon: <FaDog />, subcategories: [] },
    { name: "Services", icon: <FaTools />, subcategories: [] },
  ];

  return (
    <div className="post-ad-container">
      <h2>POST YOUR AD</h2>
      <div className="category-container">
        <div className="left-panel">
          <h2 className="text-dark text-start fs-3">Choose a category</h2>
          {categories.map((category, index) => (
            <div
              key={index}
              className={`category-item ${selectedCategory === index ? "active" : ""}`}
              onClick={() => setSelectedCategory(index)}
            >
              <div className="category-left">
                <span className="icon">{category.icon}</span>
                <span className="name">{category.name}</span>
              </div>
              {category.subcategories.length > 0 && (
                <span className="arrow">›</span>
              )}
            </div>
          ))}
        </div>

        <div className="right-panel">
          {selectedCategory !== null &&
            categories[selectedCategory].subcategories.length > 0 &&
            categories[selectedCategory].subcategories.map((sub, i) => {
              if (sub === "Mobile Phones") {
                return (
                  <div key={i} className="subcategory-item">
                    <Link to="/Mobile">Mobile Phone</Link>
                  </div>
                );
              }
              return (
                <div key={i} className="subcategory-item">
                  {sub}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default PostAd;
