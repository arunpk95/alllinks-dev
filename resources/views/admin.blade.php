<!DOCTYPE html>
<html lang="en">

<head>
    <title>AllLinks Online</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="favicon.ico">
    <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
    <link rel="stylesheet" href="{{asset('/public/css/app.css')}}">
    <style>
        .is-sidebar-menu {
            padding: 2.5rem;
            background: #fb3758;
        }

        .is-sidebar-menu li a {
            color: white;
        }

        .columns.is-fullheight {
            min-height: calc(100vh - (3.25rem - .75rem));
            max-height: calc(100vh - (3.25rem - .75rem));
            height: calc(100vh - (3.25rem - .75rem));
            display: flex;
            flex-direction: row;
            justify-content: stretch;
        }

        .columns.is-fullheight .column {
            overflow-y: auto;
        }

        .is-main-content {
            background: #fafafa;
        }
    </style>
</head>

<body>
    <div id="app">
    </div>
</body>

<script src="{{asset('/public/js/app.js')}}"></script>

</html>