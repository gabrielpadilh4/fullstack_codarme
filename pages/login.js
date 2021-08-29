import Link from 'next/link'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useAuth, Logo } from '../components'

import {
    Container,
    Box,
    Text,
    Input,
    Button,
    FormLabel,
    FormControl,
    FormHelperText,

} from '@chakra-ui/react'


export default function Login() {


    const [auth, { login }] = useAuth()
    const router = useRouter()

    const validationSchema = yup.object().shape({
        email: yup.string().email('Email inválido').required('Preenchimento obrigatório'),
        password: yup.string().required('Preenchimento obrigatório')
    })

    const { values, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting } = useFormik({
        onSubmit: login,
        validationSchema,
        initialValues: {
            email: '',
            password: '',
            username: ''
        }

    })

    useEffect(() => {
        auth.user && router.push('/schedule')
    }, [auth.user])

    return (
        <Container p={4} centerContent>
            <Logo />
            <Box p={4} mt={8}>
                <Text>Crie sua agenda compartilhada</Text>
                <Box>
                    <FormControl p={4} id="email" isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input size="lg" type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                        {touched.email && <FormHelperText textColor="#e74c3c">{errors.email}</FormHelperText>}
                    </FormControl>

                    <FormControl p={4} id="password" isRequired>
                        <FormLabel>Senha</FormLabel>
                        <Input size="lg" type="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
                        {touched.password && <FormHelperText textColor="#e74c3c">{errors.password}</FormHelperText>}
                    </FormControl>


                    <Box p={4}>
                        <Button width="100%" isLoading={isSubmitting} loadingText="Enviando" colorScheme="blue" onClick={handleSubmit}>Login</Button>
                    </Box>

                </Box>
            </Box>

            <Link href="/signup">Já tem uma conta ? Cadastre-se</Link>

        </Container>
    )
}
