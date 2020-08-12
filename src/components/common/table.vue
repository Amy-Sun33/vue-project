<template>
  <div id="video-container">
    <div style="position: relative">
      <video :autoplay="autoplay" controls :src="video_url ? video_url:''" :poster="bg_img" id="videoPlay"
             class="video"></video>
      <img class="play-icon" v-on:click="playVideo()" v-show="!this.play"
           :src="require('../../../static/image/icon/3vlog.png')"
           alt="">
    </div>

    <slot id="top-left">
      <back></back>
    </slot>
    <slot id="top-right">
      <back></back>
    </slot>

  </div>
</template>

<script>
  export default {
    name: 'videoCpn',
    template: 'videoCpn',
    data() {
      return {
        play: false,
      }
    },
    props: {
      video_url: {
        type: String,
        default: ''
      },
      bg_img: {
        type: String,
        default: ''
      },
      autoplay: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      back: function () {
        this.$router.go(-1)
      },
      playVideo() {
        var vdo = document.getElementById("videoPlay")
        if (this.play) {
          vdo.pause()
        } else {
          vdo.play()
        }
        this.play = !this.play
      }
    }
  }
</script>

<style>
  #video-container {
    background-size: cover !important;
    background: #000000;
    z-index: 999;
  }

  #video-container video {
    width: 100%;
    object-fit: contain;
    opacity: 0.8;
    height: 232px;
  }
</style>
