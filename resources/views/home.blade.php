<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Task manager</title>
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
        <h1 class="font-weight-bolder">Manage Tasks and Projects</h1>
        <p class="mt-3">Create, view<strong> tasks</strong> and<strong> projects.</strong></p>
        <div>
          <a href="tasks" class="btn btn-primary btn-lg btn-block profile-action-btn"><i class="fas fa-tasks"></i> View Tasks</a>
          <a href="projects" class="btn btn-primary btn-lg btn-block profile-action-btn whatsapp-btn"><i class="fas fa-project-diagram"></i> View Projects</a>
          <a href="projects/create" class="btn btn-primary btn-lg btn-block profile-action-btn facebook-btn"><i class="fas fa-plus-square"></i> Create Project</a>
        </div>

       <div class="profile-divider my-3"></div>
       <div class="back-space"><a class="float-right signout" href="#">Sign out</a></div>
      </div>
    </div>
  </main>
  @include('layouts.footer')
  @include('layouts.scripts')
</body>
</html>
