layui.config({
    base: '/libs/echarts/'
});
layui.use(['form','element',  'layer','echarts'], function(){
    var echarts = layui.echarts,
        $ = layui.jquery,
        element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块
    myCharts = echarts.init(document.getElementById("main"));


    //触发事件
    var active = {
        tabChange: function(){
            //切换到指定Tab项
            element.tabChange('demo', '22'); //切换到：用户管理
        }
    };

    $('.site-demo-active').on('click', function(){
        var othis = $(this), type = othis.data('type');
        active[type] ? active[type].call(this, othis) : '';
    });

    //Hash地址的定位
    var layid = location.hash.replace(/^#test=/, '');
    element.tabChange('test', layid);

    $("#tab0").html($("#main"))
    $.get('http://127.0.0.1:3000/echarts/geteEchartsData?index='+0).done(function (data) {
        myCharts.setOption({
            tooltip: {
                trigger: 'axis',
                formatter: function (params, ticket, callback) {
                    var htmlStr = '';
                    var first;
                    var second;
                    var difference;
                    for(var i=0;i<params.length;i++){
                        var param = params[i];
                        var xName = param.name;//x轴的名称
                        var seriesName = param.seriesName;//图例名称
                        var value = param.value;//y轴值
                        //var color = param.color;//图例颜色
                        var color;
                        if (i === 0){
                            first = value;
                            color = "#ff0f1d";
                        } else if (i === 1){
                            second = value;
                            color = "#220b11";
                        }
                        if(i===0){
                            var date = new Date();
                            this.year = date.getFullYear();
                            htmlStr += this.year+"-"+xName + '<br/>';//x轴的名称
                            htmlStr += "<hr>";
                        }
                        htmlStr +='<div>';
                        //为了保证和原来的效果一样，这里自己实现了一个点的效果
                        htmlStr += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:'+color+';"></span>';

                        // 文本颜色设置--2020-07-23(需要设置,请解注释下面一行)
                        //htmlStr += '<span style="color:'+color+'">';

                        //圆点后面显示的文本
                        htmlStr += seriesName + '：' + value + '元';

                        // 文本颜色设置--2020-07-23(需要设置,请解注释下面一行)
                        //htmlStr += '</span>';

                        htmlStr += '</div>';
                    }

                    //拼写第三行数据
                    difference = first - second;
                    var color = "#fdff25";
                    htmlStr +='<div>';
                    //为了保证和原来的效果一样，这里自己实现了一个点的效果
                    htmlStr += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:'+color+';"></span>';

                    // 文本颜色设置--2020-07-23(需要设置,请解注释下面一行)
                    //htmlStr += '<span style="color:'+color+'">';

                    //圆点后面显示的文本
                    htmlStr += "同时段涨跌金额" + '：' + difference + '元';

                    // 文本颜色设置--2020-07-23(需要设置,请解注释下面一行)
                    //htmlStr += '</span>';

                    htmlStr += '</div>';

                    return htmlStr;
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                //interArrival:100,
                //显示x轴的终点不靠尾部
                boundaryGap: false,
                data: data.data.xData,
                axisLine:{
                    symbol:['none','arrow']
                }
            },
            yAxis : [
                {
                    type : 'value',
                    axisLabel: /*{
                            formatter: '{value} 元'
                        }*/data.data.yData
                }
            ],
            series: data.data.data
        });
    });

    element.on('tab(test)', function(elem){
        console.log(elem.index)
        let tabId = "#tab"+elem.index
        $.get('http://127.0.0.1:3000/echarts/geteEchartsData?index='+elem.index).done(function (data) {
            myCharts.setOption({
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params, ticket, callback) {
                        var htmlStr = '';
                        var first;
                        var second;
                        var difference;
                        for(var i=0;i<params.length;i++){
                            var param = params[i];
                            var xName = param.name;//x轴的名称
                            var seriesName = param.seriesName;//图例名称
                            var value = param.value;//y轴值
                            //var color = param.color;//图例颜色
                            var color;
                            if (i === 0){
                                first = value;
                                color = "#00FFFF";
                            } else if (i === 1){
                                second = value;
                                color = "#00FF00";
                            }
                            if(i===0){
                                var date = new Date();
                                this.year = date.getFullYear();
                                htmlStr += this.year+"-"+xName + '<br/>';//x轴的名称
                                htmlStr += "<hr>";
                            }
                            htmlStr +='<div>';
                            //为了保证和原来的效果一样，这里自己实现了一个点的效果
                            htmlStr += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:'+color+';"></span>';

                            // 文本颜色设置--2020-07-23(需要设置,请解注释下面一行)
                            //htmlStr += '<span style="color:'+color+'">';

                            //圆点后面显示的文本
                            htmlStr += seriesName + '：' + value + '元';

                            // 文本颜色设置--2020-07-23(需要设置,请解注释下面一行)
                            //htmlStr += '</span>';

                            htmlStr += '</div>';
                        }

                        //拼写第三行数据
                        difference = first - second;
                        var color = "#FF0E1A";
                        htmlStr +='<div>';
                        //为了保证和原来的效果一样，这里自己实现了一个点的效果
                        htmlStr += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:'+color+';"></span>';

                        // 文本颜色设置--2020-07-23(需要设置,请解注释下面一行)
                        //htmlStr += '<span style="color:'+color+'">';

                        //圆点后面显示的文本
                        htmlStr += "同时段涨跌金额" + '：' + difference + '元';

                        // 文本颜色设置--2020-07-23(需要设置,请解注释下面一行)
                        //htmlStr += '</span>';

                        htmlStr += '</div>';

                        return htmlStr;
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    //interArrival:100,
                    //显示x轴的终点不靠尾部
                    boundaryGap: false,
                    data: data.data.xData,
                    axisLine:{
                        symbol:['none','arrow']
                    }
                },
                yAxis : [
                    {
                        type : 'value',
                        axisLabel: /*{
                            formatter: '{value} 元'
                        }*/data.data.yData
                    }
                ],
                series: data.data.data
            });
        });
        $(tabId).html($("#main"))
        location.hash = 'test='+ $(this).attr('lay-id');
    });
});