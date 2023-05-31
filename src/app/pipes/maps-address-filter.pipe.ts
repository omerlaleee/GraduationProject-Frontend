import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapsAddressFilter'
})
export class MapsAddressFilterPipe implements PipeTransform {

  transform(value: any[], filterText: string): any[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : "";
    return filterText ? value.filter((a: any) => a.mapsAddress.toLocaleLowerCase().indexOf(filterText) !== -1) : value;
  }

}
