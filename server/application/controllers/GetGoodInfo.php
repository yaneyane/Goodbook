<?php
 
public function getGoodInfo(Request $request)
{

 
    return response()->json(['status' => 'success','code' => 200,'message' => '获取成功','data'=>1]);
}
 