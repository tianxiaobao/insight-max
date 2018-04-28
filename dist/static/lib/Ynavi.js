/**
 * Created by liuzhigang3@jd.com on 16/10/25.
 */
//document.domain = "jcloud.com";

(function(){

    var _staticUrl = "//static1.jcloud.com";
    //var _staticUrl = "..";
    var _storageUrl = "//jfs-console.jcloud.com/console",
        _cloudUrl = "",
        _redisUrl = "",
        _rdsUrl = "",
        _monitorUrl = "",
        _userPin,_userNick,_adminPin,
        _version,_consoleLable;
    var ssoCount = 0;

    var _temp = {};
    _temp.topNaviDom = '<a href="//www.jcloud.com" class="logo" data-page="outline"><img src="'+ _staticUrl +'/img/logo.png" alt="京东云"></a><ul></ul>';
    _temp.mainMenuDom = '<a href="#" title="打开或收起二级菜单" class="subMenuToggle"><i class="icon"></i></a><ul></ul>';
    _temp.topNavi = '<% for(var i=0, len=topMenu.length; i<len; i++){ %>' +
        '<li <% if(topMenu[i].childMenu){ %>class="hasChild"<% } %>><a href="#" class="topNaviLink" data-page="<%:=topMenu[i].page%>" data-url="<%:=topMenu[i].url%>"><span><%:=topMenu[i].name%></span><% if(topMenu[i].childMenu){ %><i class="icon icon_drop"></i><% } %></a>' +
        '<% if(topMenu[i].childMenu && topMenu[i].childMenu.length > 0){ %>'+
        '<ul class="<%:=(topMenu[i].page == "account" ? "noBrd" : "")%>">' +
        '<% for(var h=0, clen=topMenu[i].childMenu.length; h<clen; h++){ %>' +
        '<li><a href="#" data-page="<%:=topMenu[i].childMenu[h].page%>" data-url="<%:=topMenu[i].childMenu[h].url%>" class="<%:=(topMenu[i].childMenu[h].page == "recharge" ? "btn_blue" : "")%>"><%:=topMenu[i].childMenu[h].name%></a></li>' +
        '<% } %>' +
        '</ul>' +
        '<% } %>' +
        '</li>' +
        '<% } %>';
    _temp.userCenter = '<div class="userCenter">' +
        '<div class="account">' +
        '<h3>账户余额：</h3>' +
        '<p><span class="userBalance"><strong>￥0.</strong>00</span><a href="#" class="btn_recharge" data-page="recharge" data-url="//uc.jcloud.com/user/recharge_index?returnUrl=/user/preView">充值</a><span class="arrears">欠费：0.00</span></p>' +
        '<div class="linkBtn"><a href="#" class="userLink" data-page="userCenter" data-url="//uc.jcloud.com/user/preView">个人中心</a><a href="#" class="detail" data-page="detail" data-url="//uc.jcloud.com/accesskey/index">Access Key管理</a></div>' +
        '<div class="foot"><a href="#" class="btn_accToggle" style="display:none" data-page="toggleAcc">切换为子账号</a><a href="#" class="btn_logout" data-page="logout">退出</a></div>' +
        '</div>' +
        '<div class="company">' +
        '<h4 class="tit">选择所属企业</h4>' +
        '<ul></ul>' +
        '<div><a href="#" class="btn_back" data-page="backCompany">返回</a></div>' +
        '</div>' +
        '<div class="accStatus">' +
        '<dl></dl>' +
        '<div><a href="#" class="btn_accToggle" data-page="toggleStatus">切换子账号</a><a href="#" class="btn_back" data-page="backStatus">返回我的账号</a><a href="#" class="btn_logout" data-page="logout">退出</a></div>' +
        '</div>' +
        '</div>';
    _temp.mainMenu = '<% for(var i=0, len=mainMenu.length; i<len; i++){ %>' +
        '<li><a href="#" data-page="<%:=mainMenu[i].page%>"><i class="icon <%:=mainMenu[i].icon%>"></i><span><%:=mainMenu[i].name%></span></a></li>' +
        '<% } %>';
    _temp.mainMenu_new = '<a href="#" class="mainMenuToggle"><i></i></a>' +
        '<div class="menuBox"><ul>' +
        '<% for(var i=0, len=mainMenu.length; i<len; i++){ %>' +
        '<li><a href="#" data-page="<%:=mainMenu[i].page%>" class="menu1"><i></i><span><%:=mainMenu[i].name%></span></a>' +
        '<div>' +
        '<ul>' +
        '<% for(var h=0, hlen=mainMenu[i].childMenu.length; h<hlen; h++){ %>' +
        '<li><a href="#" data-page="<%:=mainMenu[i].childMenu[h].page%>" data-url="<%:=mainMenu[i].childMenu[h].url%>" data-path="<%:=mainMenu[i].childMenu[h].language%>"><i><%:=(mainMenu[i].childMenu[h].icon && mainMenu[i].childMenu[h].icon !== "null" ? mainMenu[i].childMenu[h].icon : "")%></i><span><%:=mainMenu[i].childMenu[h].name%></span></a></li>' +
        '<% } %>' +
        '</ul>' +
        '</div>' +
        '</li>' +
        '<% } %>' +
        '</ul></div>';
    _temp.subMenu = '<h3><%:=subTitle%></h3>' +
        '<ul>'+
        '<% for(var i=0, len=subMenu.length; i<len; i++){ %>'+
        '<li>'+
        '<a href="#" class="<%:=(subMenu[i].childMenu && subMenu[i].childMenu.length > 0 ? "hasChild" : "")%>" data-page="<%:=subMenu[i].page%>" data-url="<%:=subMenu[i].url%>" data-code="<%:=subMenu[i].code%>"><%:=subMenu[i].name%></a>'+
        '<% if(subMenu[i].childMenu && subMenu[i].childMenu.length > 0){ %>'+
        '<ul class="subInMenu">' +
        '<% for(var h=0, clen=subMenu[i].childMenu.length; h<clen; h++){ %>' +
        '<li><a href="#" data-page="<%:=subMenu[i].childMenu[h].page%>"  data-url="<%:=subMenu[i].childMenu[h].url%>" data-code="<%:=subMenu[i].code%>"><%:=subMenu[i].childMenu[h].name%></a></li>' +
        '<% } %>' +
        '</ul>' +
        '<% } %>' +
        '</li>'+
        '<% } %>' +
        '</ul>';
    _temp.subMenu_new = '<a href="#" title="打开或收起二级菜单" class="subMenuToggle"><span>二级菜单开关</span></a>' +
        '<div><h3><%:=subTitle%></h3>' +
        '<ul>'+
        '<% for(var i=0, len=subMenu.length; i<len; i++){ %>'+
        '<li>'+
        '<a href="#" class="<%:=(subMenu[i].childMenu && subMenu[i].childMenu.length > 0 ? "hasChild" : "")%>" data-page="<%:=subMenu[i].page%>" data-url="<%:=subMenu[i].url%>" data-code="<%:=subMenu[i].code%>"><%:=subMenu[i].name%></a>'+
        '<% if(subMenu[i].childMenu && subMenu[i].childMenu.length > 0){ %>'+
        '<ul class="subInMenu">' +
        '<% for(var h=0, clen=subMenu[i].childMenu.length; h<clen; h++){ %>' +
        '<li><a href="#" data-page="<%:=subMenu[i].childMenu[h].page%>"  data-url="<%:=subMenu[i].childMenu[h].url%>" data-code="<%:=subMenu[i].code%>"><%:=subMenu[i].childMenu[h].name%></a></li>' +
        '<% } %>' +
        '</ul>' +
        '<% } %>' +
        '</li>'+
        '<% } %>' +
        '</ul></div>';
    _temp.contact = '<div class="pop_contact">' +
        '<h3>联系我们</h3>' +
        '<a href="javascript:void(0);" class="btn_close">关闭</a>' +
        '<div class="cnt">' +
        '<dl>' +
        '<dt>联系电话：</dt><dd>400 615 1212</dd>' +
        '<dt>邮&emsp;箱：</dt><dd>jcloud@jd.com</dd>' +
        '<dt>服务号：</dt><dd><img src="//inf.jcloud.com/images/erweima.jpg"><p>京云部落</p></dd>' +
        '</dl>' +
        '</div>' +
        '<div class="btn_bar"><a href="javascript:void(0)" class="btn_blue btn_ok">确定</a></div>' +
        '</div>';
    _temp.account = '<% for(var i=0, len=list.length; i<len; i++){ %>'+
        '<li><a href="#" data-pin="<%:=list[i].pin%>" data-page="childAccount"><%:=list[i].unick%></a></li>'+
        '<% } %>';
    _temp.childAccount = '<dt>子&nbsp;&nbsp;账&nbsp;&nbsp;号：</dt><dd><%:=childNick%></dd><dt>所属企业：</dt><dd><%:=parentNick%></dd>';
    _temp.dropMenu = '<% for(var i=0, len=menu.length; i<len; i++){ %>' +
        '<% if((i+1)%5 == 1){ %><ul class="<%:=(i>=5?"line":"")%>"><% } %>' +
        '<li><span data-page="<%:=menu[i].page%>"><%:=menu[i].name%></span>' +
        '<% if(menu[i].childMenu && menu[i].childMenu.length > 0){ %>' +
        '<ul>' +
        '<% for(var h=0, hlen=menu[i].childMenu.length; h<hlen; h++){ %>' +
        '<li>'+
        '<% if(menu[i].childMenu[h].childMenu && menu[i].childMenu[h].childMenu.length > 0){ %>' +
        '<a href="#" data-page="<%:=menu[i].childMenu[h].childMenu[0].page%>" data-url="<%:=menu[i].childMenu[h].childMenu[0].url%>" data-code="<%:=menu[i].childMenu[h].code%>"><%:=menu[i].childMenu[h].name%></a>' +
        '<% }else{ %>' +
        '<a href="#" data-page="<%:=menu[i].childMenu[h].page%>" data-url="<%:=menu[i].childMenu[h].url%>" data-code="<%:=menu[i].childMenu[h].code%>"><%:=menu[i].childMenu[h].name%></a>' +
        '<% } %>' +
        '<% if(menu[i].childMenu[h].label){ %><span class="tag tag_<%:=menu[i].childMenu[h].label%>"><%:=menu[i].childMenu[h].label == "hot" ? "HOT" : menu[i].childMenu[h].label == "new" ? "NEW" : menu[i].childMenu[h].label == "openBeta" ? "公测中" : menu[i].childMenu[h].label == "test" ? "内测中" : "敬请期待"%></span><% } %>' +
        '</li>'+
        '<% } %>' +
        '</ul>' +
        '<% } %>' +
        '</li>' +
        '<% if((i+1)%5 == 0 || i == len-1){ %></ul><% } %>' +
        '<% } %>';

    var _menu = {};
    _menu.topMenu = [
        {name:"概览",page:"outline",url:"{cloudUrl}"},
        {name:"产品",page:"product",url:"", childMenu:[]},
        //{name:"Access Key管理",page:"access",url:"//uc.jcloud.com/accesskey/index"},
        {name:"消息",page:"contact",url:"//uc.jcloud.com/message/tab/0"},
        {name:"帮助中心",page:"help",url:"//www.jcloud.com/help/userGuide&FAQ.html"},
        {name:"工单",page:"form",childMenu:[
            {name:"提交工单",page:"post",url:"//uc.jcloud.com/question/submit"},
            {name:"我的工单",page:"myForm",url:"//uc.jcloud.com/question/myorder"}
        ]},
        {name:"备案",page:"record",url:"//uc.jcloud.com/record/index"},
        {name:"",page:"user",url:"", childMenu:[]}
    ];
    _menu.topMenu_new = [
        {name:"概览",page:"outline",url:"https://console.jcloud.com"},
        {name:"产品",page:"product",url:"", childMenu:[]},
        //{name:"Access Key管理",page:"access",url:"//uc.jcloud.com/accesskey/index"},
        {name:"消息",page:"contact",url:"//uc.jcloud.com/message/tab/0"},
        {name:"帮助中心",page:"help",url:"//www.jcloud.com/help/userGuide&FAQ.html"},
        {name:"费用",page:"cost",url:"", childMenu:[
            {name:"充值",page:"recharge",url:"//uc.jcloud.com/user/recharge_index?returnUrl=/user/preView"},
            {name:"订单",page:"order",url:"//uc.jcloud.com/ordersmanage/orders"},
            {name:"发票",page:"invoice",url:"//uc.jcloud.com/invoice/invoiceList"},
            {name:"代金券",page:"coupon",url:"//uc.jcloud.com/coupon/couponinfo"},
            {name:"消费记录",page:"csmRecord",url:"//uc.jcloud.com/cost/record"},
            {name:"续费管理",page:"csmManage",url:"//renewal-console.jcloud.com"}
        ]},
        {name:"工单",page:"form",childMenu:[
            {name:"提交工单",page:"post",url:"//uc.jcloud.com/question/submit"},
            {name:"我的工单",page:"myForm",url:"//uc.jcloud.com/question/myorder"}
        ]},
        {name:"备案",page:"record",url:"//uc.jcloud.com/record/index"},
        {name:"",page:"user",url:"", childMenu:[]}
    ];
    _menu.sideMenuObj = {};
    _menu.sideMenuObj.cloud = {name:"弹性计算",icon:"icon_cloud",page:"cloud",childMenu:[
        {name:"云主机",page:"container",url:"{cloudUrl}/gz/containers",code:"vm",label:"hot"},
        {name:"镜像",page:"menu_images",url:"{cloudUrl}/gz/images",code:"image"},
        {name:"安全组",page:"securityGroup",url:"{cloudUrl}/gz/security",code:"securityGroup"},
        {name:"SSH密钥",page:"menu_ssh",url:"{cloudUrl}/gz/ssh",code:"keypair"},
        {name:"云硬盘",page:"disk",url:"{cloudUrl}/gz/disk",code:"disk",label:"hot"},
        {name:"云硬盘快照",page:"disk_snapshot",url:"{cloudUrl}/gz/disk/snapshot",code:"disk_snapshot"}
    ]};
    _menu.sideMenuObj.cloud_dockers = {name:"弹性计算",icon:"icon_cloud",page:"cloud",childMenu:[
        {name:"云主机",page:"container",url:"{cloudUrl}/gz/containers",code:"vm",label:"hot"},
        {name:"容器",page:"dockers",url:"{cloudUrl}/gz/dockers",code:"dockers"},
        {name:"镜像",page:"menu_images",url:"{cloudUrl}/gz/images",code:"image",childMenu:[
            {name:"云主机镜像",page:"image_c",url:"{cloudUrl}/gz/images", code:"image_c"},
            {name:"容器镜像",page:"image_d",url:"{cloudUrl}/gz/images/dockers", code:"image_d"},
        ]},
        {name:"安全组",page:"securityGroup",url:"{cloudUrl}/gz/security",code:"securityGroup"},
        {name:"SSH密钥",page:"menu_ssh",url:"{cloudUrl}/gz/ssh",code:"keypair"},
        {name:"云硬盘",page:"disk",url:"{cloudUrl}/gz/disk",code:"disk",label:"hot"},
        {name:"云硬盘快照",page:"disk_snapshot",url:"{cloudUrl}/gz/disk/snapshot",code:"disk_snapshot"}
    ]};
    _menu.sideMenuObj.net = {name:"网络",icon:"icon_net",page:"net",childMenu:[
        {name:"子网",page:"vpcs",url:"{cloudUrl}/gz/vpcs",code:"subnet"},
        {name:"路由器",page:"router",url:"{cloudUrl}/gz/router",code:"router"},
        {name:"NAT网关",page:"nat",url:"{cloudUrl}/gz/nat",code:"externalGateway"},
        {name:"公网IP",page:"pips",url:"{cloudUrl}/gz/pips",code:"ip"},
        {name:"负载均衡",page:"load",url:"{cloudUrl}/gz/load",code:"balance"},
        {name:"防火墙",page:"firewalls",url:"{cloudUrl}/gz/firewalls",code:"firewall"}
    ]};
	_menu.sideMenuObj.net_gray = {name:"网络",icon:"icon_net",page:"net",childMenu:[
        {name:"子网",page:"vpcs",url:"{cloudUrl}/gz/vpcs",code:"subnet"},
        {name:"路由器",page:"router",url:"{cloudUrl}/gz/router",code:"router"},
        {name:"NAT网关",page:"nat",url:"{cloudUrl}/gz/nat",code:"externalGateway"},
        {name:"VPN",page:"vpn",url:"{cloudUrl}/gz/vpn",code:"vpn"},
        {name:"公网IP",page:"pips",url:"{cloudUrl}/gz/pips",code:"ip"},
        {name:"负载均衡",page:"load",url:"{cloudUrl}/gz/load",code:"balance"},
        {name:"防火墙",page:"firewalls",url:"{cloudUrl}/gz/firewalls",code:"firewall"}
    ]};
    _menu.sideMenuObj.data = {name:"数据库与缓存",icon:"icon_data",page:"data",childMenu:[
        {name:"云数据库",page:"menu_db",url:"{rdsUrl}/gz/databases"},
        {name:"云缓存",page:"cloudcache",url:"{redisUrl}/gz/cloudcache"},
        {name:"数据库备份",page:"backup",url:"{rdsUrl}/gz/backup"}
    ]};
    _menu.sideMenuObj.stock = {name:"存储与CDN",icon:"icon_cdn",page:"stock",childMenu:[
        {name: "云存储", page: "stock", url: "", childMenu: [
            {name: "概览", page: "overview", url: _storageUrl},
            {name: "空间管理", page: "space", url: _storageUrl},
            {name: "用量监控", page: "consum", url: _storageUrl},
            {name: "音视频处理", page: "file", url: _storageUrl},
            {name: "操作日志", page: "monitorlog", url: _storageUrl}
        ]}
    ]};
    _menu.sideMenuObj.CDN = {name:"CDN",icon:"icon_cdn",page:"CDN",childMenu:[
        {name:"CDN",page:"CDN",url:"{cloudUrl}/gz/cdn",childMenu:[
            {name: "域名列表", page: "cdnDomainList", url: "//cdn-console.jcloud.com/gz/cdn/index"},
            {name: "刷新缓存", page: "cdnRefresh", url: "//cdn-console.jcloud.com/gz/cdn/cdnrefresh"},
            {name: "资源监控", page: "cdnData", url: "//cdn-console.jcloud.com/gz/cdn/cdndata"}
        ]}
    ]};
    _menu.sideMenuObj.stockCDN = {name:"存储与CDN",icon:"icon_cdn",page:"stockCDN",childMenu:[
        {name:"CDN",page:"CDN",url:"{cloudUrl}/gz/cdn",childMenu:[
            {name: "域名列表", page: "cdnDomainList", url: "//cdn-console.jcloud.com/gz/cdn/index"},
            {name: "刷新缓存", page: "cdnRefresh", url: "//cdn-console.jcloud.com/gz/cdn/cdnrefresh"},
            {name: "资源监控", page: "cdnData", url: "//cdn-console.jcloud.com/gz/cdn/cdndata"}
        ]},
        {name: "云存储", page: "stock", url: "", childMenu: [
            {name: "概览", page: "overview", url: _storageUrl},
            {name: "空间管理", page: "space", url: _storageUrl},
            {name: "用量监控", page: "consum", url: _storageUrl},
            {name: "音视频处理", page: "file", url: _storageUrl},
            {name: "操作日志", page: "monitorlog", url: _storageUrl}
        ]}
    ]};
    _menu.sideMenuObj.security = {name:"云安全",icon:"icon_security",page:"security",childMenu:[
        {name:"DDoS基础防护",page:"ddos",url:"{cloudUrl}/gz/ddos"},
        {name:"BGP高防",page:"BGPgf",url:"//ddos-console.jcloud.com/ddos/bgp/index"}
    ]};
    _menu.sideMenuObj.domainService = {name:"域名服务",icon:"icon_domain",page:"domainService",childMenu:[
        {name:"域名管理",page:"domain",url:"//net.console.jcloud.com/domain/index"},
        {name:"信息模板",page:"template",url:"//net.console.jcloud.com/template/list"},
        {name:"域名转入",page:"turn",url:"//net.console.jcloud.com/transferin/list"}
    ]};

    _menu.sideMenuObj.manage = {name:"管理",icon:"icon_manage",page:"manage",childMenu:[
        //{name:"监控报警",page:"monitor",url:"{cloudUrl}/gz/monitors"},
        {name:"续费管理",page:"renew",url:"{cloudUrl}/gz/renew"}
    ]};
    _menu.sideMenuObj.manageChild = {name:"管理",icon:"icon_manage",page:"manage",childMenu:[
        {name:"监控报警",page:"monitor",url:"{cloudUrl}/gz/monitors"}
    ]};

    _menu.sideMenuObj.manage_white = {name:"管理",icon:"icon_manage",page:"manage",childMenu:[
        //{name:"监控报警",page:"monitor",url:"{cloudUrl}/gz/monitors"},
        {name:"续费管理",page:"renew",url:"{cloudUrl}/gz/renew"},
        {name:"授权管理",page:"power",url:"{cloudUrl}/gz/control/index",childMenu:[
            {name:"概览",page:"ctl_index",url:"{cloudUrl}/gz/control/index"},
            {name:"用户管理",page:"ctl_user",url:"{cloudUrl}/gz/control/userList"},
            {name:"群组管理",page:"ctl_group",url:"{cloudUrl}/gz/control/group"},
            {name:"授权策略管理",page:"ctl_policy",url:"{cloudUrl}/gz/control/policy"}
        ]}
    ]};
    _menu.sideMenuObj.monitor = {name:"云监控",icon:"icon_monitor",page:"cMonitor",childMenu:[
        {name:"资源监控",page:"sMonitor",url:"",childMenu:[
            {name:"云主机监控",page:"serverMonitor",url:"{monitorUrl}/gz/serverMonitor",code:"serverMonitor"},
            {name:"云硬盘监控",page:"diskMonitor",url:"{monitorUrl}/gz/diskMonitor",code:"diskMonitor"},
            {name:"公网IP监控",page:"ipMonitor",url:"{monitorUrl}/gz/ipMonitor",code:"ipMonitor"},
        ]},
        {name:"报警管理",page:"monitorMng",url:"",childMenu:[
            {name:"全部报警规则",page:"allAlarmRule",url:"{monitorUrl}/gz/diskMonitor/allAlarmRule",code:"allAlarmRule"},
            {name:"历史报警信息",page:"historyAlarm",url:"{monitorUrl}/gz/historyAlarm",code:"historyAlarm"}
        ]},
    ]};
    _menu.sideMenuObj.liveShow = {name:"视频服务",icon:"icon_show",page:"live_show",childMenu:[
        {name:"视频直播",page:"live_video",url:"",childMenu:[
            {name:"直播管理",page:"live_manage",url:"//live-console.jcloud.com/live_manage.html"},
            {name:"统计分析",page:"live_analysis",url:"//live-console.jcloud.com/live_analysis.html"}
        ]}
    ]};
    _menu.sideMenuObj.dataCloud = {name:"数知",icon:"icon_dataCloud",page:"dataCloud",childMenu:[
        {name:"数知控制台",page:"databaseCtrl",url:"",childMenu:[
            {name:"概览页",page:"console_page",url:"//xdata.jcloud.com/console_page"},
            {name:"任务管理",page:"wflist",url:"//xdata.jcloud.com/scheduler-web/accessUser/wflist"},
            {name:"任务运维",page:"wf-ins-list",url:"//xdata.jcloud.com/scheduler-web/accessUser/wf-ins-list"},
            {name:"计算资源",page:"standard",url:"//xdata.jcloud.com/rmgr/resources/res-manage/standard.html"}
        ]},
        {name:"数据集成",page:"dataCollect",url:"",childMenu:[
            {name:"接入数据",page:"dataAccess",url:"//xdata.jcloud.com/dataIntegration/index.html"},
            {name:"接入历史",page:"accessHistory",url:"//xdata.jcloud.com/dataIntegration/history.html"}
        ]},
        {name:"数据仓库",page:"database",url:"",childMenu:[
            {name:"库表管理",page:"dbManage",url:"//xdata.jcloud.com/map/resources/app2/database.html"},
            {name:"文件管理",page:"dbfile",url:"//xdata.jcloud.com/map/resources/app2/file.html"}
        ]},
        {name:"BI报表",page:"BIreport",url:"",childMenu:[
            {name:"报表开发",page:"datadevelop",url:"//xdata.jcloud.com/exp/resources/dist/app.html?bodyId=2CAVX6ZWU_20170322-115025"},
            {name:"报表管理",page:"datalist",url:"//xdata.jcloud.com/exp/resources/dist/list.html"}
        ]},
        {name:"JMR",page:"custom-resources",url:"//xdata.jcloud.com/rmgr/resources/res-manage/custom-resources.html"},
        {name:"日志服务",page:"standard",url:"//jls-console.jcloud.com/resources/pages/list.html"}

    ]};
    _menu.sideMenuDefault = [_menu.sideMenuObj.cloud,_menu.sideMenuObj.net,_menu.sideMenuObj.data,_menu.sideMenuObj.stock,_menu.sideMenuObj.security,_menu.sideMenuObj.monitor,_menu.sideMenuObj.domainService];
    _menu.sideMenuCdn = [_menu.sideMenuObj.cloud,_menu.sideMenuObj.net,_menu.sideMenuObj.data,_menu.sideMenuObj.stockCDN,_menu.sideMenuObj.security,_menu.sideMenuObj.monitor,_menu.sideMenuObj.domainService];
    _menu.sideMenuDefaultChild = [_menu.sideMenuObj.cloud,_menu.sideMenuObj.net,_menu.sideMenuObj.data,_menu.sideMenuObj.security,_menu.sideMenuObj.monitor];
    _menu.sideMenuCdnChild = [_menu.sideMenuObj.cloud,_menu.sideMenuObj.net,_menu.sideMenuObj.data,_menu.sideMenuObj.CDN,_menu.sideMenuObj.security,_menu.sideMenuObj.monitor];

    var comm_fun = {

        getQueryParam : function(_name,_url){
            _url = comm_fun.isNull(_url) ? window.location.search : _url.substring(_url.indexOf("?"));
            var reg = new RegExp("(^|&)"+ _name +"=([^&]*)(&|$)");
            var r = _url.substr(1).match(reg);
            if(r!=null)return  unescape(r[2]); return "";
        },

        clearUrl : function(_url){
            if(comm_fun.isNull(_url))return "";
            var _len = _url.length;
            if(_url.substring(_len-1,_len) == "/"){
                return _url.substring(0,_len-1);
            }
            else{
                return _url.substring(0,_len);
            }
        },

        isNull : function(_name){
            if(_name == "" || _name == undefined || _name == null)return true;
            return false;
        },

        openUrl : function(_url, _target){
            comm_fun.isNull(_target) ? location.href = _url : window.open(_url,_target);
        },

        getFileName : function(_file){
            var _file_name = _file.lastIndexOf("/") >= _file.length - 1 ? "index" : _file.substring(_file.lastIndexOf("/")+1,_file.lastIndexOf("."));
            return _file_name;
        },

        add_css : function(_url){
            var head = document.getElementsByName("head")[0];
            var link;
            if(_url == "" || _url == undefined || _url == null)return;
            link = document.createElement("link");
            link.rel = "stylesheet";
            link.type = "text/css";
            link.setAttribute("data-type","extend");
            link.href = _url;
            document.getElementsByTagName("head")[0].appendChild(link);
        },

        add_js : function(_url){
            var head = document.getElementsByTagName("head")[0];
            var script;
            if(_url == "" || _url == undefined || _url == null)return;
            script = document.createElement("script");
            script.type = "text/javascript";
            script.src = _url;
            script.setAttribute("data-type","extend");
            document.getElementsByTagName("head")[0].appendChild(script);
            return script;
        },

        setCookie : function(name,value){
            document.cookie = encodeURIComponent(name) + "="+ encodeURIComponent(value) + ";path=/;domain=.jcloud.com";
        },

        getCookies : function(name){
            var arr,reg=new RegExp("(^| )"+encodeURIComponent(name)+"=([^;]*)(;|$)");
            if(arr=document.cookie.match(reg)){
                return decodeURIComponent(arr[2]) == "null" ? null : decodeURIComponent(arr[2]);
            }
            else{
                return null;
            }
        },

        delCookies : function(name){
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = comm_fun.getCookies(name);
            if(cval != null){
                document.cookie = encodeURIComponent(name) + "="+encodeURIComponent(cval)+";expires="+exp.toGMTString() + ";path=/;domain=.jcloud.com";
            }
        },

        getStorage : function(_name){
            var _val = "";
            if(window.localStorage){
                _val = window.localStorage.getItem(encodeURIComponent(_name));
                return _val;
            }
            if(window.document && window.document.documentElement.addBehavior){
                try{
                    var _stors = document.createElement("div");
                    _stors.addBehavior("#default#userData");
                    document.body.appendChild(_stors);
                    _stors.load("localStorage");
                    _val = _stors.getAttribute(encodeURIComponent(_name));
                }
                catch (e){
                    _val = "";
                }
                return _val;
            }
            return _val;
        },

        getLinkHashParam : function(_name){
            var _url = location.hash;
            var reg = new RegExp("(^|&)"+ _name +"=([^&]*)(&|$)");
            var r = _url.substr(1).match(reg);
            if(r!=null)return  unescape(r[2]); return "";
        },

        getParamFromUrl : function(_url){
            if(_url.indexOf("#") < 0)return null;
            var _search = _url.substr(_url.indexOf("#")+1),
                _arr,
                _param = {};
            if(_search.indexOf("&")<0){
                _param[_search] = true; //_search.substr(_search.indexOf("=")+1);
            }
            else{
                _arr = _search.split("&");
                for(var i= 0, len=_arr.length; i<len; i++){
                    _param[_arr[i]] = true; //_arr[i].substr(_arr[i].indexOf("=")+1);
                }
            }
            return _param;
        },

        getOldMenu : function(_config){
            var _menuParam = {};
            _menuParam.topMenu = _menu.topMenu;
            if(comm_fun.isNull(_config.adminPin) || _config.adminPin == "null"){
                _menuParam.sideMenu = _config.grayList ? _menu.sideMenuCdn.slice(0) : _menu.sideMenuDefault.slice(0);
                _config.whiteList ? _menuParam.sideMenu.push(_menu.sideMenuObj.manage_white) : _menuParam.sideMenu.push(_menu.sideMenuObj.manage);
                _menuParam.sideMenu.push(_menu.sideMenuObj.dataCloud);
                if(_config.liveShowList)_menuParam.sideMenu.push(_menu.sideMenuObj.liveShow);
                if(_config.vpnGrayList)_menuParam.sideMenu.splice(1,1,_menu.sideMenuObj.net_gray);
            }
            else{
                _menuParam.sideMenu = _config.grayList ? _menu.sideMenuCdnChild.slice(0) : _menu.sideMenuDefaultChild.slice(0);
            }
            if(_config.dockersGray)_menuParam.sideMenu.splice(0,1,_menu.sideMenuObj.cloud_dockers);
            if(!_config.ipGray){
                for(var i=0,len=_menuParam.sideMenu.length; i<len; i++){
                    if(_menuParam.sideMenu[i].page == "security"){
                        _menuParam.sideMenu[i].childMenu.splice(1,1);
                        break;
                    }
                }
            }
            return _menuParam;
        },


        getNewMenu : function(_config){
            var _menuParam = {},
                _level1 = 0, _level2 = 0, _level3 = 0,
                _child1, _child2, _child3;
            _menuParam.topMenu = _menu.topMenu_new;
            _menuParam.sideMenu = [];
            for(var i= 0,len=sideMenuObj.length; i<len; i++){
                if(sideMenuObj[i].isGray == 0 || _config[sideMenuObj[i].isGrayProduct] || sideMenuObj[i].isAdminHide == 0 || (comm_fun.isNull(_config.adminPin) && sideMenuObj[i].isAdminHide == 1)){
                    _menuParam.sideMenu.push(sideMenuObj[i]);
                    if(sideMenuObj[i].childMenu && sideMenuObj[i].childMenu.length > 0){
                        _level1 = _menuParam.sideMenu.length - 1;
                        _child1 = sideMenuObj[i].childMenu;
                        _menuParam.sideMenu[_level1].childMenu = [];
                        for(var h= 0,hlen=_child1.length; h<hlen; h++){
                            if(_child1[h].isGray == 0 || _config[_child1[h].isGrayProduct] || _child1[h].isAdminHide == 0 || (comm_fun.isNull(_config.adminPin) && _child1[h].isAdminHide == 1)){
                                _menuParam.sideMenu[_level1].childMenu.push(_child1[h]);
                                if(_child1[h].childMenu && _child1[h].childMenu.length > 0){
                                    _level2 = _menuParam.sideMenu[_level1].childMenu.length - 1;
                                    _child2 = _child1[h].childMenu;
                                    _menuParam.sideMenu[_level1].childMenu[_level2].childMenu = [];
                                    for(var k= 0,klen=_child2.length; k<klen; k++){
                                        if(_child2[k].isGray == 0 || _config[_child2[k].isGrayProduct] || _child2[k].isAdminHide == 0 || (comm_fun.isNull(_config.adminPin) && _child2[k].isAdminHide == 1)){
                                            _menuParam.sideMenu[_level1].childMenu[_level2].childMenu.push(_child2[k]);
                                            if(_child2[k].childMenu && _child2[k].childMenu.length > 0){
                                                _level3 = _menuParam.sideMenu[_level1].childMenu[_level2].childMenu.length - 1;
                                                _child3 = _child2[k].childMenu;
                                                _menuParam.sideMenu[_level1].childMenu[_level2].childMenu[_level3].childMenu = [];
                                                for(var j= 0,jlen=_child3.length; j<jlen; j++){
                                                    if(_child3[j].isGray == 0 || _config[_child3[j].isGrayProduct] || _child3[j].isAdminHide == 0 || (comm_fun.isNull(_config.adminPin) && _child3[j].isAdminHide == 1)){
                                                        _menuParam.sideMenu[_level1].childMenu[_level2].childMenu[_level3].childMenu.push(_child3[j]);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return _menuParam;
        },

        getMenuParam : function(_config,_version){
            return _version == "v2" ? comm_fun.getNewMenu(_config) : comm_fun.getOldMenu(_config);
        },

        postHtml : function(url, args){
            var form = $("<form method='post'></form>"),
                input;
            form.attr({"action":url});
            $.each(args,function(key,value){
                input = $("<input type='hidden'>");
                input.attr({"name":key});
                input.val(value);
                form.append(input);
            });
            form.appendTo(document.body);
            form.submit();
            document.body.removeChild(form[0]);
        },

        getAreaCode : function(_code){
            if(_version == "v2"){
                switch (_code){
                    case "hb":
                        return "bj_02";
                    case "hd":
                        return "sq_02";
                    case "gz":
                        return "gz_02";
                    case "hk":
                        return "hk_02";
                    default :
                        return "bj_02";
                }
            }
            else{
                switch (_code){
                    case "bj_02":
                        return "hb";
                    case "sq_02":
                        return "hd";
                    case "gz_02":
                        return "gz";
                    case "hk_02":
                        return "hk";
                    default :
                        return "hb";
                }
            }
        },

        getTimeParam : function(_config){
            var _date = new Date(),
                _dataParam = "";
            if(comm_fun.isNull(_config) || _config == "second"){
                return _date.getTime();
            }
            else{
                _dataParam = _date.getFullYear() +"/"+ (_date.getMonth()+1) +"/"+ _date.getDate() +" "+ (_config == "hour" || _config == "minute" ? _date.getHours() : "0") +":"+ (_config == "minute" ? _date.getMinutes() : "0") +":0";
                return new Date(_dataParam).getTime();
            }
        },

        getJs : function(_url1,_url2,_param){
            try {
                $.ajax({
                    url : _url1,
                    dataType : "script",
                    timeout : 1000,
                    success : function(){
                        try{if(!window[_param])comm_fun.add_js(_url2);}
                        catch (e){comm_fun.add_js(_url2);}
                    },
                    error : function(){
                        comm_fun.add_js(_url2);
                    }
                });
            }
            catch (e){
                comm_fun.add_js(_url2);
            }
        }
    };

    var _naviObj, //导航公共对象
        _subTitle = "", //二级菜单标题
        _subMenuObj = null,//二级菜单json
        _subMenuHideHandle, //二级菜单影藏句柄
        _curr = null,//当前选中菜单对象
        _callbackObj = {},//回调函数对象
        _returnObj = {},//返回对象
        _userConfig = {},//用户信息
        _vari = {};//全局变量
    _vari.DC = "hb";

    function Ynavi(config,_currPage,_param){
        var _page = location.hash.substr(1);
        this.topMenu = config.topMenu;
        this.sideMenu = config.sideMenu;
        this.currPage = _currPage ? _currPage : _page ? _page : "";
        this.init(_param);
        _returnObj.setUserName = this.setUserName;
        _returnObj.setCurrPage = this.setCurrPage;
        _returnObj.setAccountInfo = this.setAccountInfo;
        _returnObj.setChildAccount = this.setChildAccount;
        _returnObj.setChildAccSel = this.setChildAccSel;
        _returnObj.hideLink = this.hideLink;
        _returnObj.topMenuAdd = this.topMenuAdd;
        _returnObj.sideMenuAdd = this.sideMenuAdd;
        _returnObj.setVari = this.setVari;
        return _returnObj;
    }

    Ynavi.prototype = {
        init : function(_param){
            this.evtInit(_param);
            this.fillTopMenu(true);
            this.fillDropMenu();
            if(_param && _param.hideSide){
                if(_version !== "v2")$(".mainMenu").hide();
                $(".subMenu").hide();
                $(".mainCon").css("margin-left","0px");
                //$("header ul li").eq(0).addClass("hover");
                return;
            }
            $(".mainMenu").show();
        },

        setVari : function(_name,_value){
            _vari[_name] = _value;
        },

        urlReplace : function(_link){
            if(!comm_fun.isNull($(_link).attr("data-url")))$(_link).attr("data-url",$(_link).attr("data-url").replace("{cloudUrl}",_cloudUrl).replace("{redisUrl}",_redisUrl).replace("{rdsUrl}",_rdsUrl).replace("{monitorUrl}",_monitorUrl));
        },

        fillTopMenu : function(_notSetMenu){
            $("header").html(_temp.topNaviDom);
            $("header ul").html(template(_temp.topNavi,{topMenu:this.topMenu}));
            $("header ul a").each(function(){
                _naviObj.urlReplace(this);
            });
            $("header ul a[data-page='outline']").parent().addClass("left");
            $("header ul a[data-page='product']").parent().addClass("left");
            $("header ul a[data-page='user']").parent().append(_temp.userCenter);
            $("header ul a[data-page='product']").parent().append("<div class='product'></div>");
            if(_notSetMenu)return;
            if(!comm_fun.isNull(_userPin))this.setUserName(_userPin);
        },

        fillSideMenu : function(){
            if(_version == "v2"){
                $(".mainMenu").html(template(_temp.mainMenu_new,{mainMenu:this.sideMenu}));
            }
            else{
                $(".mainMenu").html(_temp.mainMenuDom);
                var mainMenu = [];
                for(var i= 0,len=this.sideMenu.length; i<len; i++){
                    mainMenu[i] = {};
                    mainMenu[i].name = this.sideMenu[i].name;
                    mainMenu[i].icon = this.sideMenu[i].icon;
                    mainMenu[i].page = this.sideMenu[i].page;
                }
                $(".mainMenu ul").html(template(_temp.mainMenu,{mainMenu:this.sideMenu}));
            }
        },

        fillDropMenu : function(){
            $("header .product").html(template(_temp.dropMenu,{menu:this.sideMenu}));
            $("header .product a").each(function(){
                _naviObj.urlReplace(this);
            });
        },

        setMenuSelect : function(_page){
            var _currHash = location.hash.substring(1),
                _currPage = "",
                _currPageInCookie = comm_fun.getCookies("currPage"),
                _temps = _version == "v2" ? _temp.subMenu_new : _temp.subMenu,
                _currMenusel = null;
            $(".mainMenu a").removeClass("cur");
            _currMenusel = !comm_fun.isNull(_page) ? this.canfindPage(_page) : null; //首先匹配page参数
            if(comm_fun.isNull(_currMenusel))_currMenusel = !comm_fun.isNull(_currHash) ? this.canfindPage(_currHash) : null;//然后匹配hash
            if(comm_fun.isNull(_currMenusel))_currMenusel = this.canfindPage();//再匹配路径
            if(comm_fun.isNull(_currMenusel))_currMenusel = !comm_fun.isNull(_currPageInCookie) ? this.canfindPage(_currHash) : null;//最后匹配cookie
            if(comm_fun.isNull(_currMenusel)){
                $("header ul a").eq(0).parent("li").addClass("cur");
                if(_version == "v2"){
                    $(".subMenu").addClass("none");
                    $(".mainCon").css("margin-left","150px");
                    this.fillSideMenu();
                    var _currLi = $(".mainMenu a[class='menu1']").eq(0).parent();
                    $(_currLi).addClass("cur").css("height","auto").find("div").height($(_currLi).find("ul").height());
                    $(".mainCon").css({marginLeft:"150px"});
                }
                else{
                    $(".mainCon").css("margin-left","51px");
                    this.fillSideMenu();
                    $(".subMenu").html("");
                    $(".mainCon").css({marginLeft:"50px"});
                }
                $(".mainMenu, .subMenu, .mainCon").addClass("trans");
                return;
            }
            if(_version == "v2"){
                if(comm_fun.isNull(_currMenusel.menu3_name)){
                    $(".mainMenu").width(150).removeClass("collapse");
                    $(".subMenu").css("left","150px").addClass("none");
                    $(".mainCon").css("margin-left","150px");
                }
                else{
                    $(".mainMenu").width(50).addClass("collapse");
                    $(".subMenu").css("left","50px").addClass("spread");
                    $(".mainCon").css("margin-left","200px");
                }
                this.fillSideMenu();
                var _currLi = $(".mainMenu a[data-page='"+ _currMenusel.menu1_page +"']").parent();
                $(_currLi).addClass("cur").find("div").height($(_currLi).find("ul").height());
                $(_currLi).find("a[data-page='"+ _currMenusel.menu2_page +"']").parent().addClass("cur");
                if(!comm_fun.isNull(_currMenusel.menu3_name)){
                    setTimeout(function(){
                        if($(".mainMenu").hasClass("collapse")){
                            $(".mainMenu .menuBox").css("overflow","visible");
                            $(".mainMenu ul").width(50);
                            $(_currLi).find("div").css("overflow","visible");
                        }
                        $(".mainMenu a[data-page='"+ _currMenusel.menu2_page +"']").parent().addClass("cur");
                        $(".subMenu").html(template(_temps,{subTitle:_currMenusel.menu2_name,subMenu:_currMenusel.menu3_arr})).removeClass("none").addClass("spread");
                        $(".mainCon").css({marginLeft:"200px"});
                        $(".subMenu a[data-page='"+ _currMenusel.menu3_page +"']").addClass("cur");
                    },200);
                }
            }
            else{
                this.fillSideMenu();
                $(".mainMenu a[data-page='"+ _currMenusel.menu1_page +"']").addClass("cur");
                $(".subMenu").html(template(_temps,{subTitle:_currMenusel.menu2_name,subMenu:_currMenusel.menu2_arr})).css({marginLeft:0});
                $(".mainCon").css({marginLeft:"200px"});
                $(".subMenu a[data-page='"+ _currMenusel.menu2_page +"']").addClass("cur");
                _subMenuObj = {subTitle:_currMenusel.menu2_name,subMenu:_currMenusel.menu2_arr};
            }
            $(".subMenu a").each(function(){
                if(!comm_fun.isNull($(this).attr("data-url"))){
                    _naviObj.urlReplace(this);
                }
            });
            $(".mainMenu, .subMenu, .mainCon").addClass("trans");
        },

        setSubMenuStatus : function(){
            if(_curr !== null){
                if(_version == "v1" || comm_fun.isNull(_version))$(".subMenu a[data-page='"+ _curr.menu2_cur +"']").addClass("cur").parents("li").addClass("open");
                if(!comm_fun.isNull(_curr.menu3_cur)){
                    $(".subMenu a[data-page='"+ _curr.menu3_cur +"']").addClass("cur");
                    if($(".subMenu a[data-page='"+ _curr.menu3_cur +"']").hasClass("hasChild"))$(".subMenu a[data-page='"+ _curr.menu3_cur +"']").parent().addClass("open");
                }
                if(!comm_fun.isNull(_curr.menu4_cur)){
                    $(".subMenu a[data-page='"+ _curr.menu4_cur +"']").addClass("cur");
                }
            }
        },

        getCurrPageObj : function(_h,_i,_j,_k){
            var _return = {};

            _return.canFind = true;
            _return.levenIdx = [_h];
            _return.menu1_idx = _h;
            _return.menu1_name = this.sideMenu[_h].name;
            _return.menu1_page = this.sideMenu[_h].page;

            _return.menu2_arr = this.sideMenu[_h].childMenu;
            _return.menu2_idx = _i;
            _return.menu2_name = _return.menu2_arr[_i].name;
            _return.menu2_page = _return.menu2_arr[_i].page;

            _return.menu3_arr = _return.menu2_arr[_return.menu2_idx].childMenu && _return.menu2_arr[_return.menu2_idx].childMenu.length > 0 ? _return.menu2_arr[_return.menu2_idx].childMenu : null;
            _return.menu3_idx = _j;
            _return.menu3_name = _return.menu3_arr ? _return.menu3_arr[_j].name : "";
            _return.menu3_page = _return.menu3_arr ? _return.menu3_arr[_j].page : "";

            _return.menu4_arr = _return.menu3_arr && _return.menu3_arr[_return.menu3_idx].childMenu && _return.menu3_arr[_return.menu3_idx].childMenu.length > 0 ? _return.menu3_arr[_return.menu3_idx].childMenu : null;
            _return.menu4_idx = _k;
            _return.menu4_name = _return.menu4_arr ? _return.menu4_arr[_k].name : "";
            _return.menu4_page = _return.menu4_arr ? _return.menu4_arr[_k].page : "";

            return _return;
        },

        canfindPage : function(_hash){
            var _return = null,
                _url = "//"+location.hostname + (location.pathname == "/" ? "" : location.pathname),
                _type = !comm_fun.isNull(_hash) ? "hash" : "url";
            //if(comm_fun.isNull(_hash) && comm_fun.isNull(_url))return null;
            for(var i= 0,len=this.sideMenu.length; i<len; i++){
                if((_type == "hash" && this.sideMenu[i].page == _hash) || (_type == "url" && this.sideMenu[i].url && this.sideMenu[i].url == _url)){
                    _return = this.getCurrPageObj(i,0,0,0);
                    return _return;
                }
                if(this.sideMenu[i].childMenu && this.sideMenu[i].childMenu.length > 0){
                    for(var h=0,hlen=this.sideMenu[i].childMenu.length; h<hlen; h++){
                        if((_type == "hash" && this.sideMenu[i].childMenu[h].page == _hash) || (_type == "url" && this.sideMenu[i].childMenu[h].url && this.sideMenu[i].childMenu[h].url == _url)){
                            _return = this.getCurrPageObj(i,h,0,0);
                            return _return;
                        }
                        if(this.sideMenu[i].childMenu[h].childMenu && this.sideMenu[i].childMenu[h].childMenu.length > 0){
                            for(var j=0,jlen=this.sideMenu[i].childMenu[h].childMenu.length; j<jlen; j++){
                                if((_type == "hash" && this.sideMenu[i].childMenu[h].childMenu[j].page == _hash) || (_type == "url" && this.sideMenu[i].childMenu[h].childMenu[j].url && this.sideMenu[i].childMenu[h].childMenu[j].url == _url)){
                                    _return = this.getCurrPageObj(i,h,j,0);
                                    return _return;
                                }
                                if(this.sideMenu[i].childMenu[h].childMenu[j].childMenu && this.sideMenu[i].childMenu[h].childMenu[j].childMenu.length > 0){
                                    for(var k=0,klen=this.sideMenu[i].childMenu[h].childMenu[j].childMenu.length; k<klen; k++){
                                        if((_type == "hash" && this.sideMenu[i].childMenu[h].childMenu[j].childMenu[k].page == _hash) || (_type == "url" && this.sideMenu[i].childMenu[h].childMenu[j].childMenu[k].url && this.sideMenu[i].childMenu[h].childMenu[j].childMenu[k].url == _url)){
                                            _return = this.getCurrPageObj(i,h,j,k);
                                            return _return;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return _return;
        },

        getMenuStatus : function(_page){
            return this.canfindPage(_page);
        },

        getSubMenu : function(_page){
            for(var i= 0,len=this.sideMenu.length; i<len; i++){
                if(this.sideMenu[i].page == _page){
                    return this.sideMenu[i].childMenu && this.sideMenu[i].childMenu.length > 0 ? this.sideMenu[i].childMenu : null;
                }
                if(this.sideMenu[i].childMenu && this.sideMenu[i].childMenu.length > 0){
                    for(var h=0,hlen=this.sideMenu[i].childMenu.length; h<hlen; h++){
                        if(this.sideMenu[i].childMenu[h].page == _page){
                            return this.sideMenu[i].childMenu;
                        }
                        if(this.sideMenu[i].childMenu[h].childMenu && this.sideMenu[i].childMenu[h].childMenu.length > 0){
                            for(var j=0,jlen=this.sideMenu[i].childMenu[h].childMenu.length; j<jlen; j++){
                                if(this.sideMenu[i].childMenu[h].childMenu[j].page == _page){
                                    return this.sideMenu[i].childMenu;
                                }
                            }
                        }
                    }
                }
            }
            return null;
        },

        headerLinkEvt : function(){
            var _li =$(this).parents("li"),
                _page = $(this).attr("data-page"),
                _url = $(this).attr("data-url"),
                _target = "_blank";
            if($(this).parents(".product").length > 0)return false;
            if($(this).parents(".userCenter").length > 0)return false;
            if($(this).hasClass("logo")){
                comm_fun.openUrl($(this).attr("href"),"_self");
                return false;
            }
            if($(this).hasClass("console_btn")){
                var _script = $("script[src*='Ynavi.js']"),
                    _env = comm_fun.getQueryParam("env",_script.attr("src")),
                    _version = comm_fun.getCookies(_userPin+"version"),
                    _dataCenter = comm_fun.getCookies(_userPin+"areaCode"),
                    _toUrl = "";
                if(_version == "v2"){
                    comm_fun.setCookie(_userPin+"version","v1");
                    _toUrl = _env == "dev" ? "//hosting.jcloud.com:3001" : _env == "test" ? "//func-canary.jcloud.com:3004" : "//inf.jcloud.com";
                }
                else{
                    comm_fun.setCookie(_userPin+"version","v2");
                    _toUrl = "//console.jcloud.com";
                }
                comm_fun.setCookie("currPage","");
                comm_fun.setCookie(_userPin+"adminPin","");
                comm_fun.setCookie(_userPin+"areaCode",comm_fun.getAreaCode(_dataCenter));
                location.href = _toUrl;
                return false;
            }
            if(!comm_fun.isNull(_url)){
                if(_callbackObj[_page])_callbackObj[_page]();
                comm_fun.openUrl(_url);
                return false;
            }
            if($(_li).find(".icon_drop").length > 0){
                $(_li).siblings("li").removeClass("hover");
                $(_li).toggleClass("hover");
                return false;
            }
            else{
                $(_li).siblings("li").removeClass("hover");
                $(_li).addClass("hover");
                return false;
            }
            if(_page == "contact")_naviObj.viewContact();
            return false;
        },

        accountSel : function(_event){
            _event = window.event || _event;
            if(_event.stopPropagation)_event.stopPropagation();
            if(_event.cancelBubble)_event.cancelBubble = true;
            var _name = _userPin + "adminPin",
                _val = $(this).attr("data-pin"),
                _menuParam;
            $("header .company ul a").removeClass("cur");
            $(this).addClass("cur");
            $("header .accStatus dl").html(template(_temp.childAccount,{childNick:_userNick,parentNick:$(this).html()}));
            $("header .account, header .company").hide();
            $("header .accStatus a[data-page='toggleStatus']").hide();
            $("header .accStatus").show();
            $("input[id='adminPin']").length > 0 ? $("input[id='adminPin']").val(_val) : $(".mainCon").append('<input type="hidden" id="adminPin" value="'+ _val +'">');
            _userConfig.adminPin = _val;
            _menuParam = comm_fun.getMenuParam(_userConfig);
            _naviObj.sideMenu = _menuParam.sideMenu;
            _naviObj.fillSideMenu();
            $("header a[data-page='outline']").parent("li").hide();
            if(location.host.indexOf("redis") >= 0){
                _naviObj.toUrl(_redisUrl+"/gz/cloudcache");
            }
            //else if(location.host.indexOf("rds") >= 0){
                //todo
            //}
            else{
                _naviObj.toUrl(_cloudUrl + "/gz/containers");
            }
            return false;
        },

        userCenterEvt : function(_event){
            _event = window.event || _event;
            if(_event.stopPropagation)_event.stopPropagation();
            if(_event.cancelBubble)_event.cancelBubble = true;
            var _page = $(this).attr("data-page");
            var _menuParam;
            if(_page == "childAccount")return false;
            if(_page == "toggleAcc"){
                if($(".company ul a").length > 1){
                    $("header .accStatus a[data-page='toggleStatus']").show();
                    $("header .account").hide();
                    $("header .company").show();
                }
                else if($(".company ul a").length == 1){
                    var _accLink = $(".company ul a").eq(0);
                    $(_accLink).click();
                }
                return false;
            }
            if(_page == "toggleStatus"){
                $("header .accStatus").hide();
                $("header .company").show();
                return false;
            }
            if(_page == "logout"){
                _naviObj.logout();
                return false;
            }
            if(_page == "backCompany"){
                $("header .company").hide();
                $("header .account").show();
                return false;
            }
            if(_page == "recharge" || _page == "userCenter" || _page == "detail"){
                window.open($(this).attr("data-url"),"_blank");
                return false;
            }
            if(_page == "backStatus"){
                $("header a[data-page='outline']").parent("li").hide();
                $("header .accStatus").hide();
                $("header .account").show();
                $("input[id='adminPin']").val("");
                comm_fun.delCookies(_userPin + "adminPin");
                _userConfig.adminPin = "";
                $(".company ul a").removeClass("cur");
                _menuParam = comm_fun.getMenuParam(_userConfig);
                _naviObj.sideMenu = _menuParam.sideMenu;
                _naviObj.fillSideMenu();
                if(location.host.indexOf("redis") >= 0){
                    _naviObj.toUrl(_redisUrl+"/gz/cloudcache");
                }
                //else if(location.host.indexOf("rds") >= 0){
                    //todo
                //}
                else{
                    _naviObj.toUrl(_cloudUrl + "/gz/containers");
                }
                return false;
            }
            return false;
        },

        hideDropMenu : function(_event){
            _event = window.event || _event;
            var _target = _event.target;
            if($(_target).hasClass(".userCenter") || $(_target).parents(".userCenter").length > 0){
                return false;
            }
            $("header li").each(function(){
                if($(this).hasClass("hasChild")){
                    $(this).removeClass("hover")
                }
            });
        },

        viewSubMenuCnt : function(){
            var _page = $(this).attr("data-page"),
                _subTit = $(this).find("span").html(),
                _subMenu = _naviObj.getSubMenu(_page),
                _temps = _version == "v2" ? _temp.subMenu_new : _temp.subMenu;
            if(comm_fun.isNull(_subMenu))return;
            clearTimeout(_subMenuHideHandle);
            if(parseInt($(".subMenu").css("margin-left")) == -149)$(".subMenu").addClass("float");
            $(".subMenu").html(template(_temps,{subTitle:_subTit,subMenu:_subMenu}));
            _naviObj.setSubMenuStatus();
            $(".subMenu a").each(function(){
                _naviObj.urlReplace(this);
            });
        },

        hideSubMenuCnt : function(){
            if(_curr && $(".subMenu h3").html() == _curr.menu2_tit && !$(".subMenu").hasClass("float"))return;
            //_subMenuObj = comm_fun.isNull(_subMenuObj) && _curr ? _curr.menu2 : _subMenuObj;
            _subMenuHideHandle = setTimeout(function(){
                if($(".subMenu").hasClass("float"))$(".subMenu").removeClass("float");
                if(!comm_fun.isNull(_subMenuObj)){
                    $(".subMenu").html(template(_temp.subMenu,{subTitle:_subMenuObj.subTitle,subMenu:_subMenuObj.subMenu}));
                    _naviObj.setSubMenuStatus();
                    $(".subMenu a").each(function(){
                        _naviObj.urlReplace(this);
                    });
                }
                else{
                    $(".subMenu").html("").removeClass("float");
                }
            },50);
        },

        subMenuEvt : function(){
            $("header ul li").removeClass("hover");
            var _isThirdMenu = $(this).parents(".subInMenu").length > 0 ? true : false,
                _page = $(this).attr("data-page"),
                _pageUrl = $(this).attr("data-url"),
                _serviceCode = $(this).attr("data-code");
            if($(this).hasClass("hasChild")){
                $(this).parent().toggleClass("open");
                return false;
            }
            comm_fun.setCookie("currPage",_page);
            if(_isThirdMenu){
                $(this).parents("ul").find("a").removeClass("cur");
                $(this).parents(".subInMenu").prev("a").addClass("cur");
            }
            else{
                $(this).parents("ul").find("li").removeClass("open");
                $(this).parents("ul").find("a").removeClass("cur");
            }
            $(this).addClass("cur");
            if($(this).parents("ul").prev("a").attr("data-page") == "stock" || location.href.indexOf("jfs-console") >= 0){
                _naviObj.toUrl(_pageUrl,_serviceCode,_page);
            }
            else{
                _naviObj.toUrl(_pageUrl,_serviceCode);
            }
            _curr = _naviObj.getMenuStatus(_page);
            return false;
        },

        dropMenuEvt : function(_event){
            _event = window.event || _event;
            if(_event.stopPropagation)_event.stopPropagation();
            if(_event.cancelBubble)_event.cancelBubble = true;
            var _page = $(this).attr("data-page"),
                _pageUrl = $(this).attr("data-url"),
                _serviceCode = $(this).attr("data-code");
            comm_fun.setCookie("currPage",_page);
            _naviObj.toUrl(_pageUrl,_serviceCode);
            return false;
        },

        toggleMainMenu : function(){
            var _width = $(".mainMenu").width();
            $(".mainMenu div").css("overflow","hidden");
            $(".mainMenu ul").width("150px");
            if(_width == 50)$(".mainMenu").removeClass("collapse");
            $(".mainMenu").width(_width == 150 ? "50px" : "150px");
            $(".subMenu").css("left",_width == 150 ? "50px" : "150px");
            $(".mainCon").css("marginLeft",_width == 150 ? ($(".subMenu").hasClass("spread") ? "200px" : "50px") : ($(".subMenu").hasClass("spread") ? "300px" : "150px"));
            setTimeout(function(){
                $(".mainMenu ul").width($(".mainMenu").width()+"px");
                $(".mainMenu .menuBox").css("overflow", $(".mainMenu").width() == 50 ? "visible" : "hidden");
                $(".mainMenu .cur div").css("overflow", $(".mainMenu").width() == 50 ? "visible" : "hidden");
                $(".mainMenu").width() == 50 ? $(".mainMenu").addClass("collapse") : $(".mainMenu").removeClass("collapse") ;
            },200);
            return false;
        },

        spreadMenu : function(){
            var _li = $(this).parent(),
                _selLi = $(_li).siblings(".cur");
            $(_selLi).find("div").css("overflow","hidden");
            $(_selLi).removeClass("cur").find("div").height(0);
            if($(_li).hasClass("cur")){
                $(_li).find("div").css("overflow","hidden");
                $(_li).removeClass("cur").find("div").height(0);
            }
            else{
                $(_li).addClass("cur").find("div").height($(_li).find("ul").height());
            }
            setTimeout(function(){
                if($(_li).hasClass("cur"))$(_li).find("div").css("overflow","visible");
            },200);
            return false;
        },

        setSubmenu : function(){
            var _page = $(this).attr("data-page"),
                _path = $(this).attr("data-path"),
                _url = $(this).attr("data-url"),
                _currMenusel = _naviObj.canfindPage(_page),
                _currUrl = "//" + location.hostname + (location.pathname == "/" ? "" : location.pathname);
            comm_fun.setCookie("currPage",_page);
            if(_url.indexOf(_currUrl) < 0){
                if(_currMenusel && _currMenusel.menu3_arr){
                    _naviObj.toUrl(_currMenusel.menu3_arr[_currMenusel.menu3_idx].url,_currMenusel.menu3_arr[_currMenusel.menu3_idx].serviceCode,_currMenusel.menu3_page);
                }
                else{
                    _naviObj.toUrl(_url,$(this).attr("data-code"),_page);
                }
                return false;
            }
            $(this).parent().addClass("cur").siblings().removeClass("cur");
            if(_currMenusel && _currMenusel.menu3_arr){
                $(".subMenu").html(template(_temp.subMenu_new,{subTitle:_currMenusel.menu2_name,subMenu:_currMenusel.menu3_arr})).removeClass("none").addClass("spread");
                $(".mainCon").css("marginLeft",($(".mainMenu").width() + 150) + "px");
                $(".subMenu a[data-page='"+ _currMenusel.menu3_page +"']").click();
            }
            else{
                $(".subMenu").html("").removeClass("spread").addClass("none");
                $(".mainCon").css("marginLeft",$(".mainMenu").width() + "px");
                _naviObj.toUrl(_url,$(this).attr("data-code"),_page);
            }
            return false;
        },

        toggleSubMenu : function(){
            if(parseInt($(".subMenu").css("margin-left")) == -149){
                if(comm_fun.isNull(_subMenuObj))return false;
                $(".subMenu").removeClass("hide").css({marginLeft:"0"});
                $(".mainCon").css({marginLeft:"200px"});
            }
            else{
                $(".subMenu").css({marginLeft:"-149px"}).addClass("hide");
                $(".mainCon").css({marginLeft: "51px"});
            }
            return false;
        },

        toggleSubMenu_n : function(){
            $(".subMenu").toggleClass("spread");
            $(".mainCon").css("marginLeft",$(".subMenu").hasClass("spread") ? ($(".mainMenu").hasClass("collapse") ? "200px" : "300px") : ($(".mainMenu").hasClass("collapse") ? "50px" : "150px"));
            return false;
        },

        toSubMenu : function(){
            var _page = $(this).attr("data-page"),
                _temps = _version == "v2" ? _temp.subMenu_new : _temp.subMenu;
            _subTitle = $(this).find("span").html();
            _subMenuObj = _naviObj.getSubMenu(_page);
            $(".mainMenu a").removeClass("cur");
            $(this).addClass("cur");
            if(comm_fun.isNull(_subMenuObj)){
                location.hash = _page;
                if(parseInt($(".subMenu").css("margin-left")) == 0){
                    $(".subMenu").animate({marginLeft:"-149px"},300);
                    $(".mainCon").animate({marginLeft:"51px"},300);
                }
                setTimeout(function(){
                    $(".subMenu").html("");
                },300);
            }
            else{
                if(parseInt($(".subMenu").css("margin-left")) == -149){
                    $(".subMenu").animate({marginLeft:"0"},300);
                    $(".mainCon").animate({marginLeft:"200px"},300);
                }
                $(".subMenu").html(template(_temps,{subTitle:_subTitle,subMenu:_subMenuObj}));
                $(".subMenu a").each(function(){
                    if(!comm_fun.isNull($(this).attr("data-url")))_naviObj.urlReplace(this);
                });
                if($(".subMenu a").eq(0).hasClass("hasChild")){
                    $(".subMenu a").eq(0).addClass("cur").parent().addClass("open").find("ul a").eq(0).click();
                }
                else{
                    $(".subMenu a").eq(0).click();
                }
            }
            return false;
        },

        addClick : function(_page,_callback,_cancelDefault){
            _callbackObj[_page] = {};
            _callbackObj[_page].callback = _callback;
            _callbackObj[_page].cancelDefault = _cancelDefault;//true:false是否禁用默认事件
        },

        viewContact : function(){
            $(_temp.contact).appendTo($("body"));
            $(".pop_contact").fadeIn(200);
        },

        hideContact : function(){
            $(".pop_contact").fadeOut(200,function(){
                $(this).remove();
            });
            return false;
        },
        
		ssoCallBackFunc : function(force){
			ssoCount ++;
			if(ssoCount >= 8 || force){
				// 直接使用//inf.jcloud.com作为returnUrl会有问题
				// 如果传入_cloudUrl带有http前缀，直接使用。否则的话认为_cloudUrl以//开头，直接在前面拼接http:或https:
				var _return_cloudUrl = _cloudUrl.indexOf("http") == 0 ? _cloudUrl : location.protocol + _cloudUrl;
				var _returnUrl = location.href.indexOf("uc.jcloud.com") >=0 ? location.href : _return_cloudUrl;
                if(_returnUrl.indexOf("console") >= 0)_returnUrl = "https://console.jcloud.com/";
				window.location.replace("//uc.jcloud.com/redirect/quit?returnUrl="+_returnUrl);
				event.returnValue = false;
			}
		},
		
        logout : function() {
			jQuery.getJSON("http://sso.jd.com" + "/exit?callback=?",function(){_naviObj.ssoCallBackFunc();});
			jQuery.getJSON("http://sso.jcloud.com" + "/exit?callback=?",function(){_naviObj.ssoCallBackFunc();});
			jQuery.getJSON("http://sso.360buy.com" + "/exit?callback=?",function(){_naviObj.ssoCallBackFunc();});
			jQuery.getJSON("http://sso.wangyin.com" + "/exit?callback=?",function(){_naviObj.ssoCallBackFunc();});
			jQuery.getJSON("https://sso.jd.com" + "/exit?callback=?",function(){_naviObj.ssoCallBackFunc();});
			jQuery.getJSON("https://sso.jcloud.com" + "/exit?callback=?",function(){_naviObj.ssoCallBackFunc();});
			jQuery.getJSON("https://sso.360buy.com" + "/exit?callback=?",function(){_naviObj.ssoCallBackFunc();});
			jQuery.getJSON("https://sso.wangyin.com" + "/exit?callback=?",function(){_naviObj.ssoCallBackFunc();});
			setTimeout(function(){
                _naviObj.ssoCallBackFunc(true);
            }, 2000);
		},

        hideLink : function(_name){
            var _link = $("header, .mainMenu, .subMenu").find("a[data-page='"+ _name +"']");
            if(_link.length <= 0)return;
            $(_link).parents("li").hide();
        },

        setUserName : function(_pin){
            $("header a[data-page='user'] span").html(_pin);
            //_userPin = _pin;
        },

        setCurrPage : function(_page){
            _naviObj.setMenuSelect(_page)
        },

        setAccountInfo : function(_balance,_arrears){
            _balance = _balance.toString();
            _arrears = _arrears.toString();
            var _idx;
            if(!comm_fun.isNull(_balance) && !isNaN(Number(_balance))){
                _idx = _balance.indexOf(".")
                var _b1 = _idx > 0 ? _balance.substring(0,_idx) : _balance,
                    _b2 = _idx > 0 ? _balance.substr(_idx+1,2) : "00";
                _b2 = _b2.length == 0 ? "00" : _b2.length == 1 ? _b2 +"0" : _b2;
                $("header .userCenter .userBalance").html("<strong>￥"+ _b1 +".</strong>"+_b2);
            }
            if(comm_fun.isNull(_arrears) || _arrears == 0){
                $("header .userCenter .arrears").html("");
            }
            else{
                _idx = _arrears.indexOf(".")
                var _a1 = _idx > 0 ? _arrears.substring(0,_idx) : _arrears,
                    _a2 = _idx > 0 ? _arrears.substr(_idx+1,2) : "00";
                _a2 = _a2.length == 0 ? "00" : _a2.length == 1 ? _a2 +"0" : _a2;
                $("header .userCenter .arrears").html("欠费：￥"+_a1+"."+_a2);
            }
        },

        setChildAccount : function(_acountArr){
            $("header .userCenter .btn_accToggle").show();
            $("header .userCenter .company ul").html(template(_temp.account,{list:_acountArr}));
        },

        setChildAccSel : function(_pin,_userNick){
            var _accLink = $("header .userCenter .company a[data-pin='"+ _pin +"']");
            $("header .company ul a").removeClass("cur");
            $(_accLink).addClass("cur");
            $("header .accStatus dl").html(template(_temp.childAccount,{childNick:_userNick,parentNick:$(_accLink).html()}));
            $("header .account, header .company").hide();
            $("header .accStatus a[data-page='toggleStatus']").hide();
            $("header .accStatus").show();
        },

        topMenuAdd : function(config){
            _naviObj.topMenu.splice(config.index-1,0,config.menuObj);
            _naviObj.fillTopMenu(true);
        },

        sideMenuAdd : function(config){
            if(isNaN(Number(config.level)))return;
            switch (config.level){
                case 1:
                    _naviObj.sideMenu.splice(config.index1-1,0,config.menuObj);
                    break;
                case 2:
                    _naviObj.sideMenu[config.index1-1].childMenu.splice(config.index2-1,0,config.menuObj);
                    break;
                case 2:
                    _naviObj.sideMenu[config.index1-1].childMenu[config.index2-1].childMenu.splice(config.index3-1,0,config.menuObj);
                    break;
            }
            _naviObj.fillSideMenu();
        },

        getAreaStore : function  (){
            var areaCode=_userPin+"areaCode";
            return  comm_fun.getCookies(areaCode);
        },

        getAllAreaStore : function(){
            var _areaCode=_userPin+"allAreaCode",
                //_jsonVal = comm_fun.getCookies(_areaCode);
                _jsonVal = comm_fun.getStorage(_areaCode);
            try {
                return JSON.parse(_jsonVal);
            }
            catch (e){
                return "";
            }
        },

        toUrl : function(_link,_serviceCode,_page){
            var _dataCenter = comm_fun.getCookies(_userPin+"areaCode") || $("#dataCenter").val(),
                _adminPin = comm_fun.getCookies(_userPin+"adminPin") || $("#adminPin").val(),
                _linkParam = "",
                _allArea = this.getAllAreaStore(),
                _thisDataCenterList ="",
                _linkObj = $(".mainMenu, .subMenu").find("a[data-page='"+ _page +"']"),
                _path = $(_linkObj).attr("path");
            if(window.toRoutePath && _link.indexOf(location.host+location.pathname) >= 0 && !comm_fun.isNull(_path)){
                window.toRoutePath(_path);
                return false;
            }
            if(comm_fun.isNull(_allArea) || comm_fun.isNull(_dataCenter) || comm_fun.isNull(_allArea["all"][_dataCenter]) || _dataCenter == "hbrq"){
                _dataCenter = _version == "v2" ? "bj_02" : "hb";
                comm_fun.setCookie(_userPin+"areaCode", _dataCenter);
                comm_fun.setCookie(_userPin+"areaName", "华北");
            }
            if (comm_fun.isNull(_serviceCode)){
                _linkParam = "dataCenter="+_dataCenter;
                _linkParam += comm_fun.isNull(_adminPin) || _adminPin == "null" ? "" : "&adminPin="+_adminPin;
                location.href = _link.indexOf("jfs-console") >= 0 ? (_link + (comm_fun.isNull(_page) ? "" : "#" + _page)) : (_link + (_link.indexOf("?") >= 0 ? "&" : "?") + _linkParam);
                return false;
            }
            _thisDataCenterList = comm_fun.isNull(_allArea) ? null : comm_fun.isNull(_allArea[_serviceCode]) ? _allArea["all"] : _allArea[_serviceCode];
            if(!comm_fun.isNull(_thisDataCenterList)){
                if(comm_fun.isNull(_thisDataCenterList[_dataCenter])) {
                    _dataCenter = _version == "v2" ? "bj_02" : "hb";
                    comm_fun.setCookie(_userPin+"areaCode", _dataCenter);
                    comm_fun.setCookie(_userPin+"areaName", "华北");
                }
            }
            comm_fun.postHtml(_link,{adminPin:_adminPin,dataCenter:_dataCenter});
            return false;
        },

        mainMenuScrollEvt : function(_event){
            _event = window.event || _event;
            var _scroll = _event.wheelDelta ? _event.wheelDelta : _event.detail ? _event.detail : 0,
                _mt = parseInt($(".menuBox").css("margin-top")),
                _mainMenuHeight = $(".mainMenu").height() - 30,
                _menuboxHeight = $(".menuBox").height();
            if(_menuboxHeight > _mainMenuHeight){
                if(_scroll > 0){
                    $(".menuBox").css("margin-top",_mt < 0 ? (_mt + _scroll) + "px" : 0);
                }
                else{
                    $(".menuBox").css("margin-top",_mt > _mainMenuHeight -_menuboxHeight ? (_mt + _scroll) + "px" : (_mainMenuHeight - _menuboxHeight ) + "px");
                }
            }
        },

        evtInit : function(_param){
            _naviObj = this;
            $("header").on("click","a",this.headerLinkEvt);
            $("header").on("click",".product a",this.dropMenuEvt);
            $("header").on("click",".userCenter a",this.userCenterEvt);
            $("header").on("click",".company ul a",this.accountSel);
            $("body").on("click",this.hideDropMenu);
            if(_param && _param.hideSide)return;
            if(_version == "v2"){
                $(".mainMenu").on("click",".mainMenuToggle",this.toggleMainMenu);
                $(".mainMenu").on("click",".menu1",this.spreadMenu);
                $(".mainMenu").on("click",".cur ul a",this.setSubmenu);
                $(".mainMenu").get(0).addEventListener('DOMMouseScroll',this.mainMenuScrollEvt,false);
                $(".mainMenu").get(0).addEventListener('mousewheel',this.mainMenuScrollEvt,false);
                //$(".mainMenu").on("DOMMouseScroll",this.mainMenuScrollEvt);
                $(".subMenu").on("click"," .subMenuToggle",this.toggleSubMenu_n);
            }
            else{
                $(".mainMenu").on("mouseover","ul a",this.viewSubMenuCnt);
                $(".mainMenu").on("mouseout","ul a",this.hideSubMenuCnt);
                $(".mainMenu").on("click"," ul a",this.toSubMenu);
                $(".subMenu").on("mouseover",function(){
                    clearTimeout(_subMenuHideHandle);
                });
                $(".subMenu").on("mouseout",this.hideSubMenuCnt);
                $(".mainMenu").on("click"," .subMenuToggle",this.toggleSubMenu);
            }
            $(".subMenu").on("click","ul a",this.subMenuEvt);
            $("body").on("click",".pop_contact .btn_close,.pop_contact .btn_ok",this.hideContact);
        },
    };

    _userPin = comm_fun.getCookies("pin");//获取用户pin
    _version = comm_fun.getCookies(_userPin+"version");//新旧菜单cookie值 v1：旧；v2：新；空值：旧
    _consoleLable = comm_fun.getCookies(_userPin+"console_label");

    var _timeParam = comm_fun.getTimeParam();
    comm_fun.add_css(_version == "v2" ? _staticUrl+"/css/Ynavi.css" : _staticUrl+"/css/Ynavi_old.css");
    comm_fun.add_js(_staticUrl+"/js/template.js");
    comm_fun.getJs("//storage.jd.com/console/userConfig.js",_staticUrl+"/js/userConfig.js","config");
    comm_fun.getJs("//storage.jd.com/console/cms/consoleMenu",_staticUrl+"/js/consoleMenu.js","sideMenuObj");
    comm_fun.add_js(_staticUrl+"/js/ga.js");

    var _loadHandle = setInterval(function(){
        try{
            if(!!template && !!config && !!sideMenuObj && $(".YnaviContent").length > 0){
                clearInterval(_loadHandle);
                if(location.pathname == "" || location.pathname == "/")comm_fun.setCookie("currPage","");
                var _script = $("script[src*='Ynavi.js']");
                var _param = comm_fun.getParamFromUrl(_script.attr("src")),//hideSide：隐藏左侧导航
                    _env = comm_fun.getQueryParam("env",_script.attr("src")),
                    _infurl = comm_fun.getQueryParam("infurl",_script.attr("src")),
                    _redisurl = comm_fun.getQueryParam("redisurl",_script.attr("src")),
                    _rdsurl = comm_fun.getQueryParam("rdsurl",_script.attr("src")),
					_monitor_url_param = comm_fun.getQueryParam("monitorurl",_script.attr("src"));
                _userNick = comm_fun.getCookies("unick");//获取用户昵称
                _adminPin = comm_fun.isNull(_userPin) ? "" : comm_fun.getCookies(_userPin+"adminPin");//获取子账户pin
                _adminPin = comm_fun.isNull(_adminPin) || _adminPin == "null" ? $("#adminPin").val() : _adminPin;
                _cloudUrl = _env == "dev" ? "//hosting.jcloud.com:3001" : _env == "test" ? "//func-canary.jcloud.com:3004" : _version == "v2" ? "//console.jcloud.com" : "//inf.jcloud.com";
                _redisUrl = _env == "test" ? "//func-redis-canary.jcloud.com:3002" : "//redis-console.jcloud.com";
                _rdsUrl = _env == "test" ? "//rds-console.jcloud.com" : "//rds-console.jcloud.com";
                _monitorUrl = _env == "test" ? "//monitor.jcloud.com:6001" : "//monitor-console.jcloud.com";
                // 如果设置infurl参数，则忽略env参数
                if (!comm_fun.isNull(_infurl))_cloudUrl = comm_fun.clearUrl(_infurl);
                if(!comm_fun.isNull(_redisurl))_redisUrl = comm_fun.clearUrl(_redisurl);
                if(!comm_fun.isNull(_rdsurl))_rdsUrl = comm_fun.clearUrl(_rdsurl);
                if(!comm_fun.isNull(_monitor_url_param))_monitorUrl = comm_fun.clearUrl(_monitor_url_param);
                _userConfig = {};
                _userConfig.adminPin = _adminPin;
                for(var p in config){
                    if($.isArray(config[p])){
                        _userConfig[p] = config[p].indexOf(_userPin) >= 0 ? true : false;
                    }
                }
                //grayList CDN灰度
                //whiteList 白名单管理灰度
                //liveShowList 视屏直播灰名单
                //vpnGrayList vpn灰名单
                //dockersGray 容器灰名单
                //ipGray 高防ip灰名单
                var _menuObj = comm_fun.getMenuParam(_userConfig,_version);
                window.Ynavi = new Ynavi(_menuObj,"",_param);//初始化顶栏和侧栏，第二项为默认选中菜单，没有为空或null
                window.Ynavi.setUserName(_userNick);
                if(!_param || !_param.hideSide)window.Ynavi.setCurrPage();
                var _dc = comm_fun.getLinkHashParam("DC");
                if(!(comm_fun.isNull(_dc) || _dc == "null" ))window.Ynavi.setVari("DC",_dc);
                $(".mainCon").height($(window).height()-52);
                $(window).on("resize",function(){
                    $(".mainCon").height($(window).height()-52); 
                });
                if(_consoleLable == "2")$('<li class="left"><a href="#" class="console_btn">'+ (_version == "v2" ? "切换至旧网络" : "切换至新网络") +'</a></li>').insertAfter($("header a[data-page='product']").parent());
                !comm_fun.isNull(_adminPin) && _adminPin !== "null" ? $("header a[data-page='outline']").parent("li").hide() : $("header a[data-page='outline']").parent("li").show();
                $.ajax({
                    type:  "GET",
                    url: "//www.jcloud.com/api/uc/balanceAndArrears?callback=?",
                    cache: false,
                    dataType: "jsonp",
                    jsonp: 'jsonCallback',
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        if(data.code !== 0)return;
                        window.Ynavi.setUserName(data.unick);
                        window.Ynavi.setAccountInfo(data.balance,data.arrears);
                    },
                    error: function (data) {
                    }
                });
                //if(_version == "v2")return;
                $.ajax({
                    type:  "GET",
                    url: "//www.jcloud.com/api/uc/queryAccounts?callback=?",
                    cache: false,
                    dataType: "jsonp",
                    jsonp: 'jsonCallback',
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        if(data.code !== 0)return;
                        if(data.accounts == null || data.accounts.length == 0)return;
                        window.Ynavi.setChildAccount(data.accounts);
                        if(!comm_fun.isNull(_adminPin)){
                            window.Ynavi.setChildAccSel(_adminPin,_userNick);
                        }
                    },
                    error: function (data) {
                    }
                });
            }
        }
        catch (_err){
            console.log(_err)
        }
    },100);
})(window);


