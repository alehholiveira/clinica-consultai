<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use App\Mail\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function send(Request $request){

        $validator = Validator::make($request->all(), [
            'name' => ['required'],
            'email' => ['required'],
            'subject' => ['required'],
            'message' => ['required'],
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        Mail::to('secretaria@consultai.com','Clinica ConsultAí')->send(new Contact([
            'fromName' => $request->input('name'),
            'fromEmail' => $request->input('email'),
            'subject' => $request->input('subject'),
            'message' => $request->input('message'),

        ]));

        return redirect ('/');
    }

}
