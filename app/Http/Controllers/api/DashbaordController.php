<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class DashbaordController extends Controller
{
    //
    public function index(Request $request)
    {
        $user = $request->user();
        if ($user->role === 'admin') {
            $tasks = Task::with('project')->get();
        } else {
            $projectIds = $user->projects()->pluck('project_id');
            $tasks = Task::whereIn('project_id', $projectIds)->get();
        }
        $statusCounts = [
            'pending' => $tasks->where('status', 'pending')->count(),
            'in_progress' => $tasks->where('status', 'in_progress')->count(),
            'completed' => $tasks->where('status', 'completed')->count(),
        ];
        $overdue = $tasks->where('status', '!=', 'completed')
            ->where('due_date', '<', now()->toDateString())->values();
        return response()->json([
            'total_tasks' => $tasks->count(),
            'status_summary' => $statusCounts,
            'overdue_tasks' => $overdue,
        ]);
    }
}
