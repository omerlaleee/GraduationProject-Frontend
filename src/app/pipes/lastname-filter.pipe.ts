import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lastnameFilter'
})
export class LastnameFilterPipe implements PipeTransform {

  transform(value: any[], filterText: string): any[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : "";
    return filterText ? value.filter((a: any) => a.lastName.toLocaleLowerCase().indexOf(filterText) !== -1) : value;
  }

}
