	
	var ref = new Firebase("https://inoteapp.firebaseio.com");
	var usersRef = new Firebase("https://inoteapp.firebaseio.com/users");
	var auth = ref.getAuth();

	var ulTrashNote = document.getElementById("trash_note_area");
	var emptyTrashBtn = document.querySelector("#empty_trash");
	
	


	function reCreateLiElement (title, content, notekey) {
		var newLi = document.createElement("li");
		newLi.setAttribute("class", "well well-sm");
		newLi.id = notekey;
		
		var newTitle = document.createTextNode(title);
		
		var newContent = document.createElement("input");
		newContent.setAttribute("type", "text");
		var newContentValue = document.createTextNode(content);
		newContent.appendChild(newContentValue);
		newContent.style.display = "none";
		
		var restoreBtn = document.createElement("input");
		restoreBtn.setAttribute("type", "submit");
		restoreBtn.setAttribute("value", "restore");
		restoreBtn.setAttribute("class", "btn btn-link restore_note");
		restoreBtn.onclick = restoreNote;
	
		newLi.appendChild(newTitle);
		newLi.appendChild(newContent);
		newLi.appendChild(restoreBtn);
		
		return newLi;
	}

	if( auth !== null ) {
 		var myUser = usersRef.child(auth.uid);
		myUser.child("trash_notes").on("child_added", function(snapshot) {
			var trashNotes = snapshot.val();
			var title = trashNotes.title;
			var content = trashNotes.content;
			var notekey = trashNotes.noteid;
			var newTrashNote = reCreateLiElement(title, content, notekey);
			ulTrashNote.insertBefore(newTrashNote, ulTrashNote.firstChild);
		});
	} else {
		alert("Please Create an account or Sign in to view trash notes!");
		location = "index.html";
	}




    function restoreNote () {
		var liElement = this.parentNode;
		var liId = liElement.getAttribute("id");
		var title = liElement.childNodes[0].nodeValue;
		var contentEl = liElement.childNodes[1];
		var content = contentEl.childNodes[0].nodeValue;
		
	 
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


		var trashNotePath = myUser.child("trash_notes").child(liId);
		trashNotePath.remove();
		ulTrashNote.removeChild(liElement);
	}



	
	function emptyTrash () {
		var allTrashNotes = document.querySelectorAll(".well-sm");
		var myUser = usersRef.child(auth.uid);
		var trashNotesRef = myUser.child("trash_notes");

		/*tra*shNotesRef.once("value", function(childSnapshot) {
			var childData = childSnapshot.val();
			childData.remove();
		});*/

		var myUser = usersRef.child(auth.uid);
		var trashNotePath = myUser.child("trash_notes");
		trashNotePath.remove();


		for (var i = 0, len = allTrashNotes.length; i < len; i++) {
			ulTrashNote.removeChild(allTrashNotes[i]); 
		}
	} 
	
	emptyTrashBtn.onclick = emptyTrash; 