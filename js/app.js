/* 
 *iNote - A simple noteapp for capturing your thoughts on the go
 *written by Temitope Fowotade
 */
 
 //(function () {
	 
	 
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
 var ulElement = oldNoteArea.firstChild; 
 var editBtns = ulElement.getElementsByClassName("edit_note"); 
 var contentNote = document.getElementById("content_area");
 var title;
 var content;

 
 
	function createNote () { 
			title = titleNote.value;
			content = contentNote.value;
			
			var newLi = document.createElement("li");
			newLi.setAttribute("class", "well well-sm");
			
			var newTitle = document.createTextNode(title);
			
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
			newLi.appendChild(editBtn);
			newLi.appendChild(delBtn);
			
			ulElement.insertBefore(newLi, ulElement.firstChild);
	}

	  
	  

	function editNote () {
		console.log("edited!");
		//onclick edit, 
		//addEventListener 
		//set this.title = titleNote.value
		//set this.content = contentNote.value
		//replaceChild li of parentNode ul
		
	}
		
	
	function deleteNote () {
		console.log("deleted!");
	
		//appendChild parent node- li of delete button to trash area
		
		//var Li = this.parentNode;
		//Li.appendChild("trash area");
	}
	
	

	function emptyTrash () {
		//onclick emptyTrash
	    //loop over all elements
		//remove all children of ul using removeChild
		
	}
     
	  
	  

    function restoreNote () {
	   //onclick restore, this.parentNode 
	   //i.e li item of each restore button,
	   //appends to old_note_area ul using insertBefore
    }
     

	function searchNotes () {
	  
	}



	saveNote.onclick = createNote; 
	
	
	//onclick empty trash, trash notes are deleted permanently.	
	//onclick recover, trash note moves back to old notes.
 
//}())
