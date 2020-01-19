//混入通用设置
//翻页相关 
import { getAction, putAction, postAction } from "@/api/manage";
import moment from "moment";
import { filterDictText } from "@/api/dict";
import { mapGetters } from 'vuex'
// import defaultImg from '@assets/images/default_img.jpg'

//@zzzlucas
const mixinPage = {
  data() {
    return {
      //后台没有添加封面图的话，均显示该图片
      // DEFAULT_IMG: defaultImg,
      DEFAULT_IMG: process.env.BASE_URL + 'images/default_img.jpg',

      // BASR_IMG_URL: window._CONFIG['imgDomainURL'],
      BASR_IMG_URL: 'http://yq.demozj.com:8080/jeecg-boot/sys/common/view/',
      // BASR_IMG_URL: 'http://localhost:3001/jeecg-boot/sys/common/view/',

      // 拿地、租赁、技改三表单提交都会带上projectId，但是无所谓，post方法不会接收这个projectId的
      projectIdTESTLANG: '1204345933098123264',
      projectIdTESRENTAL: '1206443867113521152',
      projectIdTESTECH: '1206502754697084928',
      pageNo: 1,
      pageSize: 10,
      pageTotal: 10,
      spinShow: false,
      newsListHot: [],
      policyListHot: [],
      dev: false   //dev为true时，作为便于开发测试的状态，影响部分表单按钮的v-if
    }
  },
  computed: {
    ...mapGetters(['parkId', 'custId'])
  },
  created() {
    //
    console.log('当前所在园区id：' + this.parkId);
    console.log('当前所在企业id：' + this.custId);
  },
  methods: {
    filterDictText,
    moment,
    //具体请求在对应页面内
    //表格内容
    pageCurrentFun(i) {
      this.pageNo = i;
      this.loadData();
    },
    pageSizeFun(i) {
      this.pageSize = i;
      this.loadData();
    },
    //热门资讯列表获取
    getDataHot() {
      return new Promise((resolve, reject) => {
        let { isPublic, pageNo, pageSize, parkId } = this;
        getAction("/park.service/mgrNewsInfo/list", {
          isPublic,
          pageNo: 1,
          pageSize: 5,
          parkId,
          type: '4'
        })
          .then(res => {
            // console.log(this.$route.params.id);
            if (res.code === 200 && res.success) {
              resolve(res.result);
            } else {
              reject(res.message);
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    loadDataHot() {
      this.getDataHot().then(data => {
        //根据富文本内容获取摘要
        for (const item of data.records) {
          if (item.publishTime) {
            item.publishTime = moment(item.publishTime).format("MM-DD HH:mm");
          }
          //在富文本内容很大的情况下，性能应该会很低下
          if (item.context) {
            item.text = item.context;
            item.text = item.text.replace(/<\/?.+?>/g, "");
            item.text = item.text.replace(/&nbsp;/g, "");
            item.text = item.text.slice(0, 180) + "......";
            item.text = item.text.trim();
          }
        }
        this.newsListHot = data.records;
      });
    },
    //重要政策列表获取
    getDataHotPolicy() {
      return new Promise((resolve, reject) => {
        let { isPublic, pageNo, pageSize, parkId } = this;
        getAction("/park.service/mgrPolicyInfo/list", {
          isPublic,
          pageNo: 1,
          pageSize: 5,
          parkId
        })
          .then(res => {
            // console.log(this.$route.params.id);
            if (res.code === 200 && res.success) {
              resolve(res.result);
            } else {
              reject(res.message);
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    loadDataHotPolicy() {
      this.getDataHotPolicy().then(data => {
        //根据富文本内容获取摘要
        for (const item of data.records) {
          if (item.publishTime) {
            item.publishTime = moment(item.publishTime).format("MM-DD HH:mm");
          }
          //在富文本内容很大的情况下，性能应该会很低下
          if (item.context) {
            item.text = item.context;
            item.text = item.text.replace(/<\/?.+?>/g, "");
            item.text = item.text.replace(/&nbsp;/g, "");
            item.text = item.text.slice(0, 180) + "......";
            item.text = item.text.trim();
          }
        }
        this.policyListHot = data.records;
      });
    }
  }
}


export {
  mixinPage
}