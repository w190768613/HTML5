var momObj = function() 
{
	this.x;
	this.y;
	this.angle;
	
	this.momTailTimer = 0;
	this.momTailCount = 0;
	
	this.momEyeTimer = 0;
	this.momEyeCount = 0;
	this.momEyeInterval = 1000;
	
	this.momBodyTimer = 0;
	this.momBodyCount = 0;
}


momObj.prototype.init = function()
{
	this.x = canWidth * 0.5;
	this.y = canHeight * 0.5;
	this.angle = 0;
}


momObj.prototype.draw = function() 
{
	// 随鼠标移动
	this.x = lerpDistance(mx, this.x, 0.98);
	this.y = lerpDistance(my, this.y, 0.98);
	
	// 改变大鱼角度
	var deltaY = my - this.y;
	var deltaX = mx - this.x;
	var beta = Math.atan2(deltaY, deltaX) + Math.PI;
	this.angle = lerpAngle(beta, this.angle, 0.6);
	
	// tail 计数
	this.momTailTimer += delTime;
	if(this.momTailTimer > 50)
	{
		this.momTailCount = (this.momTailCount + 1) % 8;
		this.momTailTimer %= 50;
	}
	
	// eye 计数
	this.momEyeTimer += delTime;
	if(this.momEyeTimer > this.momEyeInterval)
	{
		this.momEyeCount = (this.momEyeCount + 1) % 2;
		this.momEyeTimer %= this.momEyeInterval;
		
		if(this.momEyeCount == 0) 
			this.momEyeInterval = Math.random() * 1500 + 2000;
		else
		  this.momEyeInterval = 200;
	}
	
	ctx1.save();
	ctx1.translate(this.x, this.y);
	ctx1.rotate(this.angle);
	
	var count1 = this.momTailCount;
	ctx1.drawImage(momTail[count1], -momTail[count1].width*0.5 + 30, -momTail[count1].height*0.5);
	var count2 = this.momBodyCount;
	if(data.double == 1)  // orange
	  ctx1.drawImage(momBodyOra[count2], -momBodyOra[count2].width*0.5, -momBodyOra[count2].height*0.5);
	else // blue
	  ctx1.drawImage(momBodyBlue[count2], -momBodyBlue[count2].width*0.5, -momBodyBlue[count2].height*0.5);
	var count3 = this.momEyeCount;
	ctx1.drawImage(momEye[count3], -momEye[count3].width*0.5, -momEye[count3].height*0.5);

  ctx1.restore();
}


function onMouseMove(e) 
{
	
	if(!data.gameOver)
	{
		if(e.offSetX || e.layerX)
		{
		  mx = e.offSetX == undefined ? e.layerX : e.offSetX;
		  my = e.offSetY == undefined ? e.layerY : e.offSetY;
	  }
	}
}
