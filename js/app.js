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
	
	
	if( auth !== null ) {
		welcomeUsers ();
	}

	function welcomeUsers () {
		var myUser = usersRef.child(auth.uid);
		myUser.once("value", function(snapshot) {
			var username = snapshot.val().username;
			welcomeUser.innerHTML = "Welcome, " + username;
		});
	}
	

	function createLiElement (title, content, notekey) {
		var newLi = document.createElement("li");
		newLi.setAttribute("class", "well well-sm");
		newLi.id = notekey;
		
		var newTitle = document.createTextNode(title);
		
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
			var notekey = newNote.noteid;
			var newLi = createLiElement(title, content, notekey);
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
			var notesRef = myUser.child("notes");
			var notes = notesRef.push ({
				title: title,
				content: content
				//time_of_entry: Firebase.ServerValue.TIMESTAMP
			},  function(){
                	console.log("Note saved successfully: ", auth.uid);
                	notes.update({
                		noteid: notes.key()
                	});
              	}
            );
			
			titleNote.value = "";
			contentNote.value = "";
		}	
	}
	
	saveNote.onclick = createNote; 
	

	function editNote () {
		var liElement = this.parentNode;
		var liId = liElement.getAttribute("id");
		var title = liElement.childNodes[0].nodeValue;
		var contentEl = liElement.childNodes[1];
		var content = contentEl.childNodes[0].nodeValue;
		
		titleNote.value = title;
		contentNote.value = content;
		
		var myUser = usersRef.child(auth.uid);
		var notePath = myUser.child("notes").child(liId);
		notePath.remove();
		ulElement.removeChild(liElement);

		console.log(notePath);
		
		/*var connectedRef = new Firebase("https://inoteapp.firebaseio.com/.info/connected");
		var myUser = usersRef.child(auth.uid);
		var notepath = myUser.child("notes").child(liId);
		var notepathRef = notepath.toString();
			connectedRef.on('value', function(snapshot) {
			  if (snapshot.val()) {
			    notepathRef.onDisconnect().remove();
			    notepathRef.update({
			    	liId: {
				    	title: title,
						content: content,
						noteid: liId
					}
			    })
			  }
			}); */
	}
	





	
	function deleteNote () {
		var liElement = this.parentNode;
		var liId = liElement.getAttribute("id");
		var title = liElement.childNodes[0].nodeValue;
		var contentEl = liElement.childNodes[1];
		var content = contentEl.childNodes[0].nodeValue;
		
	 

		var myUser = usersRef.child(auth.uid);
		var trashNotesRef = myUser.child("trash_notes");
		var trash = trashNotesRef.push ({
			title: title,
			content: content
			//time_of_entry: Firebase.ServerValue.TIMESTAMP
		},  function(){
            	console.log("Note saved successfully: ", auth.uid);
            	trash.update({
            		noteid: trash.key()
            	});
          	}
        );


		var notePath = myUser.child("notes").child(liId);
		notePath.remove();
		ulElement.removeChild(liElement);
		
	}
	
 

    
    



	
	
	