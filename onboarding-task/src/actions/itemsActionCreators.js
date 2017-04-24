"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getActionFactory_1 = require("./actionFactories/getActionFactory");
var fetch = require("isomorphic-fetch");
require('es6-promise').polyfill();
var deleteActionFactory_1 = require("./actionFactories/deleteActionFactory");
var postActionFactory_1 = require("./actionFactories/postActionFactory");
var putActionFactory_1 = require("./actionFactories/putActionFactory");
var actionTypes_1 = require("./actionTypes");
exports.toggleEditItem = function (id) {
    return {
        type: actionTypes_1.ITEM_TOGGLE_EDIT,
        payload: {
            id: id,
        },
    };
};
exports.getItems = getActionFactory_1.getItemsFactory(fetch, 'api/v1/items');
exports.deleteItem = deleteActionFactory_1.deleteItemFactory(fetch, 'api/v1/items');
exports.postItem = postActionFactory_1.postItemFactory(fetch, 'api/v1/items');
exports.putItem = putActionFactory_1.putItemFactory(fetch, 'api/v1/items');
