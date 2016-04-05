<template>
  <div class="header">
    <div class="team-menu">
      <span class="status" :class="{'connected' : isConnected}">o</span> &nbsp; <span>Klack</span>
      <a v-link="{ path: '/login' }" class="logout" @click="logout">Logout</a>
    </div>
    <div class="channel-menu">

      <channel-name :name="currentChannel"></channel-name>

      <div id="header-search-form" class="search-form no-bottom-margin">
        <div class="highlighter-wrapper">

          <input
            type="text"
            id="search-terms"
            class="search-input search-input-highlighted"
            placeholder="Search"
            maxlength="250"
            @keyup="triggerSearch()"
            @input="updateSearchTerms"
            :value="searchTerms"
          />

          <div class="highlighter-underlay"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ChannelName from './ChannelName';
  import kuzzle from '../services/kuzzle';

  import { searchMessages, resetSearchMessages, updateSearchTerms } from '../vuex/actions';
  import { getSearchTerms } from '../vuex/getters';

  export default {
    props:['currentChannel', 'authStore', 'messageStore'],
    components: {
      ChannelName
    },
    vuex: {
      actions: {
        searchMessages,
        resetSearchMessages,
        updateSearchTerms
      },
      getters: {
        searchTerms: getSearchTerms
      }
    },
    data () {
      return {
        isConnected: false
      }
    },
    methods: {
      triggerSearch () {
        if (this.searchTerms.length > 0) {
          this.searchMessages(this.currentChannel, this.searchTerms);
        }
        else {
          this.resetSearchMessages();
        }
      },
      logout () {
        this.authStore.logout();
      }
    },
    created () {
      if (!kuzzle.addListener) {
        return false;
      }

      if (kuzzle.state === 'connected') {
        this.isConnected = true;
      }

      kuzzle.addListener('connected', () => {
        this.isConnected = true;
    });

      kuzzle.addListener('reconnected', () => {
        this.isConnected = true;
      });

      kuzzle.addListener('disconnected', () => {
        this.isConnected = false;
      });
    }
  }
</script>
