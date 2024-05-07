type UserComment = {
  title: string
  tags: Array<string>
  context: string
  imgUrl: string
  count: {
    thumbsUp: number
    view: number
    commit: number
    star: number
  }
}

export { UserComment }
