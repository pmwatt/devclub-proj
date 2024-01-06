import {
    Box,
    Link,
    Image
} from '@chakra-ui/react';
import { users } from '../../../data/users';

export default function Success({ params }: {
    params: {
        stuid: string,
    }
}) {
    // ooga booga lazy method: this just search for fname and lname again
    const userDetails = users.find((user) =>
        user.id.toString() === params.stuid)
    return (
        <>
            <Box className='text-center flex flex-col items-center'>
                <Image
                    borderRadius='full'
                    boxSize='200px'
                    src={userDetails?.imgsrc}
                    alt='profile pic'
                />
                <p>Login as</p>
                <h1>{userDetails?.fname} {userDetails?.sname}</h1>
                <div className='flex justify-center'>
                    <Link href='/'>View Exams</Link>
                    <Link href={`/account/${params.stuid}`}>View Account</Link>
                </div>
            </Box>
        </>
    )
}