import { Pipe, PipeTransform } from '@angular/core';
import { minutesToTime } from '@shared/utils';

@Pipe({
  name: 'minutesToTime',
  standalone: true,
})
export class MinutesToTimePipe implements PipeTransform {
  public transform(minutes: number): string {
    return minutesToTime(minutes);
  }
}
