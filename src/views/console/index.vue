<style>
/*body {
    background-color: #ebf1f5 !important;
}*/
#app header {
    z-index: 1002;
}
.indexTit {
    position: fixed !important;
    width: 100% !important;
    z-index: 11;
    border-bottom: 1px dashed #eee;
}

.innerCon {
    margin-top: 49px !important;
    background: none !important;
}
.YnaviContent .mainCon {
    height: inherit;
}

.s-leftMenu {
    z-index: 29 !important;
    overflow: hidden !important;
}
.s-leftMenu .nav {
    padding-bottom: 100px;
}
.m200 {
    margin-left: 200px;
}
</style>
<template>
    <div>
        <header></header>
      	<section class="YnaviContent">
            <div class="mainMenu"> </div>
            <div class="subMenu"> </div>
            <router-view id="content" :class="{m200: mainState}"></router-view>
        </section>
    </div>
</template>
<script>
export default {
    name: 'console',
    data () {
        return {
            mainState: 1
        };
    },
    mounted () {
        this.reloadJs("TopMenu", "//static1.jcloud.com/js/Ynavi.js");
        this.initContSize();
        this.setMainMenu();
        $(window).on('resize', this.initContSize);
    },
    methods: {
        initContSize () {
            const ynaviContent = $('.YnaviContent');
            const sLeftMenu = $('.s-leftMenu');
            const clientHeight = document.documentElement.clientHeight;
            const headH = $('header').height() || 50;
            ynaviContent.height(clientHeight - headH);
            sLeftMenu.height(clientHeight - 111);
        },
        setMainMenu () {
            const mainCon = $('.mainCon');
            const mainMenu = $('.mainMenu');
            const subMenu = $('.subMenu');

            subMenu.on('click', '.subMenuToggle', function () {
                mainCon.css({
                    marginLeft: mainMenu.width() + subMenu.width()
                });
            });
            mainMenu.on('click', '.subMenuToggle', function () {
                mainCon.css({
                    marginLeft: mainMenu.width() + subMenu.width()
                });
            });
            mainMenu.on('click', '.mainMenuToggle', function () {
                mainCon.css({
                    marginLeft: mainMenu.width() + subMenu.width()
                });
            });
        },
        reloadJs (id, filename) {
            const oldjs = document.getElementById(id); 
            if(oldjs) oldjs.parentNode.removeChild(oldjs); 
            const scriptObj = document.createElement("script"); 
            scriptObj.src = filename; 
            scriptObj.type = "text/javascript"; 
            scriptObj.id = id;
            document.getElementsByTagName("body")[0].appendChild(scriptObj);
        }
    },
    destory () {
        $(window).unbind('resize', this.initContSize);
    }
};
</script>