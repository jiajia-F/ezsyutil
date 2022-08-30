<template>
    <div class="fiveChessItem">
        <div class="historyRecord">
            <div v-for="item in historyRecordList" :key="item.id" class="historyRecordItem">
                <div>
                    <!-- <canvas></canvas> -->
                    <div>{{item.userName}}:</div>
                </div>
                <div>{{item.stepX}}--{{item.stepY}}</div>
            </div>
        </div>
        <div class="fiveChessMain">
            <canvas id="myCanvas" width="450" height="450"></canvas>
        </div>
        <div class="functionMessage">
            <div class="whiteChess">
                <div class="block"><el-avatar shape="square" :size="50" :src="whitePlayer.headerURL"></el-avatar></div>
                <div>{{whitePlayer.userName}}</div>
            </div>
            <div class="bagua">
                <img :src="require('../../assets/images/fiveChess/bg.png')" />
            </div>
            <div class="blackChess">
                <div class="block"><el-avatar shape="square" :size="50" :src="blackPlayer.headerURL"></el-avatar></div>
                <div>{{blackPlayer.userName}}</div>
            </div>
            <div class="reGame">
                <div>
                    <el-button type="primary" @click="resetGame">重新开始</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
 export default{
    name:'fiveChess',
    components:{

    },
    data() {
        return {
            gridSize:30,
            isWho:true,//当为真时黑棋落子，当为假时白棋落子
            checkerboard:[],//记录落子情况
            //创建一个变量来表示当前一共有多少种赢法
            count:0,
            //创建一个变量来表示赢法
            wins:[],
            playerWins:[],
            computerWins:[],
            goodGame:false,//判断游戏是否结束
            historyRecordList:[],//游戏记录
            centerImg:'@/assets/images/fiveChess/bg.png',
            whitePlayer:{
                userName:'小冯',
                headerURL:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'

            },
            blackPlayer:{
                userName:'小王',
                headerURL:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'

            },
           
        }
    },
    mounted(){
        this.initialize()
    },
    methods: {
        // 初始化棋盘
        chessCanvas(){
            var myCanvas=document.getElementById("myCanvas");

            var ctx=myCanvas.getContext("2d");
            
            for(let i=0;i<myCanvas.height/this.gridSize;i++){
                ctx.beginPath();
                ctx.moveTo(0+15,this.gridSize*i+15);
                ctx.lineTo(myCanvas.width-15,this.gridSize*i+15);
                ctx.strokeStyle="#F1F5DA";
                ctx.stroke();
            }
            for(let i=0;i<myCanvas.width/this.gridSize;i++){
                ctx.beginPath();
                ctx.moveTo(this.gridSize*i+15,0+15);
                ctx.lineTo(this.gridSize*i+15,myCanvas.width-15);
                ctx.strokeStyle="#F1F5DA";
                ctx.stroke();
            }
            this.resetChess();
        },
        //落子并判断是否胜利
        drawchess(x,y){
            // let that=this
            var myCanvas=document.getElementById("myCanvas");
            var ctx=myCanvas.getContext("2d");
            
            if(this.goodGame){
                alert("游戏结束请重新开始");
                return;
            }
            
            if(this.checkerboard[x][y]!==0){
                console.log(this.checkerboard)
                alert("这里不能落子");
                return;
            }
            
            
            let a=(x+1)*this.gridSize-15;
            let b=(y+1)*this.gridSize-15;
            
            ctx.beginPath();
            ctx.arc(b,a,15,0,Math.PI*2);
            let gradient=ctx.createRadialGradient(b,a,15,b,a,0);
            if(this.isWho){
                gradient.addColorStop(0,"#222");
                gradient.addColorStop(1,"#ccc");
                this.checkerboard[x][y]=1;//黑棋落子
                //遍历所有赢法
                for(let k=0;k<this.count;k++){
                    if(this.wins[x][y][k]){
                        this.playerWins[k]++;
                        this.computerWins[k]=6;
                        if(this.playerWins[k]===5){
                            alert("玩家胜利");
                            this.goodGame=true;
                        }
                    }
                }
            }else{
                gradient.addColorStop(0,"#999");
                gradient.addColorStop(1,"#fff");
                this.checkerboard[x][y]=2;
                //遍历所有赢法
                for(let k=0;k<this.count;k++){
                    if(this.wins[x][y][k]){
                        this.computerWins[k]++;
                        this.playerWins[k]=6;
                        if(this.computerWins[k]===5){
                            alert("电脑胜利");
                            this.goodGame=true;
                        }
                    }
                }
            }
            ctx.fillStyle=gradient;
            ctx.fill();
            this.isWho=!this.isWho;//切换棋子
        },
        // 棋盘添加点击事件
        chessHandle(){
            let that=this
            var myCanvas=document.getElementById("myCanvas");
            myCanvas.onclick=function(e){
                 // 记录玩家走棋记录
                let playerStep=[{
                    userName:'Player',
                    stepX:'',
                    stepY:'',
                }]
                let coord_y=e.offsetY;
                let coord_x=e.offsetX;
                let x=parseInt(coord_x/that.gridSize);
                let y=parseInt(coord_y/that.gridSize);
                playerStep[0].stepX=y
                playerStep[0].stepY=x
                that.drawchess(y,x);
                that.historyRecordList.push(playerStep[0])
                console.log(that.historyRecordList)
                that.AI();
            }
        },
        // 初始化棋盘的落子情况
        resetChess(){
            for(let row=0;row<15;row++){
                this.checkerboard[row]=[];
                for(let col=0;col<15;col++){
                    this.checkerboard[row][col]=0;
                }
            }
        },
        //赢法的初始值
        resetPlayerAndComputerwins(){
		//分别每一种赢法设置初始值
            for(let k=0;k<this.count;k++){
                this.playerWins[k]=0;
                this.computerWins[k]=0;
            }
        },
        //记录所有的赢法
        sumWinAndrule(){
            //在赢法中设置行列
            for(let row=0;row<15;row++){
                this.wins[row]=[];
                for(let col=0;col<15;col++){
                    this.wins[row][col]=[];
                }
            }
            
            //水平方法统计
            for(let row=0;row<15;row++){
                for(let col=0;col<11;col++){
                    for(let k=0;k<5;k++){
                        this.wins[row][col+k][this.count]=true;
                    }
                    this.count++;
                }
            }
            
            //垂直方法统计
            for(let row=0;row<11;row++){
                for(let col=0;col<15;col++){
                    for(let k=0;k<5;k++){
                        this.wins[row+k][col][this.count]=true;
                    }
                    this.count++;
                }
            }
            
            //斜边方法统计
            for(let row=14;row>4;row--){
                for(let col=0;col<11;col++){
                    for(let k=0;k<5;k++){
                        this.wins[row-k][col+k][this.count]=true;
                    }
                    this.count++;
                }
            }
            //反斜边方法统计
            for(let row=0;row<11;row++){
                for(let col=0;col<11;col++){
                    for(let k=0;k<5;k++){
                        this.wins[row+k][col+k][this.count]=true;
                    }
                    this.count++;
                }
            }
        },
        //AI下棋空控制逻辑
        AI(){
            let playerScore=[];
            let computerScore=[];
            
            let maxScore=0;
            let x=0;
            let y=0;
            // AI下棋记录
            let AIStep=[{
                userName:'AI',
                stepX:'',
                stepY:'',
            }]
            for(let row=0;row<15;row++){
                playerScore[row]=[];
                computerScore[row]=[];
                for(let col=0;col<15;col++){
                    playerScore[row][col]=0;
                    computerScore[row][col]=0;
                }
            }
            
            for(let row=0;row<15;row++){
                for(let col=0;col<15;col++){
                    if(this.checkerboard[row][col]===0){
                        for(let k=0;k<this.count;k++){
                            if(this.wins[row][col][k]){
                                if(this.playerWins[k]===1){
                                    playerScore[row][col]+=200;
                                }else if(this.playerWins[k]===2){
                                    playerScore[row][col]+=400;
                                }else if(this.playerWins[k]===3){
                                    playerScore[row][col]+=1000;
                                }else if(this.playerWins[k]===4){
                                    playerScore[row][col]+=3000;
                                }
                                
                                if(this.computerWins[k]===1){
                                    computerScore[row][col]+=200;
                                }else if(this.computerWins[k]===2){
                                    computerScore[row][col]+=400;
                                }else if(this.computerWins[k]===3){
                                    computerScore[row][col]+=1000;
                                }else if(this.computerWins[k]===4){
                                    computerScore[row][col]+=3000;
                                }
                                
                                if(playerScore[row][col]>maxScore){
                                    x=row;
                                    y=col;
                                    maxScore=playerScore[row][col];
                                }else if(playerScore[row][col]===maxScore){
                                    if(computerScore[row][col]>computerScore[x][y]){
                                        x=row;
                                        y=col;
                                    }
                                }
                                
                                if(computerScore[row][col]>maxScore){
                                    x=row;
                                    y=col;
                                    maxScore=computerScore[row][col];
                                }else if(computerScore[row][col]===maxScore){
                                    if(playerScore[row][col]>playerScore[x][y]){
                                        x=row;
                                        y=col;
                                    }
                                }
                            }
                        }
                    }
                }
                
            }
            console.log(computerScore)
            AIStep[0].stepX=x
            AIStep[0].stepY=y
            this.drawchess(x,y)
            this.historyRecordList.push(AIStep[0])
            console.log(this.historyRecordList)

        },
        // 初始化
        initialize(){
            this.chessCanvas();
            this.chessHandle();
            this.sumWinAndrule();
            this.resetPlayerAndComputerwins();
        },
         resetGame(){
            // this.historyRecordList=[]
            // this.isWho=true//当为真时黑棋落子，当为假时白棋落子
            // this.checkerboard=[]//记录落子情况
            // console.log(this.checkerboard)
            // //创建一个变量来表示当前一共有多少种赢法
            // this.count=0
            // //创建一个变量来表示赢法
            // this.wins=[]
            // this.playerWins=[]
            // this.computerWins=[]
            // this.goodGame=false//判断游戏是否结束
            Object.assign(this.$data, this.$options.data())
            let c=document.getElementById("myCanvas");
            let ctx=c.getContext("2d");
            ctx.clearRect(0,0,450,450);
            this.chessCanvas();
            this.chessHandle();
            this.sumWinAndrule();
            this.resetPlayerAndComputerwins();
            // this.chessCanvas();
            // this.resetPlayerAndComputerwins();
        }
    },
 }
</script>
<style lang='scss' scoped>
    .fiveChessItem{
        width: 100%;
        height: 600px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .historyRecord{
            height: 450px;
            width: 15%;
            // border: 2px solid rgb(86, 86, 86);
            background-image: url(../../assets/images/fiveChess/stone.jpeg);
            border-radius : 5px;
            margin-right: 5%;
            .historyRecordItem{
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: flex-start;
                flex-wrap: nowrap;
                font-size: 20px;
                height: 1.5em;
                color: rgb(198, 191, 191);
            }
        }
        .functionMessage{
            height: 450px;
            width: 15%;
            // border: 2px solid rgb(86, 86, 86);
            background-image: url(../../assets/images/fiveChess/stone.jpeg);
            border-radius : 5px;
            margin-left: 5%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .whiteChess{
                margin-bottom: 15%;
                color: cornflowerblue;
            }
            .blackChess{
                margin-top: 15%;
                color: bisque;
            }
            .reGame{
                margin-top: 15%;
            }
            .bagua img{
                width: 40px;
                height: 40px;
            }
        }
        .fiveChessMain{
            width: 450px;
            height: 450px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            #myCanvas{
                display: block;
                margin: 50px auto;
                border:1px solid #333;
                background-image: url(../../assets/images/fiveChess/stone.jpeg);
            }
        }
    }
</style>