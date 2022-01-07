import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitcase'
})
export class SplitcasePipe implements PipeTransform {

  transform(value: string): unknown {
    if(typeof value!=="string")
    return value
    value = value.split(/(?=[A-Z])/).join(` `);
    value = value[0].toUpperCase() + value.slice(1);
    return value;
  }

}
