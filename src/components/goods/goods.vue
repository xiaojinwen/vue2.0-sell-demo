<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li @click="selectMenu(index,$event)" v-for="(good,index) in goods" :key="good.$index" class="menu-item"
            :class="{'current':currentIndex===index}">
          <span class="text border-1px">
            <span v-show="good.type>0" class="icon" :class="classMap[good.type]"></span>{{good.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="(good,index) in goods" :key="index" class="food-list food-list-hook">
          <h1 class="title">{{good.name}}</h1>
          <ul>
            <li @click="selectFood(food,$event)" v-for="(food,index) in good.foods" :key="index"
                class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now-price">￥{{food.price}}</span><span class="old-price" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="countcontrol-wrapper">
                  <cartcontrol @cartadd="_drop" :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!--<shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice"-->
    <!--:min-price="seller.minPrice"></shopcart>-->
    <food @cartadd="_drop" ref="food" :food="selectedFood"></food>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  // import shopcart from 'components/shopcart/shopcart'
  import cartcontrol from 'components/cartcontrol/cartcontrol'
  import food from 'components/food/food'
  // import Vue from 'vue'

  // const ERR_OK = 0
  export default {
    props: {
      seller: {
        type: Object
      },
      goods: {
        type: Array
      }
    },
    data() {
      return {
        // goods: [],
        listHeight: [],
        foodScrollY: 0,
        selectedFood: {}
      }
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if ((this.foodScrollY >= height1 && this.foodScrollY < height2)) {
            // console.log(i)
            return i
          }
        }
        return 0
      }
      // selectFoods() {
      //   let foods = []
      //   this.goods.forEach((good) => {
      //     good.foods.forEach((food) => {
      //       if (food.count) {
      //         foods.push(food)
      //       }
      //     })
      //   })
      //   return foods
      // }
    },
    watch: {
      'goods'() {
        this.$nextTick(() => {
          this._calculateHeight()
          this._initScroll()
        })
      }
    },
    created() {
      // this.$on('cartadd', this._drop)

      // this.$http.get('/api/goods').then((response) => {
      //   response = response.body
      //   if (response.errno === ERR_OK) {
      //     this.goods = response.data
      // this.$nextTick(() => {
      //   this._calculateHeight()
      //   this._initScroll()
      // })
      // console.log('created')
      //   }
      // })
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },

    methods: {
      selectFood(food, event) {
        this.selectedFood = food
        this.$refs.food.show()
      },
      selectMenu(index, event) {
        // if (event._constructed) {
        //   return
        // }
        // let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        // console.log(foodList)
        // let el = foodList[index]
        // this.foodScroll.scrollToElement(el, 300)

        // 因为自己计算的clientHeight与better滚动到的Y位置有偏差
        this.foodScrollY = this.listHeight[index]
        this.foodScroll.scrollTo(0, -this.foodScrollY, 300)
      },
      _initScroll() {
        if (!this.menuScroll) {
          this.menuScroll = new BScroll(this.$refs.menuWrapper, {
            click: true
          })
        } else {
          this.menuScroll.refresh()
        }

        // this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        //   click: true
        // })
        if (!this.foodScroll) {
          this.foodScroll = new BScroll(this.$refs.foodsWrapper, {
            click: true,
            probeType: 3
          })
        } else {
          this.foodScroll.refresh()
        }

        this.foodScroll.on('scroll', (pos) => {
          this.foodScrollY = Math.abs(pos.y)
          // console.log(this.foodScrollY)
        })
      },
      _calculateHeight() {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let height = 0
        // this.listHeight = []
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      _drop(target) {
        // this.$refs.shopcart.drop_(target)
        this.$emit('cartadd', target)
        // console.log(target)
      }
    },
    components: {
      food,
      // shopcart,
      cartcontrol
    },
    mounted() {
      this.$nextTick(() => {
        this._calculateHeight()
        this._initScroll()
        // console.log('mounted')
      })
    }
    // events: {
    //   'cart.add'(target) {
    //     this._drop(target)
    //   }
    // }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    display flex
    position absolute
    top 186px
    bottom 52px
    left 0
    overflow hidden
    width 100%
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        height 54px
        width 56px
        line-height 14px
        padding 0 12px
        text-align center
        &.current
          position relative
          z-index 10
          font-size 700
          margin-top -1px
          padding-top 2px
          background #fff
          border-none()
        .icon
          display inline-block
          width 12px
          height 12px
          margin-right 2px
          background-size 12px 12px
          background-repeat no-repeat
          vertical-align top
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display table-cell
          line-height 16px
          width 56px
          font-size 12px
          vertical-align middle
          border-1px(rgba(7, 17, 27, 0.1))
    .foods-wrapper
      flex 1
      .title
        display inline-block
        padding-left 14px
        height 26px
        width 100%
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147, 156, 158)
        background #f3f5f7
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          margin-bottom 0
          border-none()
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            margin 0px 0 4px 0
            height 14px
            font-size 14px
            line-height 14px
            color rgb(7, 17, 27)
          .desc, .extra
            line-height 10px
            font-size 10px
            color rgb(147, 156, 158)
          .desc
            margin-bottom 8px
            line-height: 12px;
          .extra
            .count
              margin-right 12px
          .price
            line-height 24px
            .now-price
              font-weight 700
              margin-right 8px
              font-size 14px
              color rgb(240, 20, 20)
            .old-price
              text-decoration line-through
              font-size 10px
              color rgb(147, 153, 159)
          .countcontrol-wrapper
            position absolute
            right 0
            bottom 0
</style>
