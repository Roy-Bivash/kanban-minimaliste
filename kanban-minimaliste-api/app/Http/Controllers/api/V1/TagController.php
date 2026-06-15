<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\TagResource;
use Illuminate\Http\Request;
use App\Models\Tag;
use App\Http\Requests\V1\StoreTagRequest;

class TagController extends Controller
{
    public function index()
    {
        return TagResource::collection(Tag::all());
    }

    public function store(StoreTagRequest $request)
    {
        return new TagResource(Tag::create($request->all()));
    }

    public function show(string $id)
    {
        return new TagResource(Tag::with('tasks')->findOrFail($id));
    }

    public function update(Request $request, string $id)
    {
        $tag = Tag::findOrFail($id);
        $tag->update($request->all());

        return new TagResource($tag);
    }

    public function destroy(string $id)
    {
        $tag = Tag::findOrFail($id);
        $tag->delete();

        return response()->json(['message' => 'Tag deleted successfully']);
    }
}
