import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import { fetchUser, userAccessToken } from "./utils/fetchUser";




function App() {
  
  const [user, setUser] = useState(null)
  
  const navigate = useNavigate();

  useEffect(() => {
   const accessToken=userAccessToken()
   if(!accessToken){
    navigate('/login', { replace: true })
   }else{
    const [userInfo]=fetchUser()
    setUser(userInfo)
   }
  },[])


   return(
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/*" element={<Home user={user}/>}/>
    </Routes>
   
  );
}

export default App;
