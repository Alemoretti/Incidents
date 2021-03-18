<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IncidentController;

Route::get('incidents',  [IncidentController::class, 'index']);
Route::get('incident/{id}', [IncidentController::class, 'show']);
Route::post('incident/create', [IncidentController::class, 'createIncident']);
Route::patch('incident/{incident}', [IncidentController::class, 'updateIncident']);
Route::delete('incident/delete/{id}', [IncidentController::class, 'deleteIncident']);
