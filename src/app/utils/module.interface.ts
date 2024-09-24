export interface QuestionInterface {
    description: string,
    options: {answer: string, isCorrect: boolean}[]
}

export interface QuizInterface {
    questions: QuestionInterface[],
}

export interface ModuleInterface {
    name: string;
    content: object[];
    characters: string;
    creator: string;
    id: string;
}