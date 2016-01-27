	
		var ref = new Firebase("https://inoteapp.firebaseio.com");
		var usersRef = ref.child('users');
		var auth = ref.getAuth();

		var ulTrashNote = document.getElementById("trash_note_area");
		var emptyTrashBtn = document.querySelector("#empty_trash");
	

		function reCreateLiElement (title, content, notekey) {
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
			
			var restoreBtn = document.createElement("input");
			restoreBtn.setAttribute("type", "submit");
			restoreBtn.setAttribute("value", "restore");
			restoreBtn.setAttribute("class", "btn btn-link restore_note");
			restoreBtn.onclick = restoreNote;
		
			newLi.appendChild(titleEl);
			newLi.appendChild(contentEl);
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



		function showContent () {
			var content = this.childNodes[1];
		  content.style.display = 'block';
		}

		function hideContent () {
			var content = this.childNodes[1];
			content.style.display = 'none';
		}

    function restoreNote () {
			var liElement = this.parentNode;
			var liId = liElement.getAttribute("id");
			var title = liElement.childNodes[0].firstChild.nodeValue;
			var content = liElement.childNodes[1].firstChild.nodeValue;
			 
			var myUser = usersRef.child(auth.uid);
			var notesRef = myUser.child("notes");
			var notes = notesRef.push ({
				title: title,
				content: content
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
			var ConfirmEmpty = confirm("Are you sure you want to empty trash? You can't undo this action.");
			if (ConfirmEmpty === true) {
				var allTrashNotes = document.querySelectorAll(".well-sm");
				var myUser = usersRef.child(auth.uid);
				var trashNotePath = myUser.child("trash_notes");

				trashNotePath.remove();

				for (var i = 0, len = allTrashNotes.length; i < len; i++) {
					ulTrashNote.removeChild(allTrashNotes[i]); 
				}
			} 
		} 
	
		emptyTrashBtn.onclick = emptyTrash; 