<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Task extends Model
{
    protected $table = 'task';

    protected $fillable = [
        'title',
        'description',
        'status',
        'priority'
    ];

    // Define many-to-many relationship with tags
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(
            Tag::class,
            'task_tag',
            'task_id',
            'tag_id'
        );
    }
}