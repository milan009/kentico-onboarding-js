"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actionTypes_1 = require("../actionTypes");
var ajaxUtils_1 = require("../../utils/ajaxUtils");
exports.deleteItemRequest = function () {
    return {
        type: actionTypes_1.DELETE_ITEM_REQUEST,
        payload: {},
    };
};
exports.deleteItemSuccess = function (id) {
    return {
        type: actionTypes_1.DELETE_ITEM_SUCCESS,
        payload: {
            id: id
        },
    };
};
exports.deleteItemFailure = function (errors) {
    return {
        type: actionTypes_1.DELETE_ITEM_FAILURE,
        payload: {
            errors: errors
        },
    };
};
var deleteItem = function (fetch, address, id) {
    return function (dispatch) {
        dispatch(exports.deleteItemRequest());
        return fetch(address + "/" + id, {
            method: 'delete',
        })
            .then(ajaxUtils_1.checkStatus)
            .then(function (_) { return dispatch(exports.deleteItemSuccess(id)); })
            .catch(function (errors) { return dispatch(exports.deleteItemFailure(errors)); });
    };
};
exports.deleteItemFactory = function (fetch, address) {
    return function (id) { return deleteItem(fetch, address, id); };
};
