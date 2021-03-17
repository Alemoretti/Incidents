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
        'title' => 'required',
        'description' => 'required',
        'criticality' => 'required',
        'type' => 'required',
        'status' => 'required',
      ]);

      $incident = Incident::create([
        'title' => $validatedData['title'],
        'description' => $validatedData['description'],
        'criticality_id' => $validatedData['criticality'],
        'status_id' => $validatedData['status'],
        'type_id' => $validatedData['type'],
      ]);

      return response()->json('Incidente criado!');
    }

    public function show($id)
    {
      $incident = Incident::find($id);
      $incident->statusName = $incident->status;
      $incident->typeName = $incident->type;
      $incident->criticality = $incident->criticalityLevel;
      return $incident->toJson();
    }

    public function updateIncident(Project $project)
    {
      $project->title = '';
      $project->update();

      return response()->json('Incidente atualizado!');
    }
}
