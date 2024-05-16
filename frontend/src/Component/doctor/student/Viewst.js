import React, { useEffect, useState, useRef } from 'react';
import SideBar from '../SideBar';
import { Link, useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ViewStudent() {
    const [student, setStudent] = useState({});
    const { id } = useParams();
    const reportRef = useRef(null); // Declare a ref

    const getStudentData = async () => {
        try {
            const res = await fetch(`http://localhost:8090/getstud/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();

            if (res.status === 422 || !data) {
                console.log("Error fetching student data");
            } else {
                setStudent(data);
                console.log("Data fetched successfully");
            }
        } catch (error) {
            console.error("Error fetching student data:", error);
        }
    }

    useEffect(() => {
        getStudentData();
    }, [id]);

    const generatePDF = () => {
        const input = reportRef.current;
        if (!input) {
            console.error('Report element not found');
            return;
        }
    
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const imgWidth = pdfWidth - 20;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
                let position = 0;
    
                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                position += imgHeight;
    
                // Save PDF
                pdf.save('report.pdf');
            })
            .catch((error) => {
                console.error('Error generating PDF:', error);
            });
    };
    

    return (
        <div className="container mt-5">
            <SideBar />
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="text-center">
                        <h4>All Student Information</h4>
                        <div className="underline"></div>
                    </div>
                    <ul className="list-group mt-4">
                        <li className="list-group-item active" aria-current="true">All Information About</li>
                        <li className="list-group-item">Student Name: {student.name}</li>
                        <li className="list-group-item">Student Address: {student.address}</li>
                        <li className="list-group-item">Parent name: {student.parent}</li>
                        <li className="list-group-item">Student Mobile: {student.contact}</li>
                        <li className="list-group-item">Student Health issue: {student.health}</li>
                    </ul>
                    <div className="btn-group me-2">
                        <button onClick={generatePDF} type="button" className="btn btn-sm btn-outline-secondary">Generate report</button>
                    </div>
                    <div className="text-center mt-5">
                        <Link className="btn btn-primary" to="/homedoctor">Back</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
