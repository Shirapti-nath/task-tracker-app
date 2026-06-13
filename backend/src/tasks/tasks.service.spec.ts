import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;

  const mockPrisma = {
    task: {
      findMany: jest.fn(),
      create: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(() => {
    service = new TasksService(mockPrisma as any);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return tasks', async () => {
    const tasks = [
      {
        id: '1',
        title: 'Task 1',
      },
    ];

    mockPrisma.task.findMany.mockResolvedValue(tasks);

    const result = await service.findAll();

    expect(result).toEqual(tasks);
  });

  it('should create task', async () => {
    const dto = {
      title: 'New Task',
      description: 'Test Description',
    };

    mockPrisma.task.create.mockResolvedValue(dto);

    const result = await service.create(dto);

    expect(result).toEqual(dto);
  });
});