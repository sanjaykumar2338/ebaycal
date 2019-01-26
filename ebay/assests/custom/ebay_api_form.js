  
  var fileobj;
  function upload_file(e,type) { 
    e.preventDefault();    
    fileobj = e.target.files[0];
    console.log(e,type)
    //fileobj = e.dataTransfer.files[0];
    ajax_file_upload(fileobj);
  }
 
  function file_explorer() {
    document.getElementById('selectfile').click();
    document.getElementById('selectfile').onchange = function() {
        fileobj = document.getElementById('selectfile').files[0];
      ajax_file_upload(fileobj);
    };
  }
  
 
 var mytable = $('#example1').DataTable({
      'paging'      : true,
      'lengthChange': true,
      'searching'   : true,
      'ordering'    : true,
      'info'        : true,
      'autoWidth'   : true
	});
 
function ajax_file_upload(file_obj) {
    if(file_obj != undefined) {
       $('#pendingResult').show();

        var form_data = new FormData();                  
        form_data.append('keyword', file_obj);
        
        $('#progress_bar').show();  

        $.ajax({
        type: 'POST',
        url: "ebayapi/readdata",
        contentType: false,
        processData: false,
        data: form_data,
        success:function(response) {
		  $("#keywords").val(null);	
          $('#progress_bar').hide();  
          var obj = JSON.parse(response);  
          
          if(obj.status == 1){ 
			$('#example1').DataTable().clear().draw();
			
			console.log(obj.data);
			
			var i=1;
            $.each(obj.data, function(k, productInfo) {
			  let price=0;	
			  if(productInfo[11]){
				  price = productInfo[11].toFixed(2);
			  }
			 
			  mytable.row.add([i,productInfo[0],productInfo[1],productInfo[2],productInfo[3],productInfo[4],productInfo[5],productInfo[6],productInfo[10],price,productInfo[12]]);	
              mytable.draw();
			  i++;
            });             

            //$("#popuptableLite tbody").append(tr);
          }else{
              alert(obj.msg)              
          }          
        }
      });
    }
  }


