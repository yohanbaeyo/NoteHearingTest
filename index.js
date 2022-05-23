let answer = []
let keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
let userInput = []
let n = 0
let wrongList
let totalCorrect=0
let total=0
let correctRateLabel
let repeatOrNot = false

//return random integer value from [a,b)
function randInt(a, b) {
    return Math.floor(Math.random() * (b - a)) + a
}

//initialize keys to A3 ~ B3
/*
function initialize() {
    for (let i = 0; i < 12; i++) {
        keys.push(220.0 * Math.pow(2.0, i / 12.0));
    }
}
*/

//시험 설정 및 시작
function initializeTest() {
    let inputVal = document.getElementById("cntInput")
    n = 0 + inputVal.value
    n = Math.max(n, 1)
    generateRandomNotes()
}

//랜덤 음 생성
function generateRandomNotes() {
    answer = [];
    for (let i = 0; i < n; i++) {
        let noteKey = keys[randInt(0, 12)]
        //max : 1, 7
        let octave = randInt(2, 6)
        answer.push([noteKey, octave])
    }
    answer.sort()
    playNotes()
}

//정답을 출력할 때 : 배열 -> 문자열로 변환하는 함수
function toAnsString() {
    let result = ""
    for(let i=0; i<n; i++) {
        result = result + answer[i][0]+answer[i][1]+", "
    }
    return result
}

function checkAns() {
    let myAns = document.getElementById("ansInput").value
    myAns = myAns.split(",")
    myAns.sort()

    let isCorrect = true
    if(myAns.length !== n) isCorrect = false
    for(let i=0; i<n; i++) {
        if(myAns[i] !== answer[i][0]) {
            isCorrect = false
        }
    }

    total++
    if(isCorrect) {
        totalCorrect++
        alert("정답입니다.")
    } else {
        alert("틀렸습니다. 정답은 " + toAnsString() + "였습니다")
        addWrongAnswer()
        playNotes()
    }

    correctRateLabel.innerText = "정답률: " + Math.floor(totalCorrect/total * 100) + "%"

    document.getElementById("ansInput").value = ""
    if(isCorrect) {
        generateRandomNotes()
    } else {
        setTimeout(generateRandomNotes, 2000)
    }
}

function playNotes() {
    let mySound = []
    for(let i=0; i<n; i++) {
        mySound.push(answer[i][0].replace("#", "%23") + answer[i][1] + ".wav")
    }

    // console.log(mySound)

    for(let i=0; i<n; i++) {
        new Audio(mySound[i]).play()
    }
}

function onPianoClick(event) {
    alert(event.x+" "+event.y)
}

function addWrongAnswer() {
    let newLI = document.createElement("li")
    newLI.innerText = toAnsString()
    // newLI.appendChild(document.createTextNode("Ss"))
    wrongList.appendChild(newLI)
}

function initialize() {
    wrongList = document.getElementById("wrongList")
    correctRateLabel = document.getElementById("correctRate")
}

// window.onload = initialize;

window.onload = initialize

//# sourceMappingURL=index.js.map