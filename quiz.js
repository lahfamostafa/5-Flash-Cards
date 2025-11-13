let currentquestion = 0;
let score = 0;
let question = [];

async function getquestions() {
    const res = await fetch("quiz.json");
    question = await res.json;
    returnQuiz()
}

function returnQuiz(){
    const quiz = document
}