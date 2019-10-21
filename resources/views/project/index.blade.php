<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Task manager - Projects</title>
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
        <h1 class="font-weight-bolder">Projects</h1>
        <p class="mt-3">Manage your projects</p>
        <input type="hidden" name="next_page" id="next_page" value=1 >
        <input type="hidden" name="current_page" id="current_page" value=1 >
        <input type="hidden" name="prev_page" id="prev_page" value=1 >
        <ul class="project-list">
        </ul>
        <div class="paginator"><a href="#" class="mr-2 prev">< Prev</a><a href="#" class="next">Next ></a></div>
       <div class="profile-divider my-3"></div>
       <div class="back-space"><a href="{{ url('home')}}"><< Back</a><a class="float-right signout" href="#">Sign out</a></div>
      </div>
    </div>
  </main>
  @include('layouts.footer')
  @include('layouts.scripts')
</body>
</html>
