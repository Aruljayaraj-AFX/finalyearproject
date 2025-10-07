import { useEffect,useState } from "react";
import Background from "./Background.jsx";
import {Link,useLocation,useNavigate} from "react-router-dom"

export default function Profile() {
  return (
    <div className="flex items-center justify-center min-h-screen relative p-4">
      <Background />
      <div></div>
    </div>
  );
}