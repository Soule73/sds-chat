import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './ReactToastify.css';
import { useEffect } from 'react';

const App = () => {
  const { theme } = localStorage;

  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem("theme", "light");
    }
  })
  return (
    <div className=' select-none'>
      <ToastContainer
        theme={theme === "dark" ? "dark" : "light"} />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default App;
