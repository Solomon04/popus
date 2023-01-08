<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function update(Request $request)
    {
        $user = $this->getCurrentUser();
        $this->validate($request, [
            'first_name' => ['max:255', 'string'],
            'last_name' => ['max:255', 'string'],
        ]);

        if ($request->has('first_name')) {
            $user->update([
                'first_name' => $request->input('first_name'),
            ]);
        }

        if ($request->has('last_name')) {
            $user->update([
                'last_name' => $request->input('last_name'),
            ]);
        }

        return back()->with('message', 'We have updated your account');
    }
}
