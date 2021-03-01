// 写全局函数
exports.install = function (Vue, options) {
    Vue.prototype.headNodeClick = function (headquarter_name) {//全局函数1,点击树形控件的总部，查询该总部的大屏信息
        let param = new URLSearchParams();
        param.append('headquarter_name', headquarter_name);
        this.$store.commit('get_headquarter/changeParams', {params: param})
        //总部名称也需要封装
        this.$store.commit('get_headquarter/changeHeadName', {head_name: headquarter_name})
        //显示整个总部检查后的总体危险指数以及各专业对应的危险指数
        this.$store.dispatch('get_headquarter/getInitRiskIndexData')
        //展示总部各风险等级及其对应的隐患数量
        this.$store.dispatch('get_headquarter/getInitRiskLevelData')
        //根据风险指数对区域进行排序
        this.$store.dispatch('get_headquarter/getInitRiskIndexData')
        //显示每个区域的高风险数量
        this.$store.dispatch('get_headquarter/getInitRiskNumberRank')

        //筛选，默认发condition: major, top: 5
        let param3 = new URLSearchParams();
        param3.append('headquarter_name', headquarter_name);
        param3.append('condition', 'major');
        param3.append('top', 5);
        this.$store.commit('get_headquarter/changeParam3', {params: param3})
        //显示在不同条件(专业/系统)下隐患数量排名前top的隐患
        this.$store.dispatch('get_headquarter/getInitNumberTop')
        //按年份显示总部的高中低风险等级对应的隐患数量
        this.$store.dispatch('get_headquarter/getHeadRiskLevelYear')

        //筛选，默认发condition: stage,all top: 5
        let param4 = new URLSearchParams();
        param4.append('headquarter_name', headquarter_name);
        param4.append('condition', 'risk_level');
        param4.append('level', 'all');
        param4.append('top', 5);
        this.$store.commit('get_headquarter/changeParam4', {params: param4})
        //显示在不同条件（风险等级/致因阶段/分布区域）下隐患数量排名前top的隐患
        this.$store.dispatch('get_headquarter/getHeadOtherNumberTop')
        //按照检查次数对区域排名
        this.$store.dispatch('get_headquarter/getHeadCheckRank')
        //各专业隐患数量占比
        this.$store.dispatch('get_headquarter/getHeadMajorRatio')
        // 各致因阶段的隐患数量占比情况
        this.$store.dispatch('get_headquarter/getHeadStageRatio')
        // 各分布区域的隐患数量占比情况
        this.$store.dispatch('get_headquarter/getHeadAreaRatio')
        // 展示按照项目数量对区域排名
        this.$store.dispatch('get_headquarter/getHeadProjectRank')
    };
    Vue.prototype.regionNodeClick = function (region_name) {//全局函数2,点击树形控件的区域，查询该区域的大屏信息
        let param = new URLSearchParams();
        param.append('region_name', region_name);
        this.$store.commit('get_region/changeParams', {params: param})
        //区域名称也需要封装
        this.$store.commit('get_region/changeRegionName', {region_name: region_name})
        //显示该区域整体安全指数以及各专业安全指数
        this.$store.dispatch('get_region/getRegionInitIndex')
        //显示该区域各风险等级对应的隐患数量
        this.$store.dispatch('get_region/getInitRegionRiskLevel')
        //按照年份显示该区域各等级风险对应的隐患数量
        this.$store.dispatch('get_region/getRegionRiskLevelYear')
        //显示该区域最新出现的10张未整改高风险隐患图片及该图片对应的检查名称和隐患描述
        this.$store.dispatch('get_region/getInitRegionImage')

        //筛选，默认发condition: major, top: 5
        let param3 = new URLSearchParams();
        param3.append('region_name', region_name);
        param3.append('condition', 'major');
        param3.append('top', 5);
        this.$store.commit('get_region/changeParam3', {params: param3})
        //显示在不同筛选条件（专业/系统）下隐患数量排名前top的隐患描述
        this.$store.dispatch('get_region/getInitRegionNumberTop')

        //筛选，默认发condition: stage,all top: 5
        let param4 = new URLSearchParams();
        param4.append('region_name', region_name);
        param4.append('condition', 'risk_level');
        param4.append('level', 'all');
        param4.append('top', 5);
        this.$store.commit('get_region/changeParam4', {params: param4})
        //显示在不同筛选条件（风险等级/致因阶段/分布区域）下隐患数量排名前top的隐患描述
        this.$store.dispatch('get_region/getRegionOtherTop')
        //显示按照安全指数排名后的 项目名称
        this.$store.dispatch('get_region/getInitRegionSafetyIndex')
        //显示按照隐累计高风险患数量排名后的项目名称 (原来的项目累计高风险数量排名)
        this.$store.dispatch('get_region/getInitRegionRiskRank')
        // //基于该区域每个项目的检查次数对项目排名
        this.$store.dispatch('get_region/getRegionCheckRank')
        //显示该区域各专业隐患占比情况
        this.$store.dispatch('get_region/getRegionMajorRatio')

        //以下三项筛选专业，默认发全部传all
        let param2 = new URLSearchParams();
        param2.append('region_name', region_name);
        param2.append('major', 'all');
        //该检查中在不同专业下属于不同隐患子系统的隐患数量
        this.$store.commit('get_region/changeParam2', {params: param2})
        //显示该区域不同专业下各系统隐患占比情况
        this.$store.dispatch('get_region/getRegionSystemRatio')
        //根据隐患数量显示不同致因阶段的占比情况
        this.$store.dispatch('get_region/getRegionStageRatio')
        //根据隐患数量显示不同分布区域的占比情况
        this.$store.dispatch('get_region/getRegionAreaRatio')
        //根据隐患数量显示不同风险等级的占比情况
        // this.$store.dispatch('get_region/getRegionLevelRatio')
    };
    Vue.prototype.prjNodeClick = function (project_name) {//全局函数3,点击树形控件的项目，查询该项目的大屏信息
        let param = new URLSearchParams();
        param.append('project_name', project_name);
        this.$store.commit('get_project/changeParams', {params: param})
        //项目名称也需要封装
        this.$store.commit('get_project/changePrjName', {prj_name: project_name})
        //显示项目中各风险等级及其对应的隐患数量
        this.$store.dispatch('get_project/getInitProjectRiskLevel')
        //显示项目中各风险等级及其对应的隐患数量,按年份
        this.$store.dispatch('get_project/getProjectRiskLevelYear')
        //基于项目级展示不同专业隐患占比情况
        this.$store.dispatch('get_project/getInitProjectHistoryPerception')

        //筛选，默认发top: 5
        let param5 = new URLSearchParams();
        param5.append('project_name', project_name);
        param5.append('top', 5);
        this.$store.commit('get_project/changeParam5', {params: param5})
        //基于项目级展示当前项目中最近一次检查top张高风险隐患图片
        this.$store.dispatch('get_project/getInitProjectImage')

        //以下三项筛选专业，默认发全部传all
        let param2 = new URLSearchParams();
        param2.append('project_name', project_name);
        param2.append('major', 'all');
        this.$store.commit('get_project/changeParam2', {params: param2})
        //基于项目级展示在不同专业下属于不同隐患子系统的隐患数量
        this.$store.dispatch('get_project/getInitProjectSystem')
        //基于项目级显示在不同专业情况下在不同致因阶段的隐患数量
        this.$store.dispatch('get_project/getInitProjectReason')
        //基于项目级显示在不同专业情况下，隐患区域分布的情况
        this.$store.dispatch('get_project/getInitProjectRegionDistribution')

        //筛选，默认发condition: major, top: 5
        let param3 = new URLSearchParams();
        param3.append('project_name', project_name);
        param3.append('condition', 'major');
        param3.append('top', 5);
        this.$store.commit('get_project/changeParam3', {params: param3})
        //基于项目级显示在不同筛选条件（专业/系统/设备/组件）下，出现次数排名前top的隐患描述
        this.$store.dispatch('get_project/getInitProjectRiskTop')

        //筛选，默认发condition: stage,all top: 5
        let param4 = new URLSearchParams();
        param4.append('project_name', project_name);
        param4.append('condition', 'risk_level');
        param4.append('level', 'all');
        param4.append('top', 5);
        this.$store.commit('get_project/changeParam4', {params: param4})
        //基于项目级显示在不同筛选条件（风险等级/致因阶段/分布区域）下，出现次数排名前top的隐患描述
        this.$store.dispatch('get_project/getProjectOtherTop')
        //基于项目级隐患次数排名前10的系统名称
        this.$store.dispatch('get_project/getProjectSystemNumber')
        //基于项目级隐患次数排名前10的设备名称
        this.$store.dispatch('get_project/getProjectDeviceNumber')
        //基于项目级隐患次数排名前10的组件名称
        this.$store.dispatch('get_project/getProjectUnitNumber')
        // 基于项目级显示违反次数排名前10的法规、违反次数及其相关条款号和内容
        this.$store.dispatch('get_project/getProjectRules')
        // this.map.setZoom(4)
        // setTimeout(function () {
        //   this.map.panTo(new L.LatLng(34, 107));
        // }, 100)
    };
    Vue.prototype.checkNodeClick = function (check_code) {//全局函数4,点击树形控件的检查，查询该检查的大屏信息
        let param1 = new URLSearchParams();
        param1.append('check_code', check_code);
        this.$store.commit('get_check/changeParams', {params: param1})
        //check_code也需要封装
        this.$store.commit('get_check/changeCheckCode', {check_code: check_code})
        // this.$store.dispatch('get_check/getCheckRectification')
        // this.$store.dispatch('get_check/getCheckHighRisk')

        //展示不同风险等级的隐患数量
        this.$store.dispatch('get_check/getCheckRiskLevel')
        //按年份展示不同风险等级的隐患数量
        this.$store.dispatch('get_check/getCheckLevelYear')
        //该检查中不同专业隐患占比情况
        this.$store.dispatch('get_check/getCheckRiskRatio')
        //该检查中当前未整改高风险隐患图片
        this.$store.dispatch('get_check/getCheckHighImage')

        //以下三项筛选专业，默认发全部传all
        let param2 = new URLSearchParams();
        param2.append('check_code', check_code);
        param2.append('major', 'all');
        //该检查中在不同专业下属于不同隐患子系统的隐患数量
        this.$store.commit('get_check/changeParam2', {params: param2})
        this.$store.dispatch('get_check/getCheckMajorSystem')
        //该检查中在不同专业情况下在不同致因阶段的隐患数量
        this.$store.dispatch('get_check/getCheckMajorStage')
        //该检查中在不同专业情况下，隐患区域分布的情况
        this.$store.dispatch('get_check/getCheckMajorArea')
        // //得到数据后先把专业封装了
        // let data = this.$store.state.get_check.check_system
        // console.log("有没有", data)
        // let count = 0
        // let major = []
        // for (let i in data) {
        //     let obj = {
        //         label: '',
        //         value: 0
        //     }
        //     obj.value = count++;
        //     obj.label = i;
        //     major.push(obj)
        // }
        // let obj = {
        //     value: count++,
        //     label: '全部专业'
        // }
        // major.push(obj)
        // this.$store.commit('get_check/changeAllMajors', {all_majors: major})

        //筛选，默认发condition: major, top: 5
        let param3 = new URLSearchParams();
        param3.append('check_code', check_code);
        param3.append('condition', 'major');
        param3.append('top', 5);
        this.$store.commit('get_check/changeParam3', {params: param3})
        //在当前检查中，不同筛选条件（专业/系统/设备/组件）下，出现次数排名前top的隐患描述及其出现次数
        this.$store.dispatch('get_check/getCheckRiskTop')

        //筛选，默认发condition: stage,all top: 5
        let param4 = new URLSearchParams();
        param4.append('check_code', check_code);
        param4.append('condition', 'risk_level');
        param4.append('level', 'all');
        param4.append('top', 5);
        this.$store.commit('get_check/changeParam4', {params: param4})
        // 在当前检查中，不同筛选条件（风险等级/致因阶段/分布区域）下，出现次数排名前top的隐患描述及其出现次数
        this.$store.dispatch('get_check/getCheckOtherTop')
        // 在当前检查中,显示违反次数排名前10的法规、违反次数及其相关条款号和内容
        this.$store.dispatch('get_check/getCheckRule')
        //显示在当前检查中隐患次数排名前10的系统名称
        this.$store.dispatch('get_check/getCheckSystem')
        //显示在当前检查中隐患次数排名前10的设备名称
        this.$store.dispatch('get_check/getCheckDevice')
        //显示在当前检查中隐患次数排名前10的组件名称
        this.$store.dispatch('get_check/getCheckUnit')
    };
    Vue.prototype.handleTreeNodeClick = function (data, node) {//全局函数5,点击树形控件，查看页面权限，决定页面展示
        if (this.$store.state.get_login.grant_data.data.user_grant === '项目') {
            if ((node.level == 1) || (node.level == 2)) {
                alert("您没有权限")
            } else if (node.level == 3) {
                this.prjNodeClick(data.label)
                document.getElementById('prj_subpart').style.display = 'block'
                document.getElementById('check_part').style.display = 'none'
                document.getElementById('map_1').style.display = 'none'
                document.getElementById('map_2').style.display = 'block'
                document.getElementById('prj_charts').style.display = 'block'
                document.getElementById('check_charts').style.display = 'none'
            } else if (node.level == 4) {
                this.checkNodeClick(data.label)
                //首先要判断当前是在数据大屏页面还是在主页面
                // if (document.getElementById("prj_small").style.display === 'none') {//在主页面
                document.getElementById("prj_subpart").style.display = 'none'
                document.getElementById("prj_charts").style.display = 'none'
                document.getElementById("check_charts").style.display = 'block'
                document.getElementById("check_part").style.display = 'block'
                // } else {
                //     document.getElementById("prj_subpart").style.display = 'none'
                //     document.getElementById("prj_charts").style.display = 'none'
                //     document.getElementById("check_charts").style.display = 'block'
                //     document.getElementById("check_part").style.display = 'block'
                //     // document.getElementById("large1").style.display = 'none'
                //     // document.getElementById("large2").style.display = 'none'
                // }
            }
        } else if (this.$store.state.get_login.grant_data.data.user_grant === '区域') {
            if (node.level == 1) {
                alert("您没有权限")
            } else if (node.level == 2) {
                this.regionNodeClick(data.label)
                document.getElementById('region').style.display = 'block'
                document.getElementById('prj_part').style.display = 'none'
            } else if (node.level == 3) {//区域=》项目
                this.prjNodeClick(data.label)
                //修改可视化系统首页标题
                document.getElementById('prj_title1').innerHTML = document.getElementById('region_title1').innerHTML
                document.getElementById('prj_title2').innerHTML = document.getElementById('region_title2').innerHTML
                document.getElementById('prj_title3').innerHTML = data.label
                //修改数据大屏页面标题
                document.getElementById('prj_title1_1').innerHTML = document.getElementById('region_title1').innerHTML
                document.getElementById('prj_title2_1').innerHTML = document.getElementById('region_title2').innerHTML
                document.getElementById('prj_title3_1').innerHTML = data.label
                //首先要判断当前是在数据大屏页面还是在主页面=》不用再判断了，大屏页面没有树形控件
                document.getElementById('region').style.display = 'none'
                document.getElementById('prj_part').style.display = 'block'
                document.getElementById("prj_subpart").style.display = 'block'
                document.getElementById("check_part").style.display = 'none'
            } else if (node.level == 4) {//区域=》检查
                this.checkNodeClick(data.label)
                //修改可视化系统首页标题与项目级共用，仅修改数据大屏页面标题
                document.getElementById('check_title1').innerHTML = document.getElementById('region_title1').innerHTML
                document.getElementById('check_title2').innerHTML = document.getElementById('region_title2').innerHTML
                document.getElementById('check_title3').innerHTML = document.getElementById('prj_title3').innerHTML
                document.getElementById('region').style.display = 'none'
                document.getElementById('prj_part').style.display = 'block'
                document.getElementById("prj_subpart").style.display = 'none'
                document.getElementById("check_part").style.display = 'block'
            }
        } else if (this.$store.state.get_login.grant_data.data.user_grant === '总部') {
            if (node.level == 1) {//总部=》总部
                this.headNodeClick(data.label)
                document.getElementById('head_quarter').style.display = 'block'
                document.getElementById('region_part').style.display = 'none'
            } else if (node.level == 2) {//总部=》区域
                this.regionNodeClick(data.label)
                //修改可视化系统首页标题
                document.getElementById('region_title1').innerHTML = document.getElementById('head_title1').innerHTML
                document.getElementById('region_title2').innerHTML = data.label
                //修改数据大屏页面标题
                document.getElementById('region_title1_1').innerHTML = document.getElementById('head_title1').innerHTML
                document.getElementById('region_title2_1').innerHTML = data.label
                //首先要判断当前是在数据大屏页面还是在主页面=>不需要再判断了，大屏页面不要树形控件
                document.getElementById('head_quarter').style.display = 'none'
                document.getElementById('region_part').style.display = 'block'
                document.getElementById('region').style.display = 'block'
                document.getElementById('prj_part').style.display = 'none'
                //为了画出多边形，要重新封装该区域的数据
                let r_p = [];
                for (let i in data['children']) {
                    // alert(data['children'][i])
                    console.log(data['children'][i]['pos'])
                }
                var container = L.DomUtil.get('map_3');
                if (container != null) {
                    container._leaflet_id = null;
                }
                this.map = new L.map("map_3");
                // this.map.setView([30,30], 6)
                // this.map = L.map("map_3", {
                //   center: [34, 107], // 地图中心
                //   zoom: 4, //缩放比列
                //   zoomControl: false, //禁用 + - 按钮
                //   // doubleClickZoom: false, // 禁用双击放大
                //   attributionControl: false // 移除右下角leaflet标识
                // });
                // this.map.panTo(data.pos[0], data.pos[1])
            } else if (node.level == 3) {//总部=》项目
                this.prjNodeClick(data.label)
                //修改可视化系统首页标题
                document.getElementById('prj_title1').innerHTML = document.getElementById('head_title1').innerHTML
                document.getElementById('prj_title2').innerHTML = document.getElementById('region_title2').innerHTML
                document.getElementById('prj_title3').innerHTML = data.label
                //修改数据大屏页面标题
                document.getElementById('prj_title1_1').innerHTML = document.getElementById('head_title1').innerHTML
                document.getElementById('prj_title2_1').innerHTML = document.getElementById('region_title2').innerHTML
                document.getElementById('prj_title3_1').innerHTML = data.label
                document.getElementById("head_quarter").style.display = 'none'
                document.getElementById('region_part').style.display = 'block'
                document.getElementById('region').style.display = 'none'
                document.getElementById('prj_part').style.display = 'block'
                document.getElementById("prj_subpart").style.display = 'block'
                document.getElementById('check_part').style.display = 'none'
            } else if (node.level == 4) {//总部=》检查
                this.checkNodeClick(data.label)
                // document.getElementById('check_title1').innerHTML = document.getElementById('head_title1').innerHTML
                // document.getElementById('check_title2').innerHTML = document.getElementById('region_title2').innerHTML
                // document.getElementById('check_title3').innerHTML = document.getElementById('project_title3').innerHTML
                document.getElementById('prj_title1_1').innerHTML = document.getElementById('head_title1').innerHTML
                document.getElementById('prj_title2_1').innerHTML = document.getElementById('region_title2').innerHTML
                document.getElementById('prj_title3_1').innerHTML = document.getElementById('prj_title3').innerHTML
                document.getElementById("head_quarter").style.display = 'none'
                document.getElementById('region_part').style.display = 'block'
                document.getElementById('region').style.display = 'none'
                document.getElementById('prj_part').style.display = 'block'
                document.getElementById("prj_subpart").style.display = 'none'
                document.getElementById('check_part').style.display = 'block'
            }
        } else if (this.$store.state.get_login.grant_data.data.user_grant = "超级用户") {
            if (node.level == 1) {//总部=》总部
                this.headNodeClick(data.label)
                setTimeout(() => {
                    document.getElementById('head_title1').innerHTML = data.label
                    document.getElementById('head_title2').innerHTML = data.label
                    document.getElementById('head_quarter').style.display = 'block'
                    document.getElementById('region_part').style.display = 'none'
                }, 200);
            } else if (node.level == 2) {//总部=》区域
                this.regionNodeClick(data.label)
                document.getElementById('region_title1').innerHTML = document.getElementById('head_title1').innerHTML
                document.getElementById('region_title2').innerHTML = data.label
                // console.log("检查", data)
                // console.log(node)
                //首先要判断当前是在数据大屏页面还是在主页面=>不需要再判断了，大屏页面不要树形控件
                document.getElementById('head_quarter').style.display = 'none'
                document.getElementById('region_part').style.display = 'block'
                document.getElementById('region').style.display = 'block'
                document.getElementById('prj_part').style.display = 'none'
                //为了画出多边形，要重新封装该区域的数据
                let r_p = [];
                for (let i in data['children']) {
                    // alert(data['children'][i])
                    console.log(data['children'][i]['pos'])
                }
                var container = L.DomUtil.get('map_3');
                if (container != null) {
                    container._leaflet_id = null;
                }
                this.map = new L.map("map_3");
                // this.map.setView([30,30], 6)
                // this.map = L.map("map_3", {
                //   center: [34, 107], // 地图中心
                //   zoom: 4, //缩放比列
                //   zoomControl: false, //禁用 + - 按钮
                //   // doubleClickZoom: false, // 禁用双击放大
                //   attributionControl: false // 移除右下角leaflet标识
                // });
                // this.map.panTo(data.pos[0], data.pos[1])
            } else if (node.level == 3) {//总部=》项目
                this.prjNodeClick(data.label)
                document.getElementById('prj_title1').innerHTML = document.getElementById('head_title1').innerHTML
                document.getElementById('prj_title2').innerHTML = document.getElementById('region_title2').innerHTML
                document.getElementById('prj_title3').innerHTML = data.label
                document.getElementById("head_quarter").style.display = 'none'
                document.getElementById('region_part').style.display = 'block'
                document.getElementById('region').style.display = 'none'
                document.getElementById('prj_part').style.display = 'block'
                document.getElementById("prj_subpart").style.display = 'block'
                document.getElementById('check_part').style.display = 'none'
            } else if (node.level == 4) {//总部=》检查
                this.checkNodeClick(data.label)
                document.getElementById("head_quarter").style.display = 'none'
                document.getElementById('region_part').style.display = 'block'
                document.getElementById('region').style.display = 'none'
                document.getElementById('prj_part').style.display = 'block'
                document.getElementById("prj_subpart").style.display = 'none'
                document.getElementById('check_part').style.display = 'block'
            }
        }
    };
};