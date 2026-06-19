@extends('layout.app')

@section('content')

<div class="absolute top-1/2 left-1/2 -translate-1/2 w-100 h-100 flex justify-center items-center bg-amber-100 rounded-lg border-2 border-amber-400">
    <ul>
        @foreach ($games as $game)
            <li> {{ $game }} </li>
        @endforeach
    </ul>
</div>

@endsection
