import Navbar from '@/components/Navbar';
import { storage } from '@/firebase/clientApp';
import { Box, Button, Flex, Input } from '@chakra-ui/react';
import { ref } from 'firebase/storage';
import React, { useState } from 'react';
import { useUploadFile } from 'react-firebase-hooks/storage';

type adminProps = {
    
};

const admin:React.FC<adminProps> = () => {
    const [uploadFile, uploading, snapshot, error] = useUploadFile();
    const [selectedFile, setSelectedFile] = useState<File>()
    const imageRef = ref(storage, 'images/f7.jpeg');

    const upload = async() =>{
        try {
            if(selectedFile){
                await uploadFile(imageRef, selectedFile, {
                    contentType: 'image/jpeg'
                  });
            }
        } catch (error) {
            console.log('firebase error', error)
        }
        return;
    }
    return(
        <>
        <Navbar/>
        <Flex p={5} pt={200} align='center' justify='center' direction='column'>
            <Box>
                <Flex>
                    <Input mb={3} type='file' onChange={(e)=>{
                        const file = e.target.files?.[0]
                        setSelectedFile(file);
                        }}/>
                    <Button onClick={upload}>Ok</Button>
                </Flex>
                <Input mb={3} placeholder='Enter'/>
                <Input mb={3}></Input>
            </Box>
            <Box>Box2</Box>
        </Flex>
        </>
    )
}
export default admin;