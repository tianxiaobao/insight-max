<style lang="less">
    .big-subitem-list li {
        width: 40%;
        .inputMode {
            padding-right: 0;
            width: 75px;
        }
    }
    .big-listItem {
        padding-bottom: 20px;
        li {
            padding-top: 0;
        }
    }

	.tt {
		text-align: center;
	}

	.cover,
	.cover img {
        margin: 0 auto;
		width: 200px;
		height: 125px;
	}
    .cover {
        background-color: #333;
        margin-top: 20px;
    }
	.btn-box {
		text-align: center;
		margin: 20px 0px 0 0;
	}
    .big-rule-box {
        .tit, .scales, .min-input {
            margin-left: 20px;
        }
        .con {
            padding-left: 20px;
        }
    }
    .reset-bg {
        display: block;
        text-align: center;
    }
    .bg-uploader {
        width: 200px;
        height: 100px;
        text-align: center;
        border: 1px dashed #C4C6CF;

        .el-upload {
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }

        .el-upload--text {
            width: 100%;
            height: 100%;
            margin: 0 auto;
            text-align: center;
        }

        .bg, .bg-uploader-icon {
            width: 45px;
            height: 45px;
            margin: 0 auto;
            margin-top: 17px;
            background-color: #333;
        }
        .bg-upload__text {
            color: #999;
        }
    }

</style>
<template>
	<div class="setting">
		<div class="mt">
            <span class="fl"><i :class="showRight ? 'big-i3':'big-i4'" @click="$store.commit('SET_SHOW_RIGHT', !showRight)"></i></span>
            <h3 class="tt">画布设置</h3>
        </div>
        <div class="big-buildCon">
                <div class="big-nav">
                    <dl class="fore">
                        <dt><h3>画布大小</h3></dt>
                        <dd>
                            <div class="big-rule-box">
                                <ul class="big-listItem big-subitem-list">
                                    <li>
                                        <p class="tit">宽</p>
                                        <div class="con">
                                            <input type="number" class="inputMode" v-model="canvas.width">
                                        </div>
                                    </li>
                                    <li>
                                        <p class="tit">高</p>
                                        <div class="con">
                                            <input type="number" class="inputMode" v-model="canvas.height">
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </dd>
                    </dl>
                    <dl class="style-item">
                        <dt><h3>背景图</h3></dt>
                        <dd>
                            <div class="gui-field-component">
                                <el-upload v-loading="uploadLoading"
                                  class="bg-uploader"
                                  action="/bigScreen/updateBgPic"
                                  :show-file-list="false"
                                  :data="{id: screenBasicMsg.id}"
                                  :on-success="handleBgSuccess"
                                  :on-error="handleBgError"
                                  :before-upload="beforeBgUpload">
                                    <img v-if="canvas.bgUrl" :src="canvas.bgUrl" class="bg">
                                    <div v-else class="bg-uploader-icon"></div>
                                    <div class="bg-upload__text">点击上传图片</div>
                                </el-upload>
                            </div>

                            <a href="" class="reset-bg" @click.prevent="resetBg">还原默认</a>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                        	<h3>缩放方式</h3>
                        </dt>
                        <dd>
                            <div class="big-rule-box m-setting">
                                <div class="item clearfloat">
                                    <div class="scales" v-for="(item, index) of scales">
                                        <label @click="selectScale(item, index)"><i class="radio mr5" :class="{'radio-check': scaleIndex === index}"></i>{{item.name}}</label>
                                    </div>
                                </div>
                            </div>
                        </dd>
                    </dl>

                    <dl>
                        <dt>
                            <h3>移动间距</h3>
                        </dt>
                        <dd>
                            <div class="big-rule-box m-setting">
                                <div class="item clearfloat">
                                    <input type="number" min="1" class="min-input" v-model="canvas.snap" @blur="updateSnap"> PX
                                </div>
                            </div>
                        </dd>
                    </dl>

                    <dl>
                        <dt>
                        	<h3>项目封面</h3>
                        </dt>
                        <dd>
                            <div class="cover" id="cover" v-loading="shotLoading">
                            	<img v-lazy="cutImgUrl" v-if="cutImgUrl">
                            </div>
                            <p class="btn-box">
                            	<a href="#" class="greenBtn" :class="{'grayBtn': shotLoading}" @click.prevent="coverShot">截取封面</a>
                            </p>
                        </dd>
                    </dl>

                </div>
                <div class="clear"></div>
        </div>
    </div>
</template>
<script>
import api from '@/api';
import { mapGetters } from 'vuex';
import * as Config from '../config';
import domtoimage from 'dom-to-image';
export default {
    name: 'defalutPanel',
    data () {
        return {
            shotDistrict: null,
            cutImgUrl: '',
            bgImgUrl: '',
            uploadLoading: false,
            shotLoading: false,
            scales: Config.SCREEN_SCALES,
            scaleIndex: 0
        };
    },
    computed: {
        ...mapGetters(['layers', 'activeLayer', 'canvas', 'screenBasicMsg', 'showRight'])
    },
    mounted () {
        this.shotDistrict = document.querySelector('.big-sub-content');
        this.$nextTick(this.getScreenImg);
        this.initScale();
    },
    watch: {
        activeLayer (n) {
            if(!n) return;
            this.getScreenImg();
        }
    },
    methods: {
        selectScale (item, index) {
            item.index = this.scaleIndex = index;
            this.$store.commit('setScale', item);
        },
        initScale () {
            const scale = this.canvas.scale;

            if(!scale) {
                const item = this.scales[0];
                item.index = 0;
                this.$store.commit('setScale', item);
            } else {
                this.scaleIndex = scale.index;
            }
        },
        updateSnap () {
            if(Number(this.canvas.snap) <= 0) {
                this.canvas.snap = 1;
            }
        },
        coverShotSub (node) {
            const item = node.querySelectorAll('.item');
            $('#cut-tems').remove();
            node.id = 'cut-tems';
            $(node).css({position: 'absolute', top: 0, left: 0, zIndex: -1});
            item.forEach(el => {
                const type = $(el).attr('data-type');
                if(type === 'jumap' || type === 'video') {
                    const $video = $(el).find('video');
                    $video.attr('muted', true);
                    $(el).remove();
                }
            });
            $(this.shotDistrict).after(node);
        },
        coverShot () {
            const node = this.shotDistrict;
            const cloneNode = node.cloneNode(true);

            this.coverShotSub(cloneNode);
            this.shotLoading = true;

            domtoimage.toPng(cloneNode, {
                quality: 0.65,
                width: this.canvas.width,
                height: this.canvas.height,
                style: {transform: 'scale(1)'}
            })
            .then(this.upLoadScreenshot)
            .catch((error) => {
                $('#cut-tems').remove();
                this.shotLoading = false;
                this.$message.error('截屏失败，截屏内容异常！');
                throw new Error('oops, something went wrong!', error);
            });
        },
        upLoadScreenshot (dataUrl) {
            const proId = this.screenBasicMsg.id;
            api.upLoadScreenshot({path: dataUrl, id: proId}).then(res => {
                if(res.code == 0) {
                    const timestamp = new Date().getTime();
                    const picUrl = `${res.data}?${timestamp}`;

                    this.loadingImg(picUrl, () => {
                        this.shotLoading = false;
                        this.cutImgUrl = picUrl;
                        this.$store.commit('setCoverImg', picUrl);
                        $('#cut-tems').remove();
                    });
                } else {
                    this.shotLoading = false;
                    this.$message.error(res.message);
                }
            }, err => {
                $('#cut-tems').remove();
                this.shotLoading = false;
                this.$message.error('服务器错误，请稍后再试！');
                throw new Error(err);
            });
        },
        getScreenImg () {
            const id = this.screenBasicMsg.id;
            const cuturl = `bigScreen/getImg/${id}`;

            if(this.screenBasicMsg.coverImg) {
                this.cutImgUrl = this.screenBasicMsg.coverImg;
            } else {
                this.cutImgUrl = cuturl;
            }
        },
        loadingImg (url, callback) {
            const img = new Image();
            img.onload = callback;
            img.src = url;
        },
        resetBg () {
            this.bgImgUrl = '';
            this.uploadLoading = false;
            this.$store.commit('setScreenBg', '');
        },
        beforeBgUpload (file) {
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isLt1M = file.size / 1024 / 1024 < 1;

            this.uploadLoading = true;
            this.$store.commit('setScreenBg', '');

            if (!isJPG && !isPNG) {
                this.$message.error('上传背景图片只能是 JPG/PNG 格式!');
                this.uploadLoading = false;
            }
            if (!isLt1M) {
                this.$message.error('上传背景图片大小不能超过 1MB!');
                this.uploadLoading = false;
            }
            return (isJPG ||isPNG) && isLt1M;
        },
        handleBgSuccess (res) {
            if(res.code == 0) {
                const id = this.screenBasicMsg.id;
                const timestamp = new Date().getTime();
                const bgurl = `bigScreen/getBgPic/${id}?${timestamp}`;

                this.loadingImg(bgurl, () => {
                    this.uploadLoading = false;
                    this.$store.commit('setScreenBg', bgurl);
                });
            }
        },
        handleBgError () {
            this.uploadLoading = false;
        }
    }
};
</script>
