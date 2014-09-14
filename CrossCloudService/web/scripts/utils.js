// Embed.html
		
// Validate "Drop Pin" button
function validateCenterPoint(){
  var bValid = false;
  var sLatitude = document.mapForm.latitude.value;
  var sLongitude = document.mapForm.longitude.value;
  
  if(sLatitude != "" &&  sLongitude!=""){
    bValid = true;
  }

  if(!bValid){
    alert('Please insert Latitude and Longitude.');	
  }
     
  if(bValid){
	dropPin(0);
	//document.getElementById('search').disabled = false;
	//document.getElementById('resetmap').disabled = false;
  }
}

//Validate "Search" button
function validateSearch(){
  var bValid = false;
  var sRadius = document.getElementById('radius').value;
  
  if(sRadius != ""){
    bValid = true;
  }

  if(!bValid){
    alert('Please insert a Radius.');
  }
     
  if(bValid){
	loadData(1);
  }
}

//Builds timestamp date from a date
function buildStringFromDate(date){
	var year = date.getFullYear();
	var month = date.getMonth();
	var day = date.getDate();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	
	if(month < 10){
		month = "0" + month;
	}
	
	if(day < 10){
		day = "0" + day;
	}
	
	if(hours < 10){
		hours = "0" + hours;
	}
	
	if(minutes < 10){
		minutes = "0" + minutes;
	}
	
	if(seconds < 10){
		seconds = "0" + seconds;
	}
		
	var sDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":"+ seconds + " AST";
	return sDate;
}

//Builds timestamp date from a string
function buildDateFromString(date, h){
	var splitted = date.split("-");
	var year = parseInt(splitted[0]);
	var month = parseInt(splitted[1]) - 1;
	var day = parseInt(splitted[2]);
	var hour = parseInt(h);
	
	var dDate = new Date(year, month, day, hour, minutes);
	var sDate = Date.parse(dDate);
	return sDate;
}

function parseDateToYYYYMMDD(date){
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	
	if(month < 10){
		month = "0" + month;
	}
	
	if(day < 10){
		day = "0" + day;
	}
	
	var sDate = year + "-" + month + "-" + day;
	return sDate;
}

var arrayColors = ["black", "blue1", "blue2", "brown", "green1", "grey", "orange", "pink", "purple", "red", "white", "yellow"];

//Assigns image to marker based on hour of the day
function assignColor(hour){
	var color;
	if(hour < 12){
		color = arrayColors[hour];
		return color;
	}else{
		color = arrayColors[hour-12];
		return color;
	}
}

//The function to sort arrays
function compare(a,b) {
  if (a.created < b.created)
     return -1;
  if (a.created > b.created)
    return 1;
  return 0;
}

//String cleaning
function rfc3986 (str) {
  return encodeURIComponent(str)
    .replace(/!/g,'%21')
    .replace(/\*/g,'%2A')
    .replace(/\(/g,'%28')
    .replace(/\)/g,'%29')
    .replace(/'/g,'%27')
    ;
}
