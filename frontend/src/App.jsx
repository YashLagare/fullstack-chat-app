import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SettingPage from "./pages/SettingPage";
import SignupPage from "./pages/SignupPage";

import { Loader } from "lucide-react";
import { useEffect } from "react";
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemesStore";



const App = () => {

  const {authUser, checkAuth, isCheckingAuth, onlineUser} = useAuthStore();
  const {theme}=useThemeStore();

  console.log({onlineUser});

  useEffect(() =>{
    checkAuth();
  },[checkAuth]);

  console.log({authUser});

  if (isCheckingAuth && !authUser) {
    return(
      <div className="flex items-center justify-center h-screen"><Loader className="size-10 animate-spin"/></div>
    )    
  };


  return (
    <div data-them={theme}>
    <Navbar/>

    <Routes>

      <Route path="/" element={authUser ? <HomePage/>: <Navigate to="/login"/>}/>
      <Route path="/signup" element={ !authUser ? <SignupPage/> : <Navigate to="/"/>}/>
      <Route path="/login" element={ !authUser ? <LoginPage/>: <Navigate to="/"/>}/>
      <Route path="/settings" element={<SettingPage/>}/>
      <Route path="/profile" element={ authUser ? <ProfilePage/>: <Navigate to="/login"/>}/>


    </Routes>
    <Toaster/>
    </div>
  )
}

export default App