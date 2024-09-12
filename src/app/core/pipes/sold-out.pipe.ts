import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'soldOut',
  standalone: true,
})
export class SoldOutPipe implements PipeTransform {
  transform(qty: number, limit: number = 40): string | null {
    if (qty > limit) {
      return null;
    } else {
      return `Only ${qty} pieces left`;
    }
  }
}
