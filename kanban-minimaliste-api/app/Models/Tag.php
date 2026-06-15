<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model
{
    protected $table = 'tag';
    public $timestamps = false;

    protected $fillable = [
        'name',
        'color'
    ];

    // Define many-to-many relationship with tasks
    public function tasks(): BelongsToMany
    {
        return $this->belongsToMany(
            Task::class,
            'task_tag',
            'tag_id',
            'task_id'
        );

    }
}