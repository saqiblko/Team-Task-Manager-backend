<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    // List projects
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'admin') {
            return Project::with(['creator', 'members'])->latest()->get();
        }

        return $user->projects()->with(['creator', 'members'])->latest()->get();
    }

    // Create project
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $project = Project::create([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'created_by' => $request->user()->id,
        ]);

        // Attach creator as project admin
        $project->members()->attach($request->user()->id, [
            'role_in_project' => 'admin'
        ]);

        return response()->json(
            $project->load(['creator', 'members']),
            201
        );
    }

    // Show single project
    public function show(Request $request, Project $project)
    {
        $this->authorizeAccess($request->user(), $project);

        return $project->load(['creator', 'members', 'tasks']);
    }

    // Add member to project
    public function addMember(Request $request, Project $project)
    {
        $this->authorizeAdmin($request->user(), $project);

        $validated = $request->validate([
            'email' => 'required|email',
            'role' => 'nullable|in:admin,member'
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Attach or update role
        $project->members()->syncWithoutDetaching([
            $user->id => [
                'role_in_project' => $validated['role'] ?? 'member'
            ]
        ]);

        return response()->json(['message' => 'Member added/updated']);
    }

    // Remove member
    public function removeMember(Request $request, Project $project, $userId)
    {
        $this->authorizeAdmin($request->user(), $project);

        if ($project->created_by == $userId) {
            return response()->json(['message' => 'Cannot remove project creator'], 400);
        }

        $project->members()->detach($userId);

        return response()->json(['message' => 'Member removed']);
    }

    // Update project
    public function update(Request $request, Project $project)
    {
        $this->authorizeAdmin($request->user(), $project);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
        ]);

        $project->update($validated);

        return response()->json($project->load(['creator', 'members']));
    }

    // Delete project
    public function destroy(Request $request, Project $project)
    {
        $this->authorizeAdmin($request->user(), $project);

        $project->delete();

        return response()->json(['message' => 'Project deleted']);
    }

    /*
    |--------------------------------------------------------------------------
    | Helper Methods (Authorization)
    |--------------------------------------------------------------------------
    */

    private function authorizeAccess($user, $project)
    {
        if ($user->role === 'admin') return;

        $isMember = $project->members()
            ->where('user_id', $user->id)
            ->exists();

        if (!$isMember) {
            abort(403, 'Unauthorized');
        }
    }

    private function authorizeAdmin($user, $project)
    {
        if ($user->role === 'admin') return;

        $isAdmin = $project->members()
            ->where('user_id', $user->id)
            ->wherePivot('role_in_project', 'admin')
            ->exists();

        if (!$isAdmin) {
            abort(403, 'Only project admin allowed');
        }
    }
}