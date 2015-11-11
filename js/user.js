//(function () {


	//user authentication using firebase
	var ref = new Firebase("https://inoteapp.firebaseio.com");
	
	//create user	
	var registerUser = document.querySelector("#register-submit");
	var login = document.querySelector("#login-submit");
	var forgotPwd =  document.querySelector("#forgotPwd");
	var changePwd =  document.querySelector("#chngPwd");
	var delAcct =  document.querySelector("#delAcct");
	var logOut = document.querySelector("#logout");
	
	
	
	registerUser.addEventListener("click", function(){
		var userName = document.querySelector("#username").value;
		var email = document.querySelector("#email").value;
		var password = document.querySelector("#pwd").value;
		var confirmPwd = document.querySelector("#confirmPwd").value;
		var errorMsg = document.querySelector("#errormsg").firstChild.nodeValue;
		
		if(password === confirmPwd) {
			if(userName !== "" && email !== "" && password !== "" && confirmPwd !== "") {
				ref.createUser ({
					email    :  email,
					password :  password
				}, 	function(error, userData) {
						if (error) {
							switch (error.code) {
								case "EMAIL_TAKEN":
									errorMsg = "Email already in use. Please enter another email address";
									break;
								case "INVALID_EMAIL":
									errorMsg = "Please enter valid email";
									break;
								default:	
									errorMsg = "Error creating account!", error;
							}
						} else {
							console.log("Successfully created user account with uid:", userData.uid);
							var usersReference = ref.child("users").child(userData.uid);
							var usersRef = usersReference.push();
							usersRef.set({
								uid : userData.uid,
								username :  userName,
								email    :  email,
								password :  password
							});
						  }
					}
				);
				errorMsg = "Account created! Please log in.";
			} else {
				errorMsg = "Please fill out all fields!";
			}
		} else {
			errorMsg = "Passwords do not match!"
		}
	})

	
    
	
	login.addEventListener("click", function(){
		var loginEmail = document.getElementById("login_email").value;
		var loginPwd = document.getElementById("login_pwd").value;
		var errorMessage = document.querySelector("#errormessage").firstChild.nodeValue;
		
		
		if(email !== "" && password !== "") {
			ref.authWithPassword({
					email    : loginEmail,
					password : loginPwd
				}, function(error, authData) {
				  if (error) {
					switch (error.code) {
					  case "INVALID_EMAIL":
						errorMessage = "The specified user account email is invalid.";
						break;
					  case "INVALID_PASSWORD":
						errorMessage = "The specified user account password is incorrect.";
						break;
					  case "INVALID_USER":
						errorMessage = "The specified user account does not exist.";
						break;
					  default:
						errorMessage = "Error logging user in:", error;
					}
				  } else {
					return "Authenticated successfully with payload:", authData;
					auth  = authData;
					location = "notepage.html";
				  }
				}
			);
		}
			
	})	
    

	forgotPwd.addEventListener("click", function(){
		var email = document.getElementById("fpwd_email").value;
		var errorMsg = document.querySelector("#errormsg").firstChild.nodeValue;
		
		ref.resetPassword({
			email : email
			}, 
			function(error) {
			  if (error === null) {
			  errorMsg = "temporary login token sent successfully!";
			  } else {
					switch (error.code) {  
						case "INVALID_USER":
							errorMsg = "Specified user account does not exist. Please enter correct email address or register to create account.";
							break;
						case "INVALID_EMAIL":
							errorMsg = "Please enter valid email.";
							break;
						default:	
							errorMsg = "Error sending password reset email!", error;
					}
				}
			}
		);
	})			
		
		
		

	changePwd.addEventListener("click", function(){
		var email = document.getElementById("chngpwd_email").value;
		var oldPwd = document.getElementById("old_password").value;
		var newPwd = document.getElementById("chngpwd_password").value;
		var cfrNewPwd = document.getElementById("chngpwd_cfmpassword").value;
		
		var errorMsg = document.querySelector("#errormsg").firstChild.nodeValue;
		
		ref.changePassword({
				email       : email,
				oldPassword : oldPwd,
				newPassword : newPwd
				}, 
				function(error) {
				    if (error === null) {
					console.log("Password changed successfully");
					} else {
						switch (error.code) {
							  case "INVALID_EMAIL":
								errorMsg = "Please enter valid email.";
								break;
							  case "INVALID_USER":
								errorMsg = "Specified user account does not exist. Please enter correct email address or register to create account.";
								break;
							  case "INVALID_TOKEN":
								errorMsg = "User token is invalid or expired.";
								break;
							  default:	
								errorMsg = "Error changing password!", error;
						}
					}
				}
			);
		
		
		
	})	
		

	delAcct.addEventListener("click", function(){
		var email = document.getElementById("delEmail").value;
		var oldPwd = document.getElementById("delPwd").value;
		var errorMsg = document.querySelector("#errormsg").firstChild.nodeValue;
		
		ref.removeUser({
				email    : email,
				password : password
				}, 
				function(error) {
				  if (error) {
					  switch (error.code) {
						  case "INVALID_EMAIL":
							errorMsg = "Please enter valid email.";
							break;
						  case "INVALID_PASSWORD":
							errorMsg = "Incorrect password.";
							break;
						  case "INVALID_USER":
							errorMsg = "Account does not exist! Please register to login.";
							break;
						  default:	
							errorMsg = "Unable to delete account!", error;
						}
				  } else {
					alert("User account deleted successfully!");
					location = "index.html";
					}
				}
		);
	
	})
	
	

	logOut.addEventListener("click", function(){
		ref.unauth();
		location = "index.html";
	})
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  	//bootstrap login feature animation
	$(function() {
		$('#login-form-link').click(function(e) {
			$("#login-form").delay(100).fadeIn(100);
			$("#register-form").fadeOut(100);
			$('#register-form-link').removeClass('active');
			$(this).addClass('active');
			e.preventDefault();
		});
		$('#register-form-link').click(function(e) {
			$("#register-form").delay(100).fadeIn(100);
			$("#login-form").fadeOut(100);
			$('#login-form-link').removeClass('active');
			$(this).addClass('active');
			e.preventDefault();
		});

	});
 
  
//}())