"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actionTypes_1 = require("../actionTypes");
var ajaxUtils_1 = require("../../utils/ajaxUtils");
exports.getItemsRequest = function () {
    return {
        type: actionTypes_1.GET_ITEMS_REQUEST,
        payload: {},
    };
};
exports.getItemsSuccess = function (items) {
    return {
        type: actionTypes_1.GET_ITEMS_SUCCESS,
        payload: {
            items: items
        },
    };
};
exports.getItemsFailure = function (errors) {
    return {
        type: actionTypes_1.GET_ITEMS_FAILURE,
        payload: {
            errors: errors
        },
    };
};
var getItems = function (fetch, address) {
    return function (dispatch) {
        dispatch(exports.getItemsRequest());
        return fetch(address)
            .then(ajaxUtils_1.checkStatus)
            .then(function (content) { return dispatch(exports.getItemsSuccess(content)); })
            .catch(function (errors) { return dispatch(exports.getItemsFailure(errors)); });
    };
};
exports.getItemsFactory = function (fetch, address) {
    return function () { return getItems(fetch, address); };
};
