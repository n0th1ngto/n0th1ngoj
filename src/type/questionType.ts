type Question = {
  key: number
  title: string
  difficulty: string
  solution: number
  access: string
  frequency: number
  context: string
}

type QuestionStatus = {
  id: number
  language: 'cpp' | 'go' | 'java'
  status: 'Accepted' | 'Wrong Answer' | 'Compile Error'
  questionId: number
}

export { Question, QuestionStatus }
