
	//user authentication using firebase
	var ref = new Firebase ("https://inoteapp.firebaseio.com");

	//create user	
	var registerUser = document.querySelector("#register-submit");
	var login = document.querySelector("#login-submit");
	var forgotPwd = document.querySelector("#forgotPwd");
	var changePwd = document.querySelector("#chngPwd");
	var delAcct =  document.querySelector("#delAcct");
	var logOut = document.querySelector("#logout");
	


	if (registerUser !== null) {
		register();
	} 
	
	function register () {
		registerUser.addEventListener ("click", function(){
			var userName = document.querySelector("#username").value;
			var email = document.querySelector("#email").value;
			var password = document.querySelector("#pwd").value;
			var confirmPwd = document.querySelector("#confirmPwd").value;
			
			if (userName !== "" && email !== "" && password !== "" && confirmPwd !== "") {
				if (password === confirmPwd) {
					ref.createUser ({
					    email    : email,
					    password : password
					}, 	function (error, userData) {
						    if (error) {
						        console.log("Error creating user:", error);
						    } else {
						    	console.log("Successfully created user account with uid:", userData.uid);
						    	ref.authWithPassword ({
									email    : email,
									password : password
								}, 	function(error, authData) {
									  	if (error) {
									    	console.log("Login Failed!", error);
									  	} else {
									    	console.log("Authenticated successfully with payload:", authData);
									    	auth = authData;
									    	location = "notepage.html";
									
											ref.child('users').child(userData.uid).set({
												username :  userName,
												email    :  email,
												password :  password
											},  function(){
							                    	console.log("User Information Saved:", userData.uid);
							                  	}
							                );
										}
									}
							    );
							}
						}
					);
				}
			}	
		});
	}


    if (login !== null) {
		authUser();
	} 

	function authUser () {
		login.addEventListener ("click", function() {
			var loginEmail = document.getElementById("login_email").value;
			var loginPwd = document.getElementById("login_pwd").value;
			
			
			if(loginEmail !== "" && loginPwd  !== "") {
				ref.authWithPassword ({
					email    : loginEmail,
					password : loginPwd
				}, 	function(error, authData) {
					  	if (error) {
					    	console.log("Login Failed!", error);
					  	} else {
					    	console.log("Authenticated successfully with payload:", authData);
					    	auth = authData;
					    	location = "notepage.html";
					  	}
					}
				);
			}
		})	
    }



    if (forgotPwd !== null) {
		forgotPassword();
	} 

    function forgotPassword () {
		forgotPwd.addEventListener("click", function(){
			var email = document.getElementById("fpwd_email").value;
			
			ref.resetPassword ({
				email : email
				}, 	function(error) {
				  		if (error === null) {
				    		console.log("Password reset email sent successfully");
				  		} else {
				    		console.log("Error sending password reset email:", error);
				  		}
					}
			);
		})			
	}	
		
	

	if (changePwd !== null) {
		chngPassword();
	} 

	function chngPassword () {
		changePwd.addEventListener("click", function(){
			var email = document.getElementById("chngpwd_email").value;
			var oldPwd = document.getElementById("old_password").value;
			var newPwd = document.getElementById("chngpwd_password").value;
			var cfrNewPwd = document.getElementById("chngpwd_cfmpassword").value;
			
			ref.changePassword({
			    email       : email,
			    oldPassword : oldPwd,
			    newPassword : newPwd
			}, 	function(error) {
				    if (error === null) {
				    	console.log("Password changed successfully");
				    } else {
				    	console.log("Error changing password:", error);
				  	}
			    }
			);
		})	
	}	

 

	if (delAcct !== null) {
		deleteAcct();
	} 

	function deleteAcct () {
		delAcct.addEventListener("click", function(){
			var email = document.getElementById("delEmail").value;
			var pwd = document.getElementById("delPwd").value;
			var errorMsg = document.querySelector("#errormsg").firstChild.nodeValue;
			
			ref.removeUser({
				email    : email,
			    password : pwd
				}, 	function(error) {
				  		if (error === null) {
				    		console.log("User removed successfully");
				    		location = "index.html";
				  		} else {
				    		console.log("Error removing user:", error);
				  		}
					}
			);
		
		})
	}
	


	if (logOut !== null) {
		logout();
	} 

	function logout () {
		logOut.addEventListener("click", function(){
			ref.unauth();
			location = "index.html";
		})
  	}
  
 

  
  	// login/register tab animation
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
 
  
