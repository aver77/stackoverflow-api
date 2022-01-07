import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import answersReducer from "./answers/answersReducer";
import questionsReducer from "./questions/questionsReducer";

const store = createStore(combineReducers({answersReducer, questionsReducer}), applyMiddleware(createSagaMiddleware()));
export default store;