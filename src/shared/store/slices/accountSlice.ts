import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export type AccountState = {
    balance: number;
}

const initialState: AccountState = {
    balance: 0,
}

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        addBalance: (state, action: PayloadAction<number>) => {
            state.balance += action.payload
        },
        reduceBalance: (state, action: PayloadAction<number>) => {
            state.balance -= action.payload
        }
    }
})

export const { addBalance, reduceBalance } = accountSlice.actions

export const selectBalance = (state: RootState) => state.account.balance

export default accountSlice.reducer;