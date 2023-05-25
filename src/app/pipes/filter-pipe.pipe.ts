import { Pipe, PipeTransform, Type } from '@angular/core';
import { BuildReporter } from '../models/buildReporter';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: BuildReporter[], filterText: string): BuildReporter[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : "";
    return filterText ? value.filter((b: BuildReporter) => b.address.toLocaleLowerCase().indexOf(filterText) !== -1) : value;
  }

}
