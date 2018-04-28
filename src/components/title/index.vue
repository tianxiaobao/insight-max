<template>
	<div class="big-rule-box m-setting">
        <div class="item clearfloat">
            <span class="left">名称</span>
            <div class="right">
                <input type="text" placeholder="请输入名称" v-model="myProp.title" @change="updateTitle">
            </div>
        </div>
		
		<input-number class="clearfloat" :prop="myFontSize"  @change="updateSize"></input-number>

        <div class="item clearfloat clearfloat">
            <span class="left">颜色</span>
            <div class="right">
        		<set-color :color="myProp.color" @change="updateColor"></set-color>
            </div>
        </div>
        
        <div class="item coordinate cl">
        	<div class="fl mr10"> 位置 </div>
        	<div class="fl mr10">
        		<input type="number" v-model="myX.value" @change="updateX">
        		<div class="center">横坐标</div>
        	</div>
        	<div class="fl mr10">
        		<input type="number" v-model="myY.value" @change="updateY">
        		<div class="center">纵坐标</div>
        	</div>
        </div>
        <!-- <input-number class="clearfloat" :prop="myX"  @change="updateX"></input-number>
        <input-number class="clearfloat" :prop="myY"  @change="updateY"></input-number> -->
        
    </div> 
</template>
<script>
	import setColor from '../set-color.vue';
	import inputNumber from '../input-number.vue';
	export default {
	    name: 'title',
	    props: ['title', 'fontSize', 'color', 'x', 'y'],
	    components: {
	        setColor,
	        inputNumber
	    },
	    data () {
	        return {
	            myProp: {
	                fontSize: this.fontSize,
	                title: this.title,
	                color: this.color,
	                x: this.x,
	                y: this.y
	            },
	            myFontSize: {
	                title: '字号',
	                value: this.fontSize
	            },
	            myX: {
	                title: 'X',
	                value: this.x
	            },
	            myY: {
	                title: 'Y',
	                value: this.y
	            }

	        };
	    },
	    watch: {
	        title (n) {
	            this.myProp.title = n;
	        },
	        fontSize (n) {
	            this.myFontSize.value = n;
	            this.myProp.fontSize = n;
	        },
	        color (n) {
	            this.myProp.color = n;
	        },
	        x (n) {
	            this.myX.value = n;
	            this.myProp.x = n;
	        },
	        y (n) {
	            this.myY.value = n;
	            this.myProp.y = n;
	        }
	    },
	    methods: {
	        updateTitle () {
	            this.$emit('change', this.myProp);
	        },
	        updateColor (c) {
	            this.myProp.color = c.color;
	            this.$emit('change', this.myProp);
	        },
	        updateSize (value) {
	            this.myFontSize.vaule = value;
	            this.myProp.fontSize = value;
	            this.$emit('change', this.myProp);
	        },
	        updateX () {
	            // this.myX.value = value;
	            this.myProp.x = this.myX.value;
	            this.$emit('change', this.myProp);
	        },
	        updateY () {
	            // this.myY.value = value;
	            this.myProp.y = this.myY.value;
	            this.$emit('change', this.myProp);
	        }
	    }
	};
</script>