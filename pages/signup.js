import Link from 'next/link'
import { useFormik } from 'formik'
import * as yup from 'yup'

import {
  Container,
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  FormLabel,
  FormControl,
  FormHelperText
} from '@chakra-ui/react'

import { Logo } from '../components'
import firebase from '../config/firebase'

export default function Signup() {

  const validationSchema = yup.object().shape({
    email: yup.string().email('Email inválido').required('Preenchimento obrigatório'),
    password: yup.string().required('Preenchimento obrigatório'),
    username: yup.string().required('Preenchimento obrigatório')
  })

  const { values, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting } = useFormik({
    onSubmit: async (values, form) => {
      try {
        const user = await firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
      } catch (error) {
        console.error('ERROR:', error)
      }
    },
    validationSchema,
    initialValues: {
      email: '',
      password: '',
      username: ''
    }

  })

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

          <FormControl id="username" p={4} isRequired>
            <InputGroup size="lg">
              <InputLeftAddon>blue.ridge/</InputLeftAddon>
              <Input type="text" value={values.username} onChange={handleChange} onBlur={handleBlur} />
            </InputGroup>
            {touched.username && <FormHelperText textColor="#e74c3c">{errors.username}</FormHelperText>}
          </FormControl>


          <Box p={4}>
            <Button width="100%" isLoading={isSubmitting} loadingText="Enviando" colorScheme="blue" onClick={handleSubmit}>Cadastrar</Button>
          </Box>

        </Box>
      </Box>

      <Link href="/">Já tem uma conta ? Acesse</Link>

    </Container>
  )
}
