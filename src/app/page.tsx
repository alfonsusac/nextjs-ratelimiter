import { cookies, headers } from "next/headers"
import { onTodoSubmit } from './action'



export default function Home({ searchParams }:any) {

  const data = getTodoList()

  return (
    <>
      <form action={ onTodoSubmit }>
        <button type="submit">Add Todo</button> { '<- rate limited' }
      </form>
      <form action={ async () => {
        "use server"
        cookies().delete("todolist")
      }}>
        <button type="submit">Delete All</button> {'<- not rate limited'}
      </form>
      {
        searchParams.status
      }
      <ul>
        {
          data.map(i => <li key={ i.id }>{ i.value }</li>)
        }
      </ul>
    </>
  )
}


type TodoItem = {
  id: string
  value: string
}


function getTodoList() {
  return JSON.parse(cookies().get('todolist')?.value || "[]") as TodoItem[]
}