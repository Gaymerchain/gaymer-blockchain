let HaraTokenSDK = require("./lib/library.min.js").default;

let HartSDK = new HaraTokenSDK(false);

/**
 * this function get user balance
 * @param {string} # (user address)
 */
let getBalance = HartSDK._getUserBalance(
  "0x2A4FEB48B3bC241C4bD3b7A9B420683deB572A58"
);

getBalance.then(function(res) {
  //   console.log(res);
});

/**
 * this function get Transaction list
 * @param {string} # (transaction hash)
 */
let getDetailTransaction = HartSDK._getDetailTransaction(
  "0x79092a8f99a822def6589e5bf294f0387cfdaad4ec41cc910c8055acd7e2e348"
);

getDetailTransaction.then(function(res) {
  // console.log(res);
});

/**
 * this function will call all web3 functions manually, by proxy command that alias on backend url
 * @param {string} # (transaction hash)
 */
let getCall = HartSDK._call("getTransaction", [
  "0xfae265d344bb13ecd6f3d4456f10275c642fe74fbbee7e4919ad2f0a506b54a4"
]);

getCall.then(function(res) {
  // console.log(res);
});

/**
 * this function will call all web3 functions manually, by proxy command that alias on backend url
 * @param {string} # (transaction hash)
 */
let _getBalance = HartSDK._call("getBalance", [
  "0x2A4FEB48B3bC241C4bD3b7A9B420683deB572A58"
]);

_getBalance.then(function(res) {
  // console.log(res);
});

/**
 * get latest block from privatenet
 */
let getLatestBlock = HartSDK._call("getBlock", ["latest"]);

getLatestBlock.then(function(res) {
  // console.log(res);
});

/**
 * get total transaction
 */
let getTotalTransaction = HartSDK._getTotalTransaction();

getTotalTransaction.then(function(res) {
  // console.log("total transaction", res);
});

/**
 * get total transaction
 */
let getDetailBlock = HartSDK._getDetailBlock(
  "0x72e880486b840347f98273b8b24436c211dd7999c55e2bc3ba39521c1de34ee8"
);

getDetailBlock.then(function(res) {
  // console.log("detail block", res);
});

/**
 * ==================================================
 * infinite scroll with get_blocks and get_transactions example
 */

/**
 * this function get Block list
 * @param {int, int} # (page, limit)
 */
let limit = 10
let getBlocks = HartSDK._getBlocks(false, limit);

getBlocks.then(function(res) {
  // validate here if res return message failed
  if(res.message == "failed") {
    return;
  }

  let lastSortKey = false;
  
  res.data.map((val, key) => {
    lastSortKey = val.sort_key;

    console.log(val.sort_key);
  })

  // or get last with array and store this to your cookies or another state management
  lastSortKey = "sort_key" in res.data[limit - 1] ? res.data[limit-1].sort_key : false;
  
  if(!lastSortKey) {
    return;
  }

  console.log("========");

  let getAnotherBlocks = HartSDK._getBlocks(lastSortKey, 10);
  
  getAnotherBlocks.then(function(res) {
    res.data.map((val, key) => {
      lastSortKey = val.sort_key;
  
      console.log(val.sort_key);
    })
  });
});

/**
 * get transaction same as getBlocks
 */
let getTransactions = HartSDK._getTransactions(false, 3);

getTransactions.then(function(res) {
  // validate here if res return message failed
  if(res.message == "failed") {
    return;
  }

  let lastSortKey = false;
  
  res.data.map((val, key) => {
    lastSortKey = val.sort_key;

    console.log(val.sort_key);
  })

  console.log("========");

  let getAnotherTx = HartSDK._getTransactions(lastSortKey, 10);
  
  getAnotherTx.then(function(res) {
    res.data.map((val, key) => {
      lastSortKey = val.sort_key;
  
      console.log(val.sort_key);
    })
  });
});

let getTransactionsAlt = HartSDK._getTransactionsAlt(false, 3);

getTransactionsAlt.then(function(res) {
  // validate here if res return message failed
  if(res.message == "failed") {
    return;
  }

  let lastSortKey = false;
  
  res.data.map((val, key) => {
    lastSortKey = val.sort_key;

    console.log(val.sort_key);
  })

  console.log("========");

  let getAnotherTx = HartSDK._getTransactionsAlt(lastSortKey, 10);
  
  getAnotherTx.then(function(res) {
    res.data.map((val, key) => {
      lastSortKey = val.sort_key;
  
      console.log(val.sort_key);
    })
  });
});