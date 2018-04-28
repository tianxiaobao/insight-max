<template>
	<div class="chart-style">
		<dl>
			<dt><b class="unfold"></b><h3>图表</h3></dt>
			<dd>
				<div class="big-rule-box m-setting clearfloat">
					<div class="item">
                        <span class="left">背景颜色</span>
                        <div class="right">
                            <div class="c-color" @click="openColor(background)">
                            	<span class="curr-color" :style="{backgroundColor: bgc }"></span>
                                <div class="hand">
                                    <input type="text" readonly :value="bgc" @change="changeBGC">
                                </div>
                            </div>
                        	<chrome-picker class="bgk" :value="bgc" v-show="background.show" @input="updateBGC"></chrome-picker>
                        </div>
                    </div>
				</div>
			</dd>
			<dd>
				<div class="big-rule-box m-setting clearfloat">
					<div class="item">
                        <span class="left">边框颜色</span>
                        <div class="right">
                            <div class="c-color" @click="openColor(border)">
                                <span class="curr-color" :style="{backgroundColor: brc }"></span>
                                <div class="hand">
                                    <input type="text" :value="brc">
                                </div>
                            </div>
                            <chrome-picker class="brc" :value="brc" v-show="border.show" @input="updateBRC"></chrome-picker>
                        </div>
                    </div>
				</div>
			</dd>
			<dd>
				<div class="big-rule-box m-setting">
					<div class="item clearfloat">
                        <span class="left">边框宽度</span>
                        <div class="right">
                            <input type="number">
                        </div>
                    </div>
				</div>
			</dd>
		</dl>
	</div>
</template>
<script>
export default {
    name: 'chart-style',
    props: {},
    data () {
        return {};
    },
    methods: {
    
    }
};
</script>