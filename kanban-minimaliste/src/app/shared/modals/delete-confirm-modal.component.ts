import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../core/models/task.model';
import { TaskService } from '../../core/services/task.service';

@Component({
    selector: 'app-delete-confirm-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './delete-confirm-modal.component.html'
})
export class DeleteConfirmModalComponent {
    @Input() task!: Task;

    @Output() confirmed = new EventEmitter<number>();
    @Output() cancelled = new EventEmitter<void>();

    constructor(private taskService: TaskService) { }

    confirm() {
        this.taskService.delete(this.task.id).subscribe(() => {
            this.confirmed.emit(this.task.id);
        });
    }
}