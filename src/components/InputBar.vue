<template>
  <div class="bottom-input">
    <div class="input-box">
      <input
        type="text"
        class="input-box-text"
        placeholder="New message"
        @keyup.enter="addMessage"
        v-model="newMessage"/>
    </div>
  </div>
</template>

<script>

  import { addMessage } from '../vuex/actions';
  import { getCurrentChannel } from '../vuex/getters';

  export default {
    props: ['messageStore', 'currentUser', 'currentChannel'],
    vuex: {
      actions: {
        addMessage
      },
      getters: {
        currentChannel: getCurrentChannel
      }
    },
    data () {
      return {
        newMessage: null
      }
    },
    methods: {
      addMessage () {
        if (this.newMessage.length > 0) {
          this.addMessage(this.newMessage, this.currentUser, this.currentChannel);
          this.newMessage = '';
        }
      }
    }
  }
</script>
