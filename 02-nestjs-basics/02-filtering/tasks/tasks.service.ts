import { Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "First task",
      status: TaskStatus.PENDING,
    },
    {
      id: "2",
      title: "Task 2",
      description: "Second task",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: "3",
      title: "Task 3",
      description: "Third task",
      status: TaskStatus.COMPLETED,
    },
    {
      id: "4",
      title: "Task 4",
      description: "Fourth task",
      status: TaskStatus.PENDING,
    },
    {
      id: "5",
      title: "Task 5",
      description: "Fifth task",
      status: TaskStatus.IN_PROGRESS,
    },
  ];

  getFilteredTasks(status?: TaskStatus, page?: number, limit?: number): Task[] {
    let filteredTasks = this.tasks;

    // Filter by status if provided
    if (status) {
      filteredTasks = filteredTasks.filter((task) => task.status === status);
    }

    // default values
    page = page ?? 1;
    limit = limit ?? 10;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    filteredTasks = filteredTasks.slice(startIndex, endIndex);

    return filteredTasks;
  }
}
