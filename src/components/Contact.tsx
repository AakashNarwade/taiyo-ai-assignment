import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../redux/contactSlice";

import { useNavigate } from "react-router-dom";

const ContactForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    isActive: true,
  });

  const navigate = useNavigate();

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRadioChange = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setFormData((prevData) => ({ ...prevData, isActive: value === "active" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fName && formData.lName) {
      dispatch(addContact({ id: Date.now().toString(), ...formData }));
      setFormData({ fName: "", lName: "", isActive: true });
      // Navigate to the ContactsPage
      navigate("/contacts");
    }
  };

  return (
    <div className="bg-darkseagreen  drop-shadow-lg max-w-screen-sm max-h-80 flex justify-center">
      <form
        action="/contacts"
        onSubmit={handleSubmit}
        className="flex flex-col space-y-2 md:space-y-4"
      >
        <h2 className="self-center text-xl md:text-2xl font-bold text-grey">
          Add Contact
        </h2>
        <div>
          <label htmlFor="fName">First Name:</label>
          <input
            id="fName"
            type="text"
            name="fName"
            placeholder="Enter your first name!"
            value={formData.fName}
            onChange={handleInputChange}
            className="bg-white ml-2 border border-slate-300 py-2 px-2 shadow-sm focus:outline-none focus:border-aliceblue focus:black focus:ring-2"
            maxLength={15}
          />
        </div>
        <div>
          <label htmlFor="lName">Last Name:</label>
          <input
            id="lName"
            type="text"
            name="lName"
            placeholder="Enter your last name!"
            value={formData.lName}
            onChange={handleInputChange}
            className="bg-white ml-2 border border-slate-300 py-2 px-2 shadow-sm focus:outline-none focus:border-aliceblue focus:black focus:ring-2"
            maxLength={15}
          />
        </div>
        <div className="flex  gap-3 justify-evenly">
          <label>Status:</label>
          <label>
            <input
              type="radio"
              name="status"
              value="active"
              checked={formData.isActive}
              onChange={handleRadioChange}
              className="checked:bg-blue-500 indeterminate:bg-gray-300 default:ring-2 required:border-red-500 valid:border-green-500 invalid:border-red-500"
            />
            Active
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="inactive"
              checked={!formData.isActive}
              onChange={handleRadioChange}
              className="checked:bg-blue-500 indeterminate:bg-gray-300 default:ring-2 required:border-red-500 valid:border-green-500 invalid:border-red-500"
            />
            Inactive
          </label>
        </div>
        <button
          type="submit"
          className="w-[20%] md:w-3/4 bg-black text-white p-2 self-center"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
