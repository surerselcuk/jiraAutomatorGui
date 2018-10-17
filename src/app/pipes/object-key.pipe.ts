import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectKey'
})
export class ObjectKeyPipe implements PipeTransform {

  transform(value: any, args?: any): any {

        return Object.keys(value)[0];

  }

}
