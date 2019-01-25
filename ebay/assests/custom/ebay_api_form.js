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
          $('#progress_bar').hide();  
          var obj = JSON.parse(response);  
          
          if(obj.status == 1){   

            $.each(obj.data, function(k, productInfo) {
              console.log(productInfo[0]);
            });             

            //$("#popuptableLite tbody").append(tr);

          }else{
              alert(obj.msg)              
          }          
        }
      });
    }
  }


  $(function () {  
    $('#example1').DataTable({
      'paging'      : true,
      'lengthChange': true,
      'searching'   : true,
      'ordering'    : true,
      'info'        : true,
      'autoWidth'   : true
    });
  });