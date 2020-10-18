var axios = require('axios');
var qs = require('qs');
var data = qs.stringify({
 'grant_type': 'client_credentials',
'scopes': 'accounts:read,transactions:read,transfers:write,account:write,institution-users:read,recipients:read,recipients:write,recipients:delete,disclosures:read,disclosures:write' 
});
var config = {
  method: 'post',
  url: 'http://ncrdev-dev.apigee.net/digitalbanking/oauth2/v1/token',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded', 
    'Authorization': 'Basic alI3RWg3dUF5cFQ0dEpMb0xVMmRBTVlHQ1l5ejZsVjg6T3FRZXQ0OE5YWDdTQXB4SA==', 
    'transactionId': '3df2dc4c-f7a6-4cc2-b2b3-a5a05d3b79f1', 
    'institutionId': '00516', 
    'Accept': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  var x =JSON.stringify(response.data);
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});