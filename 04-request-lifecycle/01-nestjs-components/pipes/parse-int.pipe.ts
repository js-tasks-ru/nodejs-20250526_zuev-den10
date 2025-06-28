import { PipeTransform, BadRequestException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

export class ParseIntPipe implements PipeTransform {
  transform(value: string): number {
    const result = Number(value);
    if(isNaN(result)) {
      throw new BadRequestException(`\"${value}\" не является числом`)
    }
    return result;
  }
}
