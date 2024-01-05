import {
    Box,
    Link,
    Image
} from '@chakra-ui/react'

export default function NotLogin() {
    return (
        <>
            <Box className='text-center flex flex-col items-center'>
                <Image
                    borderRadius='full'
                    boxSize='150px'
                    src='https://bit.ly/dan-abramov'
                    alt='question mark'
                />
                <h1>Please Login First</h1>
                <div className='flex justify-center'>
                    <Link href='/login'>Login</Link>
                    <Link href='/'>Back to Exam</Link>
                </div>
            </Box>
        </>
    )
}