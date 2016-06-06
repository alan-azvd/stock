(function (globals) {
    "use strict";

    Bridge.define('Bridge.AWS.Cognito.ICognitoLoginCallback');
    
    Bridge.define('Bridge.AWS.DynamoDB.DynamoDB', {
        scan: function (param, callback) {
            AWS.config.credentials.get(function () {
                var dynamodb = new AWS.DynamoDB();
                dynamodb.scan(param, callback);
            });
        },
        getItem: function (param, callback) {
            AWS.config.credentials.get(function () {
                var dynamodb = new AWS.DynamoDB();
                dynamodb.getItem(param, callback);
            });
        },
        putItem: function (param, callback) {
            AWS.config.credentials.get(function () {
                var dynamodb = new AWS.DynamoDB();
                dynamodb.putItem(param, callback);
            });
        },
        deleteItem: function (param, callback) {
            AWS.config.credentials.get(function () {
                var dynamodb = new AWS.DynamoDB();
                dynamodb.deleteItem(param, callback);
            });
        }
    });
    
    Bridge.init();
})(this);
