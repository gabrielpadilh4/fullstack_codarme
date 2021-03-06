import { Container, Spinner, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Login, Programme } from './../components'
import { firebaseClient } from './../config/firebase/client'

export default function Home() {

  const [auth, setAuth] = useState({
    loading: true,
    user: false
  })

  useEffect(() => {
    firebaseClient.auth().onAuthStateChanged(user => {
      setAuth({
        loading: false,
        user
      })
    })
  }, [])

  if (auth.loading) {
    return (
      <Container p={4} centerContent>
        <Spinner /> <Text>Loading...</Text>
      </Container>)
  }

  return auth.user ? <Programme /> : <Login />
}
