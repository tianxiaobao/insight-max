<template>
	<dl>
	    <dt><a href="#" @click.prevent="positionOpen = !positionOpen"><b class="unfold"></b><h3>图表尺寸位置</h3></a></dt>

	    <dd :class="{ open: positionOpen }">
	        <div class="big-rule-box m-setting clearfloat chart-set-css">
	          <div class="tit fl">图表尺寸</div>
	          <div class="item fl">
	            <input type="number" min="0" v-model="position.width" @change="updatePositon()">
	            <div class="tt">宽度</div>
	          </div>
	          <div class="item fl">
	            <input type="number" min="0" v-model="position.height" @change="updatePositon()">
	            <div class="tt">高度</div>
	          </div>
	        </div>
	        <div class="big-rule-box m-setting clearfloat chart-set-css">
	          <div class="tit fl">图表位置</div>
	          <div class="item fl">
	            <input type="number" min="0" v-model="position.x" @change="updatePositon()">
	            <div class="tt">X坐标</div>
	          </div>
	          <div class="item fl">
	            <input type="number" min="0" v-model="position.y" @change="updatePositon()">
	            <div class="tt">Y坐标</div>
	          </div>
	        </div>
	    </dd>
	</dl>	
</template>
<script>
	import settingNumber from './setting-number.vue';
	import { mapGetters } from 'vuex';

	export default{
	    data () {
        const activeLayer = this.$store.state.screen.activeLayer;
	        return {
	            positionOpen : false,
	            position:{
	                x : parseInt(activeLayer.x),
	                y : parseInt(activeLayer.y),
	                width : parseInt(activeLayer.width),
	                height : parseInt(activeLayer.height)
	            }
	        };
	    },

	    computed: {
        ...mapGetters(['activeLayer'])
    },   

	    components: {settingNumber},

	    mounted () {
        this.$watch('activeLayer.x',this.setPosition);
        this.$watch('activeLayer.y',this.setPosition);
        this.$watch('activeLayer.width',this.setPosition);
        this.$watch('activeLayer.height',this.setPosition);
	    },
	    methods:{

	        setPosition () {
            const position = this.activeLayer;
            this.position.x = parseInt(position.x);
            this.position.y = parseInt(position.y);
            this.position.width = parseInt(position.width);
            this.position.height = parseInt(position.height);
	        },

	        updatePositon () {
            this.$store.commit('setLayerPosition',this.position);
            this.$nextTick(() => {
                this.$events.emit('redraw_chart');
            });
        }
	    }

	};    
</script>