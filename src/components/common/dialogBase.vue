<template>
  <div class="dialog-pop" v-bind:data-level="levelNum" v-bind:style="'z-index:'+zIndex" v-bind:ref="'dialog-'+levelNum">
    <div class="dialog-pop-bg"></div>
    <div v-bind:class="'dialog-pop-panel '+umMoveClass" v-bind:style="'width:'+initWidth+';height:'+initHeight+';top:'+top+'px;left:'+left+'px;min-height:'+minHeight+';min-width:'+minWidth+';'">
      <div class="dialog-pop-panelmain">
        <div class="dialog-pop-top">
          <span class="dialog-pop-title">{{title}}</span>
          <button class="dialog-pop-close" type="button" v-on:click.stop="closedialog"></button>
          <button class="dialog-pop-full" type="button" v-on:click.stop="fullScreenCallback" v-if="fullScreen"></button>
          <div v-drag="greet" v-bind:style="'height: 100%;position: absolute;top:0;left: 0;right:'+(fullScreen?'60':'30')+'px;'"></div>
        </div>
        <div class="dialog-pop-body">
          <dialog-message v-if="dialogType=='0'" v-bind:options="options" v-bind:message="message"></dialog-message>
          <dialog-confirm v-if="dialogType=='1'" v-bind:options="options" v-bind:message="message"></dialog-confirm>
          <component :is="message" v-if="dialogType=='2'"></component>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import '../../css/utils/popupWindow.css'
  import '../../css/utils/botton.css'
  import message from '../../vue/component/dialog-message.vue';
  import confirm from '../../vue/component/dialog-confirms.vue';
  Vue.directive('drag', //弹出框拖动指令
    {
      bind: function(el, binding) {
        let oDiv = el; //当前元素
        let self = this; //上下文
        oDiv.onmousedown = function(e) {
          let parent = e.target.parentNode.parentNode.parentNode;
          //鼠标按下，计算当前元素距离可视区的距离
          let disX = e.clientX - parent.offsetLeft;
          let disY = e.clientY - parent.offsetTop;
          document.onmousemove = function(e) {
            //通过事件委托，计算移动的距离
            let l = e.clientX - disX;
            let t = e.clientY - disY;
            //将此时的位置传出去
            binding.value({
              x: l,
              y: t
            })
          };
          document.onmouseup = function(e) {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
      }
    }
  );
  export default {
    name: 'dialog-base',
    data() {
      return {
        dialogType: "0", //弹出框类型：0：消息弹出，1：确认弹出，2：:自定义弹出
        options: {}, //各种类型弹出框特有参数
        initHeight: "", //初始化高度
        initWidth: "400px", //初始化宽度
        minHeight: "", //最小高度
        minWidth: "", //最小宽度
        levelNum: 0, //层级
        top: 0, //位置;x
        left: 0, //位置：y
        title: '提示', //弹出框标题
        message: null, //弹出框内容
        fullScreen: false, //是否全屏
        zIndex: -1, //显示层级
        oldPosition: {}, //存储初始位置
        umMoveClass: ''
      }
    },
    components: {
      "dialog-message": message,
      "dialog-confirm": confirm,
    },
    mounted() {
      this.fullScreen = this.options && this.options.fullScreen ? true : false;
      this.minHeight = this.options && this.options.minHeight ? this.options.minHeight : "";
      this.minWidth = this.options && this.options.minWidth ? this.options.minWidth : "";
      //DOM渲染完成
      this.$nextTick(function() {
        this.windowResize();
      });
      window.onresize = (function resize() {
        this.windowResize();
      }).bind(this);
    },
    methods: {
      greet(val) {
        let x = val.x;
        let y = val.y;
        if (x < 0) x = 0;
        if (y < 0) y = 0;
        this.left = x;
        this.top = y;
      },
      closedialog(e) {
        if (this.options && typeof this.options.closeCallback == "function") {
          this.options.closeCallback();
        }
        let pop = this.$refs['dialog-' + this.levelNum];
        if (pop) {
          document.querySelector('body').removeChild(pop);
        }

      },
      //窗口改变时间
      windowResize() {
        if (this.umMoveClass) { //如果为最大化窗口，窗口样式不需改变，仅调用改变窗口的回调函数
          if (this.options && typeof this.options.fullScreenCallback == "function") {
            this.options.fullScreenCallback();
          }
          return;
        }
        let winWidth = document.documentElement.clientWidth;
        let winHeight = document.documentElement.clientHeight;
        let width = this.$refs['dialog-' + this.levelNum].getElementsByClassName("dialog-pop-panel")[0].offsetWidth;
        let height = this.$refs['dialog-' + this.levelNum].getElementsByClassName("dialog-pop-panel")[0].offsetHeight;
        this.top = Math.max(20, (winHeight - height) / 2 - 10);
        this.left = (winWidth - width) / 2;
        if (this.top < 0) this.top = 0;
        if (this.left < 0) this.left = 0;
        this.zIndex = 1000 + this.levelNum * 100;
        this.oldPosition = {
          oldHeigth: this.initHeight,
          oldWidth: this.initWidth, //初始化宽度
          oldtop: this.top, //位置;x
          oldleft: this.left, //位置：y
        }
      },
      //全屏或者恢复弹窗大小是的回调
      fullScreenCallback() {
        if (this.options && typeof this.options.fullScreenCallback == "function") {
          this.options.fullScreenCallback();
        }
        if (this.umMoveClass) { //已经是最大化窗口，点击后需要恢复正常大小
          this.umMoveClass = '';
          this.top = this.oldPosition.oldtop;
          this.left = this.oldPosition.oldleft;
          this.initWidth = this.oldPosition.oldWidth;
          this.initHeight = this.oldPosition.oldHeigth;
        } else {
          this.umMoveClass = 'dialog-pop-ummove';
          this.top = 0;
          this.left = 0;
          this.initWidth = "100%";
          this.initHeight = "100%";
        }

      }
    }
  }
</script>
