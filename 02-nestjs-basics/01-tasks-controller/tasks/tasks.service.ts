import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./task.model";
let currentId =1;

@Injectable()
export class TasksService {
  private tasks: Task[] = [];



  getAllTasks(): Task[] {
    console.log(this.tasks)
    return this.tasks;
      }
    
      getTaskById(id: string): Task {
        const task  = this.tasks.find(t => t.id === id);
            if (!task) throw new NotFoundException(`task with ${id} not found`);
            return task;
      }
    
      createTask(task: Task): Task {
        task  = {
          id:`${currentId++}`,
          title:task.title,
          description:task.description,
          status:task.status
      };
      this.tasks.push(task);
      return task;
      }
    
    updateTask(id: string, update: Task): Task {
    const task=this.getTaskById(id)
    task.title=update.title;
    task.description=update.description;
    task.status=update.status;
    return task;
      }
    
       deleteTask(id: string): Task {
        const task  = this.getTaskById(id);
        this.tasks = this.tasks.filter(u => u.id !== id);
        return task;
       }
}
