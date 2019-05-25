import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Currency from '@/components/Currency.vue';
import Axios from 'axios';
import Vuetify from 'vuetify';
import VueRouter from "vue-router"

window.Axios = Axios;


const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(Vuex);
localVue.use(VueRouter);

describe('Testing Currency.vue', () => {
  let store =  new Vuex.Store({
    state: {
      locale: {}
    }
  });
  const router = new VueRouter({ routes: [] });
  const wrapper = shallowMount(Currency, { store, localVue, router });

  describe('Testing getCoinValue method', () => {

    it(' - method should return value from localStorage', () => {
      let currencyId = 1;
      wrapper.vm.currencyId = currencyId;
      localStorage.setItem('currentcy_' + currencyId, currencyId);
      let result = wrapper.vm.getCoinValue();
      expect(result).toBe(currencyId);
    });

    it(' - method should return value 0 if localStorage is cleared', () => {
      localStorage.clear();
      let result = wrapper.vm.getCoinValue();
      expect(result).toBe(0);
    });

  });

  describe('Testing getCurrencyDetails method', () => {

    it(' - method should not throw when called - case no args', () => {
      expect(wrapper.vm.getCurrencyDetails).not.toThrow();
    });

    it(' - method should not throw when called - case id', () => {
      expect(wrapper.vm.getCurrencyDetails.bind(wrapper.vm, 1)).not.toThrow();
    });

  });

  describe('Testing getCurrencyDetailsSuccessfully method', () => {

    it(' - method should throw when called - case no args', () => {
      expect(wrapper.vm.getCurrencyDetailsSuccessfully).toThrow();
    });

    it(' - method should throw when called - case arg is empty object', () => {
      expect(wrapper.vm.getCurrencyDetailsSuccessfully.bind(wrapper.vm, {})).toThrow();
    });

    it(' - method should throw when called - case arg is valid response object', () => {
      let response = {
        data: {"status": {"timestamp": "2019-05-25T17:07:02.667Z","error_code": 0,"error_message": null,"elapsed": 4,"credit_count": 1},"data": {"1": {"urls": {"website": ["https://bitcoin.org/"],"twitter": [],"reddit": ["https://reddit.com/r/bitcoin"],"message_board": ["https://bitcointalk.org"],
        "announcement": [],"chat": [],"explorer": ["https://blockchain.coinmarketcap.com/chain/bitcoin","https://blockchain.info/","https://live.blockcypher.com/btc/"],"source_code": ["https://github.com/bitcoin/"]},"logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png","id": 1,"name": "Bitcoin","symbol": "BTC","slug": "bitcoin","description": "Bitcoin (BTC) is a consensus network that enables a new payment system and a completely digital currency. Powered by its users, it is a peer to peer payment network that requires no central authority to operate. On October 31st, 2008, an individual or group of individuals operating under the pseudonym \"Satoshi Nakamoto\" published the Bitcoin Whitepaper and described it as: \"a purely peer-to-peer version of electronic cash, which would allow online payments to be sent directly from one party to another without going through a financial institution.\"","date_added": "2013-04-28T00:00:00.000Z","tags": ["mineable"],"platform": null,"category": "coin"}}}
      };
      expect(wrapper.vm.getCurrencyDetailsSuccessfully.bind(wrapper.vm, response)).not.toThrow();
    });

  });

  describe('Testing parseDate method', () => {

    it(' - method should not throw when called - case no args', () => {
      expect(wrapper.vm.parseDate).not.toThrow();
    });

    it(' - method should not throw when called - case date', () => {
      expect(wrapper.vm.parseDate.bind(wrapper.vm, new Date())).not.toThrow();
    });

  });

});
