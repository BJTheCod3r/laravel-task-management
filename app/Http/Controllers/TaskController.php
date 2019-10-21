<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Task;
use App\Project;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
      $tasks = DB::table('tasks')
      ->where('user_id', '=', $request->user()->id)
      ->paginate(10);
      return response()->json($tasks);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      $validatedData = $request->validate([
        'project_id' => 'bail|required',
        'name' => 'bail|required|max:100',
        'info' => 'required'
      ]);

      $failed = response()->json(['added' => 'false'], 422);
      if(Project::find($request->project_id)->exists()) {
        $project = Project::find($request->project_id);
        if($project->user_id == $request->user()->id) {
          $tasks_length = count($project->tasks);
          $priority = 1;
          if($tasks_length > 0) {
            $priority = $project->tasks[0]->priority + 1;
          }
          $task = new Task;
          $task->name = $request->name;
          $task->info = $request->info;
          $task->user_id = $request->user()->id;
          $task->project_id = $request->project_id;
          $task->priority = $priority;
          $task->save();
          return $task;
        }
        return $failed;
      }
      return $failed;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        return $task = Task::where('user_id', '=', $request->user()->id)->find($id);
    }

    public function showWeb($id)
    {
      if(!$task = Task::find($id))
      return view('home', ['private_page' => 1]);
      $name = $task->name;
      return view('task.show', ['private_page' => 1, 'name' => $name, 'id' => $id]);
    }

    public function showEdit($id)
    {
      if(!$task = Task::find($id))
      return view('home', ['private_page' => 1]);
      $id = $task->id;
      return view('task.edit', ['private_page' => 1, 'id' => $id]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
      $validatedData = $request->validate([
        'name' => 'bail|required|max:100',
        'info' => 'required'
      ]);

      $failed = response()->json(['updated' => 'false'], 422);
      if(Task::find($id)->exists()) {
        $task = Task::find($id);
        if($task->user_id == $request->user()->id) {
          $task->name = $request->name;
          $task->info = $request->info;
          $task->save();
          return $task;
        }
        return $failed;
      }
      return $failed;
    }

    public function updatePriority(Request $request)
    {
      $validatedData = $request->validate([
        'id' => 'bail|required',
        'priority' => 'bail|required',
        'desired_priority' => 'required'
      ]);

      $user_id = $request->user()->id;
      $id = $request->id;
      $prev_task_id = $request->desired_priority;
      $failed = response()->json(["updated" => false]);
      if(Task::find($request->id)->exists()) {
         $task = Task::find($id);
         $priority = $task->priority;
         $project_id = $task->project_id;
         if($user_id == $task->user_id) {
            if(Task::find($prev_task_id)->exists()) {
              $prev_task = Task::find($prev_task_id);
              $desired_priority = $prev_task->priority;
              $move = 'down';
              if($priority > $desired_priority) {
               $move = 'up';
              }
              if($move === 'down') {
                DB::table('tasks')
                ->whereRaw('project_id = ? AND priority > ? AND priority <= ? AND id != ?', [$project_id, $priority, $desired_priority, $id])
                ->decrement('priority', 1);
              }
              else {
                DB::table('tasks')
                ->whereRaw('project_id = ? AND priority >= ? AND priority <= ? AND id != ?', [$project_id, $desired_priority, $priority, $id])
                ->increment('priority', 1);
              }
              //update task
              $task->priority = $desired_priority;
              $task->save();
              return response()->json(["updated" => true]);
            }
            return $failed;
         }
         return $failed;
      }
      return $failed;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
      if(Task::find($id)->exists()) {
        $task = Task::find($id);
        if($request->user()->id == $task->user_id) {
          $task->delete();
          return response()->json(null, 204);
        }
      }
    }
}
