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

function ajax_file_upload(file_obj) {
    if (file_obj != undefined) {
        $('#pendingResult').show();
		
		var keyword_num = '';
		keyword_num = $('#fewer_words').val();
		
		var recent_results = $("input[name='recent_results']:checked").val();

		var condition = $( "#condition" ).val();
		
		//alert(recent_results);	
		
        var form_data = new FormData();
        form_data.append('keyword', file_obj);
		form_data.append('csv_keywords',keyword_num);
		form_data.append('recent_results',recent_results);
		form_data.append('condition',condition);

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
						
						
						mytable.row.add([productInfo.keyword_index, productInfo.category, productInfo.quantity_index, productInfo.msrp_index,total_msrp,productInfo.total_found,avg_unit_price,productInfo.lowest_buy,productInfo.cost_index,productInfo.msrp_index,max_days,condition,daily_sale,gpm]);
                        mytable.draw();
						
						$('#header_total_quantity').text(parseInt($('#header_total_quantity').text()) + parseInt(productInfo.quantity_index));						

						var header_msrp = parseFloat($('#header_msrp').text()) + parseFloat(productInfo.msrp_index);
						header_msrp = header_msrp.toFixed(2);
						
						$('#header_msrp').text(header_msrp);
						
						$('#header_total_msrp').text(parseFloat($('#header_total_msrp').text()) + parseFloat(total_msrp));
						
						$('#header_total_results').text(parseInt($('#header_total_results').text()) + parseInt(productInfo.total_found));

                        $('#header_avg_selling_price').text(parseInt($('#header_avg_selling_price').text()) + parseInt(avg_unit_price));

                        $('#header_lowest_selling_price').text(parseFloat($('#header_lowest_selling_price').text()) + parseFloat(productInfo.lowest_buy));

                        $('#header_cost').text(parseFloat($('#header_cost').text()) + parseFloat(productInfo.cost_index));
						
						console.log($('#header_avg_sub_price').text(),'header_avg_sub_price');
						console.log(avg_subtotal_price,'avg_subtotal_price');
						
						var header_avg_sub_price = parseFloat($('#header_avg_sub_price').text()) + parseFloat(productInfo.msrp_index);
						header_avg_sub_price = header_avg_sub_price.toFixed(2);
						
                        $('#header_avg_sub_price').text(header_avg_sub_price);
						
						var header_total_max_days = parseFloat($('#header_total_max_days').text()) + parseFloat(max_days);
						
						header_total_max_days = header_total_max_days.toFixed(2);
						
                        $('#header_total_max_days').text(header_total_max_days);
						
						var header_daily_sale = parseFloat($('#header_daily_sale').text()) + parseFloat(daily_sale);
						header_daily_sale = header_daily_sale.toFixed(2);
						
                        $('#header_daily_sale').text(header_daily_sale);

                        header_total_gpm = $('#header_total_gpm').text();
                        header_gpm_percent = $('#header_gpm_percent').text();

                        header_total_gpm = parseFloat(header_total_gpm) + parseFloat(gpm);
                        header_gpm_percent = parseFloat(header_gpm_percent) + parseFloat(gpm_percentage);

                        if(header_gpm_percent == 'NaN'){
                            header_gpm_percent = 0;
                        }

                        $('#header_total_gpm').text(header_total_gpm);
                        $('#header_gpm_percent').text('('+header_gpm_percent+' %)');						
						
						//calculate filter based values
						calculate_filter_based_data();
                    });
                    
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

function calculate_filter_based_data(){
	//For true value
	var header_avg_selling_price = $('#header_avg_selling_price').text();
	var true_value = $('#true_value').val();
	
	var header_avg_selling_price = parseFloat(header_avg_selling_price);
	var true_value = parseFloat(true_value);	
	res = header_avg_selling_price * true_value;
	true_value = res.toFixed(2);
	
	$('#true_value_results').val(true_value);
	
	
	//For Shipping value
	var shipping = $('#shipping').val();
	var header_total_quantity = $('#header_total_quantity').text();
	
	shipping = parseFloat(shipping) * parseFloat(true_value);
	shipping = parseFloat(shipping) * parseFloat(header_total_quantity);
	
	$('#shipping_results').val(shipping);
	
	//For fees value
	var fees = $('#fees').val();
	fees = parseFloat(fees) * parseFloat(true_value);
	
	$('#fees_results').val(fees);
	
	//For benefits
	var benefits = true_value - shipping - fees;
	$('#benefit_results').val(benefits);
	
	//For Offer
	var offer = $('#offer').val();
	offer = parseFloat(offer) * parseFloat(benefits);
	$('#offer_results').val(offer);
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
	keyword_num = $('#fewer_words').val();
	
	
    $.post('./ebayapi/readdatabyurl', {
        url: $("#url").val(),keyword_num: keyword_num
    }).done(function(data){
        var obj = JSON.parse(data);
        $('#progress_bar2').hide();

        if (obj.status == 1) {
					$('#example1').DataTable().clear().draw();
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
						
						
						mytable.row.add([productInfo.keyword_index, productInfo.category, productInfo.quantity_index, productInfo.msrp_index,total_msrp,productInfo.total_found,avg_unit_price,productInfo.lowest_buy,productInfo.cost_index,productInfo.msrp_index,max_days,condition,daily_sale,gpm]);
                        mytable.draw();
						
						$('#header_total_quantity').text(parseInt($('#header_total_quantity').text()) + parseInt(productInfo.quantity_index));
						
						var header_msrp = parseFloat($('#header_msrp').text()) + parseFloat(productInfo.msrp_index);
						header_msrp = header_msrp.toFixed(2);
						
						$('#header_msrp').text(header_msrp);
						
						$('#header_total_msrp').text(parseFloat($('#header_total_msrp').text()) + parseFloat(total_msrp));
						
						$('#header_total_results').text(parseInt($('#header_total_results').text()) + parseInt(productInfo.total_found));

                        $('#header_avg_selling_price').text(parseInt($('#header_avg_selling_price').text()) + parseInt(avg_unit_price));

                        $('#header_lowest_selling_price').text(parseFloat($('#header_lowest_selling_price').text()) + parseFloat(productInfo.lowest_buy));

                        $('#header_cost').text(parseFloat($('#header_cost').text()) + parseFloat(productInfo.cost_index));
						
						console.log($('#header_avg_sub_price').text(),'header_avg_sub_price');
						console.log(avg_subtotal_price,'avg_subtotal_price');
						
						var header_avg_sub_price = parseFloat($('#header_avg_sub_price').text()) + parseFloat(productInfo.msrp_index);
						header_avg_sub_price = header_avg_sub_price.toFixed(2);
						
                        $('#header_avg_sub_price').text(header_avg_sub_price);
						
						var header_total_max_days = parseFloat($('#header_total_max_days').text()) + parseFloat(max_days);
						
						header_total_max_days = header_total_max_days.toFixed(2);
						
                        $('#header_total_max_days').text(header_total_max_days);
						
						var header_daily_sale = parseFloat($('#header_daily_sale').text()) + parseFloat(daily_sale);
						header_daily_sale = header_daily_sale.toFixed(2);
						
                        $('#header_daily_sale').text(header_daily_sale);

                        header_total_gpm = $('#header_total_gpm').text();
                        header_gpm_percent = $('#header_gpm_percent').text();

                        header_total_gpm = parseFloat(header_total_gpm) + parseFloat(gpm);
                        header_gpm_percent = parseFloat(header_gpm_percent) + parseFloat(gpm_percentage);

                        if(header_gpm_percent == 'NaN'){
                            header_gpm_percent = 0;
                        }

                        $('#header_total_gpm').text(header_total_gpm);
                        $('#header_gpm_percent').text('('+header_gpm_percent+' %)');						
						
						//calculate filter based values
						calculate_filter_based_data();
                    });          
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