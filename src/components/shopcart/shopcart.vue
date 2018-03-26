<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight':totalCount>0}">￥{{totalPrice}}元</div>
          <div class="desc">另需配送费{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click.stop.prevent="pay">
          <div class="pay" :class="payClass">{{payDesc}}</div>
        </div>
      </div>
      <div class="ball-container">
        <transition-group v-on:before-enter="beforeEnter" v-on:enter="enter"
                          v-on:after-enter="afterEnter" v-on:enter-cancelled="enterCancelled" tag="ul" name="drop">
          <div v-for="(ball,index) in balls" v-show="ball.show" :key="index" class="ball">
            <div class="inner inner-hook"></div>
          </div>
        </transition-group>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty(selectFoods)">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="(food,index) in selectFoods" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="toggleList"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import cartcontrol from 'components/cartcontrol/cartcontrol'
  import BScroll from 'better-scroll'

  export default {
    name: 'shopcart',
    props: {
      selectFoods: {
        type: Array,
        default() {
          return []
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        balls: [{
          show: false, el: ''
        }, {
          show: false, el: ''
        }, {
          show: false, el: ''
        }, {
          show: false, el: ''
        }],
        fold: true
      }
    },
    computed: {
      totalPrice() {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount() {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差￥${diff}元结算`
        } else {
          return '去结算'
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      },
      listShow() {
        if (!this.totalCount) {
          // this.fold = true
          return false
        }
        let show = !this.fold
        return show
      }
    },
    watch: {
      'listShow'() {
        if (!this.totalCount) {
          this.fold = true
          // console.log('---fold')
        }
        // console.log('fold')
      }
    },
    methods: {
      pay() {
        if (this.totalPrice < this.minPrice) {
          return
        }
        window.alert(`需要支付${this.totalPrice}`)
      },
      empty(_selectFoods) {
        _selectFoods.forEach((food) => {
          food.count = 0
        })
        // console.log('empty')
      },
      toggleList() {
        if (!this.totalCount) {
          return
        }
        // let show = !this.fold
        // if (show) {
        // this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.listContent, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
        // })
        // }
        this.fold = !this.fold
        return this.fold
      },
      drop_(el) {
        // console.log(el)
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            return
          }
        }
      },
      beforeEnter(el) {
        // console.log('beforeEnter')
        let count = this.balls.length
        while (count--) {
          // let timer = setInterval(() => {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            // console.log(rect)
            let x = rect.left - 32
            let y = -(window.innerHeight - rect.top - 22)
            el.style.display = 'block'
            el.style.webkitTransform = `translate3d(0,${y}px,0)`
            el.style.transform = `translate3d(0,${y}px,0)`
            // console.log(el)
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      enter(el, done) {
        // console.log('enter')
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
        })
        /* */
        let timer = setInterval(() => {
          // if(opacity >= 1) {
          //   done()
          //   clearInterval(timer)
          // }
          for (let i = 0; i < this.balls.length; i++) {
            let ball = this.balls[i]
            if (ball.show) {
              ball.show = false
              ball.el = ''
            }
          }
          // setTimeout(function () {
            el.style.display = 'none'
            clearInterval(timer)
          // }, 500)
          // console.log('setInterval')
        }, 500)
      },
      afterEnter(el) {
      },
      enterCancelled(el) {
        // console.log('enterCancelled')
        // let ball = this.dropBalls.shift()
        // if (ball) {
        //   ball.show = false
        //   console.log('123')
        // }
        // el.style.display = 'none'
        // for (let i = 0; i < this.dropBalls.length; i++) {
        //   this.balls[i].show = false
        //   el.style.display = 'none'
        // }
        //
        // for (let i = 0; i < this.balls.length; i++) {
        //   this.balls[i].show = false
        // }
      }
    },
    components: {cartcontrol}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .shopcart
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 52px
    .content
      display flex
      background #141d27
      height 100%
      font-size 0
      color rgba(255, 255, 255, 0.4)
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          vertical-align top
          border-radius 50%
          background #141d27
          /*z-index 52*/
          .logo
            width 100%
            height 100%
            text-align center
            background #2b343c
            border-radius 50%
            &.highlight
              background rgb(0, 160, 220)
            .icon-shopping_cart
              font-size 24px
              line-height 44px
              color #80858a
              &.highlight
                color #fff
          .num
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color: #fff
            background rgb(240, 20, 20)
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display inline-block
          font-size 16px
          font-weight 700
          margin-top 12px
          padding-right 12px
          box-sizing border-box
          vertical-align top
          line-height 24px
          border-right 1px solid rgba(255, 255, 255, 0.1)
          &.highlight
            color #fff
        .desc
          display inline-block
          vertical-align top
          margin 12px 0 0 12px
          font-size 10px
          line-height 24px
      .content-right
        flex 0 0 105px
        width 105px
        /*background red*/
        .pay
          height 52px
          line-height 52px
          text-align center
          font-size 14px
          font-weight 700
          &.not-enough
            background #2b333b
          &.enough
            background #00b43c
            color #fff
    .ball-container
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 200
        &.drop-enter-active
          /*opacity: 0*/
          transition all 0.5s cubic-bezier(0.49, -0.29, 0.75, 0.41)
          .inner
            width 16px
            height 16px
            border-radius 50%
            background rgb(0, 160, 220)
            display inline-block
            transition all 0.5s linear

    .shopcart-list
      position fixed
      bottom 52px
      left 0
      z-index -1
      width 100%
      &.fold-enter-active, &.fold-leave-active
        transition all 0.5s
      // transform translate3d(0, 0, 0)
      &.fold-enter, &.fold-leave-to
        bottom -100%
      // transform translate3d(0, -100%, 0)

      .list-header
        height 40px
        line-height 40px
        padding 0 18px
        background #f3f5f7
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
        .title
          float left
          font-size 14px
          color rgb(7, 17, 27)
        .empty
          float right
          font-size 12px
          color rgb(0, 160, 220)

      .list-content
        padding 0 18px
        max-height 217px
        overflow hidden
        background #fff
        .food
          position relative
          padding 12px 0
          box-sizing border-box
          border-1px(rgba(7, 17, 27, 0.1))
        .name
          line-height 24px
          font-size 14px
          color rgb(7, 17, 27)
        .price
          position absolute
          right 90px
          bottom 12px
          line-height 24px
          font-size 14px
          font-weight 700
          color rgb(240, 20, 20)
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom 6px

  .list-mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background rgba(7, 17, 27, 0.7)
    z-index 40
    &.fade-enter-active, &.fade-leave-active
      opacity: 1
      background rgba(7, 17, 27, 0.7)
      transition all 0.5s linear
    &.fade-enter, &.fade-leave-to
      opacity: 0
      background rgba(7, 17, 27, 0)

</style>
