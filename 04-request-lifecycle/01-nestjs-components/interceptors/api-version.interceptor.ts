import { NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { catchError, Observable, tap, timeout, TimeoutError } from 'rxjs'

export class ApiVersionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler):Observable<any> {
    const request = context.switchToHttp().getRequest();
const startDate = Date.now();

return next.handle().pipe(
tap((data)=>{
  const executionTime1 = Date.now() - startDate;
  const executionTime = `${executionTime1}ms`
  console.log(executionTime);
  const response = context.switchToHttp().getResponse();
  response.header('apiVersion', '1.0');
  data.apiVersion = '1.0'
data.executionTime = executionTime;
})
)
}
}
