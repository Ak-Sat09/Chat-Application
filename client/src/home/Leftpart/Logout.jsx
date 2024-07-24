import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function Logout() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setLoading(false);
      toast.success("Logged out successfully");
      window.location.reload();
    } catch (error) {
      console.log("Error in Logout", error);
      toast.error("Error in logging out");
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center p-4 rounded-lg shadow-md">
      <div className="flex items-center space-x-2">
        <BiLogOutCircle
          className="text-3xl text-gray-700 hover:bg-gray-200 p-2 rounded-full cursor-pointer transition duration-300 ease-in-out"
          onClick={handleLogout}
          disabled={loading}
        />
        <span className="text-gray-700 font-semibold text-lg">
          {loading ? "Logging out..." : "Logout"}
        </span>
      </div>
    </div>
  );
}

export default Logout;
