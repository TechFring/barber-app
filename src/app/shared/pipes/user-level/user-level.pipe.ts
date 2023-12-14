import { Pipe, PipeTransform } from '@angular/core';

import { ApiConst } from '@core/constants';
import { UserLevelEnum } from '@core/models';

@Pipe({
  name: 'userLevel',
  standalone: true
})
export class UserLevelPipe implements PipeTransform {
  public transform(level: UserLevelEnum): string {
    const label = ApiConst.USER_LEVELS.find((l) => l.value === level)?.label;
    return label || '';
  }
}
