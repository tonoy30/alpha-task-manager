export type List = {
  id: string
  title: string
  tasks?: Task[]
}

export type Task = {
  id: string
  position: number
  title: string
  status: string
}
