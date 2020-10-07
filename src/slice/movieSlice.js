import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const token = process.env.REACT_APP_Token

var myHeaders = new Headers();
myHeaders.append("Authorization", `Token ${token}`);

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
};

const initialState = {
    count: 0,
    next: null,
    previous: null,
    movies: [],
    status: 'idle',
    error: null
}

export const getMovies = createAsyncThunk('movie/getMovies',
    (endpoint) => {
        return fetch(endpoint, requestOptions)
            .then(response => {
                if (!response.ok) throw Error(response.statusText);
                return response.json()
            })
            .then(json => json)
    })


export const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
    },
    extraReducers: {
        [getMovies.pending]: state => {
            state.status = 'loading'
        },
        [getMovies.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            // Add any fetched posts to the array
            state.count = action.payload.count
            state.next = action.payload.next
            state.previous = action.payload.previous
            state.movies = state.movies.concat(action.payload.results)
        },
        [getMovies.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        },
    }
})

export const movieSelector = state => state.movies

export default movieSlice.reducer;


