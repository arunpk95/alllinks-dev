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
            overflow-x: auto;
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
            width: 100%;
            background-color: #4CAF50;
        }

        /* Dropdown Content (Hidden by Default) */
        .dropdown-content {
            display: none;
            position: absolute;
            background-color: #f9f9f9;
            width: 100%;
            overflow: auto;
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

    <style>
        .avatar-upload {
            position: relative;
            max-width: 205px;
            margin: 50px auto;
        }

        .avatar-upload .avatar-edit {
            position: absolute;
            right: 12px;
            z-index: 1;
            top: 10px;
        }

        .avatar-upload .avatar-edit input {
            display: none;
        }

        .avatar-upload .avatar-edit input+label {
            display: inline-block;
            width: 34px;
            height: 34px;
            margin-bottom: 0;
            border-radius: 100%;
            background: #FFFFFF;
            border: 1px solid transparent;
            box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
            cursor: pointer;
            font-weight: normal;
            transition: all 0.2s ease-in-out;
        }

        .avatar-upload .avatar-edit input+label:hover {
            background: #f1f1f1;
            border-color: #d6d6d6;
        }

        .avatar-upload .avatar-edit input+label .avatar-edit-icon {
            font-family: 'FontAwesome';
            color: #757575;
            position: absolute;
            top: 10px;
            left: 0;
            right: 0;
            text-align: center;
            margin: auto;
        }

        .avatar-upload .avatar-preview {
            width: 192px;
            height: 192px;
            position: relative;
            border-radius: 100%;
            border: 6px solid #F8F8F8;
            box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
        }

        .avatar-upload .avatar-preview>div {
            width: 100%;
            height: 100%;
            border-radius: 100%;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
        }
    </style>

    <style>
        .navbar-brand {
            position: absolute;
            left: 45%;
            margin-left: -63px;
            height: 100%;
            display: flex;
            align-items: center;
        }
    </style>

    <style>
        .nav-is-active {
            color: white;
            background: lightcoral;
        }
    </style>
    <style>
        /* The device with borders */
        .smartphone {
            position: relative;
            width: 300px;
            height: 560px;
            margin: auto;
            border: 16px black solid;
            border-top-width: 60px;
            border-bottom-width: 60px;
            border-radius: 36px;
        }

        /* The horizontal line on the top of the device */
        .smartphone:before {
            content: '';
            display: block;
            width: 60px;
            height: 5px;
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #333;
            border-radius: 10px;
        }

        /* The circle on the bottom of the device */
        .smartphone:after {
            content: '';
            display: block;
            width: 35px;
            height: 35px;
            position: absolute;
            left: 50%;
            bottom: -65px;
            transform: translate(-50%, -50%);
            background: #333;
            border-radius: 50%;
        }

        /* The screen (or content) of the device https://www.w3schools.com/howto/howto_css_devices.asp*/
        .smartphone .content {
            height: 100%;
            width: 100%;
            background: white;
        }
    </style>

    <style>
        .fav-form-link-form {
            color: grey
        }

        .avatar-upload-title .avatar-preview-title {
            width: 72px;
            height: 72px;
            position: relative;
            border-radius: 100%;
            border: 2px solid #F8F8F8;
            box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
        }

        .avatar-upload-title .avatar-preview-title>div {
            width: 100%;
            height: 100%;
            border-radius: 100%;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
        }

        .center {
            padding: 25px 0;
            font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
        }
    </style>

    <style>
        .edit-link-input {
            border: none;
            border-color: transparent;
            outline: 0;
            width: 100%;
            float: left;
            color: darkgray;
        }

        .edit-link-input:focus {
            color: black;
        }

        .edit-link-input:disabled {
            background-color: white;
        }

        
    </style>
    <style>
        .link-on{
            background: #fb3758;
            color: white;
        }
        
        .link-off{
            background: gray;
            color: white;
        }
    </style>


</head>

<body>
    <div id="app">
    </div>
</body>

<script src="{{asset('/public/js/app.js')}}"></script>

</html>