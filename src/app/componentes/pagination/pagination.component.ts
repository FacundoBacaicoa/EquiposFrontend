import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {

@Input() length: number=0;
@Input() pageSize: number=5;
@Input() pageSizeOptions: number[]=[5,10,20]

@Output() pageChange=new EventEmitter<PageEvent>();

onPageChange(event: PageEvent): void {
  this.pageChange.emit(event);
}
}
