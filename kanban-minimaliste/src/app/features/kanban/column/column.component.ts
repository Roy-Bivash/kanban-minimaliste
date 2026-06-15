import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../core/models/task.model';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
    selector: 'app-column',
    standalone: true,
    imports: [CommonModule, TaskCardComponent],
    templateUrl: './column.component.html'
})
export class ColumnComponent {
    @Input() label!: string;
    @Input() tasks: Task[] = [];

    @Output() onEdit = new EventEmitter<Task>();
    @Output() onDelete = new EventEmitter<Task>();
}