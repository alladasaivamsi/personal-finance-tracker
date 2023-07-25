import React, { useEffect } from "react";
import "./header.css";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import userImg from "../../assets/user.svg";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  function logoutFunction() {
    try {
      signOut(auth)
        .then(() => {
          toast.success("Logged Out Successfully!");
          navigate("/");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <div className="navbar">
      <h2 className="navbar-heading">Financly.</h2>
      {user && (
        <div className="navbar-link" onClick={logoutFunction}>
          <img
            src={user.photoURL ? user.photoURL : userImg}
            style={{ borderRadius: "50%", height: "2rem", width: "2rem" }}
          />
          <h2 className="logoutBtn" onClick={logoutFunction}>
            Logout
          </h2>
        </div>
      )}
    </div>
  );
};

export default Header;
