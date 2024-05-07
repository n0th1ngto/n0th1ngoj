type CompleteState = {
  total: number
  easy: number
  medium: number
  hard: number
}

type UserState = {
  userName: string
  userRole: string
  userAvatar: string
  questionComplete: CompleteState
}

export { UserState }
