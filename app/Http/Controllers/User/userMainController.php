<?php

namespace App\Http\Controllers\User;

use App\Models\User;
use Inertia\Inertia;
use App\Models\typeUser;
use Illuminate\Http\Request;
use App\Services\ModelServices;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class userMainController extends Controller
{

    protected $modelServices;

    public function __invoke(){
        return Inertia::render('Users/UserList',[
            'userList'=> User::paginate(10),
            'userTypes' => typeUser::all()
        ]);
    }


    public function __construct(ModelServices $modelServices){
        $this->modelServices = $modelServices;
    }

    public function create(Request $request){


        $userData = array_merge(
            $request->all(),
            ['password' => Hash::make($request->input('password'))]
        );
    

        $newRequest = new Request($userData);

        info($newRequest);
        // DB::Transaction();
        DB::beginTransaction();

        try {
            $this->modelServices->updateOrCreate(new User(), $newRequest);
            DB::Commit();
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
        }

    }

    public function update(Request $request, $id){
        // info($id);
        $this->modelServices->updateOrCreate(new User(),  $request, $id);
    }

    public function destroy($id){
        $this->modelServices->softDestroy(new User(), $id);
    }


}