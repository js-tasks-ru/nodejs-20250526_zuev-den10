import { Controller, Get, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskStatus } from "./task.model";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query("status") status?: TaskStatus,
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 5,
  ) {
    return this.tasksService.getFilteredTasks(status, page, limit);
  }
}
