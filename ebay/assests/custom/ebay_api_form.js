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

                        //For avg unit price
                        var avg_unit_price = 0;                        
                        if(productInfo[11]){                           
                            avg_unit_price = productInfo[11];                            
                            if(productInfo[10]){
                                var total_found = parseInt(productInfo[10]);
                                var total_price = parseFloat(productInfo[11]);

                                avg_unit_price = total_price / total_found;

                                avg_unit_price = avg_unit_price.toFixed(2);
                            }
                        }

                        //For avg subtotal price 
                        var qty = parseInt(productInfo[2]);
                        var avg_subtotal_price = parseFloat(avg_unit_price) * qty
                        avg_subtotal_price = avg_subtotal_price.toFixed(2);

                        //max days 90
                        var max_days = 0;
                        if(total_found){
                            max_days = total_found / 90;
                            max_days = max_days.toFixed(2);
                        }

                        mytable.row.add([i, productInfo[0], productInfo[1], productInfo[2], productInfo[3], productInfo[4], productInfo[5], productInfo[6], productInfo[10], price, productInfo[12],avg_unit_price,productInfo[13],avg_subtotal_price,max_days]);
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

            if(obj.main_arr_len == 11){
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

                    var total_price = 0;
                    if(productInfo[8]){
                        total_price = productInfo[8].toFixed(2)
                    }

                    //For avg unit price
                    var avg_unit_price = 0;                        
                    if(productInfo[8]){                           
                        avg_unit_price = productInfo[8];                            
                        if(productInfo[7]){
                            var total_found = parseInt(productInfo[7]);
                            var total_prices = parseFloat(productInfo[8]);

                            avg_unit_price = total_prices / total_found;

                            avg_unit_price = avg_unit_price.toFixed(2);
                        }
                    }

                    //For avg subtotal price 
                    var qty = parseInt(productInfo[1]);
                    var avg_subtotal_price = parseFloat(avg_unit_price) * qty
                    avg_subtotal_price = avg_subtotal_price.toFixed(2);

                    //max days 90
                    var max_days = 0;
                    if(total_found){
                        max_days = total_found / 90;
                        max_days = max_days.toFixed(2);
                    }

                    mytable2.row.add([i, title, productInfo[1], productInfo[2], productInfo[3], productInfo[4], productInfo[5], productInfo[7], total_price, productInfo[9],avg_unit_price,productInfo[10],avg_subtotal_price,max_days]);
                    mytable2.draw();
                    i++;
                });
            }else if(obj.main_arr_len == 10){
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

                    if(typeof productInfo[7] === 'undefined') {
                        var eight_col = "";
                    }
                    else {
                        if($.isNumeric(productInfo[7])){
                            var eight_col = "";
                        }else{
                            var eight_col = productInfo[7];
                        }    
                    }

                    var total_price = 0;
                    if(productInfo[7]){
                        total_price = productInfo[7].toFixed(2)
                    }

                    //For avg unit price
                    var avg_unit_price = 0;                        
                    if(productInfo[7]){                           
                        avg_unit_price = productInfo[8];                            
                        if(productInfo[6]){
                            var total_found = parseInt(productInfo[6]);
                            var total_prices = parseFloat(productInfo[7]);

                            avg_unit_price = total_prices / total_found;

                            avg_unit_price = avg_unit_price.toFixed(2);
                        }
                    }

                    //For avg subtotal price 
                    var qty = parseInt(productInfo[1]);
                    var avg_subtotal_price = parseFloat(avg_unit_price) * qty
                    avg_subtotal_price = avg_subtotal_price.toFixed(2);

                    //max days 90
                    var max_days = 0;
                    if(total_found){
                        max_days = total_found / 90;
                        max_days = max_days.toFixed(2);
                    }

                    mytable2.row.add([i, title, productInfo[1], productInfo[2], productInfo[3], productInfo[4], productInfo[5], productInfo[6], total_price, productInfo[8],avg_unit_price,productInfo[9],avg_subtotal_price,max_days]);
                    mytable2.draw();
                    i++;
                });
            }else if(obj.main_arr_len == 9){
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
                    
                    mytable2.row.add([i, title, productInfo[1], productInfo[2], productInfo[3], k, k, k, k,k,k,k,k,k]);
                    mytable2.draw();
                    i++;
                });
            }
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