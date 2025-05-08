import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "../Components/Dashboard";
import QuesBank from "../Components/QuesBank";
import Home from "../Components/Home";
import Examrundash from "../Components/Examrundash";
import profile from "../images/profile.jpeg";
import { addtempenrollmentnumber } from "../Redux/CartSlice";
import axios from 'axios';

function Mainpage(props) {
  const location = useLocation();
  const { users } = location.state || {};
  const url = process.env.REACT_APP_API_BASE_URL;
  console.log(users);
  const [error, setError] = useState(null);
  const [userss, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${url}/api/loginedusercurrent`);
        console.log("Fetched Response new Data:", response.data); // Log the full response
        if (response.data.users) {
          setUsers(response.data.users);
          console.log(userss[0].name,'usersss');
           // Save the fetched users in state
        } else {
          setError('No users found in the response');
        }
      } catch (err) {
        setError('Failed to fetch users');
        console.error('Error fetching users:', err);
      }
    };
  
    fetchUsers();
  }, [url]); // Fetch when the UR
  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [user, setUser] = useState({ user: "login" });
  const [user, setUser] = useState({ user: "login", userdata: users });

  const [showLogout, setShowLogout] = useState(false);
  const logoutRef = useRef(null);

  const name2 = useSelector((state) => state.cart);

  // ✅ Only run once to save user in DB
  useEffect(() => {
    const saveLoginedUser = async () => {
      // Log the users object before using it
      console.log('Users data:', users);
  
      // Check if all required fields are present
      if (!users || !users.enrollmentNumber || !users.NAME || !users.GENDER || !users.AGE || !users.COURSE || !users.PASSWORD) {
        console.error("Missing required user data.");
        return;
      }
  
      const Loginedstudentdetails = {
        enrollmentnumber: users.enrollmentNumber,
        name: users.NAME,
        gender: users.GENDER,
        age: users.AGE,
        course: users.COURSE,
        password: users.PASSWORD,
      };
  
      console.log('Sending data to the server:', Loginedstudentdetails);
  
      try {
        const response = await axios.post(`${url}/api/loginedusercurrent`, Loginedstudentdetails);
        console.log("User saved in DB:", response.data);
      } catch (error) {
        console.error("Error saving user:", error);
      }
    };
  
    if (users?.enrollmentNumber) {
      saveLoginedUser();
    }
  
    dispatch(addtempenrollmentnumber(users));
  }, [users, dispatch, url]);
  
  useEffect(() => {
    if (name2[0]?.value === "examdone") {
      setUser((prev) => ({ ...prev, user: "login2" }));
    }
  }, [name2]);

  // Logout toggles
  const handleProfileClick = () => setShowLogout((prev) => !prev);
  const handleLogout = () => {
    dispatch(addtempenrollmentnumber());  // Clear Redux state
    navigate("/Register");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (logoutRef.current && !logoutRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="d-flex ">
        <div className="twopart2">
          <Container className="p-3">
            <Row>
              <Col sm>
                <h2 className="text-light">Online Exam</h2>
              </Col>
              <Col sm>
                <div className="d-flex profile align-items-center">
                  <div>

                  </div>
                  <div className="position-relative">
  <div
    className="rounded-circle profilestudent-initials cursor-pointer d-flex align-items-center justify-content-center"
    onClick={handleProfileClick}
  >
    {userss[0]?.name.charAt(0).toUpperCase()}

  </div>

  {showLogout && (
    <div
      ref={logoutRef}
      className="logout-section position-absolute bg-light shadow p-3 rounded"
      style={{ right: 0, top: "50px", width: "200px" }}
    >
      <h6 className="text-center">Hello, {userss[0]?.name}</h6>
      <Button variant="danger" className="w-100 mt-2" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  )}
</div>

                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      {/* Body */}
      <div className="d-flex">
        <input type="checkbox" id="toggleCheckbox" />
        <label htmlFor="toggleCheckbox" className="toggle-button">☰</label>

        <div className="sidebar p-2">
          <div className="studentprof mt-3">
            <div className="stuprof d-flex align-items-center">
            <div className="position-relative">
  <div
    className="rounded-circle profilestudent-initials cursor-pointer d-flex align-items-center justify-content-center"
    // onClick={handleProfileClick}
  >
    {userss[0]?.name.charAt(0).toUpperCase()}
  </div>
</div>

              <div>
                <h5>{userss[0]?.name} </h5>
                <div className="category">Student</div>
              </div>
            </div>
            <div className="options mt-4">
              <ul>
              <Link className="w-100" onClick={() => setUser((prev) => ({ ...prev, user: "login2" }))}>Home</Link>
              <Link className="w-100" onClick={() => setUser((prev) => ({ ...prev, user: "pythonpage" }))}>Questions</Link>

              </ul>
            </div>
          </div>
        </div>

        <div className="content w-100">
          {name2[0]?.value === "examdone" ? (
            <Examrundash pp={user.userdata} />

          ) : user.user === "login" ? (
            <Home />
          ) : user.user === "pythonpage" ? (
            <QuesBank />
          ) : user.user === "login2" ? (
            <Home />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
