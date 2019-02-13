var mytable3 = $('#example3').DataTable({
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

$('#by_csv_recent').on('click', function(e){
    e.preventDefault();
    var select_csv = $('#select_csv').val();

    if(!select_csv){
        alert('select csv');
        return false;
    }

    ajax_file_upload_2(select_csv);

});

function ajax_file_upload_2(id) {   
        $('#pendingResult').show();

        $('#progress_bar').show();

        $.ajax({
            type: 'POST',
            url: "recent/readcsv",           
            data: { 
                'id': id                
            },
            success: function(response) {                
                $('#progress_bar').hide();
                var obj = JSON.parse(response);

                if (obj.status == 1) {
                    $('#example3').DataTable().clear().draw();

                    cleardata();
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
						
						
						mytable3.row.add([productInfo.keyword_index, productInfo.category, productInfo.quantity_index, productInfo.msrp_index,total_msrp,productInfo.total_found,avg_unit_price,productInfo.lowest_buy,productInfo.cost_index,productInfo.msrp_index,max_days,condition,daily_sale,gpm]);
                        mytable3.draw();
						
						$('#header_total_quantity').text(parseInt($('#header_total_quantity').text()) + parseInt(productInfo.quantity_index));
						
						$('#header_msrp').text(parseFloat($('#header_msrp').text()) + parseFloat(productInfo.msrp_index));
						
						$('#header_total_msrp').text(parseFloat($('#header_total_msrp').text()) + parseFloat(total_msrp));
						
						$('#header_total_results').text(parseInt($('#header_total_results').text()) + parseInt(productInfo.total_found));

                        $('#header_avg_selling_price').text(parseInt($('#header_avg_selling_price').text()) + parseInt(avg_unit_price));

                        $('#header_lowest_selling_price').text(parseFloat($('#header_lowest_selling_price').text()) + parseFloat(productInfo.lowest_buy));

                        $('#header_cost').text(parseFloat($('#header_cost').text()) + parseFloat(productInfo.cost_index));
						
						console.log($('#header_avg_sub_price').text(),'header_avg_sub_price');
						console.log(avg_subtotal_price,'avg_subtotal_price');

                        $('#header_avg_sub_price').text(parseFloat($('#header_avg_sub_price').text()) + parseFloat(productInfo.msrp_index));

                        $('#header_total_max_days').text(parseFloat($('#header_total_max_days').text()) + parseFloat(max_days));

                        $('#header_daily_sale').text(parseFloat($('#header_daily_sale').text()) + parseFloat(daily_sale));

                        header_total_gpm = $('#header_total_gpm').text();
                        header_gpm_percent = $('#header_gpm_percent').text();

                        header_total_gpm = parseFloat(header_total_gpm) + parseFloat(gpm);
                        header_gpm_percent = parseFloat(header_gpm_percent) + parseFloat(gpm_percentage);

                        if(header_gpm_percent == 'NaN'){
                            header_gpm_percent = 0;
                        }

                        $('#header_total_gpm').text(header_total_gpm);
                        $('#header_gpm_percent').text('('+header_gpm_percent+' %)');						
                    });                   
                } else {
                    alert(obj.msg)
                }
            }
        });  
}

function cleardata(){
	$('#header_total_quantity').text(0);
	$('#header_msrp').text(0);
	$('#header_total_msrp').text(0);
	$('#header_total_results').text(0);
	$('#header_avg_selling_price').text(0);
	$('#header_lowest_selling_price').text(0);
	$('#header_cost').text(0);
	$('#header_avg_sub_price').text(0);
	$('#header_total_max_days').text(0);
	$('#header_daily_sale').text(0);
	$('#header_total_gpm').text(0);
	$('#header_gpm_percent').text(0);
}

$("#by_url_recent").click(function(e) {
    e.preventDefault();

    e.preventDefault();
    var select_url = $('#select_url').val();

    if(!select_url){
        alert('select url');
        return false;
    }   


    $('#progress_bar2').show();

    $.post('./recent/readurl', {
        url: select_url
    }, function(data) {
        var obj = JSON.parse(data);
        $('#progress_bar2').hide();

        if (obj.status == 1) {
					$('#example3').DataTable().clear().draw();

					cleardata();
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
						var total_msrp = productInfo.msrp_index.replace("$","");
						total_msrp = parseInt(total_msrp) * parseInt(productInfo.quantity_index);
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
						
						var msrp = productInfo.msrp_index.replace("$","");
						
						mytable3.row.add([productInfo.keyword_index, productInfo.category, productInfo.quantity_index, msrp,total_msrp,productInfo.total_found,avg_unit_price,productInfo.lowest_buy,productInfo.cost_index,msrp,max_days,condition,daily_sale,gpm]);
                        mytable3.draw();
						
						$('#header_total_quantity').text(parseInt($('#header_total_quantity').text()) + parseInt(productInfo.quantity_index));
						
						$('#header_msrp').text(parseFloat($('#header_msrp').text()) + parseFloat(productInfo.msrp_index));
						
						$('#header_total_msrp').text(parseFloat($('#header_total_msrp').text()) + parseFloat(total_msrp));
						
						$('#header_total_results').text(parseInt($('#header_total_results').text()) + parseInt(productInfo.total_found));

                        $('#header_avg_selling_price').text(parseFloat($('#header_avg_selling_price').text()) + parseFloat(avg_unit_price));

                        $('#header_lowest_selling_price').text(parseFloat($('#header_lowest_selling_price').text()) + parseFloat(productInfo.lowest_buy));

                        $('#header_cost').text(parseFloat($('#header_cost').text()) + parseFloat(productInfo.cost_index));

                        $('#header_avg_sub_price').text(parseFloat($('#header_avg_sub_price').text()) + parseFloat(avg_subtotal_price));

                        $('#header_total_max_days').text(parseFloat($('#header_total_max_days').text()) + parseFloat(max_days));

                        $('#header_daily_sale').text(parseFloat($('#header_daily_sale').text()) + parseFloat(daily_sale));

                        header_total_gpm = $('#header_total_gpm').text();
                        header_gpm_percent = $('#header_gpm_percent').text();

                        header_total_gpm = parseFloat(header_total_gpm) + parseFloat(gpm);
                        header_gpm_percent = parseFloat(header_gpm_percent) + parseFloat(gpm_percentage);

                        if(header_gpm_percent == 'NaN'){
                            header_gpm_percent = 0;
                        }

                        $('#header_total_gpm').text(header_total_gpm);
                        $('#header_gpm_percent').text('('+header_gpm_percent+' %)');						
                    });
				}
        else {
            alert(obj.msg)
        }
    });
});

$('#is_admin').change(function() {
	if($(this).is(":checked")) {
		$(this).val('1');     
	}else{
		$(this).val('0');     
	}	   
});

