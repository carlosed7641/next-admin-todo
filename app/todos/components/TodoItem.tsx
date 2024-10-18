'use client'

import { startTransition, useOptimistic } from 'react';
import { Todo } from '@prisma/client';
import styles from '@/app/todos/components/TodoItem.module.css';
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';

interface Props {
  todo: Todo,
  toggleTodo: (id: string, completed: boolean) => Promise<Todo | void>
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {

  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => ({ ...state, completed: newCompleteValue })
  )

  const onToggleTodo = async () => {
    try {
      startTransition(()=> toggleTodoOptimistic(!todoOptimistic.completed))
      toggleTodoOptimistic(!todoOptimistic.completed)
      await toggleTodo(todoOptimistic.id, !todoOptimistic.completed)
    } catch {
      startTransition(()=> toggleTodoOptimistic(!todoOptimistic.completed))
    }
  }

  return (
    <div className={todoOptimistic.completed ? styles.todoDone : styles.todoPending}>
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div 
        // onClick={() => toggleTodo(todoOptimistic.id, !todoOptimistic.completed)} 
        onClick={onToggleTodo} 
        className={`
          flex p-2 rounded-md cursor-pointer
          hover:bg-opacity-60
          ${todoOptimistic.completed ? 'bg-blue-100' : 'bg-red-100'}`}>
          {
            todoOptimistic.completed
              ? <IoCheckboxOutline size={30} />
              : <IoSquareOutline size={30} />
          }
        </div>
        <div className="text-center sm:text-left">
          {todoOptimistic.description}
        </div>
      </div>
    </div>
  )
}
