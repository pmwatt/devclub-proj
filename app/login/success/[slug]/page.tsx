import {
    Box,
    Link,
    Image
} from '@chakra-ui/react';
import { users } from '../../../data/users';

export default function Success({ params }: {
    params: {
        slug: string,
    }
}) {
    // ooga booga lazy method: this just search for fname and lname again
    const userDetails = users.find((user) =>
        user.id.toString() === params.slug)
    return (
        <>
            <Box className='text-center'>
                <Image
                    borderRadius='full'
                    boxSize='200px'
                    src='https://firebasestorage.googleapis.com/v0/b/storage1-15612.appspot.com/o/IMG_2906.jpeg?alt=media&token=46d7132e-13d9-4a3a-9d16-67ff46ec5437'
                    alt='profile pic'
                />
                <p>Login as</p>
                <h1>{userDetails?.fname} {userDetails?.sname}</h1>
                <div className='flex'>
                    <Link href='/'>View Exams</Link>
                    <Link href={`/account/${params.slug}`}>View Account</Link>
                </div>
            </Box>
        </>
    )
}