export default {
    install (Vue) {
        // 弹出层公用皮肤
        layer.config({
            extend: ['skin/moon/style.css'], // 加载新皮肤
            skin: 'layer-ext-moon' // 一旦设定，所有弹层风格都采用此主题。
        });
        /**
         * 新建文件夹
         */
        Vue.prototype.layerNewFolder = (title, sCb, eCb) => {
            if (!layer) return;
            layer.open({
                title: title,
                type: 1,
                content: $('.newFolder'),
                area: '610px',
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    sCb && sCb.call(this, layero, index);
                },
                end: function () {
                    eCb && eCb.call(this);
                }
            });
            return layer;
        };
        /**
         * 提示框
         */
        Vue.prototype.layerMsg = (msg, icon, timeout, callback) => {
            if (!layer) return;
            layer.msg(msg, {
                icon: icon || 0,
                time: timeout || 3000 // 3秒关闭
            }, function () {
                callback && callback.call(this);
            });
        };

        /**
         * 删除提示框
         */
        Vue.prototype.deleteLayerPro = (sCb, eCb) => {
            if (!layer) return;
            layer.open({
                title: '删除',
                type: 1,
                content: $('.delete-layer'),
                area: '520px',
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    sCb && sCb.call(this, layero, index);
                },
                end: function () {
                    eCb && eCb.call(this);
                }
            });
        };

        /**
         * 确认操作
         */
        Vue.prototype.layerConfirm = (title, msg, sCb, eCb) => {
            if (!layer) return;
            layer.open({
                title: title,
                type: 1,
                content: '<div class="popup layui-layer-wrap"><div class="textCon f14">' + msg + '</div></div>',
                area: '460px',
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    sCb && sCb.call(this, layero, index);
                },
                end: function () {
                    eCb && eCb.call(this);
                }
            });
            return layer;
        };
        /**
         * 保存提示
         */
        Vue.prototype.layerSaveConfirm = (title, msg, sCb, eCb, cCb) => {
            if (!layer) return;
            layer.open({
                title: title,
                type: 1,
                content: '<div class="popup layui-layer-wrap"><div class="textCon f14">' + msg + '</div></div>',
                area: '460px',
                btn: ['保存','取消','不保存'],
                yes: function (index, layero) {
                    sCb && sCb.call(this, layero, index);
                },
                btn3: function () {
                    eCb && eCb.call(this);
                },
                cancel: function () {
                    cCb && cCb.call(this);
                }
            });
            return layer;
        };
        /**
         * 新建报表
         */
        Vue.prototype.layerNewReport = (title, sCb, eCb) => {
            if (!layer) return;
            layer.open({
                title: title,
                type: 1,
                content: $('.newReport'),
                area: '610px',
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    sCb && sCb.call(this, layero, index);
                },
                end: function () {
                    eCb && eCb.call(this);
                }
            });
            return layer;
        };
        /**
         * 添加数据源
         */
        Vue.prototype.layerAddDatasource = (sCb, eCb) => {
            if (!layer) return;
            layer.open({
                title: '添加数据源',
                type: 1,
                content: $('.addSource'),
                area: '610px',
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    sCb && sCb.call(this, layero, index);
                },
                end: function () {
                    eCb && eCb.call(this);
                }
            });
            return layer;
        };
        /**
         * 编辑工作表
         */
        Vue.prototype.layerEditWorksheet = (sCb, eCb) => {
            if (!layer) return;
            layer.open({
                title: '编辑工作表',
                type: 1,
                content: $('.editWorksheet'),
                area: '610px',
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    sCb && sCb.call(this, layero, index);
                },
                end: function () {
                    eCb && eCb.call(this);
                }
            });
            return layer;
        };
        /**
         * 编辑工作表
         */
        Vue.prototype.layerEditWorksheet2 = (sCb, eCb) => {
            if (!layer) return;
            layer.open({
                title: '编辑工作表',
                type: 1,
                content: $('.editWorksheet2'),
                area: '610px',
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    sCb && sCb.call(this, layero, index);
                },
                cancel: function () {
                    eCb && eCb.call(this);
                }
            });
            return layer;
        };
        /**
         * 重命名
         */
        Vue.prototype.layerRename = (sCb, eCb) => {
            if (!layer) return;
            layer.open({
                title: '重命名',
                type: 1,
                content: $('.addRechristen'),
                area: '610px',
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    sCb && sCb.call(this, layero, index);
                },
                end: function () {
                    eCb && eCb.call(this);
                }
            });
            return layer;
        };
            /**
             * 选择工作表
             */
        Vue.prototype.layerSelectWorksheet = (sCb, eCb) => {
            if (!layer) return;
            layer.open({
                title: '选择工作表',
                type: 1,
                content: $('.selectWorksheet'),
                area: '610px',
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    sCb && sCb.call(this, layero, index);
                },
                end: function () {
                    eCb && eCb.call(this);
                }
            });
            return layer;
        };
        /**
         * 移动
         */
        Vue.prototype.layerMoveSheet = (sCb, eCb) => {
            if (!layer) return;
            layer.open({
                title: '移动',
                type: 1,
                content: $('.moveSheet'),
                area: '610px',
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    sCb && sCb.call(this, layero, index);
                },
                end: function () {
                    eCb && eCb.call(this);
                }
            });
            return layer;
        };
        /**
         * 复制
         */
        Vue.prototype.layerCopySheet = (sCb, eCb) => {
            if (!layer) return;
            layer.open({
                title: '复制',
                type: 1,
                content: $('.addCopy'),
                area: '610px',
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    sCb && sCb.call(this, layero, index);
                },
                end: function () {
                    eCb && eCb.call(this);
                }
            });
            return layer;
        };
        /**
         * 分享
         */
        Vue.prototype.layerShare = (sCb, eCb) => {
            if (!layer) return;
            layer.open({
                title: '分享',
                type: 1,
                content: $('.addShare'),
                area: '560px',
                btn: ['查看分享', '取消'],
                yes: function (index, layero) {
                    sCb && sCb.call(this, layero, index);
                },
                end: function () {
                    eCb && eCb.call(this);
                }
            });
            return layer;
        };
        /**
         * 展现sql规则
         */
        Vue.prototype.layerShowRule = () => {
            if (!layer) return;
            layer.open({
                title: '语法规则',
                area: ['560px', '400px'],
                content: "1:仅支持select查询语句,不支持insert、drop、delete等非查询语句</br>2:查询的工作表不支持别名,查询的结果字段别名不支持中文</br>3:查询工作表时,使用${}来表示某一个工作表,其中{}内使用工作表名表示,工作表名见工作表列表</br>4:查询多个工作表时,需要在查询字段前增加工作表名</br>5:SQL输出字段名称不允许重复,计算字段需显式指定别名,别名不能包括'().'等特殊字符（目前仅支持_）</br>6:子句支持:</br>[ FROM from_item [, ...] ]</br>[ WHERE condition ]</br>[ GROUP BY expression [, ...] ]</br>[ HAVING condition]</br>[ UNION [ ALL | DISTINCT ] select ]</br>[ ORDER BY expression [ ASC | DESC ] [, ...] ]</br>[ LIMIT count ]</br>#SQL创建界面中只显示10行数据, limit只作用于实际数据结果</br>#limit默认为1000最大支持10000行数据</br>from_item 为以下</br>from_item join_type from_item [ ON join_condition | USING ( join_column [, ...] ) ]</br>示例:</br>select column1 from ${工作表1}</br>select 工作表1.column1 from ${工作表1}</br>select 工作表1.column1 as aliasName1 from ${工作表1}</br>select 工作表1.column1, 工作表2.column2 from ${工作表1} left join ${工作表2} on 工作表1.id = 工作表2.id</br>select count(工作表1.column1) as column_1 from ${工作表1}"
            });
            return layer;
        };
        /**
         * 是否保存
         */
        Vue.prototype.layerSaveData = (sCb, eCb) => {
            if (!layer) return;
            layer.open({
                title: '提示',
                type: 1,
                content: '<div class="popup textCon">当前编辑未保存，是否离开?</div>',
                area: '560px',
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    sCb && sCb.call(this, layero, index);
                },
                end: function () {
                    eCb && eCb.call(this);
                }
            });
            return layer;
        };
        /**
         * 无工作表提示添加
         */
        Vue.prototype.layerNoSheet = (sCb, eCb) => {
            if (!layer) return;
            layer.open({
                title: '提示',
                type: 1,
                content: '<div class="popup textCon">暂无工作表，请SQL创建或从数据源添加</div>',
                area: '560px',
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    sCb && sCb.call(this, layero, index);
                },
                end: function () {
                    eCb && eCb.call(this);
                }
            });
            return layer;
        };
        /**
         * 设置字段
         */
        Vue.prototype.layerSetField = (sCb, eCb) => {
            if (!layer) return;
            layer.open({
                title: '设置字段',
                type: 1,
                content: $('.setField'),
                area: '610px',
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    sCb && sCb.call(this, layero, index);
                },
                end: function () {
                    eCb && eCb.call(this);
                }
            });
            return layer;
        };
        /**
         * 报错
         */
        Vue.prototype.layerError = (msg) => {
            if (!layer) return;
            layer.open({
                title: '提示',
                type: 1,
                content: '<div class="popup setTip"><div class="f14">' +
                        '<p class="mb20 tcenter">运行错误，请重新尝试或检查设置是否正确！' +
                        '<a class="blueLink" onclick="$(\'.border-ch\').toggle()">查看详细</a></p>' +
                        '<div class="border-ch" style="display:none"><p class="scrollDiv">' +
                        msg +
                        '</p></div></div></div>',
                area: '610px',
                btn: ['关闭']
            });
            return layer;
        };
        /**
         * 选择日期
         */
        Vue.prototype.layerDate = (sCb, eCb) => {
            if (!layer) return;
            layer.open({
                title: '选择日期',
                type: 1,
                content: $('.selectDate'),
                area: '610px',
                // btn: ['确定', '取消'],
                yes: function (index, layero) {
                    sCb && sCb.call(this, layero, index);
                },
                end: function () {
                    eCb && eCb.call(this);
                }
            });
            return layer;
        };
        /**
         * 报错
         */
        Vue.prototype.layerTable = () => {
            if (!layer) return;
            layer.open({
                title: '详情',
                type: 1,
                content: $('.layer-table'),
                area: '910px',
                btn: ['关闭']
            });
            return layer;
        };
        /**
         * 新建，重命名，复制大屏
         */
        Vue.prototype.layerScreen = (title,sCb, eCb) => {
            if (!layer) return;
            layer.open({
                title: title,
                type: 1,
                content: $('.layerScreen'),
                area: '460px',
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    sCb && sCb.call(this, layero, index);
                },
                end: function () {
                    eCb && eCb.call(this);
                }
            });
            return layer;
        },
        /**
         * 删除大屏提示
         */
        Vue.prototype.layerDelScreen = (sCb, eCb) => {
            if (!layer) return;
            layer.open({
                title: '删除',
                type: 1,
                content: $('.delScreen'),
                area: '520px',
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    sCb && sCb.call(this, layero, index);
                },
                end: function () {
                    eCb && eCb.call(this);
                }
            });
        },
        /**
         * 发布大屏
         */
        Vue.prototype.layerPubScreen = (sCb, eCb) => {
            if (!layer) return;
            layer.open({
                title: '发布',
                type: 1,
                content: $('.pubScreen'),
                area: '520px',
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    sCb && sCb.call(this, layero, index);
                },
                cancel: function () {
                    eCb && eCb.call(this);
                }
            });
        },
        /**
         * 查看数据
         */
        Vue.prototype.layerLookData = (sCb, eCb) => {
            if (!layer) return;
            layer.open({
                title: '查看数据',
                type: 1,
                content: $('.lookData'),
                area: '520px',
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    sCb && sCb.call(this, layero, index);
                },
                end: function () {
                    eCb && eCb.call(this);
                }
            });
        };
        /**
         * 新建，重命名，复制大屏
         */
        Vue.prototype.layerPassword = (sCb, eCb) => {
            if (!layer) return;
            layer.open({
                title: '输入密码',
                type: 1,
                content: $('.layerPassword'),
                area: '610px',
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    sCb && sCb.call(this, layero, index);
                },
                end: function () {
                    eCb && eCb.call(this);
                }
            });
            return layer;
        };
    }
};
