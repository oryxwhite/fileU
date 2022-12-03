import { createContext, useReducer, useContext, useState } from 'react'
// import { useFormContext } from 'react-hook-form'
import { IFile, IUserStore } from '../../types/interface'

interface IAuthContextState {
    authenticated: boolean,
    userDetails?: IUserStore | null,
    token?: string,
}

const initialState: IAuthContextState = {
    authenticated: false,
    // userDetails: JSON.parse(localStorage.getItem('user'))

}

const initialDispatchContextState: React.Dispatch<action> = () => initialState

export const AuthContext = createContext<IAuthContextState>(initialState)
export const AuthDispatchContext = createContext<React.Dispatch<action>>(initialDispatchContextState)
 
type Props = {
    children: JSX.Element
}

export const AuthProvider: React.FC<Props> = ({ children }: Props) => {
    // const [user, setUser] = useState<IUserStore | null>(null)
    let user: IUserStore | null = null
    const userData = localStorage.getItem('user')
    if (userData != null) {
        user = JSON.parse(userData)
    }

    const initialState: IAuthContextState = {
        authenticated: user != null ? true : false,
        userDetails: user
    
    }
    const [state, dispatch] = useReducer(authReducer, initialState)

    return (
        <AuthContext.Provider value={state}>
            <AuthDispatchContext.Provider value={dispatch}>
                { children }
            </AuthDispatchContext.Provider>
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export const useAuthDispatch = () => {
    return useContext(AuthDispatchContext)
}

//TODO
// add reducer for getUserData, setFiles
// add interface for action
// switch to cookies?
// change localstorage user schema
// update router to consume context 

type action = 
    | {type: "setUserData"; userData: IUserStore}
    | {type: "clearUserData";}


    // type: "setUserData" | "clearUserData",
    // userData?: IUserStore


const authReducer = (state: IAuthContextState, action: action ) => {
    switch (action.type) {
        case "setUserData": {
            localStorage.setItem('user', JSON.stringify(action.userData))
            return {
                ...state,
                authenticated: true,
                userDetails: action.userData,
                token: action.userData.token
                // userDetails: action.userData,
                // token: action.userData?.token,
                // authenticated: true
            }
        }

        case "clearUserData": {
            localStorage.clear()
            return {
                authenticated: false,
              
                // userDetails: null,
                // token: null,
                // authenticated: false
            }
        }
        default: {
            throw Error('Unknown action: ' + action);
          }
    }
}