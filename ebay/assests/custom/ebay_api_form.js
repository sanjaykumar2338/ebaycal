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
     buttons: [{
       extend: 'pdfHtml5',
	   orientation: 'landscape',
	   pageSize: 'LEGAL'
     }, {
      extend: 'csv',
      filename: 'customized_csv_file_name'
     }]
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
     buttons: [{
       extend: 'pdfHtml5',
	   orientation: 'landscape',
	   pageSize: 'LEGAL'
     }, {
      extend: 'csv',
      filename: 'customized_csv_file_name'
     }]
});

function ajax_file_upload(file_obj) {
    if (file_obj != undefined) {
        $('#pendingResult').show();
		
		var keyword_num = '';
		keyword_num = $('#words_csv').val();
		

        var form_data = new FormData();
        form_data.append('keyword', file_obj);
		form_data.append('csv_keywords',keyword_num);

        $('#progress_bar').show();
		
		var header_total_quantity = 0;
		var header_msrp = 0;
		var header_total_msrp = 0; 
		var header_total_results = 0;
		var header_avg_selling_price = 0;
		var header_lowest_selling_price = 0;
		var header_cost = 0;
		var header_avg_sub_price = 0;
		var header_total_max_days = 0;
		var header_daily_sale = 0;
		var header_total_gpm = 0;
        var header_total_gpm = 0;
        var header_gpm_percent = 0;
		
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
				
				console.log('obj', obj);

                if (obj.status == 1) {
                    $('#example1').DataTable().clear().draw();

                    console.log(obj.data);
					
                    $.each(obj.data, function(k, productInfo) {
                        let price = 0;
                        if (productInfo.total_price) {
                            price = productInfo.total_price.toFixed(2);
                        }

                        //For avg unit price
                        var avg_unit_price = 0;                        
                        if(productInfo.total_price){                           
                            avg_unit_price = productInfo.total_price;                            
                            if(productInfo.total_found){
                                var total_found = parseInt(productInfo.total_found);
                                var total_price = parseFloat(productInfo.total_price);

                                avg_unit_price = total_price / total_found;

                                avg_unit_price = avg_unit_price.toFixed(2);
                            }
                        }

                        //For avg subtotal price 
                        var qty = parseInt(productInfo.quantity_index);
                        var avg_subtotal_price = parseFloat(avg_unit_price) * qty
                        avg_subtotal_price = avg_subtotal_price.toFixed(2);

                        //max days 90
                        var max_days = 0;
                        if(productInfo.total_found){
                            max_days = productInfo.total_found / 90;
                            max_days = max_days.toFixed(2);
                        }
						
						//productInfo[0] - refer to category name upload from csv
						//productInfo[1] - refer to item description
						//productInfo[2] - refer to quantity uploaded from csv file
						//productInfo[3] - refer to retail per unit / MSRP
						//productInfo[4] - refer to total retails
						//productInfo[5] - refer to condition
						//productInfo[6] - refer to packing 
						//productInfo[10] - total result found from the keyword
						//price  - refer to averarge unit pirce * quantity
						//productInfo[12] - refer to category from api
						//avg_unit_price - refer avg_unit_price or avg_selling_pirce is divided by total result found
						//productInfo[13] - refer to lowest product of price
						//avg_subtotal_price - refert to above
						//max_days - refert to divide total found by 90 default
						
						/***calculate total msrp ****/
						var total_msrp = parseInt(productInfo.msrp_index) * parseInt(productInfo.quantity_index);
						total_msrp = total_msrp.toFixed(2);
						
						if(total_msrp == 'NaN'){
							total_msrp = '';
						}
						
						//daily sale
						var daily_sale = '';
						daily_sale = productInfo.total_found / 90;
						daily_sale = daily_sale.toFixed(2);
						
						//gpm
						var gpm = '';
						gpm = avg_unit_price - productInfo.cost_index / avg_unit_price;
						gpm = gpm.toFixed(2);					
						
						
						var gpm_percentage = 0;						
						if(productInfo.cost_index){
							gpm_percentage = avg_unit_price / productInfo.cost_index;
						}
						
						if(gpm == 'NaN'){
							gpm = 0;
						}else{
							gpm_percentage = gpm_percentage.toFixed(2);
							if(gpm_percentage){
								gpm = gpm_percentage+' ('+gpm_percentage+'%)';
							}
						}

                        //condition index
                        var condition = productInfo.condition_index;
						
						
						mytable.row.add([productInfo.keyword_index, productInfo.category, productInfo.quantity_index, productInfo.msrp_index,total_msrp,productInfo.total_found,avg_unit_price,productInfo.lowest_buy,productInfo.cost_index,productInfo.msrp_index,price,avg_subtotal_price,max_days,condition,daily_sale,gpm]);
                        mytable.draw();
						
						$('#header_total_quantity').text(parseInt($('#header_total_quantity').text()) + parseInt(productInfo.quantity_index));
						
						$('#header_msrp').text(parseInt($('#header_msrp').text()) + parseInt(productInfo.msrp_index));
						
						$('#header_total_msrp').text(parseInt($('#header_total_msrp').text()) + parseInt(total_msrp));
						
						$('#header_total_results').text(parseInt($('#header_total_results').text()) + parseInt(productInfo.total_found));

                        $('#header_avg_selling_price').text(parseInt($('#header_avg_selling_price').text()) + parseInt(avg_unit_price));

                        $('#header_lowest_selling_price').text(parseInt($('#header_lowest_selling_price').text()) + parseInt(productInfo.lowest_buy));

                        $('#header_cost').text(parseInt($('#header_cost').text()) + parseInt(productInfo.cost_index));

                        $('#header_avg_sub_price').text(parseInt($('#header_avg_sub_price').text()) + parseInt(avg_subtotal_price));

                        $('#header_total_max_days').text(parseInt($('#header_total_max_days').text()) + parseInt(max_days));

                        $('#header_daily_sale').text(parseInt($('#header_daily_sale').text()) + parseInt(daily_sale));

                        header_total_gpm = $('#header_total_gpm').text();
                        header_gpm_percent = $('#header_gpm_percent').text();

                        header_total_gpm = parseInt(header_total_gpm) + parseInt(gpm);
                        header_gpm_percent = parseInt(header_gpm_percent) + parseInt(gpm_percentage);

                        if(header_gpm_percent == 'NaN'){
                            header_gpm_percent = 0;
                        }

                        $('#header_total_gpm').text(header_total_gpm);
                        $('#header_gpm_percent').text('('+header_gpm_percent+' %)');						
                    });

                    //$("#popuptableLite tbody").append(tr);
                } else {
                    alert(obj.msg)
                }
            }, error: function (request, status, error) {
			     $('#progress_bar').hide();
				  $("#keywords").val(null);
				alert('there is some error , please try again');
			}
        });
    }
}

$("#byurl").click(function(e) {
    e.preventDefault();
	
	//alert($("#url").val());

    if (/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test($("#url").val())) {
        //alert("valid URL");
    } else {
        alert("invalid URL");
        return false;
    }

    $('#progress_bar2').show();
	
	var keyword_num = '';
	keyword_num = $('#words_url').val();
	
	
    $.post('./ebayapi/readdatabyurl', {
        url: $("#url").val(),keyword_num: keyword_num
    }).done(function(data){
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
                    var title = "";
                    title = productInfo[0].replace("++++", " ");
                    title = title.replace("+"," ");
					
					//For avg unit price
                    var avg_unit_price = 0;                        
                    if(productInfo[6]){                                                                            
                        if(productInfo[5]){
                            var total_found = parseInt(productInfo[5]);
                            var total_prices = parseFloat(productInfo[6]);

                            avg_unit_price = total_prices / total_found;

                            avg_unit_price = avg_unit_price.toFixed(2);
                        }
                    }
					
					if(total_prices){
						total_prices = total_prices.toFixed(2);
					}else{
						total_prices = 0;
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
					
					
                    
                    mytable2.row.add([i, title, productInfo[1], productInfo[2], productInfo[3], 0, productInfo[4], productInfo[5], total_prices,productInfo[7],avg_unit_price,productInfo[8],avg_subtotal_price,max_days]);
                    mytable2.draw();
                    i++;
                });
            }
        } else {
            alert(obj.msg)
        }
    }).fail(function(xhr, status, error) {
       $('#progress_bar2').hide();
	   alert('there some error , please try again!');
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