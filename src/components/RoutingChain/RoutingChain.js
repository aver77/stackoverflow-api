import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Auth from '../Auth/Auth';
import Header from '../Header/Header';
import MainItem from '../MainQuestions/MainQuestionsItem';
import MainCurrentItem from '../MainQuestions/MainQuestionsCurrentItem';

import MainAnswersAddItem from '../MainAnswers/MainAnswersAddItem';
import MainAnswersItem from '../MainAnswers/MainAnswersItem';

import Error from '../Error/Error';
import PrivateRoute from './PrivateRoute';

const RoutingChain = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Auth/>}/>
                <PrivateRoute>
                    <Route path='authorized' element={<><Header/></>}>
                        <Route path='questions' element={<><Header/><MainItem/></>}/>
                        <Route path='questions/:id' element={<><Header/><MainCurrentItem/></>}/>
                        <Route path='questions/:id/answers' element={<><Header/><MainAnswersItem/><MainAnswersAddItem/></>}/>
                    </Route>
                </PrivateRoute>
                <Route path="*" element = {<Error/>}/>
            </Routes>
        </Router>
    );
};

export default RoutingChain;