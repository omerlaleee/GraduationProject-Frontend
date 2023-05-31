import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addressFromFilter'
})
export class AddressFromFilterPipe implements PipeTransform {

  transform(value: any[], filterText: string): any[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : "";
    return filterText ? value.filter((a: any) => a.addressFrom.toLocaleLowerCase().indexOf(filterText) !== -1) : value;
  }

}
