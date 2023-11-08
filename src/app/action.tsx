"use server"

import { unstable_cache } from "next/cache"
import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"

export const onTodoSubmit = async () => {
  console.log(getUserIP())
  // Rate Limit
  const limit = 20 // seconds
  const rateLimitedUntil = await unstable_cache(async () => {
    console.log("Running unstable cache fn")
    return Date.now() + (limit * 1000)
  }, [], {
    revalidate: 20
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