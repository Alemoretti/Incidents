<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('incidents', 'IncidentController@index');
Route::get('incident/{id}', 'IncidentController@show');
Route::post('incident/{incident}', 'IncidentController@createIncident');
Route::patch('incident/{incident}', 'IncidentController@udpateIncident');
Route::delete('incident/new/{incident}', 'IncidentController@deleteIncident');
