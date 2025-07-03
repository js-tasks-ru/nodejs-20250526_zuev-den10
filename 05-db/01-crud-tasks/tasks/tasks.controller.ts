import { Controller, Get, Post, Patch, Delete, Body,Param, UseFilters } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TaskNotFoundExceptionFilter } from "./filter/typeorm.filter";
import { TaskExistsPipe } from "./filter/task.exist.pipe";
@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(":id")
  @UseFilters(TaskNotFoundExceptionFilter)
  findOne(@Param('id', TaskExistsPipe) id: number) {
    return this.tasksService.findOne(id)
  }

  @Patch(":id")
  @UseFilters(TaskNotFoundExceptionFilter)
  update(@Param('id', TaskExistsPipe) id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(":id")
  @UseFilters(TaskNotFoundExceptionFilter)
  remove(@Param('id', TaskExistsPipe) id: number) {
    return this.tasksService.remove(id);
  }
}
