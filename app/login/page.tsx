'use client'
import {
    Link,
    Stack,
    NumberInput,
    NumberInputField,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    Box
} from '@chakra-ui/react'
import React from 'react'
import { users } from '../data/users';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // for handling form input changes
        setLoginDetails({
            ...loginDetails,
            [e.target.name]: e.target.value
        })
    }

    function handleLoginSubmit() {
        // checks for matching id and password
        const foundUser = users.find((user) =>
            user.id.toString() === loginDetails.stuid &&
            user.password === loginDetails.pwd)

        if (foundUser) {
            router.push(`/login/success/${loginDetails.stuid}`)
        }
        else {
            alert('The student ID does not exist')
        }
    }

    const [show, setShow] = React.useState(false)
    const [loginDetails, setLoginDetails] = React.useState({
        stuid: '',
        pwd: ''
    })
    const handleClick = () => setShow(!show)
    return (
        <>
            <Box>
                <h1 className='text-center'>Login</h1>
                <Stack spacing={3}>
                    <Input
                        name='stuid'
                        value={loginDetails.stuid}
                        onChange={handleChange}
                        placeholder='Student ID'
                        size='lg'
                    />
                    <InputGroup size='lg'>
                        <Input
                            name='pwd'
                            value={loginDetails.pwd}
                            onChange={handleChange}
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password'
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <Button onClick={handleLoginSubmit}>Login</Button>
                </Stack>
            </Box>
        </>
    )
}