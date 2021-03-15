<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Incident extends Model
{
    protected $fillable = ['title', 'description', 'criticality_id', 'type_id', 'status_id'];
    
    public function status()
    {
        return $this->hasOne(Status::class);
    }

    public function type()
    {
        return $this->hasOne(Type::class);
    }
    
    public function criticalityLevel()
    {
        return $this->hasOne(CriticalityLevel::class);
    }    
}
