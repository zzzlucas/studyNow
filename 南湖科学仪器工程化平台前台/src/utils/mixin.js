//混入通用设置
//翻页相关 
import { getAction } from "@/api/manage";
// import { mapActions } from 'vuex'
//@zzzlucas
const mixin = {
  data() {
    return {
      // DEFAULT_IMG: process.env.BASE_URL + 'images/default_img.jpg',
      // BASR_IMG_URL: 'http://yq.demozj.com:8080/jeecg-boot/sys/common/view/',
      // pageNo: 1,
      // pageSize: 5,
      // pageTotal: 10,
      // spinShow: false,
      // newsListHot: [],
      // policyListHot: [],
      // dev: false,  //dev为true时，作为便于开发测试的状态，影响部分表单按钮的v-if
      url: {
        ptUrl: "/platform/platformBody.controller/queryTitles",   //平台主页臭皮匠分类查询
        caseCategoryUrl: "/platform/platformProduct/controller/queryCategorys",
        newsCategoryUrl: "/platform/platformNews/controller/queryCategorys",
        content: '/platform/platformBody.controller/queryContent'   //平台主页臭皮匠内容查询
      },
      menu: {
        pt1: [],
        pt2: [],
        pt3: [],
        pt4: [],
        case: [],
        news: []
      },
      info: {},
      breadTitle: '',
      index: 0
    }
  },
  computed: {
  },
  created() {
    this.getCpt1();
    this.getCpt2();
    this.getCpt3();
    this.getCpt4();
    this.getNewsCategoryUrl()
    this.getCaseCategoryUrl()
  },
  methods: {
    getCaseCategoryUrl() {
      getAction(this.url.caseCategoryUrl).then(res => {
        this.menu.case = res.result;
      });
    },
    getNewsCategoryUrl() {
      getAction(this.url.newsCategoryUrl).then(res => {
        this.menu.news = res.result;
      });
    },
    //-----------------------------------复用 * 4 页面菜单获取及跳转逻辑---------------------------------------
    //1获取菜单列
    getCpt1() {
      getAction(this.url.ptUrl, { title: "平台简介" }).then(res => {
        this.menu.pt1 = res.result;
        this.getInfo1()
      });
    },
    //1获取菜单列项的值来跳转
    goRouter1(i) {
      console.log('跳转路由');
      console.log(i);
      // params无法在本组件内切换，这个问题在园区时候遇到过一次，改query，但是query会暴露中文字符，所以用数组里的序号吧
      this.$router.push({ path: "/about", query: { type: 1, id: i } });
      this.getInfo1()
    },
    //1获取内容
    getInfo1() {
      console.log('获取数据');
      if (this.$route.query.type == 1) {
        this.index = this.$route.query.id
        if (this.$route.query.id > -1) {
          getAction(this.url.content, { title: '平台简介', contentTitle: this.menu.pt1[this.index].contentTitle }).then(res => {
            this.info = res.result
            this.breadTitle = '平台简介'
            //这个操作是否有必要放到vuex里   //但是放过去就要把data里数据基本也放那
            //本质问题就是:about页面内直接赋值 比 异步获取 早 ， 然而这个操作对于它而言这样就是完成了
            // this.$store.commit("SET_INFO", res.result);
            // this.info = this.$store.state.info
          })
        }
      }
    },

    //2获取菜单列
    getCpt2() {
      getAction(this.url.ptUrl, { title: "平台功能" }).then(res => {
        this.menu.pt2 = res.result;
        this.getInfo2()
      });
    },
    goRouter2(i) {
      console.log('跳转路由');
      console.log(i);
      this.$router.push({ path: "/about", query: { type: 2, id: i } });
      this.getInfo2()
    },
    getInfo2() {
      console.log('获取数据');
      if (this.$route.query.type == 2) {
        this.index = this.$route.query.id
        if (this.$route.query.id > -1) {
          getAction(this.url.content, { title: '平台功能', contentTitle: this.menu.pt2[this.index].contentTitle }).then(res => {
            this.info = res.result
            this.breadTitle = '平台功能'
          })
        }
      }
    },

    //3获取菜单列
    getCpt3() {
      getAction(this.url.ptUrl, { title: "条件优势" }).then(res => {
        this.menu.pt3 = res.result;
        this.getInfo3()
      });
    },
    goRouter3(i) {
      console.log('跳转路由');
      console.log(i);
      this.$router.push({ path: "/about", query: { type: 3, id: i } });
      this.getInfo3()
    },
    getInfo3() {
      console.log('获取数据');
      if (this.$route.query.type == 3) {
        this.index = this.$route.query.id
        if (this.$route.query.id > -1) {
          getAction(this.url.content, { title: '条件优势', contentTitle: this.menu.pt3[this.index].contentTitle }).then(res => {
            this.info = res.result
            this.breadTitle = '条件优势'
          })
        }
      }
    },

    //4获取菜单列
    getCpt4() {
      getAction(this.url.ptUrl, { title: "关于我们" }).then(res => {
        this.menu.pt4 = res.result;
        this.getInfo4()
      });
    },
    goRouter4(i) {
      console.log('跳转路由');
      console.log(i);
      this.$router.push({ path: "/about", query: { type: 4, id: i } });
      this.getInfo4()
    },
    getInfo4() {
      console.log('获取数据');
      if (this.$route.query.type == 4) {
        this.index = this.$route.query.id
        if (this.$route.query.id > -1) {
          getAction(this.url.content, { title: '关于我们', contentTitle: this.menu.pt4[this.index].contentTitle }).then(res => {
            this.info = res.result
            this.breadTitle = '关于我们'
          })
        }
      }
    },
    //--------------------------------------------------------------------------
  },
}


export {
  mixin
}