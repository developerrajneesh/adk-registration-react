import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {

    // State to handle form data and errors
    const [formData, setFormData] = useState({
        sessionStart: '',
        sessionEnd: '',
        candidateName: '',
        formNo: '',
        panNo: '',
        class: '',
        dob: '',
        addmissionDate: '',
        adharNo: '',
        dateOfBirth: '',
        fatherDetails: { name: '', qualification: '', occupation: '', religion: '' },
        motherDetails: { name: '', qualification: '', occupation: '' },
        studentImg: '',
        address: '',
        phoneNumber: '',
        whatsappNumber: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFatherMotherChange = (e) => {
        const { name, value, dataset } = e.target;
        const parent = dataset.parent;
        setFormData({
            ...formData,
            [parent]: {
                ...formData[parent],
                [name]: value,
            },
        });
    };

    const validateForm = () => {
        const newErrors = {};
        // Check if   fields are filled
        Object.keys(formData).forEach(key => {
            if (typeof formData[key] === 'string' && !formData[key].trim()) {
                newErrors[key] = 'This field is  ';
            } else if (typeof formData[key] === 'object') {
                Object.keys(formData[key]).forEach(subKey => {
                    if (!formData[key][subKey].trim()) {
                        newErrors[`${key}.${subKey}`] = 'This field is required ';
                    }
                });
            }
        });

        // Additional validation for specific fields
        if (!/^\d{12}$/.test(formData.adharNo)) {
            newErrors.adharNo = 'Invalid Aadhar Number (12 digits  )';
        }

        if (!/^\d{10}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Invalid phone number';
        }

        if (!/^\d{10}$/.test(formData.whatsappNumber)) {
            newErrors.whatsappNumber = 'Invalid WhatsApp number';
        }

        if (formData.dob && !/^\d{2}\/\d{2}\/\d{4}$/.test(formData.dob)) {
            newErrors.dob = 'Invalid Date format (DD/MM/YYYY)';
        }

        if (formData.dateOfBirth && !/^[a-zA-Z\s]+$/.test(formData.dateOfBirth)) {
            newErrors.dateOfBirth = 'Invalid Date of Birth (In Word)';
        }

        setErrors(newErrors);
        console.log(newErrors);
        
        return Object.keys(newErrors).length === 0;
    };
const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(validateForm())
        if (validateForm()) {
            navigate('/preview',{state:formData})
            console.log('Form data submitted:', formData);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">SARASWATI SHISHU VIDYA MANDIR</h2>
            <p className="text-center">Maharajganj, Jaiprabha gram, Gonda-271209</p>
            <h4 className="text-center">[ADK Section]</h4>

            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Session Start</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Session Start"
                            name="sessionStart"
                            value={formData.sessionStart}
                            onChange={handleChange}
                             
                        />
                        {errors.sessionStart && <div className="text-danger">{errors.sessionStart}</div>}
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Session End</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Session End"
                            name="sessionEnd"
                            value={formData.sessionEnd}
                            onChange={handleChange}
                             
                        />
                        {errors.sessionEnd && <div className="text-danger">{errors.sessionEnd}</div>}
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">PEN No</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter PEN No"
                            name="panNo"
                            value={formData.panNo}
                            onChange={handleChange}
                             
                        />
                        {errors.panNo && <div className="text-danger">{errors.panNo}</div>}
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Admission For Class</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Class"
                            name="class"
                            value={formData.class}
                            onChange={handleChange}
                             
                        />
                        {errors.class && <div className="text-danger">{errors.class}</div>}
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Name of Candidate (IN BLOCK LETTER)</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Candidate's Name"
                            name="candidateName"
                            value={formData.candidateName}
                            onChange={handleChange}
                             
                        />
                        {errors.candidateName && <div className="text-danger">{errors.candidateName}</div>}
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Candidate Photo</label>
                        <input
    type="file"
    className="form-control"
    name="studentImg"
    onChange={(e) => {
      setFormData((prev) => ({
        ...prev,
        studentImg: e.target.files[0],
      }));
    }}
  />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Date of Birth</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="DD/MM/YYYY"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                             
                        />
                        {errors.dob && <div className="text-danger">{errors.dob}</div>}
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Aadhar No</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Aadhar No"
                            name="adharNo"
                            value={formData.adharNo}
                            onChange={handleChange}
                             
                        />
                        {errors.adharNo && <div className="text-danger">{errors.adharNo}</div>}
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Date of Birth (In Word)</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter DOB in words"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                         
                    />
                    {errors.dateOfBirth && <div className="text-danger">{errors.dateOfBirth}</div>}
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Father's Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Father's Name"
                            name="name"
                            data-parent="fatherDetails"
                            value={formData.fatherDetails.name}
                            onChange={handleFatherMotherChange}
                             
                        />
                        {errors['fatherDetails.name'] && <div className="text-danger">{errors['fatherDetails.name']}</div>}
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Father's Qualification</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Qualification"
                            name="qualification"
                            data-parent="fatherDetails"
                            value={formData.fatherDetails.qualification}
                            onChange={handleFatherMotherChange}
                             
                        />
                        {errors['fatherDetails.qualification'] && <div className="text-danger">{errors['fatherDetails.qualification']}</div>}
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Father's Occupation</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Occupation"
                            name="occupation"
                            data-parent="fatherDetails"
                            value={formData.fatherDetails.occupation}
                            onChange={handleFatherMotherChange}
                             
                        />
                        {errors['fatherDetails.occupation'] && <div className="text-danger">{errors['fatherDetails.occupation']}</div>}
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Father's Religion</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Religion"
                            name="religion"
                            data-parent="fatherDetails"
                            value={formData.fatherDetails.religion}
                            onChange={handleFatherMotherChange}
                             
                        />
                        {errors['fatherDetails.religion'] && <div className="text-danger">{errors['fatherDetails.religion']}</div>}
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Mother's Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Mother's Name"
                            name="name"
                            data-parent="motherDetails"
                            value={formData.motherDetails.name}
                            onChange={handleFatherMotherChange}
                             
                        />
                        {errors['motherDetails.name'] && <div className="text-danger">{errors['motherDetails.name']}</div>}
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Mother's Qualification</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Qualification"
                            name="qualification"
                            data-parent="motherDetails"
                            value={formData.motherDetails.qualification}
                            onChange={handleFatherMotherChange}
                             
                        />
                        {errors['motherDetails.qualification'] && <div className="text-danger">{errors['motherDetails.qualification']}</div>}
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Mother's Occupation</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Occupation"
                        name="occupation"
                        data-parent="motherDetails"
                        value={formData.motherDetails.occupation}
                        onChange={handleFatherMotherChange}
                         
                    />
                    {errors['motherDetails.occupation'] && <div className="text-danger">{errors['motherDetails.occupation']}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <textarea
                        className="form-control"
                        rows="2"
                        placeholder="Enter Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                         
                    ></textarea>
                    {errors.address && <div className="text-danger">{errors.address}</div>}
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Phone No</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Phone No"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                             
                        />
                        {errors.phoneNumber && <div className="text-danger">{errors.phoneNumber}</div>}
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">WhatsApp No</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter WhatsApp No"
                            name="whatsappNumber"
                            value={formData.whatsappNumber}
                            onChange={handleChange}
                             
                        />
                        {errors.whatsappNumber && <div className="text-danger">{errors.whatsappNumber}</div>}
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Admission Date</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Phone No"
                            name="addmissionDate"
                            value={formData.addmissionDate}
                            onChange={handleChange}
                             
                        />
                        {errors.addmissionDate && <div className="text-danger">{errors.addmissionDate}</div>}
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Form No</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter WhatsApp No"
                            name="formNo"
                            value={formData.formNo}
                            onChange={handleChange}
                             
                        />
                        {errors.formNo && <div className="text-danger">{errors.formNo}</div>}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default RegistrationForm;
