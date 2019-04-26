(function($) {
    $myr = $('.my-rating');
    theBlog  = $myr.data('blog-id');
    thePost  = $myr.data('post-id');
    theAPI   = $myr.data('api');
    theRate  = $myr.data('rating');
    theCount = $myr.data('counter');
    theHigh  = $myr.data('high-demand');

    if ('NaN' == theRate) theRate = 0;

	// Exibe as estrelinhas e as estatísticas
    showStats = function(mustforce){
        if (!mustforce && theHigh == 1) {
            $('#ratingaverage').html(theRate);
            $('#ratingcount').html(theCount);
        }
        else {
            nanoajax(
				{
					url: theAPI + '/stats/' + theBlog + '/' + thePost
				},
                function(code, responseText){
					d = JSON.parse(responseText);
					theRate = d.average;
					theCount = d.count;
                    $('#ratingaverage').html(theRate);
                    $('#ratingcount').html(theCount);
                }
			);
        } // else
    }

    $myr.starRating({
        starSize: 32,
        useFullStars: true,
        initialRating: theRate,
        callback: function(currentRating, $el){
            nanoajax(
				{
					url: theAPI + '/vote/'+theBlog+'/'+thePost+'/'+currentRating
				},
				function(code, responseText){
					showStats(true);
				}
			);
        }
    });

	showStats(false);
})( jQuery );
