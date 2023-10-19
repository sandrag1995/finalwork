import React from 'react';

const ErrorPage = () => {
    return (
        <div>
            <div className="d-flex flex-wrap m-10 gap-20 profile-settings">
                <div className="message-container p-10">
                    <p>You are not logged in. Please <a href="/reg-log">log in</a> or <a href="/reg-log">register</a> to access this page.</p>
                </div>
            </div>


        </div>
    );
};

export default ErrorPage;