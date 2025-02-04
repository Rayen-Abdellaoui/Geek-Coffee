import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'nameFormat' })
export class NameFormatPipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value) return '';
    return value.replace(/\b\w/g, (char) => char.toUpperCase());
  }
}


@Pipe({ name: 'phoneFormat' })
export class PhoneFormatPipe implements PipeTransform {
    transform(value: string | number | null): string {
      if (!value) return '';
  
      
      const phoneStr = value.toString().replace(/\D/g, '');
      if (!/^\d{8}$/.test(phoneStr)) {
        return phoneStr; 
      }
  
      return `${phoneStr.substring(0, 2)} ${phoneStr.substring(2, 5)} ${phoneStr.substring(5)}`;
    }
  }