import { getUserServerSession } from '@/app/auth/actions/auth-actions'
import prisma from '@/app/lib/prisma'
import { NextResponse } from 'next/server'
import * as yup from 'yup'

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url)
    const take = Number(searchParams.get('take') ?? '10')
    const skip = Number(searchParams.get('skip') ?? '0')

    if (isNaN(take)) return NextResponse.json({ error: 'Invalid take parameter' }, { status: 400 })
    if (isNaN(skip)) return NextResponse.json({ error: 'Invalid take parameter' }, { status: 400 })

    const todos = await prisma.todo.findMany({ take, skip })

    return NextResponse.json(todos)
}


const postSchema = yup.object({
    description: yup.string().required(),
    completed: yup.boolean().optional().default(false)
})

export async function POST(request: Request) {

    const user = await getUserServerSession()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const { completed, description } = await postSchema.validate(await request.json())

        const todo = await prisma.todo.create({ data: { completed, description, userId: user.id } })

        return NextResponse.json(todo, { status: 201 })

    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }
}

export async function DELETE() {

    const user = await getUserServerSession()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        await prisma.todo.deleteMany({where: {completed: true,  userId: user.id}})

        return NextResponse.json({message: 'Todos eliminados'})
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }
}