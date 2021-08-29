import { Button } from "@chakra-ui/react"
import { useAuth } from '../components/Auth'
import { useRouter } from 'next/router'
import { useEffect } from "react"

export default function Schedule() {

  const [auth, { logout }] = useAuth()

  const router = useRouter()

  useEffect(() => {
    !auth.user && router.push('/login')
  }, [auth.user])

  return (
    <div>
      <Button onClick={logout}>Sair</Button>
    </div>
  )
}