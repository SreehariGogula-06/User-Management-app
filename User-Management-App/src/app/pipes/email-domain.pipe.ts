import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailDomain',
  standalone: true
})
export class EmailDomainPipe implements PipeTransform {
  transform(email?: string | null): string {
    if (!email) return '—';
    const i = email.indexOf('@');
    return i > -1 ? email.slice(i + 1) : email;
  }
}
