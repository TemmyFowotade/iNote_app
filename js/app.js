/* 
 *iNote - A simple noteapp for capturing your thoughts on the go
 *written by Temitope Fowotade
 */
	 
	 
	function clean(node) {
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
	var notesRef = ref.child("notes");
	
	var titleNote = document.getElementById("title_area");
	var saveNote = document.getElementById("save_note");
	var oldNoteArea = document.getElementById("old_note_area");
	var ulElement = oldNoteArea.childNodes[0]; 
	var contentNote = document.getElementById("content_area");
	var ulTrashNote = document.getElementById("trash_note_area");
	
	
	function createLiElement (title, content) {
		var newLi = document.createElement("li");
		newLi.setAttribute("class", "well well-sm");
		
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
	
	/*function getTimeOfEntry () {
		var currentTime = new Date();
		var hours = currentTime.getHours();
		var minutes = currentTime.getMinutes();
		
		if (minutes < 10){
		    minutes = "0" + minutes;
		}
		var suffix = "AM";

		if (hours >= 12) {
			suffix = "PM";
			hours = hours - 12;
		}
		if (hours == 0) {
			hours = 12;
		}

		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		return (hours + ":" + minutes + " " + suffix);
	}*/
 
	function createNote () { 
		var title = titleNote.value;
		var content = contentNote.value;
		var newLi = createLiElement(title, content);
		if (title !== "" && content !== "") {
			ulElement.insertBefore(newLi, ulElement.firstChild);
			//save username, time of entry, title and content into usersRef
				notesRef.push({
					username: {
					//time_of_entry: getTimeOfEntry(),
					title: title,
					content: content
				}
			});
			
		}
		titleNote.value = "";
		contentNote.value = "";
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
    



	
	
	