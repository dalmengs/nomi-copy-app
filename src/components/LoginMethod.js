import React from 'react';

const LoginMethod = ({ method }) => (
    <div className="flex items-center">
        <span className="font-semibold">
            Login Method:
        </span>
        &nbsp;
        <span className="font-light">{method}</span>
    </div>
);

export default LoginMethod;
