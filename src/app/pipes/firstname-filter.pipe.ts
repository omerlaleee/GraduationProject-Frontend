import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstnameFilter'
})
export class FirstnameFilterPipe implements PipeTransform {

  transform(value: any[], filterText: string): any[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : "";
    return filterText ? value.filter((a: any) => a.firstName.toLocaleLowerCase().indexOf(filterText) !== -1) : value;
  }

}
