<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $tasks = Task::with(['project', 'assignedUser', 'creator'])
            ->when($request->user()->role !== 'admin', function ($q) use ($request) {
                $projectIds = $request->user()->projects()->pluck('project_id');
                return $q->whereIn('project_id', $projectIds);
            })
            ->when($request->project_id, fn($q) => $q->where('project_id', $request->project_id))
            ->latest()
            ->get();

        return response()->json($tasks);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'project_id' => 'required|exists:projects,id',
            'assigned_to' => 'nullable|exists:users,id',
            'due_date' => 'nullable|date',
        ]);

        // Authorization check
        $projectIds = $request->user()->projects()->pluck('project_id');

        if ($request->user()->role !== 'admin' &&
            !$projectIds->contains($validated['project_id'])) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $task = Task::create([
            ...$validated,
            'created_by' => $request->user()->id,
            'status' => 'pending',
        ]);

        return response()->json($task->load(['project', 'assignedUser', 'creator']), 201);
    }

    public function update(Request $request, Task $task)
    {
        $user = $request->user();

        // Only admin or assigned user can update
        if ($user->role !== 'admin' && $task->assigned_to !== $user->id && $task->created_by !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $task->update($request->only([
            'title',
            'description',
            'status',
            'due_date',
            'assigned_to'
        ]));

        return response()->json($task->load(['project', 'assignedUser', 'creator']));
    }

    public function destroy(Request $request, Task $task)
    {
        $user = $request->user();

        if ($user->role !== 'admin' && $task->created_by !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $task->delete();

        return response()->json(['message' => 'Task deleted']);
    }
}