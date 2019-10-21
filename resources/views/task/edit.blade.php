<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Task manager - Edit Project</title>
  @include('layouts.styles')

</head>
<body class="body-grad home_page task_edit_page">
  <header>
  </header>
  <main id="app">
    <input type="hidden" id="index" value="{{ url('') }}">
    <input type="hidden" id="url" value="{{ url('api') }}">
    <div class="container-fluid">
      <div class="profile-inner">
          @include('layouts.logo')
        <h1 class="font-weight-bolder">Edit Task</h1>
        <p class="mt-3">Edit task name and info here.</p>
        <div class="error-space"></div>
        <form class="task-form">
          <input type="hidden" id="id" value="{{$id}}" >
          <div class="form-group">
            <input type="text" placeholder="Project name" id="name" name="name" class="form-control input-lg" >
          </div>
          <div class="form-group">
            <textarea class="form-control" Placeholder="Project info" id="info" name="info"></textarea>
          </div>
          <div class="form-group">
            <button type="button" class="btn btn-primary btn-lg btn-block profile-action-btn facebook-btn" id="update_task"><i class="fas fa-save"></i> Save</button>
          </div>
       </form>
       <div class="profile-divider my-3"></div>
       <div class="success-space"></div>
       <div class="back-space"><a href="#"><< Back</a><a class="float-right signout" href="#">Sign out</a></div>
      </div>
    </div>
  </main>
  @include('layouts.footer')
  @include('layouts.scripts')
</body>
</html>
