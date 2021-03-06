<?php

namespace App\Http\Controllers;

use App\Models\Incident;
use Illuminate\Http\Request;

class IncidentController extends Controller
{
    public function index()
    {
      $incidents = Incident::orderBy('created_at', 'desc')->get();

      return $incidents->toJson();
    }

    public function createIncident(Request $request)
    {
      $validatedData = $request->validate([
        'title' => 'required',
        'description' => 'required',
        'criticality_id' => 'required',
        'type_id' => 'required',
        'status_id' => 'required',
      ]);

      $incident = Incident::create([
        'title' => $validatedData['title'],
        'description' => $validatedData['description'],
        'criticality_id' => $validatedData['criticality_id'],
        'status_id' => $validatedData['status_id'],
        'type_id' => $validatedData['type_id'],
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

    public function updateIncident(Incident $incident, Request $request)
    {
      $incident->title = $request->input('title');
      $incident->description = $request->input('description');
      $incident->criticality_id = $request->input('criticality_id');
      $incident->status_id = $request->input('status_id');
      $incident->type_id = $request->input('type_id');
      $incident->update();

      return response()->json('Incidente atualizado!');
    }

    public function deleteIncident(Incident $incident, Request $request)
    {
      $incident->find($request->route('id'))->delete();
      $incident->delete();

      return response()->json('Incidente excluído!');
    }    
}
