import Vue from 'vue'
import Vuex from 'vuex'
import channels from './modules/channels'
import messages from './modules/messages'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    channels,
    messages
  },
  strict: debug,
  //middlewares: debug ? [createLogger()] : []
})