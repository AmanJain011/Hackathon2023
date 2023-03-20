import { Input, Button, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/clientApp';
import { FIREBASE_ERRORS } from '@/firebase/errors';
import { addDoc, collection } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { json } from 'stream/consumers';
import { authModalState } from '@/Atoms/authModalAtom';

type SignUpProps = {

};

const SignUp: React.FC<SignUpProps> = () => {
    const setModalState = useSetRecoilState(authModalState);
    const [error, setError] = useState('');

    const [
        createUserWithEmailAndPassword,
        userCred,
        loading,
        userError,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [signUpForm, setSignUpForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpForm((prev) => (
            {
                ...prev,
                [event.target.name]: event.target.value,
            }
        ))
    };

    const createUserDocument = async(user:User) =>{
        await addDoc(collection(firestore, "users"), JSON.parse(JSON.stringify(user)));
    }

    useEffect(()=>{
        if(userCred){
            createUserDocument(userCred.user);
        }
    }, [userCred])


    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (error) setError('');
        if (signUpForm.password !== signUpForm.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
    };

    return (
        <form onSubmit={onSubmit}>
            <Input name='email' placeholder='Email' type='email' onChange={onChange} mb={2} required fontSize='10pt' bg='gray.50'
                _placeholder={{ color: 'gray.500' }} _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
                _focus={{ outline: 'none', bg: "white", border: "1px solid", borderColor: "blue.500" }}
            />
            <Input name='password' placeholder='Password' type='password' onChange={onChange} mb={2} required fontSize='10pt' bg='gray.50'
                _placeholder={{ color: 'gray.500' }} _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
                _focus={{ outline: 'none', bg: "white", border: "1px solid", borderColor: "blue.500" }}
            />
            <Input name='confirmPassword' placeholder='Confirm Password' type='password' onChange={onChange} mb={2} required fontSize='10pt' bg='gray.50'
                _placeholder={{ color: 'gray.500' }} _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
                _focus={{ outline: 'none', bg: "white", border: "1px solid", borderColor: "blue.500" }}
            />
            <Text color='red' textAlign='center' fontSize='10pt'>{error || FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}</Text>
            <Button colorScheme='green' type='submit' width='100%' height='36px' mb={2} mt={2} isLoading={loading}>Sign Up</Button>
            <Flex fontSize='9pt' justifyContent='center'>
                <Text mr={1}>Already a redditor?</Text>
                <Text color='green' fontWeight={700} cursor='pointer' onClick={() => setModalState((prev) => ({ ...prev, view: 'login' }))}>
                    LOG IN
                </Text>
            </Flex>
        </form>
    )
}
export default SignUp;