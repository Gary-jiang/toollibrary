function abs(x){      //求绝对值的函数
    if(x >= 0){       //if语句
        return x;     //如果比较结果为true则执行这里的代码
    }else{            //子句的结束
        return -x;    //当if条件不满足时执行else子句
    }      //如果分支中只有一条语句，花括号是可以省略的
}//注意if/else中嵌套的return语句

function factorial(n){     //计算阶乘的函数
    var product = 1;        //给product赋值为1
    while (n>1){     //当()内的表达式为true时循环执行()内的代码
        product *=n; 
        n--;
    }               //循环结束
    return product; 
}

factorial(4)      //24:1*4*3*2;

function factorial2(n){     //实现循环另一种方法
    var i,product = 1;        //给product赋值为1
    for(i=2;i<=n;i++){
        product *=i;
        return product; 
    }
}
factorial2(5)               //120:1*2*3*4*5

//定义一个构造函数以初始化一个新的Point对象
function Point(x,y){   //按照惯例，构造函数均以大写字母开始
    this.x = x;        //关键字this指代初始化的实列
    this.y = y;        //将函数参数存储为对象的属性
}                       //不需要return

//使用new关键字和构造函数来创建一个实列
var p = new Point(1,1)  平面几何中的点(1,1)

//通过给构造函数的prototype对象赋值
Point.prototype.r = function(){
    //返回x² + y² 的平方根
    //this 指代调用这个方法的对象
    return Math.sqrt(this.x*this.x+this.y*this.y);
}

//Point的实例对象p(以及所有的Point实例对象)继承了方法r()
p.r()
// 1.44