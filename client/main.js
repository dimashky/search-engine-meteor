import Vue from 'vue'

import '../imports/ui/plugins'

import App from '../imports/ui/App.vue'

import "./assets/css/main.css"

Meteor.startup(() => {
  new Vue({
    el: '#app',
    ...App,
  })
})
