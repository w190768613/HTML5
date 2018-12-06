var babyObj = function() 
{
	this.x = [];
	this.y = [];
	this.angle = [];
	this.babyBody = new Image();
	
	this.babyTailTimer = 0;
	this.babyTailCount = 0;
	
	this.babyEyeTimer = 0;
	this.babyEyeCount = 0;
	this.babyEyeInterval = 1000;
	
	this.babyBodyTimer = 0;
	this.babyBodyCount = 0;
}


babyObj.prototype.init = function() 
{
	this.x = canWidth * 0.5 - 50;
	this.y = canHeight * 0.5 + 50;
	this.angle = 0;
	this.babyBody.src = "./src/babyFade0.png";
}


babyObj.prototype.draw = function() 
{
	this.x = lerpDistance(mom.x, this.x, 0.98);
	this.y = lerpDistance(mom.y, this.y, 0.98);
	
	// 改变小鱼角度
	var deltaY = mom.y - this.y;
	var deltaX = mom.x - this.x;
	var beta = Math.atan2(deltaY, deltaX) + Math.PI;
	this.angle = lerpAngle(beta, this.angle, 0.6);
	
	// tail 计数
	this.babyTailTimer += delTime;
	if(this.babyTailTimer > 50)
	{
		this.babyTailCount = (this.babyTailCount + 1) % 8;
		this.babyTailTimer %= 50;
	}
	
	// eye 计数
	this.babyEyeTimer += delTime;
	if(this.babyEyeTimer > this.babyEyeInterval)
	{
		this.babyEyeCount = (this.babyEyeCount + 1) % 2;
		this.babyEyeTimer %= this.babyEyeInterval;
		
		if(this.babyEyeCount == 0) 
			this.babyEyeInterval = Math.random() * 1500 + 2000;
		else
		  this.babyEyeInterval = 200;
	}
	
	// body 计数
	this.babyBodyTimer += delTime;
	if(this.babyBodyTimer > 300) 
	{
		this.babyBodyCount = this.babyBodyCount + 1;
		this.babyBodyTimer %= 300;
		if(this.babyBodyCount > 19) 
		{
			this.babyBodyCount = 19;
			
			// game over
			data.gameOver = true;
		}
	}
		
	
	ctx1.save();
	ctx1.translate(this.x, this.y);
	ctx1.rotate(this.angle);
	
	var count1 = this.babyTailCount;
	ctx1.drawImage(babyTail[count1], -babyTail[count1].width*0.5 + 23, -babyTail[count1].height*0.5);	
	var count2 = this.babyBodyCount;
	ctx1.drawImage(babyBody[count2], -babyBody[count2].width*0.5, -babyBody[count2].height*0.5);
	var count3 = this.babyEyeCount;
	ctx1.drawImage(babyEye[count3], -babyEye[count3].width*0.5, -babyEye[count3].height*0.5);
	ctx1.restore();
}
