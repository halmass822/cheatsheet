import { createAsyncThunk, createSlice, configureStore } from "@reduxjs/toolkit";
const APIKey = "";
const authHeader = {"X-API-KEY": APIKey};

export const getWeather = createAsyncThunk(
    "weather/getWeather",
    async ({station, type}) => { //always call as one object as the parameter
        console.log(`getWeather(${station}, ${type})`);
        const response = await fetch(`https://api.checkwx.com/${type}/${station}/decoded`, { headers: authHeader });
        const json = await response.json();
        return json;
    }
); //remember to useDispatch() to use the thunk

const weather = createSlice({
    name: "weather",
    initialState: {
        station: "CYXU",
        type: "metar",
        weather: {},
        isLoadingWeather: false,
        failedToLoadWeather: false
    },
    reducers: {
        setStation: (state, action) => {
            state.station = action.payload
        },
        setType: (state, action) => {
            state.type = action.payload
        }
    },
    extraReducers: {
        [getWeather.pending]: (state, action) => {
            state.isLoadingWeather = true;
            state.failedToLoadWeather = false;
        },
        [getWeather.fulfilled]: (state, action) => {
            state.weather = action.payload;
            state.isLoadingWeather = false;
            state.failedToLoadWeather = false;
        },
        [getWeather.rejected]: (state, action) => {
            state.isLoadingWeather = false;
            state.failedToLoadWeather = true;
        }
    }
});

export const weatherSelector = (state) => state.weather.weather;
export const weatherLoadingSelector = (state) => state.weather.isLoadingWeather;
export const loadingFailedSelector = (state) => state.weather.failedToLoadWeather;
export const stationSelector = (state) => state.weather.station;
export const typeSelector = (state) => state.weather.type;
export const {setStation, setType} = weather.actions;

//don't forget to add slices to the store!

export default configureStore({
    reducer: {
        "weather": weather
    }
};
