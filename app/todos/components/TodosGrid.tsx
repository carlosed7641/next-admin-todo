'use client'

import { Todo } from '@prisma/client'
import React from 'react'
import { TodoItem } from './TodoItem'
// import * as todosApi from '@/app/todos/helpers/todos'
// import { useRouter } from 'next/navigation'
import { toggleTodo } from '../actions/todo-actions'

interface Props {
    todos?: Todo[]
}

export const TodosGrid = ({ todos = [] }: Props) => {

    // const router = useRouter()

    // const toggleTodo = async (id: string, completed: boolean) => {
    //     await todosApi.updateTodo(id, completed)

    //     router.refresh()
    // }

  
    return (
        <div className="grid gird-cols-1 sm:grid-cols-3 gap-2">
            {
                todos.map(todo => (
                    <TodoItem
                        toggleTodo={toggleTodo}
                        key={todo.id}
                        todo={todo}
                    />
                ))
            }
        </div>
    )
}
