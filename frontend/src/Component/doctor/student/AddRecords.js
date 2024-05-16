import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import SideBar from '../SideBar';

const AddRecords = () => {
    const navigate = useNavigate();
    const [inputdata, setInputdata] = useState({
        "name": "",
        "address": "",
        "parent": "",
        "contact": "",
        "health": ""
    });

    const setstud = (e) => {
        let value = e.target.value;
        const fieldName = e.target.name;
    
        // Apply filtering only for "name" and "parent" fields
        if (fieldName === "name" || fieldName === "parent") {
            // Filter out characters that are not letters or whitespace
            value = value.split('').filter(char => /[a-zA-Z\s]/.test(char)).join('');
        }
    
        setInputdata({ ...inputdata, [fieldName]: value });
    }
    
    

    // onclick event
    const addinpdata = async (e) => {
        e.preventDefault();

        const { name, address, parent, contact, health } = inputdata;

        // Contact number validation: must contain exactly 10 digits
        if (!/^\d{10}$/.test(contact)) {
            alert('Contact number must contain exactly 10 digits');
            return;
        }

        const res = await fetch("http://localhost:8090/AddRecords", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, address, parent, contact, health
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");
            alert("error");

        } else {
            setInputdata(data);
            toast.success('Please wait  !', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                navigate('/homedoctor');
            }, 3000);
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
                    <SideBar />
                </nav>
                <main className="col-md-9 col-lg-10 offset-md-3 offset-lg-2">
                    <div className="container mt-5">
                        <div className="underline1"></div>
                        <div className="mt-5 w-75">
                            <h4>All New Student Information</h4>
                            <div className="overflow-auto" style={{ maxHeight: "500px" }}>
                                <form className="shadow p-5">
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Student Name</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Student Name"
                                            onChange={setstud} name="name" value={inputdata.name} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Student Address</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Student Address"
                                            onChange={setstud} name="address" value={inputdata.address} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Parent name</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter parent Name"
                                            onChange={setstud} name="parent" value={inputdata.parent} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Student Mobile</label>
                                        <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="Enter Contact Number"
                                            onChange={setstud} name="contact" value={inputdata.contact} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Health issues</label>
                                        <textarea className="form-control" id="exampleFormControlInput1" placeholder="Enter health issues"
                                            onChange={setstud} name="health" value={inputdata.health}></textarea>
                                    </div>
                                    <div className="d-flex">
                                        <button className="btn btn-primary" onClick={addinpdata}>Add Student</button>
                                        <ToastContainer />
                                        <NavLink className="btn btn-primary ms-auto" to="/homedoctor">Back to Home</NavLink>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AddRecords;
