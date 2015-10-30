//(function () {
/* 
 *iNote - A simple noteapp for capturing your thoughts on the go
 *written by Temitope Fowotade
 */
 var titleNote = document.getElementById("title_area");
 var saveNote = document.getElementById("save_note");
 var oldNoteArea = document.getElementById("old_note_area");
 var liElement;
 if (oldNoteArea.firstChild.nodeType === 1) {
	liElement = oldNoteArea.firstChild;
 } else if (oldNoteArea.firstChild.nodeType === 3) {
	liElement = oldNoteArea.firstChild.nextSibling;
 }
 
 
	function createNote () {
		var title = titleNote.value;  
		liElement.childNodes[0].nodeValue = title;
	}
    saveNote.onclick = createNote;
	  
	  

	function editNote () {
	  
	}
      //onclick save, old note is updated.
	  
 
	function searchNotes () {
	  
	}

	
	function trashNotes () {
	  
	}
      //onclick trash, old note moves to the trash can.
	

	function emptyTrash () {
	  
	}
      //onclick empty trash, trash notes are deleted permanently.
	  
	  

    function restoreNote () {
	  
    }
      //onclick recover, trash note moves back to old notes.


	  
	saveNote.onclick = createNote;  
	
 
//}())
