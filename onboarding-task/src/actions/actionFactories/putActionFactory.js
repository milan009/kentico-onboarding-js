"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actionTypes_1 = require("../actionTypes");
var ajaxUtils_1 = require("../../utils/ajaxUtils");
exports.putItemRequest = function () {
    return {
        type: actionTypes_1.PUT_ITEM_REQUEST,
        payload: {},
    };
};
exports.putItemSuccess = function (item) {
    return {
        type: actionTypes_1.PUT_ITEM_SUCCESS,
        payload: {
            item: item
        },
    };
};
exports.putItemFailure = function (errors) {
    return {
        type: actionTypes_1.PUT_ITEM_FAILURE,
        payload: {
            errors: errors
        },
    };
};
var putItem = function (fetch, address, id, text) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return function (dispatch) {
        dispatch(exports.putItemRequest());
        return fetch(address, {
            method: 'put',
            body: JSON.stringify({ id: id, text: text }),
            headers: headers,
        })
            .then(ajaxUtils_1.checkStatus)
            .then(function (body) { return dispatch(exports.putItemSuccess(body)); })
            .catch(function (errors) { return dispatch(exports.putItemFailure(errors)); });
    };
};
exports.putItemFactory = function (fetch, address) {
    return function (id, text) { return putItem(fetch, address, id, text); };
};
