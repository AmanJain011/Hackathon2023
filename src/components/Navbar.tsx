import { auth } from '@/firebase/clientApp';
import { Box, Button, Flex, Heading, Spacer } from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import Link from 'next/link';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import AuthButtons from './AuthButtons';
import AuthModal from './Modal/Auth/AuthModal';

type NavbarProps = {
    
};

const Navbar:React.FC<NavbarProps> = () => {
    const [user]= useAuthState(auth)
    return(
        <>
        <Box boxShadow='md' p={4} position='fixed' zIndex={10} bg='white' width='100%'>
            <Flex align='center'>
            <Link href='/'>
                <Heading color='green'>Logo</Heading>
            </Link>
            <Spacer />
            {user && (
            <Flex>
            <Link href='/admin'>
                <Heading color='green'>Admin</Heading>
            </Link>
            <Button ml={7} onClick={()=>signOut(auth)} colorScheme='green'>LogOut</Button>
            </Flex>
            )}
            {!user && (
             <AuthButtons/>
            )}
            <AuthModal/>
        
            </Flex>
        </Box>
        </>
    )
}
export default Navbar;