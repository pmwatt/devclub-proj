const exams = [
    {
        name: 'Quiz #1',
        instructor: 'Peter Talley',
        instruction: 'Good luck for the exam and please do not cheat.',
        opendatetime: '2024-06-12T19:30',
        cloasedatetime: '2024-07-12T19:30',
        questions: [
            {
                type: 0,
                question: 'What is the value of the 3rd term of the following sum to find the determinant of the following matrix?',
                answer: ['20'],
                score: 4,
                options: []
            },
            {
                type: 1,
                question: 'Which intervals of x should contain a root of a function f(x) = x^3 - 6x^2 + 4x + 12?',
                answer: [2],
                score: 1,
                options: ['[-1,1]', '[1.5, 2]', '[-1.5, -1]', '[2,2.5]']
            },
            {
                type: 2,
                question: 'You are a good student?',
                answer: [1],
                score: 1,
                options: []
            },
            {
                type: 3,
                question: 'Who is the instructor of this subject?',
                answer: [3],
                score: 1,
                options: ['Aj. Preecha', 'Aj. Snit', 'Aj, Petre', 'Aj. Peter', 'Aj. Petch']
            },
            {
                type: 4,
                question: 'What is this subject outcomes?',
                answer: [0, 1, 4],
                score: 1,
                options: ['to know things', 'to learn things', 'to have fun', 'to be a normal human', 'to hide your hidden inventory']
            }
        ]
    },
    {
        name: 'Midterm Exam',
        instructor: 'Tata',
        instruction: 'Well is this box suppose to be filled?',
        opendatetime: '2024-06-24T18:30',
        cloasedatetime: '2024-06-24T19:30',
        questions: [
            {
                type: 0,
                question: 'Do you think this subject is the best (if YES go to the next question if no skip to last question and click submit button)?',
                answer: ['YES', 'yes', 'Yes', 'wtf', 'What`s wrong with you?'],
                score: 10,
                options: []
            },
            {
                type: 3,
                question: 'System.out.[...]("Hello World");',
                answer: [0],
                score: 1,
                options: ['println', 'print', 'prnti', 'line', 'printline']
            },
            {
                type: 1,
                question: 'Knock knock!!',
                answer: [3],
                score: 1,
                options: ['wo', 'woher', 'wie', 'who']
            },
            {
                type: 4,
                question: 'It`s me your Aj. Who am I?',
                answer: [0, 1, 4],
                score: 1,
                options: ['Aj. Tata', 'Aj. Snot', 'Aj. Taylor', 'Koro sensei', 'Aj. Gojo']
            },
            {
                type: 2,
                question: 'Are you a student',
                answer: [0],
                score: 1,
                options: []
            },
        ]
    },
]
//0: string answer, 1: 4 multiple choice, 2: true-false, 3: select, 4: multiple selection

export { exams };