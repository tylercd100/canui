steal('funcunit').then(function(){
	
module("can.ui.layout.TableScroll", {
	setup: function(){
        S.open("//canui/table_scroll/table_scroll_plain.html");
		
		// helps compare columns
		this.compareCols = function(i, size){
			var width = S(".header th:eq("+i+")").outerWidth();
			
			var outer = S("#table tr:first td:eq("+i+")").outerWidth();
			
			if(i == size -1){
				ok(outer < width,"Last is bigger")
			}else{
				equals(outer, width, ""+i+" columns widths match")
			}
			
		}
	}
});

test("columns are the right size", function(){
	var compareCols = this.compareCols;
	
	S("#scrollable").click().wait(100, function(){
		var size = S(".header th").size();
		for(var i =0; i < size; i++){
			compareCols(i, size);
		}
	});
});

test("horizontal scroll", 1, function(){
	S("#scrollable").click().wait(100);

	
	S('.scrollBody').scroll("left",10);
	S('.header').scrollLeft(10, function(){
		ok(true, "assertions make people feel better")
	});
});

test("updateColumns and resize", function() {
	S("#scrollable").click().wait(100);
	var oldWidth;
	S(function() {
		oldWidth = S.win.$('th:eq(1)').width();
	})
	S("#resize").click().wait(100, function(){
		ok(S.win.$('td:eq(1)').width() > oldWidth, 'Columns got resized as well');
	});
});

})