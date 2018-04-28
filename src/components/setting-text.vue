<template>
	<div class="item clearfloat">
        <span class="left">{{name}}</span>
        <div class="right">
            <input type="text" :value="value" :placeholder="placeholder" @change="change($event.target.value)">
        </div>
    </div>
</template>
<script>
	export default {
	    name: 'setting-number',
	    props: ['value','name', 'placeholder'],
	    methods: {
	        change (value) {
	            this.$emit('input', value);
	            this.$emit('change');
	        }
	    }
	};
</script>