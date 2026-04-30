<!doctype html>
<html>
<head>
  <title>@yield('title')</title>
  <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
@include('backend.layouts.navbar')

<div class="container mt-5">
  @yield('content')
</div>

<script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
