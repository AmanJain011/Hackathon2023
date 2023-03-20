import { authModalState } from '@/Atoms/authModalAtom';
import { auth } from '@/firebase/clientApp';
import { FIREBASE_ERRORS } from '@/firebase/errors';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';

type LoginProps = {
    
};

const Login:React.FC<LoginProps> = () => {
    const setModalState = useSetRecoilState(authModalState);

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

    const [loginForm, setLoginForm] = useState({
        email:"",
        password:"",
    });

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setLoginForm((prev)=>(
            {
                ...prev,
                [event.target.name] : event.target.value, 
            }
        ))
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        signInWithEmailAndPassword(loginForm.email, loginForm.password);
    };

    return(
        <form onSubmit={onSubmit}>
            <Input name='email' placeholder='Email' type='email' onChange={onChange} mb={2} required fontSize='10pt' bg='gray.50'
            _placeholder={{color:'gray.500'}} _hover={{bg:"white", border:"1px solid", borderColor:"blue.500"}} 
            _focus={{outline:'none', bg:"white", border:"1px solid", borderColor:"blue.500"}}
            />
            <Input name='password' placeholder='Password' type='password' onChange={onChange} mb={2} required fontSize='10pt' bg='gray.50'
            _placeholder={{color:'gray.500'}} _hover={{bg:"white", border:"1px solid", borderColor:"blue.500"}} 
            _focus={{outline:'none', bg:"white", border:"1px solid", borderColor:"blue.500"}}
            />
            <Text color='red' textAlign='center' fontSize='10pt'>{ FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}</Text>
            <Button colorScheme='green' type='submit' width='100%' height='36px' mb={2} mt={2} isLoading={loading}>Log In</Button>
            <Flex justifyContent='center' mb={2}>
                <Text fontSize='9pt' mr={1}>Forgot your password?</Text>
                <Text fontSize='9pt' cursor='pointer' color='green' onClick={()=>setModalState((prev)=>({...prev, view: 'resetPassword'}))}>Reset</Text>
            </Flex>
            <Flex fontSize='9pt' justifyContent='center'>
              <Text mr={1}>New here?</Text>
              <Text color='green' fontWeight={700} cursor='pointer' onClick={()=>setModalState((prev)=>({...prev, view:'signup'}))}>
                SIGN UP
              </Text>
            </Flex>
        </form>
    )
}
export default Login;