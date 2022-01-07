/* eslint-disable no-unused-vars */
import OverflowService from "../../service/overflowService";
import ReduxSaga from "redux-saga";
const {takeEvery} = ReduxSaga;
const {put, call} = ReduxSaga.effects;

const OS = new OverflowService();

const questionsRequested = () => {
    return {
        type: 'QUESTIONS_REQUESTED'
    }
}
const questionsError = () => {
    return {
        type: 'QUESTIONS_ERROR'
    }
}
const questionsLoaded = (data) => {
    return {
        type: 'QUESTIONS_LOADED',
        payload: data
    }
}

const getCertainQuestion = (id) => {
    return {
        type: 'QUESTION_GOT',
        payload: id
    }
}

const fetchQuestions = (page, pageSize, sort, order) => {
    return {
        type: 'FETCH_QUESTIONS'
    }
}
const fetchCertainQuestion = (id, page, pageSize, sort, order) => {
    return {
        type: 'FETCH_CERTAIN_QUESTION'
    }
}

//sagas
function* watchFetchingQuestions() {
    yield takeEvery('FETCH_QUESTIONS', fetchQuestionsAsync);
}
function* watchFetchingCertainQuestion() {
    yield takeEvery('FETCH_CERTAIN_QUESTION', fetchCertainQuestionAsync);
}

function* fetchQuestionsAsync(page, pageSize, sort, order) {
    try {
        yield put(questionsRequested());
        const req = yield call(() => {
            return OS.getQuestionsList(page, pageSize, sort, order);
        })
        yield put(questionsLoaded(req));
    }
    catch {
        yield put(questionsError());
    }
}
function* fetchCertainQuestionAsync(id, page, pageSize, sort, order) {
    try {
        yield put(questionsRequested());
        const req = yield call(() => {
            return OS.getQuestionById(id, page, pageSize, sort, order);
        })
        yield put(questionsLoaded(req));
    }
    catch {
        yield put(questionsError());
    }
}

export {
    fetchQuestions,
    fetchCertainQuestion
}
