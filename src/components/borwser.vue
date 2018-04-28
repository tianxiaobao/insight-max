<style lang="less">
.warn-content {
    font-family: 'Microsoft Yahei';
    position: fixed;
    width: 100%;
    height: 100%;
    text-align: center;
    background-color: #fff;
    z-index: 1000;

    .helpful {
        text-align: center;
        margin: 224px 200px 30px;
        font-size: 20px;
        color: #4a4a4a;

        p {
            margin: 0 0 10px;
        }
        .greenBtn {
            width: 100px;
            height: 32px;
            line-height: 32px;
            font-size: 14px;
            margin-top: 25px;

        }
        .browser-info {
            margin: 40px;
            font-size: 12px;
            color: #757272;
        }
        code {
            font-family: Menlo,Monaco,Consolas,"Courier New",monospace;
        }
        .keep {
            margin-top: 10px;
            a {
                color: #2aafff;
                text-decoration: underline;
            }
        }
    }
}
</style>
<template>
    <div class="warn-content">
        <div class="helpful">
            <p>为了得到我们站最好的体验效果，推荐使用 <a href="https://www.google.com.hk/chrome/browser/desktop/">Chrome</a> 最新版本浏览</p>
            <p>
                <a href="https://www.google.com.hk/chrome/browser/desktop/" target="_blank" class="greenBtn">下载Chrome</a>
            </p>
            <div class="browser-info">
                <p>当前浏览器版本信息</p>
                <code>{{bsInfo}}</code>
                <p class="keep"><a href="#" @click.prevent="startHere">我知道了，继续使用当前浏览器</a></p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            bsInfo: navigator.userAgent,
            from: ''
        };
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.from = from;
        });
    },
    methods: {
        startHere () {
            this.$store.cookies.set('chrome', 1);
            this.$router.replace(this.from.fullPath);
        }
    }
};
</script>