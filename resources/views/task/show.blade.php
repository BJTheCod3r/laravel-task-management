<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Task manager - {{ $name }}</title>
  @include('layouts.styles')

</head>
<body class="body-grad home_page task_page">
  <header>
  </header>
  <main id="app">
    <input type="hidden" id="index" value="{{ url('') }}">
    <input type="hidden" id="url" value="{{ url('api') }}">
    <div class="container-fluid">
      <div class="profile-inner">
          @include('layouts.logo')
        <div class="shadow-lg p-2 rounded-lg">
          <h1 class="font-weight-bolder">{{$name}}</h1>
          <p id="task_info" class="mt-3"></p>
          <div class="row">
            <div id="created_at" class="text-left col-sm-6">
            </div>
            <div id="updated_at" class="text-right col-sm-6">
            </div>
          </div>
        </div>
        <input type="hidden" name="id" id="id" value="{{$id}}" >
       <div class="profile-divider my-3"></div>
       <div class="back-space"><a href="#"><< Back</a><a class="float-right signout" href="#">Sign out</a></div>
      </div>
    </div>
  </main>
  @include('layouts.footer')
  @include('layouts.scripts')
</body>
</html>
