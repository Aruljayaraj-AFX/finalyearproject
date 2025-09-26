import { useState } from "react";
import Background from "../components/Background.jsx";
import {Link} from "react-router-dom"

export default function Form() {
  const [companyName, setCompanyName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [image, setImage] = useState(null);
  const [focusedField, setFocusedField] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!companyName || !name || !email || !phone || !country || !state || !district || !image) {
      alert("Please fill all the fields and upload an image");
      return;
    }

    const formData = { companyName, name, email, phone, country, state, district, image };
    console.log(formData);
    alert("Form submitted successfully!");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const inputClasses = (fieldName) => `
    relative w-full px-4 py-3 text-gray-700 bg-white/80 backdrop-blur-sm
    border-2 rounded-xl transition-all duration-300 outline-none text-center
    placeholder:text-gray-400 placeholder:font-light font-sulphur font-base
    ${focusedField === fieldName 
      ? 'border-blue-400 shadow-lg shadow-blue-200/20 bg-white/90' 
      : 'border-gray-200 hover:border-gray-300'
    }
    focus:border-blue-400 focus:shadow-lg focus:shadow-blue-400/20 focus:bg-white/90
  `;

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Background/>
      <div className="relative w-full max-w-lg">
        <div className="absolute inset-0 bg-white rounded-3xl border-2 border-[#e1d2f9]/70 shadow-2xl shadow-[#e1d2f9]/70"></div>
        
        <div className="relative p-8">
          <div className="relative w-full flex justify-center pb-8">
              <label
                htmlFor="file-upload"
                className="cursor-pointer border-2 border-dotted border-grey-200 rounded-lg p-2 flex items-center justify-center w-full 
                hover:border-blue-400 transition relative   text-gray-700"
              >
                {image && (
                  <img
                    src={image}
                    alt="Logo Preview"
                    className="w-10 h-10 object-cover rounded-full absolute left-2 top-1/2 -translate-y-1/2"
                  />
                )}
                <span className="text-gray-400">{image ? "Logo Selected" : "Upload Logo"}</span>
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
                className="hidden"
              />
            </div>
          <div className="flex flex-col space-y-3 font-light font-lg"><h2 style={{ textAlign: "left" }}>Awesome! You’re now part of our community</h2>
            <input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              onFocus={() => setFocusedField("companyName")}
              onBlur={() => setFocusedField("")}
              required
              className={inputClasses("companyName")}
            />
            <input
              type="text"
              placeholder="FullName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField("")}
              required
              className={inputClasses("name")}
            />
            <input
              type="email"
              placeholder="Gmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField("")}
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              className={inputClasses("email")}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onFocus={() => setFocusedField("phone")}
              onBlur={() => setFocusedField("")}
              required
              pattern="[0-9]{10}"
              className={inputClasses("phone")}
            />
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              onFocus={() => setFocusedField("country")}
              onBlur={() => setFocusedField("")}
              required
              className={inputClasses("country")}
            />
            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              onFocus={() => setFocusedField("state")}
              onBlur={() => setFocusedField("")}
              required
              className={inputClasses("state")}
            />
            <input
              type="text"
              placeholder="District"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              onFocus={() => setFocusedField("district")}
              onBlur={() => setFocusedField("")}
              required
              className={inputClasses("district")}
            />
            <Link to={companyName && name && email ? "/Hero" : "#"}
  onClick={(e) => {
    if (!companyName || !name || !email) {
      e.preventDefault();
      alert("Fill all fields!");
    }
  }}
            className="relative flex items-center justify-center w-full h-12 px-6 rounded-xl bg-purple-500 text-white font-medium text-lg shadow-inner shadow-purple-700/50 overflow-hidden group">
            Submit
            <div className="absolute right-1 flex items-center justify-center h-10 w-10 bg-white rounded-lg shadow-lg transition-all duration-300 group-hover:w-[calc(100%-0.5rem)]">
              <svg className="w-5 h-5 text-purple-700 transition-transform duration-300 group-hover:translate-x-1"fill="currentColor"viewBox="0 0 24 24"xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
              </svg>
            </div>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}