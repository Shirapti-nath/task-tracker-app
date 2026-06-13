import { NextResponse } from 'next/server';
import { TaskStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';

function validateUpdateBody(body: unknown) {
  if (!body || typeof body !== 'object') {
    return 'Invalid request body';
  }

  const { title, description, status } = body as Record<string, unknown>;

  if (title !== undefined) {
    if (typeof title !== 'string' || !title.trim()) {
      return 'Title must be a non-empty string';
    }

    if (title.length > 100) {
      return 'Title must be at most 100 characters';
    }
  }

  if (description !== undefined) {
    if (typeof description !== 'string' || !description.trim()) {
      return 'Description must be a non-empty string';
    }
  }

  if (status !== undefined && status !== 'PENDING' && status !== 'COMPLETED') {
    return 'Status must be PENDING or COMPLETED';
  }

  return null;
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();
  const error = validateUpdateBody(body);

  if (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }

  const existing = await prisma.task.findUnique({ where: { id } });

  if (!existing) {
    return NextResponse.json({ message: 'Task not found' }, { status: 404 });
  }

  const { title, description, status } = body as {
    title?: string;
    description?: string;
    status?: TaskStatus;
  };

  const task = await prisma.task.update({
    where: { id },
    data: {
      ...(title !== undefined ? { title } : {}),
      ...(description !== undefined ? { description } : {}),
      ...(status !== undefined ? { status } : {}),
    },
  });

  return NextResponse.json(task);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const existing = await prisma.task.findUnique({ where: { id } });

  if (!existing) {
    return NextResponse.json({ message: 'Task not found' }, { status: 404 });
  }

  await prisma.task.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
