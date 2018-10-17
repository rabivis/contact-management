var AWS = require("aws-sdk");

AWS.config.update({
    region: "eu-west-2",
    endpoint: "http://localhost:8000",
    accessKeyId: 'AKIAIVG5ZNNH2BVCTSXA',
    secretAccessKey: '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'
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = 'Contacts';

var contact = {
    getAll: () => {
        var params = {
            TableName: table,
        };
        return new Promise((resolve, reject) => {
            docClient.scan(params, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.Items);
                }
            });
        });
    },

    get: (contactId) => {
        var params = {
            TableName : table,
            Key: {
                "id": contactId
            }
        };
        return new Promise((resolve, reject) => {
            docClient.get(params, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.Item);
                }
            });
        });
    },

    put: (contact) => {
        var params = {
            TableName: table,
            Item: contact
        }

        return new Promise((resolve, reject) => {
            docClient.put(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    },

    post: (contact) => {
        var params = {
            TableName: table,
            Item: contact
        }

        return new Promise((resolve, reject) => {
            docClient.put(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        // contactsList.push(contact);
    },

    delete: (contactId) => {
        //contactsList.splice(contactsList.findIndex((element) => { return element.id === contactId }), 1);
        var params = {
            TableName : table,
            Key: {
                "id": contactId
            }
        };
        return new Promise((resolve, reject) => {
            docClient.delete(params, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}


module.exports = contact;