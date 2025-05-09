import { createContext, useState, useEffect, useContext } from 'react';
import { getProfile } from '../features/auth/authAPI';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                setProfile(data);
            } catch (error) {
                console.log(error.message);
            }
        };

        if (localStorage.getItem('token')) {
            console.log('hi')
            fetchProfile();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ profile, setProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useProfile = () => useContext(AuthContext);


// import { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [profile, setProfile] = useState(null);

//   return (
//     <AuthContext.Provider value={{ profile, setProfile }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useProfile = () => useContext(AuthContext);
