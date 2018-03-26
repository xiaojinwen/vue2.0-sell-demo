<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
        <div class="inner icon-remove_circle_outline">
        </div>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'

  export default {
    name: 'cartcontrol',
    props: {
      food: {
        type: Object
      }
    },
    created() {
      // console.log(this.food)
    },
    methods: {
      addCart() {
        this.$emit('cartadd', event.target)

        if (!this.food.count) {
          // this.food.count = 1
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
        // this.$dispatch('cart.add', event.target)

        // console.log('click' + this.food.count)
      },
      decreaseCart() {
        if (this.food.count > 0) {
          // this.food.count = 1
          this.food.count--
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .cartcontrol
    font-size 0
    .cart-decrease
      vertical-align top
      display inline-block
      .inner
        display inline-block
        padding 6px
        font-size 24px
        line-height 24px
        color rgb(0, 160, 220)
      &.move-enter-active, &.move-leave-active
        opacity: 1
        transition all 0.5s linear
        transform translate3d(0, 0, 0)
        .inner
          transition all 0.4s linear
          transform rotate(0)
      &.move-enter, &.move-leave-to
        opacity: 0
        transform translate3d(24px, 0, 0)
        .inner
          transform rotate(180deg)
    .cart-count
      display inline-block
      /*font-size 12px*/
      /*line-height 36px*/
      color rgb(147, 153, 159)
      text-align center
      padding-top 6px
      width 12px
      font-size 10px
      line-height 24px

    .cart-add
      vertical-align top
      display inline-block
      padding 6px
      font-size 24px
      line-height 24px
      color rgb(0, 160, 220)

</style>
