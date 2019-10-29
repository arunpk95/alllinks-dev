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
            min-height: calc(100vh);
            max-height: calc(100vh);
            height: calc(100vh);
            display: flex;
            flex-direction: row;
            justify-content: stretch;
        }

        .columns.is-fullheight .column {
            overflow-y: auto;
            overflow-x: hidden;
        }

        .is-main-content {
            background: #fafafa;
        }
    </style>

    <style>
        /* Style The Dropdown Button */
        .dropbtn {
            background-color: #4CAF50;
            color: white;
            padding: 16px;
            font-size: 16px;
            border: none;
            cursor: pointer;
        }

        /* The container <div> - needed to position the dropdown content */
        .dropdown {
            position: relative;
            display: inline-block;
            width: 100% ;
            background-color: #4CAF50;
        }

        /* Dropdown Content (Hidden by Default) */
        .dropdown-content {
            display: none;
            position: absolute;
            background-color: #f9f9f9;
            width: 100%;
            overflow:auto;
            box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
            z-index: 1;
        }

        /* Links inside the dropdown */
        .dropdown-content a {
            color: black;
            padding: 12px 16px;
            text-decoration: none;
            display: block;
        }

        /* Change color of dropdown links on hover */
        .dropdown-content a:hover {
            background-color: #f1f1f1
        }

        /* Show the dropdown menu on hover */
        .dropdown:hover .dropdown-content {
            display: block;
        }

        /* Change the background color of the dropdown button when the dropdown content is shown */
        .dropdown:hover .dropbtn .dropdown {
            background-color: #3e8e41;
        }


    </style>

</head>

<body>
    <div id="app">
    </div>
</body>

<script src="{{asset('/public/js/app.js')}}"></script>

</html>