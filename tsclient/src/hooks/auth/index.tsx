// import React, { createContext, useContext, useMemo } from 'react';
// import { useCookies } from 'react-cookie';
// import { useNavigate } from 'react-router-dom';
// import api from '../../services/api';

// const UserContext = createContext(null)



// export const UserProvider: React.FC<React.ReactNode> = ({ children }) => {
//     const navigate = useNavigate();
//     const [cookies, setCookies, removeCookie] = useCookies();

//     const login = async ({ email, password }:{email: string, password: string}) => {
//         const res = await api.post('/auth', {
//             email: email,
//             password: password
//         });

//         setCookies('token', res.data.token); // your token
//         setCookies('name', res.data.name); // optional data

//         navigate('/home');
//     };

//     const logout = () => {
//         ['token', 'name'].forEach(obj => removeCookie(obj)); // remove data save in cookies
//         navigate('/login');
//     };

//     const value = useMemo(
//         () => ({
//             cookies,
//             login,
//             logout
//         }),
//         [cookies]
//     );

//     return (
//         <UserContext.Provider value={value}>
//             {children}
//         </UserContext.Provider>
//     )
// }

export default function hello() {
    return
}