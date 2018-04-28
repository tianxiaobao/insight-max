<template>
  <ul>
    <li>
        <div class="item clearfloat">
            <span class="left">省份</span>
            <div class="right" id="prov">
                <select v-model="provSelected" class="u-select w100" @change="changeAddr(1)">
                    <option v-for="option in provAddrs" :value="option">
                        {{ option.text }}
                    </option>
                </select>
            </div>
        </div>
    </li>
    <li>
        <div class="item clearfloat">
            <span class="left">市</span>
            <div class="right" id="city">
                <select v-model="citySelected" class="u-select w100" @change="changeAddr(2)">
                    <option v-for="option in cityAddrs" :value="option">
                        {{ option.text }}
                    </option>
                </select>
            </div>
        </div>
    </li>
    <li>
        <div class="item clearfloat">
            <span class="left">区/县</span>
            <div class="right" id="region">
                <select v-model="regionSelected" class="u-select w100" @change="changeAddr(3)">
                    <option v-for="option in regionAddrs" :value="option">
                        {{ option.text }}
                    </option>
                </select>
            </div>
        </div>
    </li>
  </ul>
</template>
<script>
import addrArr from './data.js';

export default {

    name: 'vue-address',
    props: {
        address: String
    },
    data () {
        return {
            provSelected: {text: null, id: null},
            citySelected: {text: null, id: null},
            regionSelected: {text: null, id: null},
            provAddrs: this.getAddrsArrayById(0),
            addressTemp: ''
        };
    },
    computed: {
        cityAddrs () {
            if(this.provSelected) return this.getAddrsArrayById(this.provSelected.id);
            return [];
        },
        regionAddrs () {
            if(this.citySelected) return this.getAddrsArrayById(this.citySelected.id);
            return [];
        }
    },
    methods: {
        // 根据id获取市\区数据函数
        getAddrsArrayById (id) {
            if(id == null) return [];
            return addrArr[id].map(item => {
                return {
                    text: item[1],
                    id: Number(item[0])
                };
            });
        },
        getAddrsObjByName (pId, name) {
            if(name == undefined || pId === null) return {text: null, id: null};
            const array = addrArr[pId].filter((item) => {
                return item[1] == name;
            });
            return {text: array[0][1], id: Number(array[0][0])};
        },
        changeAddr (level) {
            if(level === 1 && this.provSelected) {
                this.citySelected = {text: null, id: null};
                this.regionSelected = {text: null, id: null};
                this.addressTemp = this.provSelected.text;
                this.$emit('update:address', this.addressTemp);
            } else if(level === 2 && this.citySelected) {
                this.regionSelected = {text: null, id: null};
                this.addressTemp = [this.provSelected.text,this.citySelected.text].join(' ');
                this.$emit('update:address', this.addressTemp);
            } else if(level === 3 && this.regionSelected) {
                this.addressTemp = [this.provSelected.text,this.citySelected.text,this.regionSelected.text].join(' ');
                this.$emit('update:address', this.addressTemp);
            }
        }
    },
    watch: {
        address () {
            const tempAddr = this.address.split(' ');
            this.provSelected = this.getAddrsObjByName(0, tempAddr[0]);
            this.citySelected = this.getAddrsObjByName(this.provSelected.id, tempAddr[1]);
            this.regionSelected = this.getAddrsObjByName(this.citySelected.id, tempAddr[2]);
        },
        addressTemp () {
            return this.address;
        }
    }
};
</script>
