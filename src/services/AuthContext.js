import { createContext, useContext, useEffect, useState } from "react";
 
const AuthContext = createContext();
 
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem("token"));
  const [user, setUser] = useState('');
 
  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!sessionStorage.getItem("token"));
      const savedUser = sessionStorage.getItem("user");  // Check "user" key
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error("Error parsing user data:", error);
          setUser(null);
        }
      }
    };
 
    window.addEventListener("storage", checkAuth);
    checkAuth();  // Check auth on component mount
 
    return () => window.removeEventListener("storage", checkAuth);
  }, []);
 
  const login = (token, userData) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", JSON.stringify(userData));  // Store under "user"
    setIsLoggedIn(true);
    setUser(userData);
  };
 
  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("username");  // Remove "user"
    setIsLoggedIn(false);
    setUser(null);
  };
 
  return (
<AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
</AuthContext.Provider>
  );
};
 
export const useAuth = () => useContext(AuthContext);



// import { createContext, useContext, useEffect, useState } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem("token"));
//   const [user, setUser] = useState('');

//   useEffect(() => {
//     const checkAuth = () => {
//       setIsLoggedIn(!!sessionStorage.getItem("token"));
//       const savedUser = sessionStorage.getItem("user");  // Check "user" key
//       if (savedUser) {
//         try {
//           setUser(JSON.parse(savedUser));
//         } catch (error) {
//           console.error("Error parsing user data:", error);
//           setUser(null);
//         }
//       }
//     };

//     window.addEventListener("storage", checkAuth);
//     checkAuth();  // Check auth on component mount

//     return () => window.removeEventListener("storage", checkAuth);
//   }, []);

//   const login = (token, userData) => {
//     sessionStorage.setItem("token", token);
//     sessionStorage.setItem("user", JSON.stringify(userData));  // Store under "user"
//     setIsLoggedIn(true);
//     setUser(userData);
//   };

//   const logout = () => {
//     sessionStorage.removeItem("token");
//     sessionStorage.removeItem("user");  // Remove "user"
//     sessionStorage.removeItem("username");  // Remove "user"
//     setIsLoggedIn(false);
//     setUser(null);
//   };
                       
//   return (
//     <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
