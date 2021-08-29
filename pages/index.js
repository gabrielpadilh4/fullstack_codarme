import { Container, Spinner, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../components'

export default function Home() {

  const [auth] = useAuth()

  const router = useRouter()

  useEffect(() => {
    if (!auth.loading) {
      auth.user ? router.push('/schedule') : router.push('/login')
    }
  }, [auth.user])

  return (
    <Container p={4} centerContent>
      <Spinner /> <Text>Loading...</Text>
    </Container>)

}
