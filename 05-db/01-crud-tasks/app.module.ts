import { Module } from "@nestjs/common";
import { TasksModule } from "./tasks/tasks.module";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TasksModule,TypeOrmModule.forRoot({
    type:"sqlite",
    database:'database.db',
    synchronize:true,
    autoLoadEntities:true,
    logging:true
  }),],
})
export class AppModule {}
