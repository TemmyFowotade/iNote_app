//(function () {


	//user authentication using firebase
	var ref = new Firebase("https://inoteapp.firebaseio.com/");
	
	//create user	
	var registerUser = document.querySelector("#register-submit");
	
	registerUser.addEventListener("click", function(){
		var userName = document.querySelector("#username").value;
		var email = document.querySelector("#email").value;
		var password = document.querySelector("#pwd").value;
		var confirmPwd = document.querySelector("#confirmPwd").value;
	
		ref.createUser ({
		    email    :  email,
		    password :  password
		}, 	function(error, userData) {
				if (error) {
					console.log("Error creating user:", error);
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
	})

	
    //log in
	var login = document.querySelector("#login-submit");
	
	login.addEventListener("click", function(){
		var loginEmail = document.getElementById("login_email").value;
		var loginPwd = document.getElementById("login_pwd").value;
	
	
		ref.authWithPassword({
				email    : loginEmail,
				password : loginPwd
			}, function(error, authData) {
			  if (error) {
				switch (error.code) {
				  case "INVALID_EMAIL":
					console.log("The specified user account email is invalid.");
					break;
				  case "INVALID_PASSWORD":
					console.log("The specified user account password is incorrect.");
					break;
				  case "INVALID_USER":
					console.log("The specified user account does not exist.");
					break;
				  default:
					console.log("Error logging user in:", error);
				}
			  } else {
				console.log("Authenticated successfully with payload:", authData);
				auth  = authData;
				location = "index.html";
			  }
			}
		);
		
	})	
    //forgot password
    //change password
    //delete account
    //log out
	ref.unauth();

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
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