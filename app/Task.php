<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
   protected $fillable = ['name', 'info', 'user_id', 'project_id'];

   protected $touches = ['project'];

   public function project()
   {
     return $this->belongsTo('App\Project');
   }
}
