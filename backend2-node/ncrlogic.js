var axios = require('axios');

const getAccounts = (userId) => {
    var config = {
        method: 'get',
        url: `http://ncrdev-dev.apigee.net/digitalbanking/db-accounts/v1/accounts?hostUserId=${userId}`,
        headers: {
            'Authorization': 'Bearer GdFGtbrHYhgE4hQGDg5ITBB7dP9n',
            'transactionId': '230b850d-6b10-403a-85e0-33c4eaf82ee9',
            'Accept': 'application/json'
        }
    };

    return axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            return response.data
        })
        .catch(function (error) {
            console.log(error);
        });
}
//getAccounts()

module.exports = getAccounts