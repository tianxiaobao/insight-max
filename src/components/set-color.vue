<style>
    .c-color {
        margin-top: 6px;
    }
	.colorPicker {
		display: none;
	}

	.colorPicker.open {
		display: block;
	}
</style>
<template>
	<div @click="$event.stopPropagation();">
		<div class="c-color" @click="openPannel">
        	<span class="curr-color" :style="{backgroundColor: myColor }"></span>
            <div class="hand">
                <input type="text" readonly :value="myColor">
            </div>
        </div>
        <chrome-picker class="colorPicker" :class="{open:isOpen}" :value="myColor" @input="update"></chrome-picker>
	</div>
	
</template>
<script>
import tinycolor from 'tinycolor2';
import chrome from './vue-color/components/Chrome.vue';

export default {
    name: 'set-color',
    components: {
        'chrome-picker': chrome
    },
    props: ['color', 'type'],
    data () {
        return {
            isOpen : false,
            myColor: this.color,
            myType: this.type
        };
    },
    watch: {
        color (n) {
            if(!n) n = 'rgba(0, 0, 0, 0)';
            const tiny = tinycolor(n);
            const alpha = tiny.getAlpha();

            this.myColor = alpha == 1 ? tiny.toHexString() : n;
        }
    },
    methods: {
        openPannel () {
            document.onclick && document.onclick();
            document.onclick = () => {
                this.isOpen = false;
            };
            this.isOpen = true;
        },
        update (c) {
            const rgba = `rgba(${c.rgba.r}, ${c.rgba.g}, ${c.rgba.b}, ${c.rgba.a})`;

            this.myColor = c.hex;
            this.$emit('change', {
                color: rgba,
                type: this.type
            });
        }
    }
};
</script>