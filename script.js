const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const borderContainer = document.getElementById('container')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
  borderContainer.classList.add('border-container')
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'In the TV show, what was Hodor called before he got his tragic door-holding nickname?',
    answers: [
      { text: 'Wilys', correct: true },
      { text: 'Horys', correct: false },
        { text: 'Milys', correct: false },
        { text: 'Gladys', correct: false }
    ]
  },
  {
    question: 'Who was responsible for the creation of the Night King?',
    answers: [
      { text: 'The Drowned God', correct: false },
      { text: 'The Children of the Forest', correct: true },
      { text: 'The First Men', correct: false },
      { text: 'The Lord of Light', correct: false }
    ]
  },
  {
    question: 'Dany’s dragons are (or were) called Drogon, Viserion and ____?',
    answers: [
      { text: 'Dougal', correct: false },
      { text: 'Rhaegal', correct: true },
      { text: 'Balerion', correct: false },
      { text: 'Vhagar', correct: false }
    ]
  },
  {
    question: 'Who said: I don’t plan on knitting by the fire while men fight for me?',
    answers: [
      { text: 'Sansa Stark', correct: false },
      { text: 'Lyanna Mormont', correct: true },
    { text: 'Olenna Tyrell', correct: false }
    ]
  }
]