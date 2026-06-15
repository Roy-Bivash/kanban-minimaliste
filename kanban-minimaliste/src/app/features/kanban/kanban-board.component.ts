import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../core/models/task.model';
import { Status } from '../../core/enums/status.enum';
import { ColumnComponent } from './column/column.component';
import { TaskFormModalComponent } from '../../shared/modals/task-form-modal.component';
import { DeleteConfirmModalComponent } from '../../shared/modals/delete-confirm-modal.component';

@Component({
    selector: 'app-kanban-board',
    standalone: true,
    imports: [
        CommonModule, 
        ColumnComponent, 
        TaskFormModalComponent, 
        DeleteConfirmModalComponent
    ],
    templateUrl: './kanban-board.component.html'
})
export class KanbanBoardComponent implements OnInit {
    tasks = signal<Task[]>([]);

    columns = [
        { status: Status.TODO, label: 'To do' },
        { status: Status.IN_PROGRESS, label: 'In progress' },
        { status: Status.BLOCKED, label: 'Blocked' },
        { status: Status.DONE, label: 'Done' },
    ];

    editingTask = signal<Task | null>(null);
    deletingTask = signal<Task | null>(null);

    constructor(private taskService: TaskService) { }

    ngOnInit() {
        this.taskService.getAll().subscribe(tasks => this.tasks.set(tasks));
    }

    tasksForColumn(status: Status) {
        return this.tasks().filter(t => t.status === status);
    }

    openCreate() { 
        console.log("test")
        this.editingTask.set({} as Task); 
    }
    openEdit(task: Task) { 
        this.editingTask.set(task); 
    }
    openDelete(task: Task) { 
        this.deletingTask.set(task); 
    }
    closeModals() { this.editingTask.set(null); this.deletingTask.set(null); }

    onSaved(savedTask: Task) {
        this.tasks.update(list => {
            const index = list.findIndex(t => t.id === savedTask.id);
            return index >= 0
            ? list.map((t, i) => i === index ? savedTask : t)
            : [...list, savedTask];
        });
        this.closeModals();
    }

    onDeleted(id: number) {
        this.tasks.update(list => list.filter(t => t.id !== id));
        this.closeModals();
    }
}