import {Injectable} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private messageService: NzMessageService) {
  }

  success(message: string): void {
    this.messageService.success(message);
  }

  error(message: string): void {
    this.messageService.error(message);
  }

  warning(message: string): void {
    this.messageService.warning(message);
  }

  info(message: string): void {
    this.messageService.info(message);
  }
}
