const quiz = [
    {
        question: "Q. Which of the following is not a CSS box model property?",
        choices: ["margin", "padding", "border-radius", "border-collapse"],
        answer: "border-collapse"
    },
    {
        question: "Q. Which of the following is not a valid way to declare a function in JavaScript?",
        choices: ["function myFunction() {}", " let myFunction = function() {};", "myFunction: function() {}", "const myFunction = () => {};"],
        answer: "myFunction: function() {}"
    },
    {
        question: "Q. Which of the following is not a JavaScript data type?",
        choices: ["string", "boolean", "object", "float"],
        answer: "float"
    },
    {
        question: "Q. What is the purpose of the this keyword in JavaScript?",
        choices: ["It refers to the current function.", "It refers to the current object.", "It refers to the parent object.", " It is used for comments."],
        answer: "It refers to the current object."
    }
];


const container = document.querySelector('.container')
const questionBox = document.querySelector('.question')
const choicesBox = document.querySelector('.choices')
const nextBtn = document.querySelector('.nextBtn')
const scoreCard = document.querySelector('.scoreCard')
const alert = document.querySelector('.alert')
const startBtn = document.querySelector('.startBtn')
const timer = document.querySelector('.timer')

let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timeID = null


startBtn.addEventListener('click', ()=>{
    startBtn.style.display = 'none';
    container.style.display = 'block'
    startQuiz()
})

const startQuiz = ()=>{
    timeLeft = 15;
    timer.style.display = 'flex'
    showQuestion()
}

const showQuestion = () =>{
    const questionDetails = quiz[currentQuestionIndex]
    questionBox.textContent = questionDetails.question

    choicesBox.textContent = ''
    
    for(i = 0; i<questionDetails.choices.length; i++){
        const currentChoice = questionDetails.choices[i]
        const choiceDiv = document.createElement('div')
        choiceDiv.textContent = currentChoice
        choiceDiv.classList.add('choice')
        choicesBox.appendChild(choiceDiv)
        choiceDiv.addEventListener('click', ()=>{
            if(choiceDiv.classList.contains('selected')){
                choiceDiv.classList.remove('selected')
            }
            else{
                choiceDiv.classList.add('selected')
            }
        })

        if(currentQuestionIndex<quiz.length){
            startTimer()
        }
    }

}

function startTimer(){
    clearInterval(timeID)
    timer.textContent = timeLeft
    const countDown = ()=>{
        timeLeft--
        timer.textContent = timeLeft
        if(timeLeft === 0){
            const confirmUser = confirm('time up !!')
            if(confirmUser){
                timeLeft =15
                startQuiz()
            }
            else{
                container.style.display = 'none'
                startBtn.style.display = 'block'
            }
        }
    }
    timeID = setInterval(countDown, 1000)
}

nextBtn.addEventListener('click', ()=>{
    const selectedChoice = document.querySelector('.choice.selected')
    if(!selectedChoice && nextBtn.textContent ==='Next'){
        displayAlert('select your choice')
    }
    if(quizOver){
        nextBtn.textContent = 'Next'
        score.textContent = ''
        currentQuestionIndex = 0
        quizOver = false
        score = 0
        startQuiz()
    }
    else{
        checkAnswer()
    }
})

const checkAnswer = ()=>{
    const choiceSelected = document.querySelector('.choice.selected')
    if(choiceSelected.textContent == quiz[currentQuestionIndex].answer){
        score++
        displayAlert('correct answer !!')
    }
    else{
        displayAlert('wrong answer ' + quiz[currentQuestionIndex].answer + ' is the right answer')
    }
    timeLeft = 15
    currentQuestionIndex++
    if(currentQuestionIndex < quiz.length){
        showQuestion()
    }
    else{
        clearInterval(timeID);
        ShowScore()
    }
}

const ShowScore =()=>{
    questionBox.textContent = ''
    choicesBox.textContent = ''
    scoreCard.textContent = 'you scored  '+ score + ' out of '+quiz.length
    displayAlert('you have complet this quiz')
    nextBtn.textContent = 'Play Again'
    quizOver = true
    timer.style.display = 'none'
}





const displayAlert = (msg)=>{
    alert.style.display='block'
    alert.textContent = msg
    setTimeout(()=>{
        alert.style.display = 'none'
    }, 2000)
}








