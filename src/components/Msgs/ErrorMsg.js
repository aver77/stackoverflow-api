import React from 'react';
import SnackMsg from './SnackMsg';

const ErrorMsg = () => {
    return (
        <SnackMsg text="Error" alertType="error"/>
    );
};

export default ErrorMsg;