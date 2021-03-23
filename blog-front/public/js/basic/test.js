layui.config({
    base:'/libs/'
}).extend({
    shenzc:'/common/ajax',
    autocomplete:'/autocomplete/autocomplete'
});
layui.link('/libs/autocomplete/autocomplete.js');
layui.use(['jquery','shenzc','autocomplete'], function(){

    const {$,autocomplete,shenzc} = layui;

    console.log("123")
    $('#render').on('click', function () {
        console.log("123")
        render()
    })

    function render() {
        debugger
        let content = $('#content0')[0];
        console.log(autocomplete)
        autocomplete.render({
            elem: $('#content0')[0],
            url: 'http://127.0.0.1:9902/article/category/getParentCategory',
            cache: true,
            template_val: '{{d}}',
            template_txt: '{{d}}',
            onselect: function (resp) {
                console.log(resp)
                $('#content1').html("NEW RENDER: " + JSON.stringify(resp));
            }
        })
    }

});