import * as React from 'react'
import { useState, useEffect, useContext } from 'react'
import { firebaseClient, persistenceMode } from '../../config/firebase/client'

const AuthContext = React.createContext([{}, () => { }])

export const logout = () => {
    firebaseClient.auth().signOut()
}

export const login = async ({ email, password }) => {

    firebaseClient.auth().setPersistence(persistenceMode)

    try {

        await firebaseClient.auth().signInWithEmailAndPassword(email, password)

    } catch (error) {
        console.error('LOGIN ERROR:', error)
    }

}

export const signup = async ({ email, password, username }) => {
    try {
        await firebaseClient.auth().createUserWithEmailAndPassword(email, password)

        await login({ email, password })


        // const { data } = await axios({
        //   method: 'POST',
        //   url: 'api/profile',
        //   data: {
        //     username: values.username
        //   },
        //   header: {
        //     'Authentication': `Bearer ${user.getToken()}`
        //   }
        // })

        //setupProfile(token, username)

    } catch (error) {
        console.error('SIGNUP ERROR:', error)
    }

}

export const useAuth = () => {
    const [auth] = useContext(AuthContext)
    return [auth, { login, logout, signup }]
}

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        loading: true,
        user: false
    })

    useEffect(() => {
        const unsubscribe = firebaseClient.auth().onAuthStateChanged(user => {
            setAuth({
                loding: false,
                user
            })
        })

        return () => unsubscribe()
    }, [])

    return <AuthContext.Provider value={[auth, setAuth]}>
        {children}
    </AuthContext.Provider>
}