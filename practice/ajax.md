# ajax

## 同步
	客户端发出请求等待服务端处理和响应后页面载入

## 异步
	客户端发出请求，服务端处理并响应，最后客户端页面载入

### 概念介绍 XMLHttpRequest

	应用前提：
	- 运用HTML和CSS实现页面，表达信息
	- 运用XMLHttpRequest和WEb服务器进行数据的异步交换
	- 运用JavaScript操作DOM，实现动态局部刷新

	var request = new XMLHttpRequest;
	兼容写法：
		var request;
		if(window.XMLHttpRequest){
			request = new XMLHttpRequest();//IE7 FF Chrome
		} else {
			request = new ActiveXObject("Microsoft.XMLHTTP");//IE6,IE5
		}

	什么是HTTP？
	- 计算机通过网络进行通信的规则
	- Http是一种无状态协议（不保留连接状态）

	HTTP请求过程：
	- 1.建立TCP连接
	- 2.web浏览器向服务器发送请求命令
	- 3.web浏览器发送请求头信息
	- 4.web服务器应答
	- 5.web服务器发送应答头信息
	- 6.web服务器向浏览器发送数据
	- 7.web服务器关闭TCP连接

	一个HTTP请求一般有四部分组成
	- 1.HTTP请求的方法或动作，比如是GET还是POST
	- 2.正在请求的URL，请求的地址
	- 3.请求头，包含一些客户端环境信息，身份验证信息等
	- 4.请求体，请求正文，请求正文可以包含客户提交的查询字符串信息，表单信息等等。（一般请求头和体之间会有空行，代表请求头结束，接下来的就是请求正文）

	GET POST介绍
	- GET： 一般用于获取信息（安全的）
			使用URL传递参数
			岁发送信息的数量也有限制，一般在2000个字符
	- POST：一般用于修改服务器上的资源
			对发送信息的数量无限制

	一个HTTP响应一般由三部分组成：
	- 1.一个数字和文字组成的状态吗，用来显示请求是成功还是失败
	- 2.响应头，响应头也和请求头一样包含许多有用的信息，例如服务器类型、日期时间、内容类型和长度等
	- 3.响应体，也就是响应正文

	HTTP状态吗：
	- 1xx：信息类，表示收到Web浏览器请求，正在进一步的处理中
	- 2xx：成功，表示用户请求被正确接收，理解和处理例如：200 OK
	- 3xx：重定向，表示请求没有成功，客户必须采取进一步的动作
	- 4xx：客户端错误，表示客户端提交的请求有错误，例如：404 NOT Found，意味着请求中所引用的文档不存在
	- 5xx：服务器错误，表示服务器不能完成对请求的处理，例如：500

	XMLHttpRequest发送请求
	- open(method,url,async) 发送请求方法 请求地址 请求同步/异步
	- send(string) 发送到服务器

		request.open("POST","create.php",true);
		request.setRequestHeader("Content-type","application/x-www-form-urlencoded");//这个方法一定得写在open和send之间
		request.send("name=王二狗&sex=男");

	XMLHttpRequest取得响应
	- reponseText：获得字符串形式的响应数据
	- reponseXML：获得XML形式的响应数据
	- status和statusText：以数字和文本形式返回HTTP状态码
	- getAllResponseHeader()：获取所有的响应报头
	- getResponseHeader()：查询响应中的某个字段的值

	readyState属性
	- 0：请求未初始化，open还没有调用
	- 1：服务器连接已建立，open已经调用了
	- 2：请求已接收，也就是接收到头信息了
	- 3：请求处理中，也就是接受到响应主体了
	- 4：请求已完成，且响应已就绪，也就是响应完成了

		var request = new XMLHttpRequest();
		request.open("GET","get.php",true);
		request.send();
		request.onreadystatechange = function(){
			if(request.readyState === 4 && request.status === 200){
				//do something request.responseText
			}
		}

		PHP是一种创建动态交互性站点的服务器端脚本语言
		PHP能够生成动态页面内容
		PHP创建、打开、读取、写入、删除以及关闭服务器上的文件
		PHP能够接受表单数据
		PHP能够发送并取回cookies
		PHP能够添加、删除、修改数据库中的数据
		PHP能够限制用户访问网站中的某些页面（运行PHP，XAMMP）
