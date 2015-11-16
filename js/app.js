/* 
 *iNote - A simple noteapp for capturing your thoughts on the go
 *written by Temitope Fowotade
 */
	 
	 
	function clean (node) {
		for(var n = 0; n < node.childNodes.length; n++) {
			var child = node.childNodes[n];
			if (child.nodeType === 8 || (child.nodeType === 3 && !/\S/.test(child.nodeValue))) {
				node.removeChild(child);
				n--;
			}
			else if (child.nodeType === 1) {
			  clean(child);
			}
		}
	}
	
	clean(document.body);
	

	var ref = new Firebase("https://inoteapp.firebaseio.com");
	var usersRef = new Firebase("https://inoteapp.firebaseio.com/users");
	var auth = ref.getAuth();
	
	
	var saveNote = document.getElementById("save_note");
	var titleNote = document.getElementById("title_area");
	var contentNote = document.getElementById("content_area");
	var ulElement = document.getElementById("old_note_area"); 
	var welcomeUser = document.getElementById("welcome_username");
	
	
	function welcomeUsers () {
		var myUser = usersRef.child(auth.uid);
		myUser.once("value", function(snapshot) {
			var username = snapshot.val().username;
			welcomeUser.innerHTML = "Welcome, " + username;
		});
	}
	welcomeUsers();


	function createLiElement (title, content) {
		var newLi = document.createElement("li");
		newLi.setAttribute("class", "well well-sm");
		
		//title = //read data from firebase
		var newTitle = document.createTextNode(title);
		
		//content = //read data from firebase
		var newContent = document.createElement("input");
		newContent.setAttribute("type", "text");
		var newContentValue = document.createTextNode(content);
		newContent.appendChild(newContentValue);
		newContent.style.display = "none";
		
		var editBtn = document.createElement("input");
		editBtn.setAttribute("type", "submit");
		editBtn.setAttribute("value", "Edit");
		editBtn.setAttribute("class", "btn btn-link edit_note");
		editBtn.onclick = editNote;
		
		var delBtn = document.createElement("input");
		delBtn.setAttribute("type", "submit");
		delBtn.setAttribute("value", "Trash");
		delBtn.setAttribute("class", "btn btn-link del_note");
		delBtn.onclick = deleteNote;
	
		newLi.appendChild(newTitle);
		newLi.appendChild(newContent);
		newLi.appendChild(editBtn);
		newLi.appendChild(delBtn);
		
		return newLi;
	}
	
	
 	
 	//load previously saved notes and any newly added ones by attaching title and content from firebase to createLiElement
 	if( auth !== null ) {
 		var myUser = usersRef.child(auth.uid);
		myUser.child("notes").on("child_added", function(snapshot) {
			var newNote = snapshot.val();
			var title = newNote.title;
			var content = newNote.content;
			var newLi = createLiElement(title, content);
			ulElement.insertBefore(newLi, ulElement.firstChild);
		});
	} else {
		alert("Please Create an account or Sign in to save notes!");
		location = "index.html";
	}


	

	function createNote () { 
		if (titleNote.value !== "" && contentNote.value !== "") {
			var title = titleNote.value;
			var content = contentNote.value;

			var myUser = usersRef.child(auth.uid);
			myUser.child("notes").push ({
				title: title,
				content: content
				//time_of_entry: Firebase.ServerValue.TIMESTAMP
			},  function(){
                	console.log("Note saved successfully: ", auth.uid);
              	}
            );

			titleNote.value = "";
			contentNote.value = "";
		}	
	}
	
	saveNote.onclick = createNote; 
	

	function editNote () {
		var labelEl = this.previousSibling.previousSibling.nodeValue;
		var contentEl = this.previousSibling;
		var contentNode = contentEl.childNodes[0].nodeValue;
		
		titleNote.value = labelEl;
		contentNote.value = contentNode;
		
		var liElement = this.parentNode;
		ulElement.removeChild(liElement);
		
		//validation for edit note
			//onclick edit, if user does not save new note...undo edit action
	}
	
	

	
	function deleteNote () {
		console.log("deleted!");
		var liElement = this.parentNode;
		ulElement.removeChild(liElement);
		ulTrashNote.insertBefore(liElement, firstChild);
		//remove edit and delete button of this.li
		//add restore button of this.li	
		//set onclick property of restore = restoreNote
	}
	
 

    function restoreNote () {
	    var liElement = this.parentNode;
		ulElement.insertBefore(liElement, ulElement.firstChild);
		//remove restore button of this.li
		//add edit and delete button of this.li
		//set onclick property of edit and trash to editNote and deleteNote resp
    }
    



	
	
	