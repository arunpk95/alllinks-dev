<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Str;


class UserController extends Controller
{
    public $successStatus = 200;
    /** 
     * login api 
     * 
     * @return \Illuminate\Http\Response 
     */
    public function login()
    {
        if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
            $user = Auth::user();
            if($user['status']=="created")
            {
                return response()->json(['error' => 'Please Activate account using the link in email.'], 401);
            }
            if($user['status']=="deleted")
            {
                return response()->json(['error' => 'Account Deleted. Please contact us.'], 401);
            }
            if($user['status']=="disabled")
            {
                return response()->json(['error' => 'Account Disabled. Please contact us.'], 401);
            }
            $success['token'] =  $user->createToken('MyApp')->accessToken;
            $success['user'] = $user;
            return response()->json(['success' => $success], $this->successStatus);
        } else {
            return response()->json(['error' => 'Invalid email or password'], 401);
        }
    }
    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'c_password' => 'required|same:password',
        ],
        ['email.unique' => "Email already registered",
        'c_password.required' => "Confirm password filed is required.",
        'c_password.same:password' => "Confirm password and password must match."]);


        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $input['activation_code'] = $this->getActCode();
        $input['hastenants'] = 0;
        $input['account_type'] = "free";
        $input['status'] = "created";
        
        $user = User::create($input);
        //TODO: move this to login
        //$success['token'] =  $user->createToken('MyApp')->accessToken;
        $success['name'] =  $user->name;
        $success['email'] =  $user->email;
        return response()->json(['success' => $success], $this->successStatus);
    }
    /** 
     * details api 
     * 
     * @return \Illuminate\Http\Response 
     */
    public function details()
    {
        $user = Auth::user();
        return response()->json(['success' => $user], $this->successStatus);
    }

    //creates a random activation code
    protected function getActCode()
    {
        return hash_hmac('sha256', Str::random(40), config('app.key'));
    }
}
