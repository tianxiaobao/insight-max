<template>
	<div class="item clearfloat">
        <span class="left">{{name}}</span>
        <div class="right">
            <input type="number" :value="value" @change="change($event.target.value)">
        </div>
    </div>
</template>
<script>
	export default {
	    name: 'setting-number',
	    props: ['value','name'],
	    methods: {
	        change (value) {
	            this.$emit('input', Number(value));
	            this.$emit('change');
	        }
	    }
	};
</script>