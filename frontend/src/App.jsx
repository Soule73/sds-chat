import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';

const App = () => {
  const { theme } = localStorage;


  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      document.querySelector('[name="theme-color"]').content = "#212121"

      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove('dark')
      document.querySelector('[name="theme-color"]').content = "#ffffff"

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
