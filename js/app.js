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
 
	 var titleNote = document.getElementById("title_area");
	 var saveNote = document.getElementById("save_note");
	 var oldNoteArea = document.getElementById("old_note_area");
	 var ulElement = oldNoteArea.childNodes[0]; 
	 var editBtns = ulElement.getElementsByClassName("edit_note"); 
	 var contentNote = document.getElementById("content_area");
	
	

	
 
	function createNote () { 
		var title = titleNote.value;
		var content = contentNote.value;
		
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
		
		ulElement.insertBefore(newLi, ulElement.firstChild);
	}
	
	saveNote.onclick = createNote; 
	
	//validations for create note, 
		//if title and content are empty, return false for onclick save_note
		//once note is saved, clear contents of title and content areas.

	


	function editNote () {
		var titleEl = this.previousSibling.previousSibling.nodeValue;
		titleNote.value = titleEl;
		
		var contentEl = this.previousSibling;
		var contentNode = contentEl.childNodes[0].nodeValue;
		contentNote.value = contentNode;
		
		var liElement = this.parentNode;
		ulElement.removeChild(liElement);
	}
	
	//validation for edit note
		//after clicking edit, if user does not save note...undo edit action

	
	function deleteNote () {
		console.log("deleted!");
		var liElement = this.parentNode;
		ulElement.removeChild(liElement);
		//ulTrashNote.insertBefore(liElement, firstChild);
		
		
		var title = titleNote.value;
		var content = contentNote.value;
		
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
		editBtn.setAttribute("value", "restore");
		editBtn.setAttribute("class", "btn btn-link");
		editBtn.onclick = restoreNote;
	
		newLi.appendChild(newTitle);
		newLi.appendChild(newContent);
		newLi.appendChild(editBtn);
		newLi.appendChild(delBtn);
		
		ulTrashNote.insertBefore(newLi, ulTrashNote.firstChild);
		
		
	}
	
 

    function restoreNote () {
	   //onclick restore, this.parentNode 
	   //i.e li item of each restore button,
		var li = this.parentNode;
		var title = titleNote.value;
		var content = contentNote.value;
		
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
		
		ulElement.insertBefore(newLi, ulElement.firstChild);
    }
     

	function searchNotes () {
	  
	}




	
	
	