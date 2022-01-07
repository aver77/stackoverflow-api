const initialState = {
    answers: [],
    addedAnswer: [],
    loadingAnswers: false,
    errorAnswers: false,
}

const answersReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ANSWERS_REQUESTED': {
            return {
                ...state,
                loadingAnswers: true,
                errorAnswers: false
            }
        }
        case 'ANSWERS_ERROR': {
            return {
                ...state,
                loadingAnswers: false,
                errorAnswers: true
            }
        }
        case 'ANSWERS_LOADED': {
            return {
                ...state,
                loadingAnswers: false,
                errorAnswers: false,
                answers: action.payload
            }
        }
        case 'ANSWER_ADDED': {
            return {
                ...state,
                addedAnswer: action.payload
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export default answersReducer;