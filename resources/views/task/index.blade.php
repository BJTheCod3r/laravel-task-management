<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Task manager - Tasks</title>
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta name="private_page" content={{ $private_page }} >
  <meta name="description" content="Create project tasks" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimal-ui" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-barstyle" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="Flatkit">
  <meta name="mobile-web-app-capable" content="yes">
  @include('layouts.styles')

</head>
<body class="body-grad home_page tasks_page">
  <header>
  </header>
  <main id="app">
    <input type="hidden" id="index" value="{{ url('') }}">
    <input type="hidden" id="url" value="{{ url('api') }}">
    <div class="container-fluid">
      <div class="profile-inner">
          @include('layouts.logo')
        <h1 class="font-weight-bolder">Tasks</h1>
        <p class="mt-3">Manage your tasks</p>
        <input type="hidden" name="next_page" id="next_page" value=1 >
        <input type="hidden" name="current_page" id="current_page" value=1 >
        <input type="hidden" name="prev_page" id="prev_page" value=1 >
        <ul class="task-list">
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
