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

    // for navigating to new pages
    const router = useRouter();

    // useful variables
    const exam = exams[params.examNum]
    const question = exam.questions[params.qnum]

    // set states, ugly af
    const [answer, setAnswer] = React.useState({
        ansText: '', // type 0
        ansMultipleChoice: '', // type 1
        ansTrueFalse: '', // type 2
    })
    const [answerSelect, setAnswerSelect] = React.useState({
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
    }

    // based on errors for type 3
    // cannot use handleChange normally for select option element
    // need to use "HTMLSelectElement" instead of "HTMLInputElement"
    const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAnswerSelect({
            ...answerSelect,
            [e.target.name]: e.target.value
        })
    }

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer({
            ...answer,
            [e.target.name]: e.target.value
        })
    }

    function renderAnswer() {
        let answerElement;
        switch (question.type) {
            case 0: // string answer
                answerElement = (
                    <Input
                        name='ansText'
                        onChange={handleChange}
                        placeholder='Enter your answer'
                        size='lg' />
                )
                break;
            case 1: // multiple choices
                answerElement = (
                    <RadioGroup name='ansMultipleChoice' >
                        <Stack direction='column'>
                            {
                                question.options.map((option, index) => (
                                    <Radio key={`${index}`} onChange={handleChange} value={`${index}`}>{option}</Radio>
                                ))
                            }
                        </Stack>
                    </RadioGroup>
                )
                break;
            case 2: // T/F
                answerElement = (
                    <RadioGroup name='ansTrueFalse'>
                        <Stack direction='column'>
                            <Radio onChange={handleChange} value='1'>True</Radio>
                            <Radio onChange={handleChange} value='0'>False</Radio>
                        </Stack>
                    </RadioGroup>
                )
                break;
            case 3: // select 1 (isn't this just multiple choice?)
                answerElement = (
                    <Select placeholder='Select option' name='ansSelectOne'  onChange={handleChangeSelect}>
                        {
                            question.options.map((option, index) => (
                                <option  key={`${index}`}value={`${index}`}>{option}</option>
                            ))
                        }
                    </Select>
                )
                break;
            // case 4: // multiple selection
            //     break;
            default:
                console.log('renderAnswer(' + question.type + '): unsupported question type')
                answerElement = (
                    <h1>Unsupported question type: {question.type}</h1>
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
                console.log(solutions)
                console.log(answer)
                matchedAnswer = solutions.find((solution) =>
                    answer.ansMultipleChoice === solution.toString())
                break;
            case 2: // T/F: exact match
                matchedAnswer = solutions.find((solution) =>
                    answer.ansTrueFalse === solution.toString())
                break;
            case 3: // select 1: exact match
                matchedAnswer = solutions.find((solution) =>
                    answerSelect.ansSelectOne === solution.toString())
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
            Number(params.score) + Number(question.score) : // correct
            Number(params.score) // wrong

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
        const answerElement = renderAnswer();
        return (
            <>
                <h1>Question {Number(params.qnum) + 1}</h1>
                <h2>{Number(question.score)} point(s) possible</h2>
                <h2>{question.question}</h2>
                {answerElement}
                <Button onClick={handleQuestionSubmission}>{(remainingQuestionsCount == 1) ? "Submit" : "Next"}</Button>
            </>
        )

    }
}