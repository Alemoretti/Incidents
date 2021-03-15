<?php

namespace App\Http\Controllers;

use App\Models\Incident;
use Illuminate\Http\Request;

class IncidentController extends Controller
{
    public function index()
    {
      $incidents = Incident::where('status_id', 1)
                          ->orderBy('created_at', 'desc')
                          ->get();

      return $incidents->toJson();
    }

    public function createIncident(Request $request)
    {
      $validatedData = $request->validate([
        'name' => 'required',
        'description' => 'required',
      ]);

      $incident = Incident::create([
        'name' => $validatedData['name'],
        'description' => $validatedData['description'],
      ]);

      return response()->json('Incident created!');
    }

    public function show($id)
    {
      $incident = Incident::with(['tasks' => function ($query) {
        $query->where('is_completed', false);
      }])->find($id);

      return $incident->toJson();
    }

    public function markAsCompleted(Project $project)
    {
      $project->is_completed = true;
      $project->update();

      return response()->json('Project updated!');
    }
}
