<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = ['name', 'info', 'user_id'];

    protected $appends = [
      'tasks',
    ];

    public function tasks()
    {
      return $this->hasMany('App\Task');
    }

    public function getTasksAttribute()
    {
      return $this->tasks()->orderBy('priority', 'asc')->get();
    }



}
