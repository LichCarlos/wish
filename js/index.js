var container;
// 颜色
var colors = ['#207de0', '#42baec', '#e3e197', '#6cde47', '#ecc733'];
// 创建许愿便笺
var createItem = function (name, content) {
  var color = colors[Math.floor(Math.random() * 5)];
  $(`
    <div class="item">
      <p>${name}:</p>
      <p>${content}</p>
      <a href="#">关闭</a>
    </div>
  `).css({ 'background': color }).appendTo(container).drag();
};
var list = container.attr('data-list'); // 获取元素container的属性data-list
// 循环遍历list，创建便笺
$.each(JSON.parse(list), function (i, v) {
  createItem(v.name, v.content);
});