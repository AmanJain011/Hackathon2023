import { Card, CardBody, Stack, Heading, Divider, CardFooter, ButtonGroup, Button, Text, Image } from '@chakra-ui/react';
import React from 'react';

type CardUiProps = {
    url:never
};

const CardUi:React.FC<CardUiProps> = ({url}) => {
    
    return(
        <Card maxW='md'>
        <CardBody>
            <Image
                src={url}
                alt='Green double couch with wooden legs'
                borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
                <Heading size='md' color='green'>Food</Heading>
                <Text color='geen'>
                    Very very testy
                </Text>
                <Text color='green' fontSize='2xl'>
                    Rs 450
                </Text>
            </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
            <ButtonGroup spacing='2'>
                <Button variant='solid' colorScheme='green'>
                    Buy now
                </Button>
                <Button variant='ghost' colorScheme='green'>
                    Add to cart
                </Button>
            </ButtonGroup>
        </CardFooter>
    </Card>
    )
}
export default CardUi;