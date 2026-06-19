@extends('layout.app')

@section('content')

<div class="absolute top-1/2 left-1/2 -translate-1/2 w-100 h-100 flex justify-center items-center flex-col gap-4 bg-amber-100 rounded-lg border-2 border-amber-400">
    <p class="text-lg font-semibold">Jogos disponíveis:</p>
    <ul class="grid grid-cols-2 gap-2">
        @foreach ($games as $game)
            <li class="p-2 text-center font-medium rounded-sm bg-blue-400"> {{ $game }} </li>
        @endforeach
    </ul>
    <p class="text-lg font-semibold">Jogo encontrado:</p>
    @if($search)
        <ul class="text-center">
            <li class="p-2 text-center font-medium rounded-sm bg-green-400"> {{ $search }} </li>
        </ul>
    @else
        <span class="p-2 text-center font-medium rounded-sm bg-red-400">Nenhum jogo encontrado!</span>
    @endif
</div>

@endsection
