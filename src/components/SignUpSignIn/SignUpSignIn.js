import React, { useState } from "react";
import "./SignUpSignIn.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db, provider } from "../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const SignInSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginForm, setLoginForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  function signUpWithEmail(e) {
    e.preventDefault();
    setLoading(true);
    console.log("Name", name);
    console.log("Email", email);
    console.log("Password", password);
    console.log("Confirm Password", confirmPassword);
    //Authenicate the user, or basically create a new account using email and password
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            toast.success("User Created!");
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            createDoc(user);
            navigate("/dashboard");
            //Create A doc with user Id as the following Id
          })
          .catch((error) => {
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
          });
      } else {
        toast.error("Password and Confirm Password don't match!");
        setLoading(false);
      }
    } else {
      toast.error("All Feilds are Mandatory!");
      setLoading(false);
    }
  }

  function logInWithEmail(e) {
    e.preventDefault();
    console.log("email :", email);
    console.log("password :", password);
    setLoading(true);
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("User Logged In!!");
          console.log("User Logged In ", user);
          setLoading(false);
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorMessage = error.message;
          setLoading(false);
          toast.error(errorMessage);
        });
    } else {
      toast.error("All Feilds are Mandatory!");
      setLoading(false);
    }
  }
  async function createDoc(user) {
    setLoading(true);
    // Make sure that the doc with the userId doesn't exist
    // Create a doc.
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Doc created!");
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      toast.error("Doc already exists");
      setLoading(false);
    }
  }

  function googleAuth() {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          // The signed-in user info.
          const user = result.user;
          console.log("user", user);
          createDoc(user);
          setLoading(false);
          navigate("/dashboard");
          toast.success("User Authenticated!");
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          setLoading(false);
          const errorMessage = error.message;
          toast.error(errorMessage);
        });
    } catch (e) {
      setLoading(false);
      toast.error(e.message);
    }
  }
  return (
    <>
      {loginForm ? (
        <div className="signInForm">
          <div className="container">
            <h2 className="title">
              Login On &nbsp;<span style={{ color: "blue" }}>Financely.</span>
            </h2>
            <form>
              <div className="email">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <br />
              <div className="password">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <br />
              <div className="btns">
                <button
                  disabled={loading}
                  className="logInWIthEmailBtn"
                  onClick={logInWithEmail}
                >
                  {loading ? "Laoding..." : "LogIn with Email and password"}
                </button>
                <h3>or</h3>
                <button
                  onClick={googleAuth}
                  disabled={loading}
                  className="logInWIthGoogleBtn"
                >
                  {loading ? "Laoding..." : "LogIn with Google"}
                </button>
                <h3
                  style={{ cursor: "pointer" }}
                  onClick={() => setLoginForm(!loginForm)}
                >
                  Or Don't Have An Account? Click Here
                </h3>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="signInForm">
          <div className="container">
            <h2>
              Sign Up On &nbsp;<span style={{ color: "blue" }}>Financely.</span>
            </h2>
            <form>
              <div className="name">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <br />
              <div className="email">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <br />
              <div className="password">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <br />
              <div className="confirmPassword">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  id="confrimPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <br></br>
              <div className="btns">
                <button
                  disabled={loading}
                  className="signUpWIthEmailBtn"
                  onClick={signUpWithEmail}
                >
                  {loading ? "Laoding..." : "Sign Up with Email and password"}
                </button>
                <h3>or</h3>
                <button
                  onClick={googleAuth}
                  disabled={loading}
                  className="signUpWIthGoogleBtn"
                >
                  {loading ? "Laoding..." : "Sign Up with Google"}
                </button>
                <h3
                  style={{ cursor: "pointer" }}
                  onClick={() => setLoginForm(!loginForm)}
                >
                  Or Have An Account Already? Click Here
                </h3>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SignInSignUp;
