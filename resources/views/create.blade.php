<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Talkam.online - {{ $username }}</title>
  <meta name="csrf-token" content="{{ csrf_token() }}"> <!--
  <meta name="private_page" content={{ $private_page }} > -->
  <meta name="description" content="Social media, anonymous messages, dm, inboxing, messaging " />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimal-ui" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-barstyle" content="black-translucent">
  <!--
  <link rel="apple-touch-icon" href="images/logo.png"> -->
  <meta name="apple-mobile-web-app-title" content="Flatkit">
  <meta name="mobile-web-app-capable" content="yes"> <!--
  <link rel="shortcut icon" sizes="196x196" href="images/logo.png"> -->
  @include('layouts.styles')


</head>
<body class="body-grad message_page">
  <header></header>
  <main id="app">
    <div class="container-fluid">
      <div class="profile-inner">
        <p class="font-size-22 text-left"><span class="col-ff57">Talkam</span>.online</p>
        <h1 class="font-weight-bolder">Say Something</h1>
        <p>Tell <strong>{{ $username }}</strong> something or you can start from the list of dropdown below.</p>
          <button type="button" id="get_started" class="btn btn-primary btn-lg btn-block profile-action-btn"><i class="fas fa-caret-down"></i> Pick from list</button>
          <div class="d-none get-started">
            <button type="button" class="btn btn-primary btn-lg btn-block profile-action-btn orange-btn">I love you.</button>
            <button type="button" class="btn btn-primary btn-lg btn-block profile-action-btn orange-btn">You're an amazing person, don't change for anything.</button>
            <button type="button" class="btn btn-primary btn-lg btn-block profile-action-btn orange-btn">Can you guess who this is? (Insert riddle)</button>
            <button type="button" class="btn btn-primary btn-lg btn-block profile-action-btn orange-btn">To tell the truth, you're an horrible person.</button>
            <button type="button" class="btn btn-primary btn-lg btn-block profile-action-btn orange-btn">From you, I got the bittersweet taste of unrequited love.</button>
            <button type="button" class="btn btn-primary btn-lg btn-block profile-action-btn orange-btn">You're an awesome person the only part I don't like is how you...</button>
          </div>
        <form>
          <input type="hidden" id="url" value="{{ url('api') }}" >
          <input type="hidden" id="username" value="{{ $username }}">
          <input type="hidden" id="home_url" value="{{ url('') }}">
          <div class="form-group">
            <textarea class="form-control custom-textarea" name="message" id="message" placeholder="Enter your message"></textarea>
            <p class="text-left">300 characters remaining</p>
          </div>
          <div class="form-check mb-5">
           <label class="form-check-label">
             <input type="checkbox" id="get_a_reply" class="form-check-input" value="">Get a reply (you would still be anonymous).
           </label>
          </div>
          <div class="login-details d-none">
            <div class="form-group">
              <input type="text" class="form-input" name="username" id="username" placeholder="Enter username"/>
            </div>
            <div class="form-group">
              <input type="password" class="form-input" name="password" id="password" placeholder="Password"/>
              <span toggle="#password" class="far fa-eye-slash field-icon toggle-password"></span>
            </div>
          </div>
          <button type="button" class="btn btn-primary btn-lg btn-block profile-action-btn">Send Message <i class="fas fa-paper-plane right-icon"></i></button>
          <p class="font-size-12 text-left">By using this service, you agree to our Privacy Policy, Terms of Service and any related policies.</p>
        </form><!--
        <img src="assets/images/ad1.jpg" class="img-fluid mb-3" > -->
    </div>
  </main>
  @include('layouts.footer')
  @include('layouts.scripts')
</body>
</html>
