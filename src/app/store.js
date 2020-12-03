import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../slice/movieSlice';
import youtubeReducer from '../slice/youtubeSlice'
import individualMovieReducer from '../slice/individualSlice'
import actorReducer from '../slice/actorSlice'
import genreReducer from '../slice/genreSlice'
import yearReducer from '../slice/yearSlice'
import streamReducer from '../slice/streamSlice'
import genreDataReducer from '../slice/genreDataSlice'
import streamDataReducer from '../slice/streamDataSlice'
import allMovieReducer from '../slice/allMovieSlice'

export default configureStore({
    reducer: {
        movies: movieReducer,
        individualMovie: individualMovieReducer,
        youtubeMovies: youtubeReducer,
        actor: actorReducer,
        genre: genreReducer,
        year: yearReducer,
        stream: streamReducer,
        genreData: genreDataReducer,
        streamData: streamDataReducer,
        allMovie: allMovieReducer,
    },
});