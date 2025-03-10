import React, { useEffect, useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { useLocation } from 'react-router-dom';
import Logo from "../assets/adk_logo.jpg"
function Preview() {
    const [imagePreview, setImagePreview] = useState(null);
    const location = useLocation();
  const data = location.state; 
    const componentRef = useRef();
    const handleDownload = () => {
        const element = componentRef.current;

        const options = {
            margin: 10,
            filename: `${data.candidateName}_Admission_Form.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().from(element).set(options).save();
    };
    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Print Document</title>
                </head>
                <body>
                    ${componentRef.current.innerHTML}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };
    console.log(data);
    
    useEffect(() => {
        if (data.studentImg) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setImagePreview(reader.result);
            };
            reader.readAsDataURL(data.studentImg);
          }
    },[data])
    // const data ={
    //     sessionStart:2012,
    //     sessionEnd:2012,
    //     candidateName:'RAJNEESH SHUKLA',
    //     formNo:12345,
    //     panNo:123456894567812,
    //     class:"Nursary",
    //     dob:"21/04/2002",
    //     addmissionDate:"21/04/2002",
    //     adharNo:"4569789562325",
    //     dateOfBirth: "January 1, 2000",
    //     fatherDetails: {
    //         name: "John Doe",
    //         qualification: "B.Sc",
    //         occupation: "Engineer",
    //         religion: "Hindu"
    //     },
    //     motherDetails: {
    //         name: "Jane Doe",
    //         qualification: "M.A",
    //         occupation: "Teacher"
    //     },
    //      studentImg: "",
    //     address: "123 Main Street, Cityville, Country",
    //     phoneNumber: "+91 9876543210",
    //     whatsappNumber: "+91 9876543210"
    // }
  return (
    <>
      <div  ref={componentRef} style={{maxWidth:'1000px'}} className="container  border p-4 ">
        <h2  className="text-center" style={{fontWeight:'800'}}> 
            <img className='mx-2' src={Logo} height={40} width={60}/>
            SARASWATI SHISHU VIDYA MANDIR</h2>
            <h3 className="text-center ">Maharajganj, Jaiprabha gram, Gonda-271209</h3>
        <h4 style={{fontWeight:'900'}}  className="text-center">[ADK Section]</h4>
        <div className="d-flex justify-content-between">
          <span>Session: {data.sessionStart}-{data.sessionEnd}</span>
          <span>Form No:{data.  formNo}</span>
        </div>
        <h5 className="text-center">
          <strong>Registration form for Admission</strong>
        </h5>
        <h6>
        
          {/* <strong>PEN No..........................Admission For Class............</strong> */}
        </h6>

        <div className="row">
          <div className="col-9">

          <div className="d-flex justify-content-between">
          <strong>PEN No: {data.panNo}</strong>
          <strong>Admission For Class: {data.class}</strong>
        </div>
            <p  className='pt-2'><span style={{fontWeight:'600'}}>1- Name of Candidate (IN BLOCK LETTER): </span>{data.candidateName}</p>
            <div className="d-flex justify-content-between">

            <p> <span style={{fontWeight:'600'}}>2- Date of Birth:</span> {data.dob}</p>
            <p> <span style={{fontWeight:'600'}}>Aadhar No: </span> {data.adharNo}</p>
            </div>
            <p> <span style={{fontWeight:'600'}}>Date Of Birth (In Word):</span> {data.dateOfBirth}</p>
            <div className="d-flex justify-content-between">

            <p><span style={{fontWeight:'600'}}>3- Father's Name:</span> {data.fatherDetails.name}</p>
            <p><span style={{fontWeight:'600'}}>Qualification:</span>{data.fatherDetails.qualification}</p>
            </div>
            <div className="d-flex justify-content-between">

            <p><span style={{fontWeight:'600'}}>Occupation:</span> {data.fatherDetails.occupation} </p>
            <p> <span style={{fontWeight:'600'}}>Religion:</span>{data.fatherDetails.religion}</p>
            </div>
            <div className="d-flex justify-content-between">

            <p><span style={{fontWeight:'600'}}>4- Mother's Name:</span> {data.motherDetails.name} </p>
            <p> <span style={{fontWeight:'600'}}>Qualification:</span> {data.motherDetails.qualification}</p>
            </div>
            <p><span style={{fontWeight:'600'}}>Occupation</span> {data.motherDetails.occupation}</p>
            <p><span style={{fontWeight:'600'}}>5- Address:</span> {data.address}</p>
            <div className="d-flex justify-content-between">

            <p><span style={{fontWeight:'600'}}>Phone No:</span> {data.phoneNumber} </p>
            <p>  <span style={{fontWeight:'600'}}>Whatsapp No:</span> {data.whatsappNumber}</p>
            </div>
          </div>
          <div className="col-3 text-center">
            <div className="border" style={{ width: '120px', height: '150px', margin: 'auto' }}>
              <img src={imagePreview} className='h-100 w-100' />
            </div>
          </div>
        </div>

        <p className="mt-3">
        <span style={{fontWeight:'600'}}>Note:</span> If the child is found enrolled in any other school during aadhar verification, then transfer
          certificate and marksheet will not be given from this school.
        </p>

        <h6 className="mt-3 text-center"> <span style={{fontWeight:'600'}}>Declaration of Parent/ Student</span></h6>
        <p>
          I certify that I am the Parent/Guardian of the child and information given in this form including Name of the
          Student, Father's/Mother's name and Date of birth furnished by us is true and correct to the best of my
          knowledge.
        </p>

        <p>Date: {data.addmissionDate}</p>

        <div className="row">
          <div className="col-6">Signature of Parent/Guardian</div>
          <div className="col-6 text-end">Principal</div>
        </div>
        <hr />

        <p className="mt-3 m-0">Please attach birth certificate & Aadhar card - Xerox</p>
        <p className='m-0'>Please attach transfer certificate.</p>
      </div>

      <div className="d-flex justify-content-center gap-5">

{/* <button onClick={()=>handlePrint()}>Print</button> */}
<button  className='btn btn-primary my-3' onClick={()=>handleDownload()} >Download</button>
      </div>
      
     
    </>
  );
}

export default Preview;