window.onload = function(){
    var canvas = document.getElementById('canvas');		//获取canvas
    var context = canvas.getContext('2d');		//获取2d上下文
    var width = context.canvas.width;		//获取canvas的宽
    var height = context.canvas.height;		//获取canvas的高
    var r = width/2;		//获取半径

    //先判断一下能不能获取到上下文呗
    if(context){
            //既然拿到上下文那就开始画背景和刻度吧
            function drawRad() {	
                context.save();		//保存当前环境
                context.translate(r,r);		//重置画布坐标原点
                context.beginPath();	//设置开始路径
                context.arc(0, 0, 196, 0, 2*Math.PI, false);	//创建外圆 
                context.strokeStyle='rgba(255,255,255,.7)'	//设置颜色
                context.lineWidth=10;	//设置线宽
                context.stroke();		//以线条方式填充
                
                //绘制文本
                context.font = 'normal 20px 微软雅黑';
                context.fillStyle='rgba(255,255,255)'	//设置颜色
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                var numbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];//时针画圆时从3开始画
                numbers.forEach(function(item,index){	//对数组中的元素进行遍历绘制文本
                    var rad =2 * Math.PI /12 * index;	//获得每个小时的弧度
                    var x=Math.cos(rad) * (r-32);	//横坐标
                    var y=Math.sin(rad) * (r-32);	//纵坐标
                    context.fillText(item, x, y);		//绘制文本
                });

                //分钟刻度
                for (var i = 0; i < 60; i++) {
                    var rad = 2 * Math.PI / 60 * i;
                    var x=Math.cos(rad)*(r-15);//求出所对应的坐标
                    var y=Math.sin(rad)*(r-15);
                    context.beginPath();//重置路径
                    if(i%5==0)//如果是小时的点时，把圆画大点
                    {
                        context.fillStyle='#fff';
                        context.arc(x, y, 3, 0, 2*Math.PI);
                    }else//其他点就小点啊
                    {
                        context.fillStyle='rgba(255,255,255,.7)';
                        context.arc(x, y, 2, 0, 2*Math.PI);
                    } 
                    context.fill();//
                }


            }

            //要开始画时针了呀
            function hours(hour,minute){
                context.save();		//老规矩，保存状态
                context.beginPath();		//设置一下当前路径
                var rad = Math.PI*2 /12*hour;		//求一下每小时的角度
                var rad_m = Math.PI*2 /12/60*minute;		//再求一下每分钟的角度
                //为了旋转时针啊
                context.rotate(rad + rad_m);		//根据角度把这个图旋转一下
                context.lineWidth = 5;		//时针的线就粗一点，短一点
                context.moveTo(-3,10);		//这四行都用来写注释，分针秒针一个道理，就不写了
                context.lineTo(3,10);		//从开始点开始画一个包裹的矩形到结束
                context.lineTo(1,-100);	
                context.lineTo(-1,-100);	
                context.fill();			//开始画吧
                context.restore();			//返回到保存的状态
            }

            //要开始画分针了呀
            function minutes(minute,second){
                context.save();		//老规矩，保存状态
                context.beginPath();		//设置一下当前路径
                var rad = Math.PI*2 /60*minute;	//求一下每分钟的角度
                var rad_s = Math.PI*2 /60/60 *second;
                //为了旋转分针啊
                context.rotate(rad + rad_s);		//根据角度把这个图旋转一下
                context.lineWidth = 3;		//分针的线就稍微粗一点，短一点
                context.moveTo(-3,15);		
                context.lineTo(3,15);		
                context.lineTo(1,-120);		
                context.lineTo(-1,-120);		
                context.fill();			//开始画吧
                context.restore();			//返回到保存的状态
            }

            //要开始画秒针了呀
            function seconds(second){
                context.save()		//继续保存环境和状态
                context.beginPath();		//设置当前路径
                var rad = 2*Math.PI /60*second;		//求一下每秒的角度
                //为了旋转秒针啊
                context.rotate(rad);		//根据角度进行旋转
                context.lineWidth = 2;		//秒针就是又细又长了啊
                context.moveTo(-2,20);		
                context.lineTo(2, 20);
                context.lineTo(1, -150);
                context.lineTo(-1, -150);
                context.fillStyle = 'rgba(255,0,0,.6)';	//秒针的颜色就可以让它放肆一点
                context.fill();			//开始画吧
                context.restore();			//重置状态
            }

            //要开始画交点了呀
            function dot(){
                context.beginPath();		//画圆嘛，这是必须的
                context.arc(0, 0, 4, 0, 2*Math.PI);	//画个半径为4的小圆
                context.fillStyle = '#d94c5e';	//上个主题色
                context.fill(); 		//填充

            }

            //使用间歇调用让它动起来吧
            function draw(arguments){						//传个指针
                context.clearRect(0,0,width,height);		//每秒清除下画布重新画
                var date = new Date();						//获得日期一枚
                var hour = date.getHours();					//获得小时一枚
                var minute = date.getMinutes();				//获得分钟一枚
                var second = date.getSeconds();				//获得秒数一枚
                drawRad();   								//调用函数
                hours(hour,minute);							//调用传参
                minutes(minute,second);						//还是调用传参
                seconds(second);							//还是。。
                dot();										//出来吧！交点
                context.restore();							//返回之前保存过的路径状态和属性

            }
            draw();								//这就是不直接写在间歇调用里面的原因，
            setInterval(draw,1000);				//先调用一次函数，不至于刷新页面的时候卡一下    
    }
    
}