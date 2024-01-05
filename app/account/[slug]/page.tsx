import {
    Box,
    Link,
    Image
} from '@chakra-ui/react';
import { users } from '../../data/users';


export default function Account({ params }: {
    params: {
        slug: string,
    }
}) {
    // ooga booga lazy method: this just search for fname and lname again
    const userDetails = users.find((user) =>
        user.id.toString() === params.slug)
    return (
        <>
            <Box className='text-center flex flex-col items-center'>
                <Image
                    borderRadius='full'
                    boxSize='200px'
                    src={userDetails?.imgsrc}
                    alt='profile pic'
                />
                <h2>tel: {userDetails?.tel}</h2>
                <h2>Year: {userDetails?.year}</h2>
                <h2>Section: {userDetails?.sec}</h2>
                <Link href='/'>Back to Exam</Link>
            </Box>
        </>
    )
}