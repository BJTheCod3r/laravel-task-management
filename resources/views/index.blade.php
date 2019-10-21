<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Task Manager</title>
  @include('layouts.styles')
</head>
<body>
  <header></header>
  <main id="app">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6 left">
          <p class="font-size-22"><span class="col-ff57">Task</span> manager</p>
          <h1 class="mb-4">Create tasks online</h1>
          <p>Create tasks and projects and manage them online.</p>
        </div>
        <div class="col-sm-6 right">
          <p class="intro-text font-weight-bolder">Start creating tasks.</p>
          <span class="error-space"></span>
          <div class="form-content">
            <form method="POST" id="signup-form" class="signup-form">
              @csrf
              <input type="hidden" id="url" value="{{ url('api') }}">
              <input type="hidden" id="index" value="{{ url('') }}">
              <h2 class="col-ff57 intro-text font-weight-bold">Get started</h2>
              <div class="form-group">
                <input type="text" class="form-input custom-control" name="username" id="username" placeholder="Enter username"/>
              </div>
              <div class="form-group">
                <input type="password" class="form-input custom-control" name="password" id="password" placeholder="Password"/>
                <span toggle="#password" class="far fa-eye-slash field-icon toggle-password"></span>
              </div>
              <div class="form-group">
                <p class="text-white font-size-12">I agree to all statements in the <a href="#">Terms of Service</a></p>
              </div>
              <div class="form-group">
                <button type="button" id="signup_btn" class="btn btn-light signup-btn">SIGN UP</button>
                <button type="button" id="signin_btn" class="btn btn-outline-light signin-btn">SIGN IN</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
  @include('layouts.main_footer')
  @include('layouts.scripts')
</body>
</html>
