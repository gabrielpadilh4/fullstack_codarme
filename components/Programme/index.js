import { Button } from "@chakra-ui/react"

import { firebaseClient } from './../../config/firebase'

export const Programme = () => {

    const logout = () => {
        firebaseClient.auth().signOut()
    }

    return (
        <div>
            <Button onClick={logout}>Sair</Button>
        </div>
    )
}