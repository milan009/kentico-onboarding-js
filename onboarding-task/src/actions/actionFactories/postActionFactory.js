"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actionTypes_1 = require("../actionTypes");
var ajaxUtils_1 = require("../../utils/ajaxUtils");
exports.postItemRequest = function () {
    return {
        type: actionTypes_1.POST_ITEM_REQUEST,
        payload: {},
    };
};
exports.postItemSuccess = function (item) {
    return {
        type: actionTypes_1.POST_ITEM_SUCCESS,
        payload: {
            item: item
        },
    };
};
exports.postItemFailure = function (errors) {
    return {
        type: actionTypes_1.POST_ITEM_FAILURE,
        payload: {
            errors: errors
        },
    };
};
var postItem = function (fetch, address, text) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return function (dispatch) {
        dispatch(exports.postItemRequest());
        return fetch(address, {
            method: 'post',
            body: JSON.stringify({ text: text }),
            headers: headers,
        })
            .then(ajaxUtils_1.checkStatus)
            .then(function (item) { return dispatch(exports.postItemSuccess(item)); })
            .catch(function (errors) { return dispatch(exports.postItemFailure(errors)); });
    };
};
exports.postItemFactory = function (fetch, address) {
    return function (text) { return postItem(fetch, address, text); };
};
