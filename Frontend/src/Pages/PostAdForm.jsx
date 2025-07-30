import React, { useState, useRef } from "react";
import "../css/PostAdForm.css";
import profilePlaceholder from '../images/codeswars.jpeg';
import { TbCameraPlus } from "react-icons/tb";
import axios from "axios"; 
const PostAdForm = () => {
  const MAX_PHOTOS = 12;
  const [photos, setPhotos] = useState([]);
  const [coverIndex, setCoverIndex] = useState(null);
  const [photosError, setPhotosError] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));

    if (photos.length + imageUrls.length <= MAX_PHOTOS) {
      setPhotos(prev => [...prev, ...imageUrls]);
      setPhotosError(false);
    } else {
      setPhotosError(true);
    }
  };

  const handleRemovePhoto = (index) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
    if (index === coverIndex) setCoverIndex(null);
    else if (index < coverIndex) setCoverIndex(prev => prev - 1);
  };

  const handleSetCover = (index) => {
    setCoverIndex(index);
  };

  const [formData, setFormData] = useState({
    brand: "HTC",
    title: "",
    description: "",
  });

  const [price, setPrice] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [neighbourhood, setNeighbourhood] = useState('');
  const [name, setName] = useState('CODES WARS');
  const [mobile, setMobile] = useState('');
  const [isValid, setIsValid] = useState(null);

  const [profileImage, setProfileImage] = useState(profilePlaceholder);
  const fileInputRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [charCount, setCharCount] = useState(0);

  const cities = {
    "Himachal Pradesh": ["Chamba", "Shimla", "Manali"],
    "Maharashtra": ["Mumbai", "Pune"],
    "Delhi": ["New Delhi", "Dwarka"],
    "UP": ["Lucknow", "Kanpur"],
    "Bihar": ["Patna", "Gaya"]
  };

  const neighbourhoods = {
    "Chamba": ["Main Bazaar", "Sultanpur"],
    "Shimla": ["Lakkar Bazaar", "Mall Road"],
    "Mumbai": ["Andheri", "Bandra"],
    // Add more as needed
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "title") setCharCount(value.length);
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    setMobile(value);
    const phoneRegex = /^[6-9]\d{9}$/;
    setIsValid(phoneRegex.test(value));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title || formData.title.length < 10) {
      newErrors.title = "A minimum length of 10 characters is required.";
    }
    if (!formData.description) {
      newErrors.description = "Description is required.";
    }
    if (!state) newErrors.state = true;
    if (!city) newErrors.city = true;
    if (!neighbourhood) newErrors.neighbourhood = true;
    if (!isValid) newErrors.mobile = "Invalid mobile number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (!validate()) {
  //     console.warn("Validation failed.");
  //     return;
  //   }

  //   const allData = {
  //     brand: formData.brand,
  //     title: formData.title,
  //     description: formData.description,
  //     price,
  //     photos,
  //     coverPhotoIndex: coverIndex,
  //     location: {
  //       state,
  //       city,
  //       neighbourhood
  //     },
  //     profileImage,
  //     name,
  //     mobile,
  //     isMobileValid: isValid
  //   };

  //   console.log("Form Submitted ✅");
  //   console.log(allData);
  // };
    const url = process.env.REACT_APP_API_BASE_URL;
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) {
    console.warn("Validation failed.");
    return;
  }

const allData = {
  brand: formData.brand,
  title: formData.title,
  description: formData.description,
  price,
  photos,
  coverPhotoIndex: coverIndex,
  location: { state, city, neighbourhood },
  profileImage,
  name,
  mobile,
  isMobileValid: isValid
};


  try {
    const res = await axios.post(`${url}/api/post-ad`, allData);
    console.log("Ad saved successfully ✅", res.data);
    alert("Ad posted successfully!");
  } catch (err) {
    console.error("Error saving ad:", err);
    alert("Failed to post ad.");
  }
};
  return (
    <div className="">
      <h2 className="form-heading mt-5">POST YOUR AD</h2>
      <div className="post-ad-container">
            <div className="section">
        <h2 className="section-title text-start">SELECTED CATEGORY</h2>
        <p className="category-path text-start">
          Mobiles / Mobile Phones <span className="change-link ">Change</span>
        </p>
      </div>
        <form onSubmit={handleSubmit} className="ad-form">
          <div className="section">
          {/* Include Some Details */}
            <h2 className="section-title text-start">INCLUDE SOME DETAILS</h2>

            <label className="form-label text-start mt-3">Brand *</label>
            <select
              name="brand"
              required
              value={formData.brand}
              onChange={handleChange}
              className="form-input select-input"
            >
              <option>HTC</option>
              <option>Samsung</option>
              <option>Apple</option>
              <option>Redmi</option>
              <option>VIVO</option>
              <option>Realme</option>
            </select>

            <label className="form-label text-start mt-3">Ad title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`form-input ${errors.title ? "error-border" : ""}`}
              maxLength={70}
            />
            {errors.title && <div className="error-message text-start">{errors.title}</div>}
            <div className="char-count">{charCount} / 70</div>

            <label className="form-label text-start mt-3">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`form-input ${errors.description ? "error-border" : ""}`}
              rows={4}
            />
            {errors.description && (
              <div className="error-message text-start">{errors.description}</div>
            )}
          </div>

          {/* Price Section */}
          <div className="section">
            <h2 className="section-title text-start">SET A PRICE</h2>
            <label className="form-label text-start mt-3" htmlFor="price">Price*</label>
            <div className="price-input-wrapper">
              <span className="rupee-symbol">₹</span>
              <input
                id="price"
                type="number"
                className="form-input"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          {/* Photo Upload */}
          <div className="section">
            <h2 className="section-title text-start">UPLOAD UP TO 12 PHOTOS</h2>
            <div className="photo-grid">
              {photos.map((photo, index) => (
                <div key={index} className="photo-upload-box uploaded">
                  <img src={photo} alt={`Upload ${index}`} className="uploaded-photo" />
                  <button className="remove-button" onClick={() => handleRemovePhoto(index)}>×</button>
                  {coverIndex === index ? (
                    <span className="cover-label">COVER</span>
                  ) : (
                    <button className="set-cover-button" onClick={() => handleSetCover(index)}>Set as Cover</button>
                  )}
                </div>
              ))}

              {photos.length < MAX_PHOTOS && (
                <label className="photo-upload-box">
                  <span className="add-photo-text">Add Photo +</span>
                  <span className="camera-icon"><TbCameraPlus /></span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                    onChange={handleImageChange}
                  />
                </label>
              )}

              {[...Array(MAX_PHOTOS - photos.length - 1)].map((_, idx) => (
                <div key={`placeholder-${idx}`} className="photo-upload-box placeholder">
                  <span className="camera-icon"><TbCameraPlus /></span>
                </div>
              ))}
            </div>
            {photosError && <div className="error-message text-start">You can upload up to 12 photos only</div>}
          </div>

          {/* Location */}
          <div className="section">
            <h2 className="section-title text-start">CONFIRM YOUR LOCATION</h2>
            <label className="form-label text-start mt-3">State *</label>
            <select
              id="state"
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                setCity('');
                setNeighbourhood('');
                setErrors({});
              }}
              className="form-input"
            >
              <option value="">Select State</option>
              {Object.keys(cities).map(stateName => (
                <option key={stateName} value={stateName}>{stateName}</option>
              ))}
            </select>
            {errors.state && <div className="error-message text-start">This field is mandatory</div>}

            {state && (
              <>
                <label className="form-label text-start mt-3">City *</label>
                <select
                  id="city"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setNeighbourhood('');
                    setErrors({});
                  }}
                  className="form-input"
                >
                  <option value="">Select City</option>
                  {(cities[state] || []).map(cityName => (
                    <option key={cityName} value={cityName}>{cityName}</option>
                  ))}
                </select>
                {errors.city && <div className="error-message text-start">This field is mandatory</div>}
              </>
            )}

            {city && (
              <>
                <label className="form-label text-start mt-3">Neighbourhood *</label>
                <select
                  id="neighbourhood"
                  value={neighbourhood}
                  onChange={(e) => {
                    setNeighbourhood(e.target.value);
                    setErrors({});
                  }}
                  className="form-input"
                >
                  <option value="">Select Neighbourhood</option>
                  {(neighbourhoods[city] || []).map(neigh => (
                    <option key={neigh} value={neigh}>{neigh}</option>
                  ))}
                </select>
                {errors.neighbourhood && <div className="error-message text-start">This field is mandatory</div>}
              </>
            )}
          </div>

          {/* Review Details */}
          <div className="section review-details">
            <h2 className="section-title text-start">REVIEW YOUR DETAILS</h2>

            <div className="profile-wrapper">
              <div className="profile-photo1">
                <img src={profileImage} alt="Profile" className="profile-img1" />
                <div className="camera-icon1" onClick={handleIconClick}>
                  <TbCameraPlus />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>

              <div className="input-area">
                <label className="form-label text-start">Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={30}
                />
                <div className="char-count">{name.length}/30</div>
              </div>
            </div>

            <div className="verify-account">
              <h2 className="verify-title text-dark text-start">Let’s verify your account</h2>
              <p className="verify-text text-start">
                We will send you a confirmation code by sms on the next step.
              </p>

              <label className="form-label text-start">Mobile Phone Number *</label>
              <div className="mobile-input-wrapper">
                <span className="prefix">+91</span>
                <input
                  type="tel"
                  className={`form-input ${isValid === null ? "" : isValid ? "valid" : "invalid"}`}
                  placeholder=""
                  value={mobile}
                  onChange={handleMobileChange}
                />
              </div>
              {isValid !== null && (
                <p className={`validation-message text-start ${isValid ? "valid" : "invalid"}`}>
                  {isValid ? "✔️ Valid phone number" : "❌ Invalid phone number"}
                </p>
              )}
            </div>

            <br />
            <div className="text-start">
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostAdForm;
