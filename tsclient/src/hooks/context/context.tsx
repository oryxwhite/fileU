

// import {createContext, useReducer, useContext, useEffect} from "react";

// type User = {
//     username: string,
// }

// type AuthState = null | {
//     authenticated: boolean,
//     userDetails: User | null,
//     token: string | null,
//     loading: boolean,
//     errorMessage: string | null
// }

// const initialState = {
//         authenticated: false,
//         userDetails: null,
//         token: null,
//         loading: false,
//         errorMessage: null
// }
 
// const AuthStateContext = createContext<AuthState>(null)
// const AuthDispatchContext = createContext(null);

// export function useAuthState() {
//     const context = useContext(AuthStateContext);
//     if (context === null) {
//       throw new Error("useAuthState must be used within a AuthProvider");
//     }
   
//     return context;
//   }
   
//   export function useAuthDispatch() {
//     const context = useContext(AuthDispatchContext);
//     if (context === null) {
//       throw new Error("useAuthDispatch must be used within a AuthProvider");
//     }
   
//     return context;
//   }

//   export const AuthProvider = ({ children }) => {
//     const [user, dispatch] = useReducer(AuthReducer, initialState);
   
//     return (
//       <AuthStateContext.Provider value={user}>
//         <AuthDispatchContext.Provider value={dispatch}>
//           {children}
//         </AuthDispatchContext.Provider>
//       </AuthStateContext.Provider>
//     );
//   };

export function hello() {
    return
}