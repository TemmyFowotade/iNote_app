/* 
 *iNote - A simple noteapp for capturing your thoughts on the go
 *By Temitope Fowotade
 */
	var ref = new Firebase("https://inoteapp.firebaseio.com");
	var usersRef = ref.child('users');

	var auth = ref.getAuth();
	var saveBtn = document.getElementById("save_note");
	var titleNote = document.getElementById("title_area");
	var contentNote = document.getElementById("content_area");
	var ulElement = document.getElementById("old_note_area"); 
	var welcomeUser = document.getElementById("welcome_username");
	 
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
	


	function showContent () {
		var content = this.childNodes[1];
	    content.style.display = 'block';
	}

	function hideContent () {
		var content = this.childNodes[1];
		content.style.display = 'none';
	}



	function createLiElement (title, content, notekey) {
		var newLi = document.createElement("li");
		newLi.setAttribute("class", "well well-sm");
		newLi.id = notekey;
		newLi.onmouseover = showContent; 
		newLi.onmouseout = hideContent;
		
		var titleEl = document.createElement("span");
		var titleNode = document.createTextNode(title);
		titleEl.appendChild(titleNode);
		
		var contentEl = document.createElement("span");
		var contentNode = document.createTextNode(content);
		contentEl.appendChild(contentNode);
		contentEl.style.display = "none";
		
		
		var editBtn = document.createElement("A");
		var linkText = document.createTextNode("Edit");
		editBtn.appendChild(linkText);
		editBtn.href = "edit_note.html";
		editBtn.setAttribute("class", "btn btn-link");
		editBtn.onclick = editNote;

		var delBtn = document.createElement("input");
		delBtn.setAttribute("type", "submit");
		delBtn.setAttribute("value", "Trash");
		delBtn.setAttribute("class", "btn btn-link del_note");
		delBtn.onclick = deleteNote;
	
		newLi.appendChild(titleEl);
		newLi.appendChild(contentEl);
		newLi.appendChild(editBtn);
		newLi.appendChild(delBtn);
		
		return newLi;
	}
	
	
 	
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
			},  function() {
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
	
	saveBtn.onclick = createNote; 




	function editNote () {
		var liElement = this.parentNode;
		var noteTitle = liElement.childNodes[0].firstChild.nodeValue;
		var noteContent = liElement.childNodes[1].firstChild.nodeValue;
		var liId = liElement.getAttribute("id");

		localStorage.setItem("title", noteTitle);
		localStorage.setItem("content", noteContent);
		localStorage.setItem("notekey", JSON.stringify(liId));
	}



	
	function deleteNote () {
		var liElement = this.parentNode;
		var liId = liElement.getAttribute("id");
		var title = liElement.childNodes[0].firstChild.nodeValue;
		var content = liElement.childNodes[1].firstChild.nodeValue;
		
	 

		var myUser = usersRef.child(auth.uid);
		var trashNotesRef = myUser.child("trash_notes");
		var trash = trashNotesRef.push ({
			title: title,
			content: content
		},  function(){
        	console.log("Note trashed successfully: ", auth.uid);
        	trash.update({
        		noteid: trash.key()
        	});
      	}
    );


		var notePath = myUser.child("notes").child(liId);
		notePath.remove();
		ulElement.removeChild(liElement);	
	}
	
 

    
    



	
	
	