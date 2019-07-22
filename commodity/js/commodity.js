function checkLogin()  {
	if(typeof Cookies.get('uName') === 'undefined') {
		Cookies.set('url', window.location.href);
		window.location.href = '../login/login.html';
	}
}
// product数据导入
var id = parseInt(Cookies.get('categoryId'));
commodity.forEach(function(item){
	$(`
		<li>
			<div class='product-img' data-id="${ item.id }">
				<img src='${ item.avatar1 }'>
				<p>${ item.price }</p>
			</div>
			<p class='name'>${ item.name }</p>
			<span class='discount'>${ item.discount }</span>
			<div class='shopping clearfix'>
				<div class='shopping-num'>
					<input type="text" value='1' class='count'>
					<i class='add iconfont icon-top'></i>
					<i class='decrease iconfont icon-bottom'></i>
				</div>
				<span class='shopping-cart' data-id="${ item.id }">加入购物车</span>
			</div>
			<div class='product-com'>
				<i class='news iconfont icon-news'></i>
				<span class='comment'>${ item.comment }</span>
				<i class='thumb iconfont icon-thumb'></i>
				<span class='like'>${ item.like }</span>
			</div>
			<span class='shop'>${ item.shop }</span>
			<i class='iconfont icon-right'></i>
		</li>
	`)
		.appendTo('div.product>ul');
});
// 商品加减数量加入购车 
var val = $(this).prev('.count').val();
$('.add').click(function() {
		var val = $(this).prev('.count').val(); 
		var num = parseInt(val) + 1; 
		if(num > 5) {
			alert('商品购买数量已达到上限。。');
			return;
		}else {
			$(this).prev('.count').val(num); 
		};
	}); 
	$('.decrease').click(function() {
		var val = $(this).prev('.add').prev('.count').val(); 
		var num = parseInt(val) - 1; 
		if(num < 1) {
			return;
		}else {
			$(this).prev('.add').prev('.count').val(num); 
		};
	});

$('span.shopping-cart').click(function() {
	checkLogin();
	var shoppingInfo = JSON.parse(sessionStorage.getItem('shoppingInfo'));
	console.log(shoppingInfo);
	var target = shoppingInfo.find(function(item) {return item.productId === id});
	if(typeof target === 'undefined') shoppingInfo.push({
		id: shoppingInfo[shoppingInfo.length -1].id + 1,
		name: Cookies.get('uName'),
		productId: id,
		count: parseInt(val)
	});
	else {
		if(target.count >= 5) {
			alert('当前购物车中的该商品数量以达到上限');
			return;
		} else if(target.count + parseInt($value) > 5) {
			alert('商品数量超过上限！');
			return;
		}
		target.count += parseInt(val);
	}
	sessionStorage.setItem('shoppingInfo',JSON.stringify(shoppingInfo));
	window.location.href = '../cart/cart.html';
 });
// 跳转到商品详情页
$('div.product>ul .product-img').click(function(){
	
	Cookies.set('productId', $(this).attr('data-id'));
	window.location.href = '../detail/detail.html';
});