## 注意事项：mode属性是从服务端获取图片回填的时候使用的，如果该数组长度大于0，则优先显示该数组的图片到控件上，否则显示临时路径。
## 上传的时候如果控件上显示的图片不是临时路径，而是服务返回的图片，则无论是上传图片还是删除图片，触发完成后都需要更新一下mode的值，组件内部已做了更新监听

本组件是对uni-app上传组件进行封装，上传控件支持在内部和外部（支持在父组件中调用上传方法），上传图片支持一行3个和4个，支持上传的图片预览，运用非常灵活。
当前是第一版：后面有时间继续完善更多的功能，尽请期待。
大家觉得不够完善，欢迎提出，写插件不易，好用的话请5星好评，打赏一杯奶茶也可以。
本组件目前兼容小程序、H5、APP。

### 有问题请加群询问，第一时间解决问题，邮件不经常看。
### QQ交流群(学习干货多多) 811956471

### 或者在页面script中引入组件，并注册组件
```
  import gUpload from "@/components/g-upload/g-upload.vue"
export default {
   gUpload
}
```

### 下面是一个完整示例
```
<template>
  <view class="content">
    <g-upload ref='gUpload' :mode="imgList" @chooseFile='chooseFile' @imgDelete='imgDelete' :control='control' :columnNum="columnNum"></g-upload>
    <view class="imglistItem" @click="uploadImg" v-if="!control">
      <view class="uploadControl">外部控件</view>
    </view>
    <view>
      <view>
        <label>上传控件内部外部切换：</label>
        <switch @change="switch1Change"></switch>
        <label>{{control?'内部':'外部控件'}}</label>
      </view>
      <view>
        <label>图片行个数：</label>
        <switch @change="switch2Change"></switch>
        <label>{{columnNum}}</label>
      </view>
    </view>

  </view>
</template>

<script>
  import gUpload from "@/components/g-upload/g-upload.vue"
  export default {
    components: {
      gUpload
    },
    data() {
      return {
        title: 'Hello',
        control: true,
        columnNum: 4,
        imgList: []
        // imgList: ['/static/logo.png']
      }
    },
    onLoad() {
      /*
      mode：
      需要回填的图片数组，
      上传的时候渲染临时路径，二次进入时可以选择渲染服务返回的图片，
      此时删除图片完成后需要及时更新mode（imgList）的值
      */
    },
    methods: {
      //点击上传控件上传
      uploadImg() {
        this.$refs.gUpload.uploadImg()
      },


      /*
      上传后返回的值：
      list：上传后图片数组
      v：返回当前上传图片的临时路径
      */
      chooseFile(list, v) {
        console.log("上传图片_list：", list)
        console.log("上传图片_v：", v);
        this.uploadFileToServe(v)
      },


      /*
      删除图片：
      list：删除返回删除后剩余的图片数组
      eq：返回删除的数组
      */
      imgDelete(list, eq) {
        console.log("删除图片_list：", list)
        console.log("删除图片_eq：", eq)
      },


      //控件内外部切换
      switch1Change(e) {
        this.control = !this.control
      },


      //图片行个数切换
      switch2Change(e) {
        this.columnNum = this.columnNum == 3 ? '4' : '3'
      },

      /*
      执行上传服务：
      urlList：要上传的图片：数组类型
      */
      uploadFileToServe(urlList) {
        if (!urlList || urlList.length <= 0) {
          return
        };
        for (let i = 0; i < urlList.length; i++) {
          uni.uploadFile({
            url: 'https://www.example.com/upload', //仅为示例，非真实的接口地址
            filePath: urlList[i],
            name: 'file',
            formData: {
              'user': 'test'
            },
            success: (uploadFileRes) => {
              console.log(uploadFileRes.data);
            }
          });
        }
      }
    }
  }
</script>

<style scoped>
  .content {
    padding: 40rpx;
  }

  /* 上传控件 */
  .uploadControl {
    border: 1rpx solid #eee;
    border-radius: 10rpx;
    width: 130rpx;
    display: block;
    height: 130rpx;
    text-align: center;
    line-height: 130rpx;
    font-size: 30rpx;
    color: #888;
    background-color: #EEEEEE;
  }
</style>



```



### 属性介绍
| 名称                         | 类型            | 默认值                        | 描述                                               |
| ----------------------------|---------------  | -------
| control                     |Boolean          | true                          |是否显示上传控件|
| deleteBtn                   |Boolean          | true                          |是否显示删除按钮|
| columnNum                   |Number, String   |4                              | 行数量，可选值：3、4|
| mode                        |Array            | []                            |服务返回回调的图片数组---图片回填 时候使用|
| maxCount                    |Number           |4                              | 上传最大数量|

### 事件介绍
| 名称               | 说明            
| -----------------  |------------------
| chooseFile         | 选择图片后返回的值：第一个值是当前已选择图片临时路径路径集合，第二个参数是当前图片的临时路径
| imgDelete         | 删除图片后返回的值：第一个值是当前剩余图片临时路径路径集合，第二个参数是所图片删除的图片下标



