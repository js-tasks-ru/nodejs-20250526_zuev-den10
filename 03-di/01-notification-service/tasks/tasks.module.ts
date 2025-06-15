import { Module } from "@nestjs/common";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationsModule } from '../notifications/notifications.module';
import { UsersModule } from '../users/users.module';
@Module({
  imports: [NotificationsModule, UsersModule],
  controllers: [TasksController],
  providers: [TasksService,NotificationsService],
})
export class TasksModule {}
