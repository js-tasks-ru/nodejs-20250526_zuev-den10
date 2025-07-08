import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "./entities/task.entity";

@Injectable()
export class TasksService {
  constructor (@InjectRepository(Task)
  private readonly taskRepository: Repository<Task>, ){}



  create(createTaskDto: CreateTaskDto) {
    const task = new Task;
    task.description = createTaskDto.description;
    task.title = createTaskDto.title;
    return this.taskRepository.save(task);
  }

  async findAll() {
     return await this.taskRepository.find();
  }

  async findOne(id: number) {
    // const task =  await this.taskRepository.findOne({ where: {id} });
    // if (task == null){
    //   throw  new NotFoundException(404)
    // }
    return await this.taskRepository.findOne({ where: {id} });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    // const task =  await this.taskRepository.findOne({ where: {id} });
    // if (task == null){
    //   throw  new NotFoundException(404)
    // }
    await this.taskRepository.update(id, updateTaskDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    // const task =  await this.taskRepository.findOne({ where: {id} });
    // if (task == null){
    //   throw  new NotFoundException(404)
    // }
    await this.taskRepository.delete(id);
  }
}
