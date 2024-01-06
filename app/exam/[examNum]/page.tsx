import {
    Box,
    Link,
    Image
} from '@chakra-ui/react';
import { exams } from '../../../app/data/exams'


export default function Exam({ params }: {
    params: {
        examNum: number,
    }
}) {
    // console.log('index: ' + params.examNum)
    const exam = exams[params.examNum];
    return (
        <>
            <div className='flex flex-col items-start gap-4'>
                <h1>{exam.name}</h1>
                <h2>Instructor: {exam.instructor}</h2>
                <p>{exam.instruction}</p>
                <h2>Open Date Time: {exam.opendatetime}</h2>
                <h2>Close Date Time: {exam.cloasedatetime}</h2>
                <Link href={`/exam/${params.examNum}/0/0`}>Start</Link>
            </div>
        </>
    )
}