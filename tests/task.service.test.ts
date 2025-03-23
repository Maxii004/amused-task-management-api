import { createTask, getTaskById, updateTask, deleteTask } from '../src/services/task.service';
import { Task } from '../src/models/Task';

// Mock the Task model
jest.mock('@models/Task');

// Cast Task to a mock type
const MockTask = Task as jest.Mocked<typeof Task>;

describe('Task Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a task', async () => {
    const mockTask = { id: '1', title: 'Test Task', description: 'Test Description' };
    MockTask.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(mockTask), // Mock the save method
    }));

    const task = await createTask('Test Task', 'Test Description');
    expect(task).toEqual(mockTask); // Ensure the returned task matches the mock
  });

  it('should get a task by ID', async () => {
    const mockTask = { id: '1', title: 'Test Task', description: 'Test Description' };
    (Task.get as jest.Mock).mockResolvedValue(mockTask);

    const task = await getTaskById('1');
    expect(task).toEqual(mockTask);
  });

  it('should update a task', async () => {
    const mockTask = { id: '1', title: 'Test Task', description: 'Test Description' };
    (Task.get as jest.Mock).mockResolvedValue(mockTask);
    (mockTask as any).save = jest.fn().mockResolvedValue(mockTask);

    const updatedTask = await updateTask('1', { title: 'Updated Task' });
    expect(updatedTask?.title).toEqual('Updated Task');
  });

  it('should delete a task', async () => {
    const mockTask = { id: '1', title: 'Test Task', description: 'Test Description' };
    (Task.get as jest.Mock).mockResolvedValue(mockTask);
    (Task.delete as jest.Mock).mockResolvedValue(true);

    const isDeleted = await deleteTask('1');
    expect(isDeleted).toBe(true);
  });
});