import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyvalue',
  standalone: true
})
export class EmptyvaluePipe implements PipeTransform {

  transform(value: any, placeholder: string = '-'): any {
    return value && value !== '' ? value : placeholder;
  }

}
