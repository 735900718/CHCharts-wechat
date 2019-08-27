// pie.js
var data = [{ name: "篮球", value: 20, color: "rgb(250,239,66)"},
  { name: "足球", value: 10, color: "rgb(108,187,90)" },
  { name: "乒乓球", value: 30, color: "rgb(0,163,233)" },
  { name: "棒球", value: 60, color: "rgb(228,0,127)" },
  { name: "排球", value: 100, color: "rgb(106,49,142)" }]

function drawPie(canvasId, domId) {
  //创建 canvas 绘图上下文,需要指定 canvasId，该绘图上下文只作用于对应的<canvas/>
  var context = wx.createCanvasContext(canvasId, this);
  //createSelectorQuery()接口返回一个对象实例
  var query = wx.createSelectorQuery();
  //boundingClientRect():动态获取view元素的高度、宽度等属性
  query.select("#" + domId).boundingClientRect();
  //exec( function(res){} )：执行所有的请求，请求结果按请求次序构成数组，在callback的第一个参数中返回
  query.exec(function (res) {
    console.log(res[0]);
    //比例，比率
    var ratio = 0.8;
    var small = res[0].width > res[0].height ? res[0].height : res[0].width;
    //半径
    var radius = small * ratio / 2.0; 
    // var labelWidth = 70;
    // var labelHeight = 15;
    // vertical style
    var pieCenter = { x: res[0].width / 2.0, y: res[0].height / 2.0};
    // var gap = 5;
    // var maxCol = Math.floor((res[0].width-gap) / (labelWidth + 5))
    // if (maxCol > data.length)
    // {
    //   gap = (res[0].width - data.length * labelWidth) / (data.length + 1);
    // }
    // else
    // {
    //   gap = (res[0].width - maxCol * labelWidth) / (maxCol + 1);
    // }

    var total = 0;
    data.forEach(function (val){
      total += val.value;
    })
    var start = 0;
    // draw pie
    data.forEach(function (val,idx){
      context.beginPath();
      //arc()画圆弧
      context.arc(pieCenter.x, pieCenter.y, radius, start, start + val.value / total * 2 * Math.PI, false);
      context.setLineWidth(2);
      context.lineTo(pieCenter.x, pieCenter.y);
      context.setStrokeStyle("#ffffff");
      context.setFillStyle(val.color);
      context.fill();
      context.closePath();
      context.stroke();
      //得到每个类别的份角度：2 * PI * 类别值 / 总值
      start += val.value / total * 2 * Math.PI;
      // if (idx < maxCol && labelHeight + 20 + 2 * radius < res[0].height)
      // {
      //   context.fillRect(gap + idx * (gap + labelWidth), radius * 2 + 10, 25, 15);
      //   context.setFontSize(16)
      //   context.fillText(val.name, gap + idx * (gap + labelWidth) + 27, radius * 2 + 24);
      // }
      if (val.value > 0)
      {
        var midRad = start - val.value / total * Math.PI;
        var posX = pieCenter.x + radius * Math.cos(midRad);
        var posY = pieCenter.y + radius * Math.sin(midRad);
        context.beginPath();
        context.setStrokeStyle(val.color);
        context.moveTo(posX,posY);
        posX = posX + small * 0.05 * Math.cos(midRad);
        posY = posY + small * 0.05 * Math.sin(midRad)
        context.lineTo(posX,posY);
        posX = posX + small * 0.1 * Math.cos(midRad);
        context.lineTo(posX, posY);
        context.setFontSize(14)
        context.setTextBaseline("middle");
        if (posX < pieCenter.x)
        {
          context.setTextAlign("right");
        }
        else
        {
          context.setTextAlign("left");
        }
        context.fillText(val.value,posX,posY);
        context.stroke();
        context.closePath();
      }

    })
    context.draw();
  });
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    labelData : [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   labelData: data,
    // })
    // drawPie("pie", "pie")
    var options = {
      data: data,
      legend: '{a}:{c}',
      chartRatio: 0.6,
      style: 'pie',
      showLegend: true,
      showLabel: true,
      animation: false,
      showTooltip: true,
      tooltip: '{b}人',
    }
    this.pieComp = this.selectComponent('#pie-3');
    this.pieComp.setOptions(options);
    this.pieComp.initChart(320, 213);
  },

  drawChart: function(e) {
    var options = {
      data: data,
      legend: '{b}',
      chartRatio: 0,
      style: 'pie',
      showLegend: true,
      showLabel: true,
      animation: true,
      showTooltip: true,
      tooltip: '{a}:{c}',
    }
    this.pieComp = this.selectComponent('#pie-3');
    this.pieComp.setOptions(options);
    this.pieComp.initChart(200, 200);
  }
})