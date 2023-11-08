import Image from 'next/image'
import { cookies, headers } from "next/headers"
import { revalidateTag, unstable_cache } from 'next/cache'
import { redirect } from 'next/navigation'



export default function Home({ searchParams }:any) {

  const data = getTodoList()

  return (
    <>
      <form action={ async () => {
        "use server"
        console.log(getUserIP())
        // Rate Limit
        const limit = 10 // seconds
        const rateLimitedUntil = await unstable_cache(async () => {
          return Date.now() + (limit * 1000)
        }, [getUserIP()], {
          revalidate: 10
        })()

        // Check if ratelimited
        console.log("RateLimitUntil: " + rateLimitedUntil)
        console.log("Now:            " + Date.now())
        const success = Date.now() > rateLimitedUntil 

        // Do stuff
        if (success) {
          addTodoList()
          redirect("?status=ok")
        }
        else {

          const seconds = (rateLimitedUntil - Date.now()) / 1000 | 0
          console.log(seconds)
          redirect(`?status=try again in ${seconds} seconds`)
        }

      } }>
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

function addTodoList() {
  const todolist = getTodoList()
  todolist.push({
    id: (Math.random() * 100 | 0) + "",
    value: (Math.random() * 100 | 0) + ''
  })
  cookies().set('todolist', JSON.stringify(todolist))
}

function getUserIP() {
  return headers().get('x-forwarded-for') ?? ""
}