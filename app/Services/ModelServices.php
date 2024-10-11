<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

Class ModelServices {

    use SoftDeletes;

    public function getAll(Model $model, $id) {
        return $model::findOrFail($id);
    }

    public function updateOrCreate(Model $model, Request $request, $id = null){
        if($id != null){
            $findId = ['id' => $id];
            $model->updateOrCreate($findId,$request->all());
        }else{
            $model->updateOrCreate($request->all());
        }
    }

    public function softDestroy(Model $model, $id) {
       $destroy = $model->findOrFail($id);
       $destroy->delete();
    }

}