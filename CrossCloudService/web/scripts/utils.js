// Index.html

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

//Extract last element of the path
function extractCurrentPath(path){
	var result = "";
	var parts = path.split("/");
	if(path.charAt(path.length - 1) == "/"){
		for (var i = 0; i < parts.length-2; i++) {
			result += parts[i] + "/";
		}
	}else{
		for (var i = 0; i < parts.length-1; i++) {
			result += parts[i] + "/";
		}
	}
	return result;
}

//Extract relative path
function removeAbsolutePath(path){
	var result = "";
	var parts = path.split("/");
	if(path.charAt(path.length - 1) == "/"){
		for (var i = 3; i < parts.length-1; i++) {
			result += parts[i] + "/";
		}
	}else{
		for (var i = 3; i < parts.length; i++) {
			if(i != (parts.length-1)){
				result += parts[i] + "/";
			}else{
				result += parts[i];
			}
		}
	}
	return result;
}

//Level up
function levelUp(){
	var parent = extractCurrentPath(path);
	if(parent == home){
		parent = "";
	}
	loadContent(username, parent);
}