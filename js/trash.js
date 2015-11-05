	var emptyTrashBtn = document.querySelector("#empty_trash");
	var ulTrashNote = document.getElementById("trash_note_area");
	var li = document.querySelectorAll(".well-sm");
	
	function emptyTrash () {
		ulTrashNote.removeChild(li);
	}
	
	emptyTrashBtn.onclick = emptyTrash;