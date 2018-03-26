<template>
  <div id='app'>
    <v-header v-bind:seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <!--<a v-link="{ path: '/goods'}">商品</a>-->
        <router-link to='/goods'>商品</router-link>
      </div>
      <div class="tab-item">
        <!--<a v-link="{ path: '/ratings'}">评论</a>-->
        <router-link to='/ratings'>评论</router-link>
      </div>
      <div class="tab-item">
        <!--<a v-link="{ path: '/seller'}">商家</a>-->
        <router-link to='/seller'>评论</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller" :goods="goods" @cartadd="_drop"/>
    </keep-alive>
    <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice"
              :min-price="seller.minPrice"></shopcart>
  </div>
</template>

<script type="text/ecmascript-6">
  import vheader from 'components/header/header'
  import {urlParse} from 'common/js/util'
  import shopcart from 'components/shopcart/shopcart'

  const ERR_OK = 0
  export default {
    data() {
      return {
        goods: [],
        seller: {
          id: (() => {
            let queryParam = urlParse()
            if (queryParam.id) {
              return queryParam.id
            } else {
              return '1000'
            }
          })()
        },
        selectedFood: {}
      }
    },
    computed: {
      selectFoods() {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    methods: {
      _drop(target) {
        this.$refs.shopcart.drop_(target)
        // console.log(target)
      }
    },
    created: function () {
      this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          // this.seller = response.data
          // console.log(this.seller.id)
          this.seller = Object.assign({}, this.seller, response.data)
          // console.log(this.seller.id)
        }
      })

      this.$http.get('/api/goods').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.goods = response.data
        }
      })
    },
    name: 'vheader',
    components: {
      'v-header': vheader,
      shopcart
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
  .tab
    display: flex
    width: 100%
    height: 52px
    line-height: 52px
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)
</style>
