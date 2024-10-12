import React,{useState} from 'react'
import Input from '../Input';
import {createUserWithEmailAndPassword } from "firebase/auth";
import {db,auth,provider,doc,setDoc} from '../../firebase';
import { toast } from 'react-toastify';
import SignIn from './SignIn';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDoc } from 'firebase/firestore';

function LogIn() {
  const[firstname,setName]=useState("");
  const[lastname,setLastname]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[confirmpassword,setConfirmpassword]=useState("");
  const[loginform,setLoginform]=useState(false);
  const navigate=useNavigate();

  function signupWithEmail(e){
    e.preventDefault();
    console.log("FirstName",firstname);
    console.log("LastName",lastname);
    console.log("Email",email);
    console.log("Password",password);
    if(firstname!="" && lastname!="" && email!="" && password!="" && confirmpassword!=""){
      if(password===confirmpassword){
        createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
    // Signed up 
      const user = userCredential.user;
      toast.success("User created successfully");
      setName("");
      setLastname("");
      setEmail("");
      setPassword("");
      setConfirmpassword("");
      CreateDoc(user);
      navigate("/dashboard");
    // ...
       })
      .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage);
    // ..
    });
      }else{
        toast.error("Password and Confirm Password should be same");
      }
      
    }
    else{
      toast.error("All fields are mandatory!!");
    }
  }
  function googleAuth(e){
    e.preventDefault();
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      toast.success("SignIn Successfully!!");
      CreateDoc(user);
      navigate("/dashboard");
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorCode,errorMessage);
    });

  async function CreateDoc(user){
    if(!user) return;
    const docRef = doc(db, "users", user.uid);
    const snapshot = await getDoc(docRef);
    if(!snapshot.exists()){
    try{
      await setDoc(doc(db,"users",user.uid),{
        displayname:user.displayName?user.displayName:"",
        name:user.name ? user.name :"" ,
        lastname:user.lastname ? user.lastname: "",
        PhotoURL:user.photoURL ? user.photoURL:"",
        email:user.email ? user.email:"",
        password:user.password ? user.password:"",
      });
    }
    catch(e){
      toast.error(e);
    }
  }else{
    console.log("Doc Exists")
  }
  }
 

 }
  return (
    <>
      {loginform ? (
        <SignIn />

      ) : (
        <>
          <div className="w-screen  bg-slate-500">
            <section className="bg-white">
              <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
                  <img
                    alt=""
                    src="https://media1.moneywise.com/a/27475/how-to-read-stock-charts_facebook_thumb_1200x628_v20230821170156.jpg"
                    className="absolute inset-0 h-full w-full object-cover opacity-80"
                  />

                  <div className="hidden lg:relative lg:block lg:p-12">
                    <a className="block text-white" href="#">
                      <span className="sr-only">Home</span>
                      <img className="w-11" src="src\assets\Expense.png" />
                    </a>

                    <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                      Welcome to ExpenseTracker
                    </h2>

                    <p className="mt-4 leading-relaxed text-white/90">
                      Take control of your finances with ease! Our expense app
                      helps you track your spending, set budgets, and gain
                      insights into your financial habits, all in one simple and
                      intuitive platform.
                    </p>
                  </div>
                </section>

                <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                  <div className="max-w-xl lg:max-w-3xl">
                    <div className="relative -mt-16 block lg:hidden">
                      <a
                        className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                        href="#"
                      >
                        <span className="sr-only">Home</span>
                        <img src="src\assets\Expense.png" />
                      </a>

                      <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                        Welcome to ExpenseTracker
                      </h1>

                      <p className="mt-4 leading-relaxed text-gray-500">
                        Take control of your finances with ease! Our expense app
                        helps you track your spending, set budgets, and gain
                        insights into your financial habits, all in one simple
                        and intuitive platform.
                      </p>
                    </div>

                    <form action="#" className="mt-8 grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="FirstName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          First Name
                        </label>

                        <Input
                          state={firstname}
                          placeholder="John"
                          setState={setName}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="LastName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Last Name
                        </label>

                        <Input
                          state={lastname}
                          placeholder="Doe"
                          setState={setLastname}
                        />
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="Email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          {" "}
                          Email{" "}
                        </label>

                        <Input
                          state={email}
                          placeholder="john.doe@example.com"
                          setState={setEmail}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="Password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          {" "}
                          Password{" "}
                        </label>

                        <Input
                          type="password"
                          state={password}
                          placeholder="Password"
                          setState={setPassword}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="PasswordConfirmation"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Password Confirmation
                        </label>

                        <Input
                          type="password"
                          state={confirmpassword}
                          placeholder="Password Confirmation"
                          setState={setConfirmpassword}
                        />
                      </div>

                      <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                        <button
                          className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                          onClick={signupWithEmail}
                        >
                          Create an account
                        </button>
                        <p>Or</p>
                        <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-white px-12 py-3 text-sm font-medium text-black transition hover:bg-blue-600 hover:text-white focus:outline-none focus:ring active:text-blue-500"
                        onClick={googleAuth}>
                          SignIn with Google
                        </button>
                        <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                          Already have an account?
                          <a href="/signin" className="text-gray-700 underline" onClick={()=>setLoginform(!loginform)}>
                            Log in
                          </a>
                          .
                        </p>
                      </div>
                    </form>
                  </div>
                </main>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
}

export default LogIn
