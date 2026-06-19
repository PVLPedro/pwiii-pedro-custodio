<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GameController extends Controller
{
    public function index() {
        $games = ["Hollow Knight", "Cuphead", "Celeste", "Subnautica", "Rain World", "Firewatch"];
        
        return view('games', ['games' => $games]);
    }
        
    public function search($name) {
        $games = ["Hollow Knight", "Cuphead", "Celeste", "Subnautica", "Rain World", "Firewatch"];

        $games = array_map('strtolower', $games);
        $name = strtolower(trim($name));
    
        // dd($name, $games, in_array($name, $games));

        if (in_array($name, $games)) {
            return view('game', ['search' => $name], ['games' => $games]);
        }
        else {
            return view('game', ['search' => ''], ['games' => $games]);
        }
    }
}

// dd($name, $games, in_array(strtolower($name), $games));