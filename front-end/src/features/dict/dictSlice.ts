import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { IDict, IDictUnsaved } from 'app/interfaces'
import * as dictService from './dictServices'


// get dict list
export const getDict = createAsyncThunk(
    'dict/getDict',
    async (_, thunkAPI) => {
        return await dictService.loadDict().catch(thunkAPI.rejectWithValue)
    }
)


// add new dict
export const addDict = createAsyncThunk(
    'dict/addDict',
    async (dict: IDictUnsaved, thunkAPI) => {
        return await dictService.addDict(dict).catch(thunkAPI.rejectWithValue)
    }
)


// delete dict
export const deleteDict = createAsyncThunk(
    'dict/deleteDict',
    async (id: string, thunkAPI) => {
        return await dictService.deleteDict(id).catch(thunkAPI.rejectWithValue)
    }
)


type DictState = {
    dict: IDict[],
    isLoading: boolean,
    errorMsg: string | null,
    modalState: {
        isSaved: boolean,
    } & ({
        isOpen: false,
        dict: null
    } | {
        isOpen: true,
        dict: IDictUnsaved | IDict
    })
}


const initialState: DictState = {
    dict: [],
    isLoading: true,
    errorMsg: null,
    modalState: {
        isSaved: false,
        isOpen: false,
        dict: null
    }
}


export const dictSlice = createSlice({
    name: 'dict',
    initialState,
    reducers: {
        openModal: (state: DictState, action: { payload: IDictUnsaved | IDict }) => {
            state.modalState.isOpen = true
            state.modalState.dict = action.payload
            state.modalState.isSaved = !!action.payload._id
        },
        closeModal: (state: DictState) => {
            state.modalState.isOpen = false
            state.modalState.dict = null
        }
    },
    extraReducers: (builder) => {
        builder
            // load dict
            .addCase(getDict.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getDict.fulfilled, (state, action) => {
                state.isLoading = false
                state.errorMsg = null
                state.dict = action.payload
            })
            .addCase(getDict.rejected, (state, action) => {
                state.isLoading = false
                state.errorMsg = action.payload as string
                state.dict = []
            })
            // add dict
            .addCase(addDict.pending, (state) => {
                state.isLoading = true
                console.log('add dict pending')
            })
            .addCase(addDict.fulfilled, (state, action) => {
                state.isLoading = false
                console.log('add dict fulfilled')
                console.log(action)
                if (state.modalState.dict?.word === action.payload.word) {
                    state.modalState.isSaved = true
                    state.modalState.dict._id = action.payload._id
                }
                state.dict = [...state.dict as IDict[], action.payload]
            })
            .addCase(addDict.rejected, (state, action) => {
                state.isLoading = false
                console.log('add dict rejected', action.payload)
            })
            // delete dict
            .addCase(deleteDict.pending, (state) => {
                state.isLoading = true
                console.log('delete dict pending')
            })
            .addCase(deleteDict.fulfilled, (state, action) => {
                state.isLoading = false
                console.log('delete dict fulfilled')
                console.log(action)
                if (state.modalState.dict?._id === action.payload.id) {
                    state.modalState.isSaved = false
                    state.modalState.dict._id = null
                }
                state.dict = state.dict.filter(dict => dict._id !== action.payload.id)
            })
            .addCase(deleteDict.rejected, (state, action) => {
                state.isLoading = false
                console.log('delete dict rejected', action.payload)
            })
    }
})


export const { openModal, closeModal } = dictSlice.actions
export default dictSlice.reducer