<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Task manager - Create Project</title>

  @include('layouts.styles')

</head>
<body class="body-grad home_page">
  <header>
  </header>
  <main id="app">
    <input type="hidden" id="index" value="{{ url('') }}">
    <input type="hidden" id="url" value="{{ url('api') }}">
    <div class="container-fluid">
      <div class="profile-inner">
          @include('layouts.logo')
        <h1 class="font-weight-bolder">Create New Project</h1>
        <p class="mt-3">Create a new project here. You can assign tasks to projects in the project view.</p>
        <div class="error-space"></div>
        <form class="project-form">
          <div class="form-group">
            <input type="text" placeholder="Project name" id="name" name="name" class="form-control input-lg" >
          </div>
          <div class="form-group">
            <textarea class="form-control" Placeholder="Project info" id="info" name="info"></textarea>
          </div>
          <div class="form-group">
            <button type="button" class="btn btn-primary btn-lg btn-block profile-action-btn facebook-btn" id="create_project"><i class="fas fa-plus-square"></i> Create</button>
          </div>
       </form>
       <div class="profile-divider my-3"></div>
       <div class="success-space"></div>
       <div class="back-space"><a href="{{ url('home')}}"><< Back</a><a class="float-right signout" href="#">Sign out</a></div>
      </div>
    </div>
  </main>
  @include('layouts.footer')
  @include('layouts.scripts')
</body>
</html>
