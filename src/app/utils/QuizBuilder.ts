import { ModuleInterface, QuizInterface, QuestionInterface } from "./module.interface";

// Helper functions
function generateWrongAnswer(correctAnswer: string): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let wrongAnswer = correctAnswer;
    while (wrongAnswer == correctAnswer) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        wrongAnswer = chars.charAt(randomIndex);
    }
    return wrongAnswer;
}

function shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateSimpleQuestion(char: string): QuestionInterface {
    let question: QuestionInterface = {
        description: `Choose the option that represents character ${ char }.`,
        options: [
            {answer: char, isCorrect: true},
            {answer: generateWrongAnswer(char), isCorrect: false},
            {answer: generateWrongAnswer(char), isCorrect: false},
            {answer: generateWrongAnswer(char), isCorrect: false},
        ]
    }
    question.options = shuffleArray(question.options);
    return question;
}

// Main function
export function buildQuiz(module: ModuleInterface): QuizInterface {
    let quiz: QuizInterface = {questions: []}

    // Adds a simple question for every char taught in this module
    for (const char of module.characters) {
        const question = generateSimpleQuestion(char);
        quiz.questions.push(question);
    }

    // Shuffles order of questions
    quiz.questions = shuffleArray(quiz.questions);

    return quiz;
}