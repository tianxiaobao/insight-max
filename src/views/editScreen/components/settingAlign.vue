<style scoped>
	.tt {
		text-align: center;
	}
    .brick-wrap{
        padding-top: 15px;
        height: 30px;
    }
    .brick-label{
        float: left;
        width: 90px;
        text-align: center;
        line-height: 30px;
    }
    .bricks{
        background: #FFF;
        border: 1px solid #DCDEE3;
        border-radius: 3px;
        float: left;
    }
    .bricks li{
        float: left;
        border-right: 1px solid #DCDEE3;
        height: 28px;
        width: 30px;
        line-height: 28px;
        cursor: pointer;
        background-size: 100%;
        position: relative;
    }
    .bricks li:hover .align{
        display: block;
    }
    .icon-align-top{
        background-image: url(/static/images/align-top.png);
    }
    .icon-align-middle{
        background-image: url(/static/images/align-middle.png);
    }
    .icon-align-bottom{
        background-image: url(/static/images/align-bottom.png);
    }
    .icon-align-left{
        background-image: url(/static/images/align-left.png);
    }
    .icon-align-center{
        background-image: url(/static/images/align-center.png);
    }
    .icon-align-right{
        background-image: url(/static/images/align-right.png);
        border-right: none !important;
    }
    .icon-arrange-horrible{
        background-image: url(/static/images/arrange-horrible.png);
    }
    .icon-arrange-vertical{
        background-image: url(/static/images/arrange-vertical.png);
    }
    .icon-arrange-middle{
        background-image: url(/static/images/arrange-middle.png);
        border-right: none !important;
    }
    .align{
        position: absolute;
        top: 30px;
        left: -10px;
        width: 38px;
        height: 20px;
        line-height: 20px;
        background: #222;
        color: #fff;
        padding: 5px;
        font-size: 12px;
        border-radius: 3px;
        opacity: 0.9;
        z-index: 1;
        display: none;
    }
    .align:before{
        position: absolute;
        top: -5px;
        width: 0;
        height: 0;
        left: 50%;
        margin-left: -5px;
        content: " ";
        border-bottom: 5px solid  #222 ;
        border-left: 5px solid transparent ;
        border-right: 5px solid transparent ;
    }
    .align-middle,.align-center{
        width: 72px;
        left: -26px;
    }
    .distribute{
        width: 25px;
        left: -3px;
    }
</style>
<template>
	<div class="">
		<div class="mt">
            <span class="fl"><i :class="showRight ? 'big-i3':'big-i4'" @click="$store.commit('SET_SHOW_RIGHT', !showRight)"></i></span>
            <h3 class="tt">排列布局</h3>
        </div>
        <div class="brick-wrap">
            <span class="brick-label">对齐</span>
            <ul class="bricks">
                <li class="icon-align-top" @click="align('top')"><div class="align">顶对齐</div></li>
                <li class="icon-align-middle" @click="align('middle')"><div class="align align-middle">垂直居中对齐</div></li>
                <li class="icon-align-bottom" @click="align('bottom')"><div class="align">底对齐</div></li>
                <li class="icon-align-left" @click="align('left')"><div class="align">左对齐</div></li>
                <li class="icon-align-center" @click="align('center')"><div class="align align-center">水平居中对齐</div></li>
                <li class="icon-align-right" @click="align('right')"><div class="align">右对齐</div></li>
            </ul>
        </div>
        <div class="brick-wrap" v-if="showDistribute">
            <span class="brick-label">分布</span>
            <ul class="bricks">
                <li class="icon-arrange-horrible" @click="distribute('hor')"><div class="align distribute">水平</div></li>
                <li class="icon-arrange-vertical" @click="distribute('ver')"><div class="align distribute">垂直</div></li>
                <li class="icon-arrange-middle" @click="distribute('mid')"><div class="align distribute">平均</div></li>
            </ul>
        </div>
    </div>
</template>
<script>
// import api from '../../../api';
import { mapGetters } from 'vuex';
export default {
    name: 'settingAlign',
    data () {
        return {
            position:{
                top:'',
                bottom:'',
                left:'',
                right:'',
                middle:'',
                center:''
            },
            dis:{
                minhor:'',
                maxhor:'',
                maxHorIndex:'',
                minHorIndex:'',
                minver:'',
                maxver:'',
                maxVerIndex:'',
                minVerIndex:''
            },
            checkedLen:0
        };
    },
    computed: {
        ...mapGetters(['layers', 'activeLayer', 'canvas', 'screenBasicMsg', 'showRight','showDistribute'])
    },
    mounted () {

    },
    watch: {
    },
    methods: {
        // 对齐函数
        align (pos) {
            for(let i = 0;i<this.layers.length;i++) {
                if(this.layers[i].checked) {
                    const x = this.layers[i].x;
                    const y = this.layers[i].y;
                    const height = this.layers[i].height;
                    const width = this.layers[i].width;
                    this.position.top = this.position.top?Math.min(this.position.top,y):y;
                    this.position.left = this.position.left?Math.min(this.position.left,x):x;

                    this.position.bottom = this.position.bottom?Math.max(this.position.bottom,(y+height)):(y+height);
                    this.position.right = this.position.right?Math.max(this.position.right,(x+width)):(x+width);
                    this.position.middle = (this.position.top+this.position.bottom)/2;
                    this.position.center = (this.position.left+this.position.right)/2;
                }
            }
            switch (pos) {
            case 'top' :
                for(let j = 0;j<this.layers.length;j++) {
                    if(this.layers[j].checked) {
                        this.layers[j].y = this.position.top;
                    }
                }
                break;
            case 'left' :
                for(let j = 0;j<this.layers.length;j++) {
                    if(this.layers[j].checked) {
                        this.layers[j].x = this.position.left;
                    }
                }
                break;
            case 'bottom' :
                for(let j = 0;j<this.layers.length;j++) {
                    if(this.layers[j].checked) {
                        this.layers[j].y = this.position.bottom-this.layers[j].height;
                    }
                }
                break;
            case 'right' :
                for(let j = 0;j<this.layers.length;j++) {
                    if(this.layers[j].checked) {
                        this.layers[j].x = this.position.right-this.layers[j].width;
                    }
                }
                break;
            case 'middle' :
                for(let j = 0;j<this.layers.length;j++) {
                    if(this.layers[j].checked) {
                        this.layers[j].y = this.position.middle-this.layers[j].height/2;
                    }
                }
                break;
            case 'center' :
                for(let j = 0;j<this.layers.length;j++) {
                    if(this.layers[j].checked) {
                        this.layers[j].x = this.position.center-this.layers[j].width/2;
                    }
                }
                break;
            }
        },
        // 分布函数
        distribute (pos) {
            this.checkedLen = 0;
            for(let i = 0;i<this.layers.length;i++) {
                if(this.layers[i].checked) {
                    this.checkedLen = this.checkedLen+1;
                    const x = this.layers[i].x;
                    const y = this.layers[i].y;
                    const height = this.layers[i].height;
                    const width = this.layers[i].width;
                    if(!this.dis.minhor||this.dis.minhor>(y+height/2)) {
                        this.dis.minhor = y+height/2;
                        this.dis.minHorIndex = i;
                    }
                    if(!this.dis.maxhor||this.dis.maxhor<(y+height/2)) {
                        this.dis.maxhor = y+height/2;
                        this.dis.maxHorIndex = i;
                    }
                    if(!this.dis.minver||this.dis.minver>(x+width/2)) {
                        this.dis.minver = x+width/2;
                        this.dis.minVerIndex = i;
                    }
                    if(!this.dis.maxver||this.dis.maxver<(x+width/2)) {
                        this.dis.maxver = x+width/2;
                        this.dis.maxVerIndex = i;
                    }
                }
            }
            this.horlen = (this.dis.maxhor-this.dis.minhor)/(this.checkedLen-1);
            this.verlen = (this.dis.maxver-this.dis.minver)/(this.checkedLen-1);
            switch (pos) {
            case 'hor' :
                this.horfun();
                break;
            case 'ver' :
                this.verfun();
                break;
            case 'mid' :
                this.horfun();
                this.verfun();
                break;
            }
        },
        horfun () {
            let horIndex = 1;
            for(let j = 0;j<this.layers.length;j++) {
                if(this.layers[j].checked&&j!=this.dis.minHorIndex&&j!=this.dis.maxHorIndex) {
                    this.layers[j].y = this.dis.minhor+horIndex*this.horlen - this.layers[j].height/2;
                    horIndex = horIndex+1;
                }
            }
        },
        verfun () {
            let verIndex = 1;
            for(let j = 0;j<this.layers.length;j++) {
                if(this.layers[j].checked&&j!=this.dis.minVerIndex&&j!=this.dis.maxVerIndex) {
                    this.layers[j].x = this.dis.minver+verIndex*this.verlen-this.layers[j].width/2;
                    verIndex = verIndex+1;
                }
            }
        }
    }
};
</script>