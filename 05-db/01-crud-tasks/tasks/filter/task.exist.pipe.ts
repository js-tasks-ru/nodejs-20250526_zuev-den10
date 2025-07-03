import { Injectable, ArgumentMetadata, BadRequestException, PipeTransform, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';

@Injectable()
export class TaskExistsPipe implements PipeTransform {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const id = parseInt(value);

    if (isNaN(id)) {
      throw new BadRequestException('Invalid task ID');
    }

    const task = await this.taskRepository.findOne({ where: { id } });

  if (task == null){
      throw  new NotFoundException(404)
    }

    return id;
  }
}

