import { Component, Input, Output, EventEmitter, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task, CreateTaskPayload, UpdateTaskPayload } from '../../core/models/task.model';
import { Tag } from '../../core/models/tag.model';
import { TaskService } from '../../core/services/task.service';
import { TagService } from '../../core/services/tag.service';
import { Status } from '../../core/enums/status.enum';

@Component({
    selector: 'app-task-form-modal',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './task-form-modal.component.html'
})
export class TaskFormModalComponent implements OnInit {
    @Input() task!: Task;

    @Output() saved = new EventEmitter<Task>();
    @Output() cancelled = new EventEmitter<void>();

    availableTags = signal<Tag[]>([]);

    statuses = Object.values(Status);

    form = {
        title: '',
        description: '',
        status: Status.TODO,
        priority: 1,
        tags: [] as number[]
    };

    constructor(
        private taskService: TaskService,
        private tagService: TagService
    ) { }

    ngOnInit() {
        this.tagService.getAll().subscribe(tags => this.availableTags.set(tags));

        if (this.task?.id) {
            this.form = {
                title: this.task.title,
                description: this.task.description,
                status: this.task.status,
                priority: this.task.priority,
                tags: this.task.tags.map(t => t.id)
            };
        }
    }

    get isEdit(): boolean {
        return !!this.task?.id;
    }

    toggleTag(id: number) {
        this.form.tags = this.form.tags.includes(id)
            ? this.form.tags.filter(t => t !== id)
            : [...this.form.tags, id];
    }

    isTagSelected(id: number): boolean {
        return this.form.tags.includes(id);
    }

    submit() {
        if (this.isEdit) {
            const payload: UpdateTaskPayload = { ...this.form };
            this.taskService.update(this.task.id, payload).subscribe(task => this.saved.emit(task));
        } else {
            const payload: CreateTaskPayload = { ...this.form };
            this.taskService.create(payload).subscribe(task => this.saved.emit(task));
        }
    }
}