import React, { useState } from 'react';
import axios from 'axios';
import Header from '../Header';
import Sidebar from '../Sidebar';
import '../indexMidwife.css';

export default function AddMothers() {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [bloodgroup, setBloodgroup] = useState('AB+');
  const [pregnantmonthcount, setPregnantmonthcount] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [lastconsult, setLastconsult] = useState('');
  const [nextconsult, setNextconsult] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('Active');
  const [age, setAge] = useState('');
  const [proofPhoto, setProofPhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Calculate age based on dob
      const calculatedAge = calculateAge(dob);

      // Create a new FormData object
      const formData = new FormData();

      // Append form data to the FormData object
      formData.append("name", name);
      formData.append("dob", dob);
      formData.append("bloodgroup", bloodgroup);
      formData.append("pregnantmonthcount", pregnantmonthcount);
      formData.append("contact", contact);
      formData.append("address", address);
      formData.append("lastconsult", lastconsult);
      formData.append("nextconsult", nextconsult);
      formData.append("email", email);
      formData.append("status", status);
      formData.append("age", calculatedAge); // Append the calculated age
      formData.append("proofPhoto", proofPhoto); // Append the proofPhoto file

      await axios.post('http://localhost:8090/motherdetails/addmother', formData);

      alert("Mother Added");
      window.location.href = "/allmother";
    } catch (error) {
      alert("Failed to add mother. Please try again later.");
      console.error(error);
    }
  };

  const handleReset = () => {
    setName("");
    setDob("");
    setBloodgroup("AB+");
    setPregnantmonthcount("");
    setContact("");
    setAddress("");
    setLastconsult("");
    setNextconsult("");
    setEmail("");
    setStatus("Active");
    setAge("");
    setProofPhoto(null);
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const maxDobDate = new Date().toISOString().split('T')[0];

  const handleDateChange = (e) => {
    const dob = e.target.value;
    setDob(dob);
    const calculatedAge = calculateAge(dob);
    setAge(calculatedAge);
  };

  const handlePhotoUpload = (e) => {
    setProofPhoto(e.target.files[0]);
  };

  return (
    <div>
      <Header/>
      <Sidebar/>
      <div className='tableMother'>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Pregnant Mothers</h1>
        </div>
        <div className="col py-3">
          <div className="row">
            <div className="col">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/allmother">Maternal health management</a></li>
                  <li className="breadcrumb-item active">New Mother</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row form-group mb-4">
            <div className="col">
              <label htmlFor="name">Name : </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="col">
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                className="form-control"
                id="dob"
                name="dob"
                value={dob}
                onChange={handleDateChange}
                max={maxDobDate}
                required
              />
            </div>
            <div className="col">
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                className="form-control"
                id="age"
                name="age"
                value={age}
                disabled
              />
            </div>
          </div>
          {/* Additional form fields */}
          <div className="row">
            {/* Blood Group, Number of Months Pregnant, Contact, Address, Last Consult, Next Consult, Email */}
          </div>
          <div className="row">
            {/* Proof Photo, Status (Active/Inactive) */}
          </div>
          <br />
          <div>
            <button type="submit" className="btn btn-primary">Add Mother</button>
            <button type="button" className="btn btn-primary" onClick={handleReset}>Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
}
