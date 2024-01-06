'use client'
import {
    Link,
    Button,
    Input,
    Select,
    Radio,
    RadioGroup,
    Stack
} from '@chakra-ui/react'
import { exams } from '../../../../../app/data/exams'
import React from 'react'
import { useRouter } from 'next/navigation';


export default function Question({ params }: {
    params: {
        examNum: number,
        qnum: number,
        score: number
    }
}) {
    const router = useRouter(); // for navigating to new pages
    const exam = exams[params.examNum]
    const question = exam.questions[params.qnum]

    // set states, ugly atm
    const [answer, setAnswer] = React.useState({
        ansText: '', // type 0
        ansMultipleChoice: '', // type 1
        ansTrueFalse: '', // type 2
        ansSelectOne: '', // type 3
    })

    // (duped from /app/login page.tsx)
    // https://stackoverflow.com/questions/70043668/react-typescript-input-onchange-event-type
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // for handling form input changes
        setAnswer({
            ...answer,
            [e.target.name]: e.target.value
        })
        // for debug
        // console.log(answer)
    }

    function renderAnswer(questionType: number) {
        let answerElement;
        switch (questionType) {
            case 0: // string answer
                answerElement = (
                    <Input
                        value={answer.ansText}
                        onChange={handleChange}
                        placeholder='large size'
                        size='lg' />
                )
                break;
            case 1: // 4 multiple choices
                answerElement = (
                    <RadioGroup value={answer.ansMultipleChoice} onSelect={handleChange}>
                        <Stack direction='column'>
                            <Radio value='1'>First</Radio>
                            <Radio value='2'>Second</Radio>
                            <Radio value='3'>Third</Radio>
                        </Stack>
                    </RadioGroup>
                )
                break;
            case 2: // T/F
                answerElement = (
                    <Select placeholder='Select option'>
                        <option value='option1'>Option 1</option>
                        <option value='option2'>Option 2</option>
                    </Select>
                )
                break;
            case 3: // select 1 (isn't this just multiple choice?)
                answerElement = (
                    <Select placeholder='Select option'>
                        <option value='option1'>Option 1</option>
                        <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3</option>
                    </Select>
                )
                break;
            // case 4: // multiple selection
            //     break;
            default:
                console.log('renderAnswer(' + questionType + '): unsupported question type')
                answerElement = (
                    <h1>Unsupported question type: {questionType}</h1>
                )
        }
        return answerElement;

    }

    function checkAnswer(): boolean {
        let solutions = question.answer
        let matchedAnswer;

        // oh god ugly
        // NOTE: need to modify at the answer renderer too
        switch (question.type) {
            case 0: // text: only matches 1 of the possible solutions
                matchedAnswer = solutions.find((solution) =>
                    answer.ansText === solution.toString())
                break;
            case 1: // multiple choice: exact match
                matchedAnswer = solutions.find((solution) =>
                    answer.ansMultipleChoice === solution.toString())
                break;
            case 2: // T/F: exact match
                matchedAnswer = solutions.find((solution) =>
                    answer.ansTrueFalse === solution.toString())
                break;
            case 3: // select 1: exact match
                matchedAnswer = solutions.find((solution) =>
                    answer.ansSelectOne === solution.toString())
                break;
            default:
                console.log('checkAnswer(): unsupported question type')
                matchedAnswer = undefined
        }
        return (matchedAnswer != undefined)
    }

    function handleQuestionSubmission() {
        // check if correct or wrong
        let correct = checkAnswer()

        // update score ugly mode
        let score = (correct) ?
            Number(params.score) : // wrong
            Number(params.score) + Number(question.score) // correct

        // route to next question
        router.push(`/exam/${Number(params.examNum)}/${Number(params.qnum) + 1}/${Number(score)}`)
    }

    // return result page if exceeds the final question number
    var remainingQuestionsCount: number = exam.questions.length - Number(params.qnum)
    if (remainingQuestionsCount === 0) {

        // calculate total score
        var totalScore: number = 0;
        exam.questions.forEach((question) =>
            totalScore += Number(question.score)
        )
        var scorePercentage: number = Number(params.score) / totalScore * 100;

        return (
            <>
                <h1>{exam.name}</h1>
                <h2>Instructor: {exam.instructor}</h2>
                <div className='flex'>
                    <h2>Result:</h2>
                    <div className='flex flex-col'>
                        <h3>{params.score}/{totalScore}</h3>
                        <p>Score</p>
                    </div>
                    <div className='flex flex-col'>
                        <h3>{scorePercentage}/100</h3>
                        <p>Percentage</p>
                    </div>
                </div>
                <h2>Open Date Time: {exam.opendatetime}</h2>
                <h2>Close Date Time: {exam.cloasedatetime}</h2>
                <Link href='/'>Back to Home</Link>
            </>
        )
    }

    // otherwise, render question page
    else {
        return (
            <>
                <h1>Question {Number(params.qnum) + 1}</h1>
                <h2>{Number(question.score)} point(s) possible</h2>
                <h2>{question.question}</h2>
                {
                    renderAnswer(Number(question.type))
                }
                <Button onClick={handleQuestionSubmission}>{(remainingQuestionsCount == 1) ? "Submit" : "Next"}</Button>
            </>
        )

    }
}