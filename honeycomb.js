/* Hexagons */
var vBorders = 15;
var hBorders = vBorders * 1.732; // sqrt(3)

function placeHoneycomb() {
	// Set positions:
	var row = 0;
	var column = 0;
	var widthSum = 0;
	var outerRadius = jQuery('.combOuter').width()/2;
	var innerRadius = jQuery('.combOuter').height()/2;
	var pull = Math.sqrt(outerRadius*outerRadius - innerRadius*innerRadius);
	var push = jQuery('.combOuter').width() - pull;
	
	/*var itemsPerEvenRow = 	Math.floor(jQuery('.combOuter').parent().width() / (jQuery('.combOuter').width() + hBorders));
	var itemsPerRow = 		Math.floor(jQuery('.combOuter').parent().width() / (jQuery('.combOuter').width() + hBorders + push));*/
	var itemsPerRowUnfloored = 	jQuery('.honeycomb').width() / (jQuery('.combOuter').width() + 2* hBorders + push);
	var itemsPerRow = 		Math.floor(itemsPerRowUnfloored);
	var itemsPerEvenRow = itemsPerRow;
	
	if ((itemsPerRowUnfloored - itemsPerRow) * jQuery('.honeycomb').width() >= (jQuery('.combOuter').width())) {
		itemsPerEvenRow++;
	}
	
	var centerPush = 0;
	//var totalWidth = itemsPerEvenRow * (jQuery('.combOuter').width() + outerRadius + 2 * hBorders);
	//var totalWidth = itemsPerEvenRow * jQuery('.combOuter').width();
	var totalWidth = ((itemsPerEvenRow) * jQuery('.combOuter').width() + (itemsPerEvenRow - 1) * outerRadius) + (itemsPerEvenRow - 1) * 2 * hBorders;
	if (itemsPerEvenRow != itemsPerRow) {
	} else {
		totalWidth +=  hBorders + push;
	}
	
	if (itemsPerRow == 0) totalWidth = jQuery('.combOuter').width();
	
	centerPush = (jQuery('.honeycomb').width() - totalWidth)/2;
	
	//jQuery(window).resize(function () {console.log(totalWidth + " : " + jQuery('.honeycomb').width() + " : " + centerPush)});
	var boxNum = 1;
	jQuery('section .gallery, .galleryOverview').each(function(index) {
		row = 0;
		column = 0;
		jQuery('.combOuter', this).each(function(index) {
			// Check if we should start a new row or not
			if ((index != 0 && row % 2 == 0 && column >= itemsPerEvenRow)
				|| (index != 0 && row % 2 == 1 && column >= itemsPerRow)) {
				//We have a new row
				row++;
				column = 0;
			}
			
			if (itemsPerRow == 0) {
				//// If this happens, just normally float the elements
				//jQuery(this).css({position:"relative", "top": 0, "left": 0});
				
				var top = row * (2 * innerRadius + vBorders);
				jQuery(this).css({position:"absolute", "top": top, "left": centerPush});
			} else {
				// Normal positioning
				// Every second row needs to be arranged more to the left and a bit more up
				var top = row * (innerRadius + vBorders);
				var leftBase = centerPush + (column * jQuery(this).width() + column * outerRadius);
				var leftBorders = column * 2 * hBorders;
				if (row % 2 == 0) {
					jQuery(this).css({position:"absolute", "top": top, "left": leftBase + leftBorders});
				} else {
					jQuery(this).css({position:"absolute", "top": top,  "left": leftBase + leftBorders + hBorders + push});
				}
				// Make sure blocks don't overlap parts of possible anchor tags etc
				//jQuery(this).css({"z-index": (10 + column) });
			}
			column++;
		});
	});
	
	
	var margins = jQuery('.combOuter').outerHeight(true) - jQuery('.combOuter').outerHeight();
	var totalHeight = row * (Math.ceil(innerRadius) + vBorders) + 2 * innerRadius + margins;
	
	if (itemsPerRow == 0) {
		// If this happens, we have to calculate the total height differently, as the elements are positioned directly below each other
		totalHeight = row * (Math.ceil(2* innerRadius) + vBorders) + 2 * innerRadius + margins;
	}
	
	jQuery('.honeycomb').height(totalHeight);
}

// For the ilightbox views
jQuery(document).ready(function() {
	// Overview/Frontpage
	// Prepare the elements. Wrap them to make them hexagonal
	jQuery('.galleryOverviewLi figure').css({"display":"block", "pointer-events":"visibleFill"});
	jQuery('ul.galleryOverview').addClass("honeycomb");
	jQuery('.galleryOverviewLi figure').wrap('<div class="combOuter"><div class="innerClipClockwise"><div class="innerClipCounterClockwise" /></div></div>');
	
	// Gallery pages
	// Prepare the elements. Wrap them to make them hexagonal
	jQuery('.galleryLi figure').css({"display":"block", "pointer-events":"visibleFill"});
	jQuery('section .gallery').addClass("honeycomb");
	jQuery('.galleryLi figure').wrap('<div class="combOuter"><div class="innerClipClockwise"><div class="innerClipCounterClockwise" /></div></div>');
	
	// Place the hexagons to form a comb
	placeHoneycomb();
	
	// The placement has to be updated, when the content width changes
	jQuery(window).resize(function() {placeHoneycomb()});
});