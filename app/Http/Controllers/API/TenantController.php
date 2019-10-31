<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Tenant;
use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\DB;

class TenantController extends Controller
{
    public function store(Request $request)
    {
        //TODO:validator for tenant name
        $validator = $this->getValidatorforTenant($request);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        //Get User
        $user = Auth::user();

        if(strlen(trim($request['tenant_text']))==0)
        {
            $request['tenant_text']=$request['tenant_name'];
        }
        $input = $request->all();
        $input['user_id'] = $user['id'];
        $input['status'] = 'created';

        

        $tenant = Tenant::create($input);
        return response()->json(['success' => $tenant]);
    }

    public function update(Request $request, $id)
    {
        $user = Auth::user();
        $tenant = Tenant::where('id', $id)->first();
        if ($user['id'] == $tenant['user_id']) { } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        if ($tenant['tenant_name'] == $request->input('tenant_name')) {
            $validator = $this->getValidatorforTenant($request, 'required');
        } else {
            $validator = $this->getValidatorforTenant($request);
        }
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        
        if(strlen(trim($request['tenant_text']))==0)
        {
            $request['tenant_text']=$request['tenant_name'];
        }
        DB::table('tenants')
            ->where('id', $id)
            ->update($request->all());
        return response()->json(['success' => Tenant::where('id', $id)->first()]);
    }


    public function delete(Request $request, $id)
    {
        $user = Auth::user();
        $tenant = Tenant::where('id', $id)->first();
        if ($user['id'] == $tenant['user_id']) { } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        DB::table('tenants')
            ->where('id', $id)
            ->delete();
        DB::table('links')
            ->where('tenant_id', $id)
            ->delete();
        return response()->json(['success' => "Deleted"]);
    }

    public function details(Request $request, $id)
    {
        $user = Auth::user();
        $tenant = Tenant::where('id', $id)->first();
        if ($user['id'] == $tenant['user_id']) { } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return response()->json(['success' => $tenant]);
    }


    public function all(Request $request)
    {
        $user = Auth::user();
        $tenants = Tenant::where('user_id', $user['id'])->get();

        return response()->json(['success' => $tenants]);
    }


    public function getValidatorforTenant(Request $request, $tenant_name_condition = 'required|unique:tenants')
    {
        
        if ($request['is_leap_link_active'] != 0) {
            $validator = Validator::make(
                $request->all(),
                [
                    'tenant_name' => $tenant_name_condition,
                    'leap_link_url' => 'required|url',
                    'thumb_image_url' => 'required|url',
                ],
                ['tenant_name.unique' => "Tenant already taken."]
            );
            $validator->after(function ($validator) use ($request) {
                if ($request->input('leap_link_time_from')>=$request->input('leap_link_time_to')) {
                    $validator->errors()->add('leap_link_time_to', 'Leap Link Till must be in future compared to Leap Link From');
                }
            });
        } else {
            $validator = Validator::make(
                $request->all(),
                [
                    'tenant_name' => 'required|unique:tenants',
                    'thumb_image_url' => 'required|url',
                ],
                ['tenant_name.unique' => "Tenant already taken."]
            );
        }
        $validator->after(function ($validator) use ($request) {
            if (!preg_match('/^[a-zA-Z0-9_-]*$/', $request->input('tenant_name'))) {
                $validator->errors()->add('tenant_name', 'Only Alphanumeric, - and _ are allowed.');
            }
        });
        return $validator;
    }
}
