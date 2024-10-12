import React, { useEffect } from 'react';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';


function Header() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [user, navigate]);

  function handleLogout() {
    signOut(auth)
      .then(() => {
        toast.success("SignOut Successfully!!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  return (
    <div>
      <header className="shadow-md sticky-header">
        <div className="flex h-16 max-w-screen items-center gap-8 px-4 sm:px-6 lg:px-8">
          <a className="text-teal-600 flex items-center" href="#">
            <img className="w-12" src="src/assets/Expense.png" />
            <p className="text-xl font-bold">ExpenseTracker</p>
          </a>

          <div className="flex flex-1 items-center justify-end">
            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                {user ? (
                  <>
                  {user.photoURL?( <img src={user.photoURL} className='w-10 h-10 rounded-full'/>): (<p className="text-sm text-gray-700 flex items-center">
                      Welcome, {user.name || user.email}!
                    </p>)}
                    <button
                      onClick={handleLogout}
                      className="block rounded-md bg-red-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <a
                    className="block rounded-md bg-[--theme] px-5 py-2.5 border border-blue-600 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600"
                    href="/signup"
                  >
                    Get Started
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
