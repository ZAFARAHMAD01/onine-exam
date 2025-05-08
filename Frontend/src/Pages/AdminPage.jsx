import React, { useEffect, useState } from 'react';
import { Form, Link, useLocation } from 'react-router-dom';
import { FaSearch, FaUserAlt, FaFileWord } from "react-icons/fa";
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import Dashboard from '../Components/Dashboard';
import profile from '../images/profile.jpeg';
import { IoHome } from "react-icons/io5";
import QuesBank from '../Components/QuesBank';
import Home from '../Components/Home';
import { useDispatch, useSelector } from 'react-redux';
import Examrundash from '../Components/Examrundash';
import Logout from '../Components/Logout';
import AdminDash from '../Components/AdminDash';
import { SiCoursera } from "react-icons/si";
import { IoIosPeople } from "react-icons/io";
import { BsQuestionCircleFill } from "react-icons/bs";
import { GiNotebook } from "react-icons/gi";
import Course from './Course';
import Addtest from './Addtest';
import ManageStudent from './ManageStudent';
import axios from "axios";

import '../css/style2.css'; // ✅ Import your background CSS

function AdminPage(props) {
    const location = useLocation();
    const admin = location.state?.admin;
    // const users = location.state?.users;
    const users = location.state?.users || JSON.parse(localStorage.getItem("adminUser"));

    const name2 = useSelector((state) => state.cart);
    const url = process.env.REACT_APP_API_BASE_URL;

    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [admins, setAdmins] = useState([]);
    const [error, setError] = useState(null);
    const [userss, setUsers] = useState([]);
    const [matchedUser, setMatchedUser] = useState(null);
    const dispatch = useDispatch();

    const [user, setUser] = useState({ user: "login" });

    const py = () => setUser(prev => ({ ...prev, user: "pythonpage" }));
    const htm = () => setUser(prev => ({ ...prev, user: "htmlpage" }));
    const log = () => setUser(prev => ({ ...prev, user: "loginpage" }));
    const dashboard = () => setUser(prev => ({ ...prev, user: "dashbord" }));
    const course = () => setUser(prev => ({ ...prev, user: "course" }));
    const addtest = () => setUser(prev => ({ ...prev, user: "addtest" }));
    const managestudent = () => setUser(prev => ({ ...prev, user: "managestudent" }));

    useEffect(() => {
        const fetchAdminDetails = async () => {
            try {
                const response = await axios.get(`${url}/api/admins`);
                if (response.data.success) {
                    setAdmins(response.data.admins);
                    const filteredAdmin = response.data.admins.find(a => a.email === admin?.email);
                    if (filteredAdmin) {
                        setSelectedAdmin(filteredAdmin);
                    }
                }
            } catch (err) {
                console.error("Error fetching admin:", err);
            }
        };
        fetchAdminDetails();
    }, [admin, url]);

    useEffect(() => {
        if (!users?.fullName || !users?.gender || !users?.email || !users?.password) {
            console.warn("Missing required user data.");
            return;
        }

        const LoginedAdminDetails = {
            name: users.fullName,
            gender: users.gender,
            email: users.email,
            password: users.password,
        };

        axios.post(`${url}/api/logineduAdmincurrent`, LoginedAdminDetails)
            .then(response => {
                console.log("User saved in DB:", response.data);
            })
            .catch(error => {
                console.error("Error saving user:", error?.response?.data || error.message);
            });
    }, [users, url]);

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const response = await axios.get(`${url}/api/logineduAdmincurrent`);
                if (response.data.users) {
                    setUsers(response.data.users);
                } else {
                    setError('No users found in the response');
                }
            } catch (err) {
                setError('Failed to fetch users');
                console.error('Error fetching users:', err);
            }
        };
        fetchAdmin();
    }, [url]);

    useEffect(() => {
        if (!users || !users.email) return;
        const match = userss.find(user => user.email === users.email);
        setMatchedUser(match);
    }, [userss, users?.email]);
    useEffect(() => {
        if (users?.email) {
            localStorage.setItem("adminUser", JSON.stringify(users));
        }
    }, [users]);

    return (
        <div className='adminbg'>
            <div className='d-flex'>
                <div className='twopart2'>
                    <Container className='p-3'>
                        <Row>
                            <Col sm>
                                <h2 className='text-light'>Online Exam</h2>
                            </Col>
                            <Col sm>
                                <div className='d-flex profile'>
                                <div>
                                    
                                </div>
                                <div>
                                    
                                </div>
                                    <div className="rounded-circle profilestudent-initials cursor-pointer d-flex align-items-center justify-content-center">
                                        {matchedUser?.name?.charAt(0).toUpperCase()}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>

            <div className='d-flex'>
                <input type="checkbox" id="toggleCheckbox" />
                <label htmlFor="toggleCheckbox" className="toggle-button">☰</label>

                <div className="sidebar sidbar2">
                    <div className='p-3'>
                        <div className="studentprof mt-3">
                            <div className='stuprof d-flex'>
                                <div className="rounded-circle profilestudent-initials cursor-pointer d-flex align-items-center justify-content-center">
                                    {matchedUser?.name?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <div className="name"><h5>{matchedUser?.name}</h5></div>
                                    <div className="Catofgory">Administrator</div>
                                </div>
                            </div>
                            <div className='options mt-5'>
                                <ul>
                                    <Link onClick={dashboard} className='w-100'>
                                        <IoHome className='mt-1 me-2' /> Dashboard
                                    </Link>
                                    <hr />
                                    <h5 className='text-start'>Action</h5>
                                    <Link onClick={addtest} className='w-100'>
                                        <GiNotebook className='mt-1 me-2' /> Add Test
                                    </Link>
                                    <Link onClick={managestudent} className='w-100'>
                                        <FaFileWord className='mt-1 me-2' /> Manage Student
                                    </Link>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content w-100">
                    {user.user === 'dashbord' ? <AdminDash /> :
                        user.user === 'course' ? <Course /> :
                            user.user === 'login' ? <AdminDash /> :
                                user.user === 'managestudent' ? <ManageStudent /> :
                                    user.user === 'addtest' ? <Addtest /> : <></>
                    }
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
