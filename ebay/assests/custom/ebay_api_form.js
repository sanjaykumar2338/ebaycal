var fileobj;

function upload_file(e, type) {
    e.preventDefault();
    fileobj = e.target.files[0];
    console.log(e, type)
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
    'paging': true,
    'lengthChange': false,
    'searching': true,
    'ordering': true,
    'info': true,
    'autoWidth': true,
    'scrollX': true,
     dom: 'Blfrtip',
        buttons: [
           'csv','pdf'
      ]
});

var mytable2 = $('#example2').DataTable({
    'paging': true,
    'lengthChange': false,
    'searching': true,
    'ordering': true,
    'info': true,
    'autoWidth': true,
    'scrollX': true,
     dom: 'Blfrtip',
     buttons: [
            'csv','pdf'
     ]
});

function ajax_file_upload(file_obj) {
    if (file_obj != undefined) {
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
            success: function(response) {
                $("#keywords").val(null);
                $('#progress_bar').hide();
                var obj = JSON.parse(response);

                if (obj.status == 1) {
                    $('#example1').DataTable().clear().draw();

                    console.log(obj.data);

                    var i = 1;
                    $.each(obj.data, function(k, productInfo) {
                        let price = 0;
                        if (productInfo[11]) {
                            price = productInfo[11].toFixed(2);
                        }

                        mytable.row.add([i, productInfo[0], productInfo[1], productInfo[2], productInfo[3], productInfo[4], productInfo[5], productInfo[6], productInfo[10], price, productInfo[12]]);
                        mytable.draw();
                        i++;
                    });

                    //$("#popuptableLite tbody").append(tr);
                } else {
                    alert(obj.msg)
                }
            }
        });
    }
}

$("#byurl").click(function(e) {
    e.preventDefault();

    /*if (/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test($("#url").val())) {
        //alert("valid URL");
    } else {
        alert("invalid URL");
        return false;
    }*/

    $('#progress_bar2').show();

    $.post('./ebayapi/readdatabyurl', {
        url: $("#url").val()
    }, function(data) {
        var obj = JSON.parse(data);
        $('#progress_bar2').hide();

        if (obj.status == 1) {
            $('#example2').DataTable().clear().draw();

            console.log(obj.data);

            var i = 1;
            $.each(obj.data, function(k, productInfo) {
                console.log('productInfo', productInfo);
                
                let price = 0;
                if (productInfo[7] && typeof productInfo[7] !== 'undefined') {
                    price = productInfo[7];// * 100;
                    //price = price.toFixed(2);
                }

                var title = "";
                title = productInfo[0].replace("++++", " ");
                title = title.replace("+"," ");

                if(typeof productInfo[8] === 'undefined') {
                    var eight_col = "";
                }
                else {
                    if($.isNumeric(productInfo[8])){
                        var eight_col = "";
                    }else{
                        var eight_col = productInfo[8];
                    }    
                }

                mytable2.row.add([i, title, productInfo[1], productInfo[2], productInfo[3], productInfo[4], productInfo[5], productInfo[6], price, eight_col]);
                mytable2.draw();
                i++;
            });
        } else {
            alert(obj.msg)
        }
    });
});




$('#userlisttable').DataTable({
    'paging': true,
    'lengthChange': false,
    'searching': true,
    'ordering': true,
    'info': true,
    'autoWidth': true,
    'scrollX': true,
     dom: 'Blfrtip',
        buttons: [
           'csv','pdf'
      ]
});