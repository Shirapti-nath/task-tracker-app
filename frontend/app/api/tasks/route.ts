import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function validateCreateBody(body: unknown) {
  if (!body || typeof body !== 'object') {
    return 'Invalid request body';
  }

  const { title, description } = body as Record<string, unknown>;

  if (typeof title !== 'string' || !title.trim()) {
    return 'Title is required';
  }

  if (title.length > 100) {
    return 'Title must be at most 100 characters';
  }

  if (typeof description !== 'string' || !description.trim()) {
    return 'Description is required';
  }

  return null;
}

export async function GET() {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const body = await request.json();
  const error = validateCreateBody(body);

  if (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }

  const { title, description } = body as { title: string; description: string };

  const task = await prisma.task.create({
    data: { title, description },
  });

  return NextResponse.json(task, { status: 201 });
}
