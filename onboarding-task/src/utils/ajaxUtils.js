"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkStatus = function (response, serverErrorMessage) {
    if (serverErrorMessage === void 0) { serverErrorMessage = 'Internal server error'; }
    if (response.status === 200 || response.status === 201) {
        return response.json();
    }
    if (response.status === 204) {
        return Promise.resolve([response.statusText]);
    }
    if (response.status < 500) {
        return response.json()
            .then(function (error) {
            return Promise.reject(Object.keys(error.modelState).reduce(function (prev, key) { return prev.concat(error.modelState[key]); }, []));
        });
    }
    return Promise.reject([serverErrorMessage]);
};
