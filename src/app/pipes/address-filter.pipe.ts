import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addressFilter'
})
export class AddressFilterPipe implements PipeTransform {

  transform(value: any[], filterText: string): any[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : "";
    return filterText ? value.filter((a: any) => a.address.toLocaleLowerCase().indexOf(filterText) !== -1) : value;
  }

}
