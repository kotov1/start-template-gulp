window.onload = function () {
	var font = new FontFaceObserver('Font');
  
	font.load().then(function () {
	  document.documentElement.className += "Font";
	});
	font.load()
	  .then(function(result) {
		console.log('Font is available');
	  })
	  .catch(function(error) {
		console.log('Font is not available');
	  });
  };

$(function() {

	

});
