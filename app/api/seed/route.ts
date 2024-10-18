import { NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'
import bcrypt from 'bcryptjs';

export async function GET() {

  await prisma.todo.deleteMany()
  await prisma.user.deleteMany()

   await prisma.user.create({
    data: {
      email: 'test1@google.com',
      password: bcrypt.hashSync('123456'),
      roles: ['admin', 'client'],
      todos: {
        create: [
          { description: 'Buy milk', completed: true },
          { description: 'Buy eggs' },
          { description: 'Buy bread' }
        ]
      }
    }
  })

  return NextResponse.json({
    message: 'Seed executed successfully'
  })
}