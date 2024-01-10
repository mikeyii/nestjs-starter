import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform {
  transform(value: any) {
    if (isValidObjectId(value)) {
      return value;
    }
    throw new BadRequestException('Validation failed (ObjectId is expected)');
  }
}
