<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Link;
use App\Tenant;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller; 
use Validator;
use Illuminate\Support\Facades\DB;

use function GuzzleHttp\Promise\all;

class LinkController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();
        $tenant_id = $input['tenant_id'];
        $tenant = Tenant::where('id', $tenant_id)->first();
        $user_id = $tenant['user_id'];
        $userAuth = Auth::user();
        if($userAuth['id']!=$user_id)
        {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $validator = $this->getValidatorforLink($request);
        
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        
        $link = Link::create($input); 
        return response()->json(['success' => $link]); 
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $input = $request->all();
        $tenant_id = $input['tenant_id'];
        $tenant = Tenant::where('id', $tenant_id)->first();
        $user_id = $tenant['user_id'];
        $userAuth = Auth::user();
        if($userAuth['id']!=$user_id)
        {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $validator = $this->getValidatorforLink($request);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        
        DB::table('links')
            ->where('id', $id)
            ->update($request->all());
        
        return response()->json(['success' => DB::table('links')->where('id', $id)->first()]); 
    }

    public function updatestatus(Request $request, $id)
    {
        $input = $request->all();
        $tenant_id = $input['tenant_id'];
        $tenant = Tenant::where('id', $tenant_id)->first();
        $user_id = $tenant['user_id'];
        $userAuth = Auth::user();
        if($userAuth['id']!=$user_id)
        {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        
        DB::table('links')
            ->where('id', $id)
            ->update(array('status' => $request->status));
        
        return response()->json(['success' => DB::table('links')->where('id', $id)->first()]); 
    }


    public function delete(Request $request, $id)
    {
        $user = Auth::user();
        $link = Link::where('id', $id)->first();
        $tenant = Tenant::where('id', $link['tenant_id'])->first();
        if ($user['id'] == $tenant['user_id']) { 

        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        DB::table('links')
            ->where('id', $id)
            ->delete();
        return response()->json(['success' => "Deleted"]);
    }

    public function details(Request $request, $id)
    {
        $user = Auth::user();
        $link = Link::where('id', $id)->first();
        $tenant = Tenant::where('id', $link['tenant_id'])->first();
        if ($user['id'] == $tenant['user_id']) { 

        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return response()->json(['success' => $link]);
    }


    public function allbutdeleted(Request $request,$tenant_id)
    {
        $user = Auth::user();
        $tenant = Tenant::where('id', $tenant_id)->first();
        if ($user['id'] == $tenant['user_id']) { 

        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $links = Link::where('tenant_id', $tenant_id)->where('status','!=','deleted')->get();

        return response()->json(['success' => $links]);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
    public function getValidatorforLink(Request $request)
    {
        //TODO: validate for other types of links currenly for simple links, Validate linktype
        if (!$request['is_scheduled'] != 0) {
            $validator = Validator::make(
                $request->all(),
                [
                    'title' => 'required',
                    'url' => 'required|url'
                ],
                ['tenant_name.unique' => "Tenant already taken."]
            );
        } else {
            //TODO: validate scheduled time
        }
        return $validator;
    }
    
}
