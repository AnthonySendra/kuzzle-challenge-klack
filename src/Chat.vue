<template>
  <div class="messages">
    <messages
      :message-store="messageStore"
      :messages="messages"
      v-scroll-glue="messageStore.state.messages"
      :deletable="true"
      :current-user-id="userStore.state.id"
    ></messages>

    <input-bar
      :message-store="messageStore"
      :current-user="userStore.state"
      :current-channel="channelStore.state.current"
    ></input-bar>
  </div>

  <div class="search-right">
    <messages
      :message-store="messageStore"
      :messages="searchMessages"
      :deletable="false"
    ></messages>
  </div>
</template>

<script>
import Messages from './components/Messages'
import InputBar from './components/InputBar'
import userStore from './store/user'
import messageStore from './store/messages'
import channelStore from './store/channels'
import scrollGlue from './directive/scrollGlue'

import { loadMessages, resetMessages, setCurrentChannel } from './vuex/actions';
import { getMessages, getSearchedMessages } from './vuex/getters';

export default {
  components: {
    Messages,
    InputBar
  },
  directives: [scrollGlue],
  vuex: {
    actions: {
      loadMessages,
      resetMessages,
      setCurrentChannel
    },
    getters: {
      messages: getMessages,
      searchMessages: getSearchedMessages
    }
  },
  data () {
    return {
      messageStore: messageStore,
      userStore: userStore,
      channelStore: channelStore
    }
  },
  route: {
    data () {
      this.setCurrentChannel(this.$route.params.channel);
      this.resetMessages();
      this.loadMessages(this.$route.params.channel);
      this.messageStore.subscribeMessages(this.$route.params.channel);
    }
  }
}
</script>
