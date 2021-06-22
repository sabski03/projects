const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];

let questions = [
    {
        question: 'What is 2+2',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 2
    },
    {
        question: 'The tallest building in the world is located in which city?',
        choice1: 'Dubai',
        choice2: 'New York',
        choice3: 'Shanghai',
        choice4: 'None of the above',
        answer: 1
    },
    {
        question: 'What percent of Georgian adults believe that chocolate milk comes from brown cows?',
        choice1: '20%',
        choice2: '18%',
        choice3: '7%',
        choice4: '33%',
        answer: 3
    },
    {
        question: 'What is the capital city of Georgia?',
        choice1: 'Georgia is a state not a country',
        choice2: 'Batumi',
        choice3: 'London',
        choice4: 'Tbilisi',
        answer: 4
    }
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = function(){
    questionCounter = 0;
    score = 0;
    availableQuestion = [...questions];
    getNewQuestion()
}

getNewQuestion = function(){
    if(availableQuestion.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('/end.html');
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionIndex = Math.floor(Math.random()*availableQuestion.length);
    currentQuestion = availableQuestion[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestion.splice(questionIndex, 1);
    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers) return

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct': 'incorrect';
        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS);
        }
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    })
})

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();