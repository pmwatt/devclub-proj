import {
  Link,
  SimpleGrid
} from '@chakra-ui/react'
import { exams } from '../app/data/exams'


export default function Home() {
  return (
    <>
      <h1>Available Exam</h1>
      <SimpleGrid columns={[1,1,2]} spacingX='100px' spacingY='20px'>
        {
          exams.map((exam, index) => (
            <div key={index} className='bg-[#f5f5f5] p-5 rounded-xl flex flex-col items-center'>
              <h1>{exam.name}</h1>
              <h2>Instructor: {exam.instructor}</h2>
              <Link href={`/exam/${index}`}>See More</Link>
            </div>
          ))
        }
      </SimpleGrid>
    </>
  )
}
