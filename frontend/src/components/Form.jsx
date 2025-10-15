import { useEffect, useState } from "react";
import Background from "./Background.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Form() {
  const [companyName, setCompanyName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [description, setDescription] = useState("");
  const [slogan, setSlogan] = useState("");
  const [image, setImage] = useState(null);
  const [focusedField, setFocusedField] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorform, seterrorform] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const fetchWithTimeout = (url, options, timeout = 8000) =>
    Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout")), timeout)
      ),
    ]);

  useEffect(() => {
    const fetchClientInfo = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const urltoken = queryParams.get("token");
        const localtoken = localStorage.getItem("token");
        let activeToken = urltoken || localtoken;

        if (!activeToken) {
          navigate("/");
          return;
        }

        if ((urltoken && localtoken && urltoken !== localtoken) || (!localtoken && urltoken)) {
          localStorage.setItem("token", urltoken);
          activeToken = urltoken;
        }

        const headers = { Authorization: `Bearer ${activeToken}` };

        const [infoRes, detailRes] = await Promise.allSettled([
          fetchWithTimeout(
            "https://finalyearproject-alpha.vercel.app/Growspire/v1/users/client_info_check/",
            { method: "GET", headers }
          ),
          fetchWithTimeout(
            "https://finalyearproject-alpha.vercel.app/Growspire/v1/users/client_info_detail/",
            { method: "GET", headers }
          ),
        ]);

        if (infoRes.status === "rejected") {
          console.error("Info fetch failed:", infoRes.reason);
          navigate("/");
          return;
        }

        const infoResponse = infoRes.value;
        if (infoResponse.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
          return;
        }

        if (infoResponse.status === 500) {
          const err = await infoResponse.json().catch(() => ({}));
          if (
            err?.message?.includes("Signature has expired") ||
            err?.detail?.includes("Signature has expired")
          ) {
            localStorage.removeItem("token");
            navigate("/");
            return;
          }
          console.error("Server 500 (info):", err);
        }

        const infoData = infoResponse.ok ? await infoResponse.json() : "incomplete";

        if (infoData === "complete") {
          navigate("/Home");
          return;
        }

        if (detailRes.status === "fulfilled" && detailRes.value.ok) {
          const detailData = await detailRes.value.json();

          setImage(detailData.client_logo || null);
          setName(detailData.client_name || "");
          setCompanyName(detailData.client_company_name || "");
          setDescription(detailData.client_description || "");
          setSlogan(detailData.client_slogan || "");
          setEmail(detailData.client_email || "");
          setPhone(detailData.client_phoneno || "");
          setCountry(detailData.client_country || "");
          setState(detailData.client_state || "");
          setDistrict(detailData.client_district || "");
        }

        setIsLoaded(true);
      } catch (err) {
        console.error("fetchClientInfo error:", err);
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    fetchClientInfo();
  }, [location, navigate]);

if (!isLoaded) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white">
  <h1 className="text-2xl font-bold mb-6">Almost there...</h1>

  <div className="flex space-x-1">
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className="w-5 h-3 bg-purple-500 rounded-full animate-bounce"
        style={{ animationDelay: `${i * 0.15}s` }}
      ></div>
    ))}
  </div>
</div>

  );
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    seterrorform(false);

    if (!companyName || !name || !phone || !country || !state || !district || !image || !description || !slogan) {
      alert("Please fill all the fields and upload an image");
      setLoading(false);
      return;
    }

    const formData = {
      company_name: companyName,
      fullname: name,
      phone_no: phone.toString(),
      country,
      state,
      district,
      logo: image,
      description,
      slogan,
      links: {},
    };

    try {
      const response = await fetch(
        "https://finalyearproject-alpha.vercel.app/Growspire/v1/users/newclient_form_update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (data?.message?.includes("ProgramLimitExceeded") || (data?.detail && String(data.detail).includes("ProgramLimitExceeded"))) {
          seterrorform("Logo is too large. Please upload a smaller image (max ~1kB).");
        } else {
          seterrorform(data?.message || "Failed to submit form. Please try again.");
        }
        setLoading(false);
        return;
      }

      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate("/Home"), 500);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      seterrorform("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  };

  const inputClasses = (fieldName) => `
    relative w-full px-4 py-3 text-gray-700 bg-white/80 backdrop-blur-sm
    border-2 rounded-xl transition-all duration-300 outline-none text-center
    placeholder:text-gray-400 placeholder:font-light font-sulphur font-base
    ${focusedField === fieldName ? "border-blue-400 shadow-lg shadow-blue-200/20 bg-white/90" : "border-gray-200 hover:border-gray-300"}
    focus:border-blue-400 focus:shadow-lg focus:shadow-blue-400/20 focus:bg-white/90
  `;

  return (
    <div className="flex items-center justify-center min-h-screen relative p-4">
      <Background />
      <div className="relative w-full max-w-lg">
        <div className="absolute inset-0 bg-white rounded-3xl border-2 border-[#e1d2f9]/70 shadow-2xl shadow-[#e1d2f9]/70"></div>

        <div className="relative p-8">
          <div className="relative w-full flex justify-center pb-6">
            <label
              htmlFor="file-upload"
              className="cursor-pointer border-2 border-dotted border-grey-200 rounded-lg p-2 flex items-center justify-center w-full hover:border-blue-400 transition relative text-gray-700"
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
              onChange={async (e) => {
                const selectedFile = e.target.files[0];
                if (selectedFile && selectedFile.size <= 10000) {
                  setFile(selectedFile);
                  const base64String = await fileToBase64(selectedFile);
                  setImage(base64String);
                } else {
                  alert("Image is too large. Please upload a smaller file (max 10KB).");
                }
              }}
              required
              className="hidden"
            />
          </div>

          {/* Form Fields */}
          <div className="flex flex-col space-y-3 font-light font-lg">
            <h2 style={{ textAlign: "left" }}>Awesome! You’re now part of our community</h2>

            <input type="text" placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} onFocus={() => setFocusedField("companyName")} onBlur={() => setFocusedField("")} required className={inputClasses("companyName")} />
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} onFocus={() => setFocusedField("description")} onBlur={() => setFocusedField("")} required className={inputClasses("description")} />
            <input type="text" placeholder="Slogan" value={slogan} onChange={(e) => setSlogan(e.target.value)} onFocus={() => setFocusedField("slogan")} onBlur={() => setFocusedField("")} required className={inputClasses("slogan")} />
            <input type="text" placeholder="FullName" value={name} onChange={(e) => setName(e.target.value)} onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField("")} required className={inputClasses("name")} />
            <input type="email" placeholder="Gmail" value={email} disabled className={inputClasses("email")} />
            <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} onFocus={() => setFocusedField("phone")} onBlur={() => setFocusedField("")} required maxLength={10} pattern="[0-9]{10}" className={inputClasses("phone")} />
            <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} onFocus={() => setFocusedField("country")} onBlur={() => setFocusedField("")} required className={inputClasses("country")} />
            <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} onFocus={() => setFocusedField("state")} onBlur={() => setFocusedField("")} required className={inputClasses("state")} />
            <input type="text" placeholder="District" value={district} onChange={(e) => setDistrict(e.target.value)} onFocus={() => setFocusedField("district")} onBlur={() => setFocusedField("")} required className={inputClasses("district")} />

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className={`relative flex items-center justify-center w-full h-12 px-6 rounded-xl text-white font-medium text-lg shadow-inner overflow-hidden group transition-colors duration-300
              ${loading ? "bg-gray-400 cursor-not-allowed" : success ? "bg-green-500" : errorform ? "bg-red-500" : "bg-purple-500"}`}
            >
              <span className="z-10">
                {loading ? "Submitting..." : success ? "Submitted!" : errorform ? "Error" : "Submit"}
              </span>

              <div className="absolute right-1 flex items-center justify-center h-10 w-10 bg-white rounded-lg shadow-lg transition-all duration-300 group-hover:w-[calc(100%-0.5rem)]">
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${
                    success ? "text-green-700" : errorform ? "text-red-500" : "text-purple-700"
                  } group-hover:translate-x-1`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
                </svg>
              </div>
            </button>

            {errorform && <p className="text-red-500 text-sm mt-2 text-center">{errorform}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
