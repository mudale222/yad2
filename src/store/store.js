import { createStore, combineReducers } from 'redux';
// import expensesReducer from '../reducers/expenses'
// import filtersReducer from '../reducers/filters'

const initialState = { adsPath: "/yad2Ad.png", menuText: ["ראשי"] }

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_ADS':
            return { ...state, ads: action.ads }
        case 'UPDATE_MENU':
            return { ...state, menu: action.menu }
        default:
            return state
    }
}


export default () => {
    const store = createStore(
        reducer
        //     combineReducers({
        //     expenses: expensesReducer,
        //     filters: filtersReducer
        // })
    );
    return store
}

