<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Project;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $projects = DB::table('projects')
        ->where('user_id', '=', $request->user()->id)
        ->paginate(10);
        return response()->json($projects);
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
        'user_id' => 'bail|required',
        'name' => 'bail|required|max:100',
        'info' => 'required'
      ]);

      if($request->user()->id != $request->user_id) {
        return response()->json(['message' => 'You cannot create for another user',
          'errors' => ['user_id' => 'Invalid user_id',],], 422);
      }

      return Project::create($request->all());


    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        return $project = Project::where('user_id', '=', $request->user()->id)->find($id);

    }

    public function showWeb($id)
    {
      if(!$project = Project::find($id))
      return view('home', ['private_page' => 1]);
      $name = $project->name;
      $id = $project->id;
      return view('project.show', ['private_page' => 1, 'name' => $name, 'id' => $id]);
    }

    public function showEdit($id)
    {
      if(!$project = Project::find($id))
      return view('home', ['private_page' => 1]);
      $id = $project->id;
      return view('project.edit', ['private_page' => 1, 'id' => $id]);
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
      if(Project::find($id)->exists()) {
        $project = Project::find($id);
        if($project->user_id == $request->user()->id) {
          $project->name = $request->name;
          $project->info = $request->info;
          $project->save();
          return $project;
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
        if(Project::find($id)->exists()) {
          $project = Project::find($id);
          if($request->user()->id == $project->user_id) {
            $project->delete();
            return response()->json(null, 204);
        }
    }
  }

}
