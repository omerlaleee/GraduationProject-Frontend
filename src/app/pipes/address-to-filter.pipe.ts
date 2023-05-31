import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addressToFilter'
})
export class AddressToFilterPipe implements PipeTransform {

  transform(value: any[], filterText: string): any[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : "";
    return filterText ? value.filter((a: any) => a.addressTo.toLocaleLowerCase().indexOf(filterText) !== -1) : value;
  }

}
