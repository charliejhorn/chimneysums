let points = 0;
let timer;
let time = 0;
let timerLength = 2;
let timerRunning = false;
let acceptingAnswers = true;

document.addEventListener('DOMContentLoaded', () => {
    createSum();
    updateTime();
    timerBarRun();

    const answerElement = document.querySelector('#answer')
    answerElement.addEventListener('keyup', checkAnswer)

    const startButton = document.querySelector("#reset")
    startButton.addEventListener('click', resetTimer)

    if(!timerRunning) {
    }
})


function timerBarRun() {
    console.log('timerbarrunning');
    const containerWidth = document.querySelector('#timer-container').offsetWidth
    const timerBar = document.querySelector('#timer-bar')
    timerBar.style.width = containerWidth / (timerLength / 10);
}


function checkAnswer() {
    const answerElement = document.querySelector('#answer')
    let currentResponse = parseInt(answerElement.value)
    
    // if answer is correct and timer hasn't finished (acceptingAnswers)
    if(parseInt(currentResponse) === answer() && acceptingAnswers) {
        // reset input
        answerElement.value = "";

        // start timer if not running
        if(timerRunning == false) {
            startTimer();
        }
        
        points++;
        updatePoints();
        createSum();
    }
}


function resetTimer() {
    timerRunning = false;
    acceptingAnswers = true;
    points = 0;
    updatePoints();
    time = 0;
    updateTime();
    const answerElement = document.querySelector('#answer')
    answerElement.value = "";
}


function startTimer() {
    if(timerRunning == false) {
        acceptingAnswers = true;
        timerRunning = true;
        timer = setInterval(timerIncrement, 100)
    }
}

function timerIncrement() {
    // check if timer needs stopped
    timerBarRun();
    if(time >= timerLength) {
        clearInterval(timer)
        timerRunning = false;
        acceptingAnswers = false;
        time = 0;
        return
    }
    
    // increase time by 0.1
    time = ((time * 10) + 1) / 10;
    
    updateTime();
}

function updateTime() {
    const timerElement = document.querySelector('#timer')
    timerElement.textContent = ((timerLength*10 - time*10)/10).toFixed(1);
}

function updatePoints() {
    const pointElement = document.querySelector('#points')
    pointElement.textContent = points;
}

const answer = () => {
    const num1 = values().num1;
    const num2 = values().num2;
    const operation = values().operation;

    if(operation === "+") {
        return num1 + num2
    } else if(operation === "-") {
        return num1 - num2
    }
}


const values = () => {
    const result = {
        num1: parseInt(document.querySelector('#num1').dataset.value),
        num2: parseInt(document.querySelector('#num2').dataset.value),
        operation: document.querySelector('#operation').dataset.value,
    }
    return result
}

const chimneyElements = () => {
    const elements = {
        num1: document.querySelector('#num1'),
        num2: document.querySelector('#num2'),
        operation: document.querySelector('#operation')
    }
    return elements
}


function updateSum() {
    // set textcontent of element to the its dataset value
    for(let element in chimneyElements()) {
        chimneyElements()[element].textContent = values()[element]
    }
}


function createSum() {
    // create random numbers and operation
    const newValues = {
        num1: Math.round(random(0, 10)),
        num2: Math.round(random(0, 10)),
        operation: random(['+', '-']),
    }
    
    // add data and value to elements
    for(let element in chimneyElements()) {
        chimneyElements()[element].dataset.value = newValues[element];
    }

    updateSum();
    console.log('answer', answer());
}


const random = function (input1, input2) {
    // two numbers
    if(input2 && typeof input1 == "number" && typeof input2 == "number") {
        return Math.random() * (input2-input1) + input1
    }
    // one number
    else if (typeof input1 == "number") {
        return Math.random() * input1
    }
    // an array
    else if (typeof input1 == "object") {
        // takes floor of random between 0 and length
        // floor always goes down, so never equals length (max is length-1)
        const index = Math.floor(Math.random() * (input1.length))
        return input1[index]
    }
}