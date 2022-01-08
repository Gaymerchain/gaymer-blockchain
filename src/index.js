import Axios from "axios";
import { getBalanceMock, getBlockMock, getDetailTransactionMock, getDetailTransactionMockAlt, getTransactionsMock, getTotalTransaction, getTransactionsAltMock, getDetailBlockMock } from "./mock_data";

export default class HaraTokenSDK {
  constructor(NEED_MOCK) {
    this.endpoint = process.env.WEBPACK_ENV == "dev" ? "http://192.168.99.100:3000" : "http://scan-api.haratoken.app/scan";
    this.is_mock = NEED_MOCK;

    Axios.defaults.validateStatus = function(status) {
      return status >= 200 && status <= 401; // default
    };
  }

  _getUserBalance = async address => {
    if(this.is_mock) return getBalanceMock;

    let _result = await Axios.get(this.endpoint + "/get_alias_functions", {
      params: {
        function: "getBalance",
        params: JSON.stringify([address])
      }
    });

    return _result.data;
  };

  _getBlocks = async (lastSortKey = false, limit = 10) => {
    if(this.is_mock) return getBlockMock;

    let _params = {
      last_sort_key: lastSortKey,
      limit: limit
    }

    lastSortKey == false || !lastSortKey && delete _params.last_sort_key;

    let _result = await Axios.get(this.endpoint + "/get_blocks", {
      params: _params
    });

    return _result.data;
  };

  _getTransactions = async (lastSortKey = false, limit) => {
    if(this.is_mock) return getTransactionsMock;

    let _params = {
      last_sort_key: lastSortKey,
      limit: limit
    }

    lastSortKey == false || !lastSortKey && delete _params.last_sort_key;

    let _result = await Axios.get(this.endpoint + "/get_transactions", {
      params: _params
    });

    return _result.data;
  };

  _getTransactionsAlt = async (lastSortKey = false, limit) => {
    if(this.is_mock) return getTransactionsAltMock;

    let _params = {
      last_sort_key: lastSortKey,
      limit: limit,
      alt: true
    }

    lastSortKey == false || !lastSortKey && delete _params.last_sort_key;

    let _result = await Axios.get(this.endpoint + "/get_transactions_alt", {
      params: _params
    });

    return _result.data;
  };

  _getDetailTransaction = async (txhash) => {
    if(this.is_mock) return getDetailTransactionMock;

    let _result = await Axios.get(this.endpoint + "/get_detail_transaction", {
      params: {
        txhash: txhash
      }
    });

    return _result.data;
  };

  _getDetailTransactionAlt = async (txhash) => {
    if(this.is_mock) return getDetailTransactionMockAlt;

    let _result = await Axios.get(this.endpoint + "/get_detail_transaction_alt", {
      params: {
        txhash: txhash
      }
    });

    return _result.data;
  };

  _getTransactionsByAddress = async (page, limit, from, to) => {
    if(this.is_mock) return getTransactionsMock;

    let _result = await Axios.get(this.endpoint + "/get_transactions_by_address", {
      params: {
        page: page,
        limit: limit,
        from,
        to
      }
    });

    return _result.data;
  };

  _getTransactionsByAddressAlt = async (page, limit, from, to) => {
    if(this.is_mock) return getTransactionsAltMock;

    let _result = await Axios.get(this.endpoint + "/get_transactions_by_address_alt", {
      params: {
        page: page,
        limit: limit,
        from,
        to
      }
    });

    return _result.data;
  };

  _getTotalTransaction = async (page, limit, from, to) => {
    if(this.is_mock) return getTotalTransaction;

    let _result = await Axios.get(this.endpoint + "/get_total_transaction");

    return _result.data;
  };


  _call = async (functionName, params) => {
    if(this.is_mock) return getTransactionsMock;

    let _result = await Axios.get(this.endpoint + "/get_alias_functions", {
      params: {
        function: functionName,
        params: JSON.stringify(params)
      }
    });

    return _result.data;
  }

  _call_contract = async (functionName, contractAddress, params) => {
    if(this.is_mock) return getTransactionsMock;

    let _result = await Axios.get(this.endpoint + "/get_contract_functions", {
      params: {
        function: functionName,
        contractAddress: contractAddress,
        params: JSON.stringify(params)
      }
    });

    return _result.data;
  }

  _get_total_supply = async () => {
    if(this.is_mock) return getTransactionsMock;

    let _result = await Axios.get(this.endpoint + "/get_total_supply");

    return _result.data;
  }

  _getDetailBlock = async (blockHash) => {
    if(this.is_mock) return getDetailBlockMock;

    let _result = await Axios.get(this.endpoint + "/get_detail_block", {
      params: {
        block_hash: blockHash,
      }
    });

    return _result.data;
  }
}
