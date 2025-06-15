import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto, Task, TaskStatus, UpdateTaskDto } from "./task.model";
import { NotificationsService } from '../notifications/notifications.service';
import {UsersService} from '../users/users.service';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor(private readonly notificationsService: NotificationsService, private readonly usersService: UsersService) {}

  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description, assignedTo } = createTaskDto;
    const task: Task = {
      id: (this.tasks.length + 1).toString(),
      title,
      description,
      status: TaskStatus.Pending,
      assignedTo,
    };
    this.tasks.push(task);

    const user =this.usersService.getUserById(Number(task.id))
    const to = user.email
    const message =`Вы назначены ответственным за задачу: \"${title}\"` 
    const subject = `Новая задача`
   const notifications = this.notificationsService.sendEmail(to,subject,message)
    return task;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`Задача с ID ${id} не найдена`);
    }
    Object.assign(task, updateTaskDto);
    const user = this.usersService.getUserById(task.assignedTo);
    const to = user.phone
    const message = `Статус задачи "${task.title}" обновлён на "${task.status}"`;
    const notifications = this.notificationsService.sendSMS(to,message)
    
    return task;
  }
}
