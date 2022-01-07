/* eslint-disable no-unused-vars */
import OverflowService from "../../service/overflowService";
import ReduxSaga from "redux-saga";
const {takeEvery} = ReduxSaga;
const {put, call} = ReduxSaga.effects;

const OS = new OverflowService();

const answersRequested = () => {
    return {
        type: 'ANSWERS_REQUESTED'
    }
}
const answersError = () => {
    return {
        type: 'ANSWERS_ERROR'
    }
}
const answersLoaded = (data) => {
    return {
        type: 'ANSWERS_LOADED',
        payload: data
    }
}

const addAnswer = (id) => {
    return {
        type: 'ANSWER_ADDED',
        payload: id
    }
}

const fetchAnswers = (id, page, pageSize, sort, order) => {
    return {
        type: 'FETCH_ANSWERS'
    }
}

const fetchAddAnswers = (id, text) => {
    return {
        type: 'FETCH_ADD_ANSWERS'
    }
}

//sagas
function* watchFetchingAnswers() {
    yield takeEvery('FETCH_ANSWERS', fetchAnswersAsync);
}
function* watchFetchingAddAnswers() {
    yield takeEvery('FETCH_ADD_ANSWERS', fetchAddAnswersAsync);
}

function* fetchAnswersAsync(id, page, pageSize, sort, order) {
    try {
        yield put(answersRequested());
        const req = yield call(() => {
            return OS.getAnswersForQuestionById(id, page, pageSize, sort, order);
        })
        yield put(answersLoaded(req));
    }
    catch {
        yield put(answersError());
    }
}
function* fetchAddAnswersAsync(id, text) {
    try {
        yield put(answersRequested());
        const req = yield call(() => {
            return OS.addAnswerForQuestionById(id, text);
        })
        yield put(addAnswer(req));
    }
    catch {
        yield put(answersError());
    }
}

export {
    fetchAnswers,
    fetchAddAnswers
}