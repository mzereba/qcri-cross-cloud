// browsing.html

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

//Eliminate absolute prefix of URL
function removePrefix(path){
	var result = "";
	var parts = path.split("://");
	result += parts[1];
	return result;
}

//Level up
function levelUp(){
	var parent = extractCurrentPath(path);
	if(parent == home){
		parent = "";
	}
	path = parent;
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

//Function for encoding Base64 
function base64_encode(data) {
  var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
    ac = 0,
    enc = '',
    tmp_arr = [];

  if (!data) {
    return data;
  }

  do { // pack three octets into four hexets
    o1 = data.charCodeAt(i++);
    o2 = data.charCodeAt(i++);
    o3 = data.charCodeAt(i++);

    bits = o1 << 16 | o2 << 8 | o3;

    h1 = bits >> 18 & 0x3f;
    h2 = bits >> 12 & 0x3f;
    h3 = bits >> 6 & 0x3f;
    h4 = bits & 0x3f;

    // use hexets to index into b64, and append result to encoded string
    tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
  } while (i < data.length);

  enc = tmp_arr.join('');

  var r = data.length % 3;

  return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
}

//Function for decoding Base64 
function base64_decode(data) {
  var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
    ac = 0,
    dec = '',
    tmp_arr = [];

  if (!data) {
    return data;
  }

  data += '';

  do { // unpack four hexets into three octets using index points in b64
    h1 = b64.indexOf(data.charAt(i++));
    h2 = b64.indexOf(data.charAt(i++));
    h3 = b64.indexOf(data.charAt(i++));
    h4 = b64.indexOf(data.charAt(i++));

    bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

    o1 = bits >> 16 & 0xff;
    o2 = bits >> 8 & 0xff;
    o3 = bits & 0xff;

    if (h3 == 64) {
      tmp_arr[ac++] = String.fromCharCode(o1);
    } else if (h4 == 64) {
      tmp_arr[ac++] = String.fromCharCode(o1, o2);
    } else {
      tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
    }
  } while (i < data.length);

  dec = tmp_arr.join('');

  return dec.replace(/\0+$/, '');
}

//querying.html

//Main function for rendering after login 
function refreshLoginBoxQuerying(user)
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
		itemText +=	"	<div id='pannel1'>";
		itemText += "		<table width='100%;' style='vertical-align:top; background: none repeat scroll 0 0 #ffffff; border: 0px solid #72CE9B;' cellspacing='0px'>";
		itemText += "			<tr>";
		itemText += "				<td class='expfirst' colspan='3' align='left' width='1320px' style='color: #757561;font-weight: bold;font-size: 16px;'>SPARQL Query</td>";
		itemText += "			</tr>";
		itemText += "			<tr>";
		itemText += "				<td class='expfirst' colspan='3' align='center' width='100%' height='40px'><textarea style='width: 100%; height: 150px; background-color:#E0E0E0;' name='query' id='query'></textarea></td>";
		itemText += "			</tr>";
		itemText += "			<tr>";
		itemText += "				<td class='expfirst' colspan='3' align='right' width='1320px' height='40px'><input type='button' id='submitQuery' value='Submit Query' onClick='performQuery();' disabled='disabled'></td>";
		itemText += "			</tr>";
		itemText += "		</table>";
		itemText +=	"	</div>";
		itemText +=	"	<div id='pannel2'>";
		itemText +=	"	</div>";
	    itemText += "</fieldset>";
					
		itemText += "<fieldset style='padding-bottom:0px;padding-top:10px;padding-right:0px;padding-left:0px;border: none;' width='1320px;'>";
		itemText +=	"	<hr class='bar'/> ";
		itemText += "</fieldset>";
		
		document.getElementById('container').innerHTML=itemText;
		document.getElementById("submitQuery").disabled = true;
		
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
			itemText +=	"	<div id='pannel1'>";
			itemText += "		<table width='100%;' style='vertical-align:top; background: none repeat scroll 0 0 #ffffff; border: 0px solid #72CE9B;' cellspacing='0px'>";
			itemText += "			<tr>";
			itemText += "				<td class='expfirst' colspan='3' align='left' width='1320px' style='color: #757561;font-weight: bold;font-size: 16px;'>SPARQL Query</td>";
			itemText += "			</tr>";
			itemText += "			<tr>";
			itemText += "				<td class='expfirst' colspan='3' align='center' width='100%' height='40px'><textarea style='width: 100%; height: 150px; background-color:#E0E0E0;' name='query' id='query'></textarea></td>";
			itemText += "			</tr>";
			itemText += "			<tr>";
			itemText += "				<td class='expfirst' colspan='3' align='right' width='1320px' height='40px'><input type='button' id='submitQuery' value='Submit Query' onClick='performQuery();' disabled='disabled'></td>";
			itemText += "			</tr>";
			itemText += "		</table>";
			itemText +=	"	</div>";
			itemText +=	"	<div id='pannel2'>";
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
			itemText +=	"	<div id='pannel1'>";
			itemText += "		<table width='100%;' style='vertical-align:top; background: none repeat scroll 0 0 #ffffff; border: 0px solid #72CE9B;' cellspacing='0px'>";
			itemText += "			<tr>";
			itemText += "				<td class='expfirst' colspan='3' align='left' width='1320px' style='color: #757561;font-weight: bold;font-size: 16px;'>SPARQL Query</td>";
			itemText += "			</tr>";
			itemText += "			<tr>";
			itemText += "				<td class='expfirst' colspan='3' align='center' width='100%' height='40px'><textarea style='width: 100%; height: 150px; background-color:#E0E0E0;' name='query' id='query'></textarea></td>";
			itemText += "			</tr>";
			itemText += "			<tr>";
			itemText += "				<td class='expfirst' colspan='3' align='right' width='1320px' height='40px'><input type='button' id='submitQuery' value='Submit Query' onClick='performQuery();' disabled='disabled'></td>";
			itemText += "			</tr>";
			itemText += "		</table>";
			itemText +=	"	</div>";
			itemText +=	"	<div id='pannel2'>";
			itemText +=	"	</div>";
			itemText += "</fieldset>";
						
			itemText += "<fieldset style='padding-bottom:0px;padding-top:10px;padding-right:0px;padding-left:0px;border: none;' width='1320px;'>";
			itemText +=	"	<hr class='bar'/> ";
			itemText += "</fieldset>";
			
			document.getElementById('container').innerHTML=itemText;
			document.getElementById("submitQuery").disabled = false;
			
			//performQuery(user, path);
			
		}
	}
}
