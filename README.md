# mock-html-webpack-plugin
support mock for html base on html-webpack-plugin

测试方面可以参考extract-text-webpack-plugin
# 使用说明
模板只能支持赋值，不支持运算，所以如果模板里面有运算会报错
# 参数说明
## type
模板引擎类型，目前支持如下几种，默认选择`freemarker`
**freemarker:**`${变量}`
**velocity:**`$!{变量}`
**mustache:**`{{变量}}`
**smarty:**`{变量}`
**jsp:**`<%= 变量%>`

## test
可支持之定义模板匹配规则
## data
渲染模板的模拟数据