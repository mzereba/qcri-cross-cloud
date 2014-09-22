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

//Extracts current RDF
function extractElement(path){
	var result = "";
	var parts = path.split("/");
	result += parts[parts.length-1];
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

//Main function for rendering after login
function refreshLoginBox(user)
{
	//Logout
	if(user == ""){
		var itemText = "";
		itemText += "<fieldset style='padding-right:0px;padding-left:00px;padding-bottom: 0px;border:none;width:1320px;'>";
   		itemText += "	<fieldset style='float:left;padding-bottom:0px;padding-right:0px;padding-left:00px;border:none;width:200px;'>";
		itemText +=	"		<img src='images/logo.png' />";
		itemText += "	</fieldset>";
		
		itemText += "	<fieldset style='float:left;padding-bottom:0px;padding-right:0px;padding-left:00px;border:none;width:755px;margin-top:55px;text-align:center;'>";
		itemText += "		<div id='login_message'> </div>";
		itemText += "	</fieldset>";
		
		itemText += "	<!-- Form -->";
		itemText += "	<fieldset style='float:left;padding-bottom:0px;padding-right:0px;padding-left:00px;border:none;width:350px; margin-top: 55px;'>";
		itemText +=	" 		<table align='right'>";
		itemText +=	"			<tr>";
		itemText +=	"				<td align='left' style='vertical-align:bottom;width:85px;'><font color='#757561'><b>Username</b></font></td>";
		itemText +=	"				<td align='left' style='vertical-align:bottom;width:85px;'><font color='#757561'><b>Password</b></font></td>";
		itemText +=	"			</tr>";
		itemText +=	"			<tr>";
		itemText +=	"				<td align='left'><input name='username' id='username' type='text' style='border: 1px dotted #72CE9B;' width='85px' size='10' value=''></td>";
		itemText +=	"				<td align='left'><input name='password' id='password' type='password' style='border: 1px dotted #72CE9B;' width='85px' size='10' value=''></td>";
		itemText +=	"				<td align='left' style='vertical-align:top;'>";
		itemText +=	"					<input type='button' id='login' value='Login' onClick='doLogin();'>";
		itemText +=	"				</td>";
		itemText +=	"			</tr>";
		itemText +=	" 		</table>";
		itemText += "	</fieldset>";
		itemText += "</fieldset>";
	
		itemText += "<fieldset style='padding:0px;border: none;' width='1320px;'>";
		itemText += "	<hr class='bar' /> ";
	    itemText += "</fieldset>";
			
	    itemText += "<!-- Middle pannel -->";
	    itemText += "<fieldset style='padding-left: 0;padding-right: 0;padding-top: 0;padding-bottom: 0;border: none;' width='1320px;'>";
	  	itemText +=	"	<!-- Pannel -->";
		itemText +=	"	<div id='pannel'>";
		itemText += "		<table width='100%;' style='vertical-align:top; background: none repeat scroll 0 0 #ffffff; border: 0px solid #72CE9B;' cellspacing='0px'>";
		itemText += "			<tr bgcolor='#757561'>";
		itemText += "				<td class='expfirst' align='left' width='800px' height='40px'>Name</td>";
		itemText += "				<td class='expfirst' align='left' width='100px' height='40px'>Size</td>";
		itemText += "				<td class='expfirst' align='left' width='100px' height='40px'>Type</td>";	
		itemText += "				<td class='expfirst' align='left' width='180px' height='40px'>Last Modified</td>";
		itemText += "				<td class='expfirst' align='left' width='150px' height='40px'>Actions</td>";			
		itemText += "			</tr>";
		itemText += "		</table>";
		itemText +=	"	</div>";
	    itemText += "</fieldset>";
					
		itemText += "<fieldset style='padding-bottom:0px;padding-top:10px;padding-right:0px;padding-left:0px;border: none;' width='1320px;'>";
		itemText +=	"	<hr class='bar'/> ";
		itemText += "</fieldset>";
		
		document.getElementById('container').innerHTML=itemText;
		
	}else{
		//User not found, show error message
		if(user == "-"){
			var itemText = "";
			itemText += "<fieldset style='padding-right:0px;padding-left:00px;padding-bottom: 0px;border:none;width:1320px;'>";
	   		itemText += "	<fieldset style='float:left;padding-bottom:0px;padding-right:0px;padding-left:00px;border:none;width:200px;'>";
			itemText +=	"		<img src='images/logo.png' />";
			itemText += "	</fieldset>";
			
			itemText += "	<fieldset style='float:left;padding-bottom:0px;padding-right:0px;padding-left:00px;border:none;width:755px;margin-top:55px;text-align:center;'>";
			itemText += "		<div id='login_message'> </div>";
			itemText += "	</fieldset>";
			
			itemText += "	<!-- Form -->";
			itemText += "	<fieldset style='float:left;padding-bottom:0px;padding-right:0px;padding-left:00px;border:none;width:350px; margin-top: 55px;'>";
			itemText +=	" 		<table align='right'>";
			itemText +=	"			<tr>";
			itemText +=	"				<td align='left' style='vertical-align:bottom;width:85px;'><font color='#757561'><b>Username</b></font></td>";
			itemText +=	"				<td align='left' style='vertical-align:bottom;width:85px;'><font color='#757561'><b>Password</b></font></td>";
			itemText +=	"			</tr>";
			itemText +=	"			<tr>";
			itemText +=	"				<td align='left'><input name='username' id='username' type='text' style='border: 1px dotted #72CE9B;' width='85px' size='10' value=''></td>";
			itemText +=	"				<td align='left'><input name='password' id='password' type='password' style='border: 1px dotted #72CE9B;' width='85px' size='10' value=''></td>";
			itemText +=	"				<td align='left' style='vertical-align:top;'>";
			itemText +=	"					<input type='button' id='login' value='Login' onClick='doLogin();'>";
			itemText +=	"				</td>";
			itemText +=	"			</tr>";
			itemText +=	" 		</table>";
			itemText += "	</fieldset>";
			itemText += "</fieldset>";
		
			itemText += "<fieldset style='padding:0px;border: none;' width='1320px;'>";
			itemText += "	<hr class='bar' /> ";
		    itemText += "</fieldset>";
				
		    itemText += "<!-- Middle pannel -->";
		    itemText += "<fieldset style='padding-left: 0;padding-right: 0;padding-top: 0;padding-bottom: 0;border: none;' width='1320px;'>";
		  	itemText +=	"	<!-- Pannel -->";
			itemText +=	"	<div id='pannel'>";
			itemText += "		<table width='100%;' style='vertical-align:top; background: none repeat scroll 0 0 #ffffff; border: 0px solid #72CE9B;' cellspacing='0px'>";
			itemText += "			<tr bgcolor='#757561'>";
			itemText += "				<td class='expfirst' align='left' width='800px' height='40px'>Name</td>";
			itemText += "				<td class='expfirst' align='left' width='100px' height='40px'>Size</td>";
			itemText += "				<td class='expfirst' align='left' width='100px' height='40px'>Type</td>";	
			itemText += "				<td class='expfirst' align='left' width='180px' height='40px'>Last Modified</td>";
			itemText += "				<td class='expfirst' align='left' width='150px' height='40px'>Actions</td>";			
			itemText += "			</tr>";
			itemText += "		</table>";
			itemText +=	"	</div>";
		    itemText += "</fieldset>";
						
			itemText += "<fieldset style='padding-bottom:0px;padding-top:10px;padding-right:0px;padding-left:0px;border: none;' width='1320px;'>";
			itemText +=	"	<hr class='bar'/> ";
			itemText += "</fieldset>";
			
			document.getElementById('container').innerHTML=itemText;
			document.getElementById('login_message').innerHTML="<font color='red'><b>User not found, please try again</b></font>";
		}
		//User found, retrieve content
		else{
			var itemText = "";
			itemText += "<fieldset style='padding-right:0px;padding-left:00px;padding-bottom: 0px;border:none;width:1320px;'>";
	   		itemText += "	<fieldset style='float:left;padding-bottom:0px;padding-right:0px;padding-left:00px;border:none;width:200px;'>";
			itemText +=	"	<img src='images/logo.png' />";
			itemText += "	</fieldset>";
			
			itemText += "	<fieldset style='float:left;padding-bottom:0px;padding-right:0px;padding-left:00px;border:none;width:755px;margin-top:55px;text-align:center;'>";
			itemText += "		<div id='login_message'> </div>";
			itemText += "	</fieldset>";
		
			itemText += "	<!-- Form -->";
			itemText += "	<fieldset style='float:left;padding-bottom:0px;padding-right:0px;padding-left:00px;border:none;width:350px; margin-top: 55px;'>";
			itemText +=	"		<table align='right'>";
			itemText +=	"			<tr>";
			itemText +=	"				<td align='left' style='vertical-align:bottom;width:50px;'><img src='images/profile-portrait.png' style='border: 1px dotted #72CE9B;vertical-align:text-top;'></td>";
			itemText +=	"				<td align='left' style='vertical-align:bottom;width:65px;'>";
			itemText +=	"					&nbsp;<font color='#757561'><b>" + username + "</b></font><br>";
			itemText +=	"					<input type='button' id='login' value='Logout' onClick='doLogout();'>";
			itemText +=	"				</td>";
			itemText +=	"			</tr>";
			itemText +=	"		</table>";
			itemText += "	</fieldset>";
			itemText += "</fieldset>";
			
			itemText += "<fieldset style='padding:0px;border: none;' width='1320px;'>";
			itemText += "	<hr class='bar' /> ";
		    itemText += "</fieldset>";
				
		    itemText += "<!-- Middle pannel -->";
		    itemText += "<fieldset style='padding-left: 0;padding-right: 0;padding-top: 0;padding-bottom: 0;border: none;' width='1320px;'>";
		  	itemText +=	"	<!-- Pannel -->";
			itemText +=	"	<div id='pannel'>";
			itemText += "		<table width='100%;' style='vertical-align:top; background: none repeat scroll 0 0 #ffffff; border: 0px solid #72CE9B;' cellspacing='0px'>";
			itemText += "			<tr bgcolor='#757561'>";
			itemText += "				<td class='expfirst' align='left' width='800px' height='40px'>Name</td>";
			itemText += "				<td class='expfirst' align='left' width='100px' height='40px'>Size</td>";
			itemText += "				<td class='expfirst' align='left' width='100px' height='40px'>Type</td>";	
			itemText += "				<td class='expfirst' align='left' width='180px' height='40px'>Last Modified</td>";
			itemText += "				<td class='expfirst' align='left' width='150px' height='40px'>Actions</td>";			
			itemText += "			</tr>";
			itemText += "		</table>";
			itemText +=	"	</div>";
		    itemText += "</fieldset>";
						
			itemText += "<fieldset style='padding-bottom:0px;padding-top:10px;padding-right:0px;padding-left:0px;border: none;' width='1320px;'>";
			itemText +=	"	<hr class='bar'/> ";
			itemText += "</fieldset>";
			
			document.getElementById('container').innerHTML=itemText;
			
			loadContent(user, path);
		}
	}
}