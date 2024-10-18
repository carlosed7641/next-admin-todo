export const dynamic = 'force-dynamic'
export const revalidate = 0

import { getUserServerSession } from "@/app/auth/actions/auth-actions";
import prisma from "@/app/lib/prisma";
import { TodosGrid } from "@/app/todos";
import { NewTodo } from "@/app/todos/components/NewTodo";
import { redirect } from "next/navigation";

export const metadata = {
    title: 'Listado de Todos',
    description: 'Listado de todos los todos'
}


export default async function RestTodosPage() {

    const user = await getUserServerSession()

    if (!user) redirect('/api/auth/signin')

    const todos = await prisma.todo.findMany({ 
        where: { userId: user.id },
        orderBy: { description: 'asc' } 
    })

    return (
        <div>
            <div className="w-full px-3 mx-5 mb-5">
                <NewTodo />
            </div>
            <TodosGrid todos={todos} />
        </div>
    );
}