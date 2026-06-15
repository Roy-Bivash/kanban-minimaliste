<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\TaskResource;
use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\Tag;
use App\Http\Requests\V1\StoreTaskRequest;

class TaskController extends Controller
{
    public function index()
    {
        return TaskResource::collection(Task::with('tags')->get());
    }

    public function store(StoreTaskRequest $request)
    {
        $task = Task::create($request->all());

        if ($request->has('tags')) {
            $task->tags()->sync($request->tags);
        }

        return new TaskResource($task->load('tags'));
    }

    public function show(string $id)
    {
        return new TaskResource(Task::find($id));
    }

    public function showByPriority(string $priority)
    {
        return new TaskResource(Task::where('priority', $priority)->get());
    }

    public function update(Request $request, string $id)
    {
        $task = Task::findOrFail($id);
        $task->update($request->all());

        if ($request->has('tags')) {
            $task->tags()->sync($request->tags);
        }

        return new TaskResource($task->load('tags'));
    }

    public function destroy(string $id)
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return response()->json(['message' => 'Task deleted successfully']);
    }

    public function attachTag(string $taskId, string $tagId)
    {
        $task = Task::findOrFail($taskId);
        $tag = Tag::findOrFail($tagId);

        if ($task->tags()->where('tag_id', $tagId)->exists()) {
            return response()->json(['message' => 'Tag is already attached to this task'], 409);
        }

        $task->tags()->attach($tagId);

        return new TaskResource($task->load('tags'));
    }

    public function detachTag(string $taskId, string $tagId)
    {
        $task = Task::findOrFail($taskId);

        if (!$task->tags()->where('tag_id', $tagId)->exists()) {
            return response()->json(['message' => 'Tag is not attached to this task'], 404);
        }

        $task->tags()->detach($tagId);

        return new TaskResource($task->load('tags'));
    }
}
