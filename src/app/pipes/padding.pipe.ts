import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'padding'})
export class PaddingPipe implements PipeTransform {
  transform(value: string, size: number): string{

    if (!value) { return value; }

    return value.padEnd(size, '.');

  }
}
