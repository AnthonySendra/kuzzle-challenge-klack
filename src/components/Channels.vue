<template>
  <div class="listings">
    <div class="listings-channels">
      <div class="channels-headline">
        <span id="new-channel-btn" class="channels-list-new-btn" data-toggle="tooltip" title="" data-original-title="Create new channel" @click="toggleAddChannel">+</span>
        <h2 class="listings-header">Channels</h2>
      </div>

        <input
          class="input-box-text new-channel-name"
          type="text"
          placeholder="New channel"
          @keyup.enter="addChannel"
          v-model="newChannel"
          v-if="showAddChannel"
          transition="expand"
        />

      <ul class="channel-list">
        <channel
          v-for="channel in channels"
          track-by="$index"
          :name="channel"
          :current="state.current"
          >
        </channel>
      </ul>

    </div>
    <div class="listings-direct-messages"></div>
    <p class="disclaimer">This demo is not created by, affiliated with, or supported by Slack Technologies, Inc.</p>
  </div>
</template>

<script>
  import Channel from './Channel';
  import { loadChannels } from '../vuex/actions';
  import { getChannels } from '../vuex/getters';

  export default {
    props: ['channelStore'],
    components: {
      Channel
    },
    vuex: {
      actions: {
        loadChannels
      },
      getters: {
        channels: getChannels
      }
    },
    data () {
      return {
        state: this.channelStore.state,
        newChannel: null,
        showAddChannel: false
      }
    },
    created () {
      this.loadChannels()
    },
    methods: {
      toggleAddChannel () {
        this.showAddChannel = !this.showAddChannel;
      },
      addChannel () {
        if (this.newChannel.length > 0) {
          this.channelStore.addChannel(this.newChannel);
          this.newChannel = '';
        }
      }
    }
//    events: {
//      'select-channel': function (channel) {
//        messageStore.resetMessages();
//        channelStore.setCurrent(channel);
//        messageStore.loadMessages(channel);
//        messageStore.subscribeMessages(channel);
//      }
//    }
  }
</script>
