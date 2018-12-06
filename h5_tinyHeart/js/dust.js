var dustObj = function() 
{
	this.x = [];
	this.y = [];
	this.amp = [];
	this.NO = [];
	this.alpha = 0;
}


dustObj.prototype.num = 30;
dustObj.prototype.init = function() 
{
	for(var i = 0; i < this.num; i++) 
	{
		this.x[i] = Math.random() * canWidth; 
		this.y[i] = Math.random() * canHeight;
	  this.amp[i] = Math.random() * 25 + 20;
	  this.NO[i] = Math.floor(Math.random() * 7);
	}
}


dustObj.prototype.draw = function()
{
	this.alpha += delTime * 0.0008;
	var l = Math.sin(this.alpha);
	
	for(var i = 0; i < this.num; i++) 
	{
		var no = this.NO[i];
		ctx1.drawImage(dustPic[no], this.x[i] + this.amp[i] * l, this.y[i]);
	}
}
