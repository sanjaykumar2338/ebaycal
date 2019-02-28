var mytable2 = $('#example3').DataTable({
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
     }],
  	'order': [[ 5, "desc" ]]
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
					
					var total_table_row = 1;
					if(obj.data.length > 0){
						total_table_row = obj.data.length;
					}
					
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

						//daily sale
						var daily_sale = 0;
						if(productInfo.total_found){
							if(productInfo.recent_results){
							  if(productInfo.max_days_divide !=0){	
								daily_sale = parseInt(productInfo.total_found) / parseInt(productInfo.max_days_divide);
								daily_sale = daily_sale.toFixed(2);
							  }else{
								daily_sale = parseInt(productInfo.total_found) / 1;
								daily_sale = daily_sale.toFixed(2);  
							  }	
							}else{
								daily_sale = parseInt(productInfo.total_found) / 90;
								daily_sale = daily_sale.toFixed(2);
							}
						}

                        //max days 90                        
                        var max_days = 0;
						if(daily_sale){
							if(productInfo.quantity_index){
								if(productInfo.recent_results){
									max_days = productInfo.quantity_index / daily_sale;
									max_days = max_days.toFixed(2);                            	
								}else{
									max_days = productInfo.quantity_index / 90;
									max_days = max_days.toFixed(2);
								}
							}				
						}	
						
						/***calculate total msrp ****/
						var total_msrp = parseInt(productInfo.msrp_index) * parseInt(productInfo.quantity_index);
						total_msrp = total_msrp.toFixed(2);
						
						if(total_msrp == 'NaN'){
							total_msrp = '';
						}						
						
						//for gpm
						var gpm = 0;
						var cost_value = 0;
						cost_value = productInfo.cost_index;
						
						if(productInfo.cost_index){
							cost_value = cost_value.replace('$','');
							cost_value = parseFloat(cost_value);
						}

						console.log(cost_value,'cost_value');
						
						if(cost_value){
							gpm = avg_unit_price - cost_value;	
							gpm = parseFloat(gpm);
                            gpm = gpm.toFixed(2);	

							console.log(gpm,'gpm',avg_unit_price,'avg_unit_price');	
						}
						
						//for gpm percentage
						var gpm_percentage = 0;
						if(gpm && avg_unit_price !=0){
							gpm_percentage = gpm / avg_unit_price;
							gpm_percentage = parseFloat(gpm_percentage);
							gpm_percentage = gpm_percentage.toFixed(2);
						}					
						
                        //condition index
                        var condition = productInfo.condition_index;
						
						var cost_index = 0;
						if(productInfo.cost_index && productInfo.cost_index != ""){
							cost_index = productInfo.cost_index;
							
							/*if(productInfo.quantity_index && productInfo.quantity_index !=""){
								cost_index = cost_index * parseFloat(productInfo.quantity_index);
							}*/
						}
						
						//avg sub price
						var avg_sub_price = 0;
						avg_sub_price = avg_unit_price * parseInt(productInfo.quantity_index);
						avg_sub_price = avg_sub_price.toFixed(2);
						
						mytable2.row.add([productInfo.keyword_index, productInfo.category, productInfo.quantity_index, productInfo.msrp_index,total_msrp,productInfo.total_found,avg_unit_price,productInfo.lowest_buy,cost_index,avg_sub_price,max_days,condition,daily_sale,gpm,gpm_percentage]);
                        mytable2.draw();
						
						$('#header_total_quantity').text(parseInt($('#header_total_quantity').text()) + parseInt(productInfo.quantity_index));						

						var header_msrp = parseFloat($('#header_msrp').text()) + parseFloat(productInfo.msrp_index);
						header_msrp = header_msrp.toFixed(2);
						
						$('#header_msrp').text(header_msrp);
						
						var header_total_msrp = 0;
						header_total_msrp = $('#header_total_msrp').text();
						header_total_msrp = parseFloat(header_total_msrp);
						header_total_msrp = header_total_msrp + parseFloat(total_msrp);						
						header_total_msrp = header_total_msrp.toFixed(2);					
						
						$('#header_total_msrp').text(header_total_msrp);
						
						$('#header_total_results').text(parseInt($('#header_total_results').text()) + parseInt(productInfo.total_found));
						
						var average_selling_price_raw = parseFloat($('#header_avg_selling_price').text()) + parseFloat(avg_unit_price);
						average_selling_price_raw = average_selling_price_raw.toFixed(2);
					
                        $('#header_avg_selling_price').text(average_selling_price_raw);
						
						var lowest_selling_price_raw = parseFloat($('#header_lowest_selling_price').text()) + parseFloat(productInfo.lowest_buy);
						lowest_selling_price_raw = lowest_selling_price_raw.toFixed(2);
						
                        $('#header_lowest_selling_price').text(lowest_selling_price_raw);
						
						var header_cost_raw = 0;
						if(productInfo.cost_index && productInfo.cost_index !=""){
							header_cost_raw = productInfo.cost_index;
							header_cost_raw = header_cost_raw.replace("$", "");
							
							header_cost_raw = header_cost_raw * parseInt(productInfo.quantity_index);
						}
						
						header_cost = parseFloat($('#header_cost').text()) + parseFloat(header_cost_raw);						
						
					    $('#header_cost').text(header_cost.toFixed(2));
						
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
						header_daily_sale = header_daily_sale / total_table_row;
						header_daily_sale = header_daily_sale.toFixed(2);
						
                        $('#header_daily_sale').text(header_daily_sale);

                        header_total_gpm = $('#header_total_gpm').text();
                        header_gpm_percent = $('#header_gpm_percent').text();

                        console.log('header_gpm_percent----',header_gpm_percent,'----header_gpm_percent');

                        header_total_gpm = parseFloat(header_total_gpm) + parseFloat(gpm);
						header_total_gpm = header_total_gpm.toFixed(2);
                        header_gpm_percent = parseFloat(header_gpm_percent) + parseFloat(gpm_percentage);
						
						header_gpm_percent = header_gpm_percent / total_table_row;
						header_gpm_percent = header_gpm_percent.toFixed(2);

                        //if(isNaN(header_gpm_percent)){
                        //    header_gpm_percent = 0;
                        //}

                        $('#header_total_gpm').text(header_total_gpm);
                        $('#header_gpm_percent').text(header_gpm_percent);						
						
						//calculate filter based values
						//For true value
						var header_avg_selling_price = $('#header_avg_sub_price').text();
						var true_value = $('#true_value').val();
						var true_value_raw = $('#true_value').val();
						
						var header_avg_selling_price = parseFloat(header_avg_selling_price);
						var true_value = parseFloat(true_value);	
						res = header_avg_selling_price * true_value;
						true_value = res.toFixed(2);
						
						$('#true_value_results').val(true_value);
						
						
						//For Shipping value
						var true_value_raw = $('#true_value').val();
						var shipping = $('#shipping').val();
						var header_total_quantity = $('#header_total_quantity').text();
						
						header_total_quantity = parseInt(header_total_quantity);
						
						shipping = parseFloat(shipping) * parseFloat(true_value_raw);
						shipping = parseFloat(shipping) * header_total_quantity;
						
						shipping = shipping.toFixed(2);
						
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
						
						//OD cell
						var od = 0;
						var avg_selling_top_header = [];
						var avg_sub_price_total = [];
						$('table').find('tr').each(function (i, el) {	
							//$(this).css({backgroundColor: 'red'});
							console.log($(this),'tr');
							
							var $tds = $(this).find('td'),
								msrp = parseFloat($tds.eq(3).text()),
								avg_selling_price = parseFloat($tds.eq(6).text());
								total_price = parseFloat($tds.eq(14).text());
								quantity_index = parseInt($tds.eq(2).text());
								avg_sub_price = parseInt($tds.eq(9).text());
								
								if (avg_selling_price.toFixed(2) > msrp.toFixed(2)){
									console.log('yes');
									od = parseFloat(od) + parseFloat(msrp);
								}else{
									console.log('no');
								}
								
								rows_val = avg_selling_price * quantity_index;
								
								if(!isNaN(rows_val)){
									avg_selling_top_header.push(rows_val);
								}
								
								avg_sub_price_total.push(avg_sub_price);
								
								console.log('msrp', msrp, 'avg_selling_price', avg_selling_price);
						});
						
						console.log(avg_selling_top_header,'avg_selling_top_header');
						
						var total = 0;
						for (var i = 0; i < avg_selling_top_header.length; i++) {						  
							total += avg_selling_top_header[i] << 0;
						}
						
						total = total.toFixed(2);
						
						var total_sub_price = 0;
						for (var i = 0; i < avg_sub_price_total.length; i++) {						  
							total_sub_price += avg_sub_price_total[i] << 0;
						}
						
						total_sub_price_raw = total_sub_price.toFixed(2);
						total_sub_price = total_sub_price * true_value_raw;
						
						total_sub_price = total_sub_price.toFixed(2);
						
						$('#true_value_results').val(total_sub_price);
						
						//for avg sub price total
						var header_avg_selling_price = $('#header_avg_sub_price').text();
						header_avg_selling_price = parseFloat(header_avg_selling_price) + parseFloat(avg_sub_price);
						header_avg_selling_price = header_avg_selling_price.toFixed(2);
						
						console.log(header_avg_selling_price,'header_avg_selling_price');
						
						$('#header_avg_sub_price').text(total_sub_price_raw);
						
						od = od.toFixed(2);
						
						$('#od_results').val(od);
						
						//od offer
						var od_offer = 0;
						od_offer = parseFloat(true_value_raw) - parseFloat(od);
						$('#od_offer').val(od_offer);
                    });					
					//calculate_filter_based_data();                    
                } else {
                    alert(obj.msg)
                }
            }
        });  
}

function calculate_filter_based_data(){
	//For true value
	var header_avg_selling_price = $('#header_avg_selling_price').text();
	var true_value = $('#true_value').val();
	var true_value_raw = $('#true_value').val();
	
	var header_avg_selling_price = parseFloat(header_avg_selling_price);
	var true_value = parseFloat(true_value);	
	res = header_avg_selling_price * true_value;
	true_value = res.toFixed(2);
	
	$('#true_value_results').val(true_value);
	
	
	//For Shipping value
	var true_value_raw = $('#true_value').val();
	var shipping = $('#shipping').val();
	var header_total_quantity = $('#header_total_quantity').text();
	
	shipping = parseFloat(shipping) * parseFloat(true_value_raw);
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
	
	//OD cell
	var od = 0;
	$('table').find('tr').each(function (i, el) {		
        var $tds = $(this).find('td'),
            msrp = parseFloat($tds.eq(3).text()),
            avg_selling_price = parseFloat($tds.eq(6).text());
			total_price = parseFloat($tds.eq(14).text());
            
			if (avg_selling_price.toFixed(2) > msrp.toFixed(2)){
				console.log('yes');
				od = parseFloat(od) + parseFloat(msrp);
			}else{
				console.log('no');
			}
			
		    console.log('msrp', msrp, 'avg_selling_price', avg_selling_price);
    });
	
	od = od.toFixed(2);
	
	$('#od_results').val(od);
	
	//od offer
	var od_offer = 0;
	od_offer = parseFloat(true_value_raw) - parseFloat(od);
	$('#od_offer').val(od_offer);	
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
					
					var total_table_row = 1;
					if(obj.data.length > 0){
						total_table_row = obj.data.length;
					}
					
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

						//daily sale
						var daily_sale = 0;
						if(productInfo.total_found){
							if(productInfo.recent_results){
							  if(productInfo.max_days_divide !=0){	
								daily_sale = parseInt(productInfo.total_found) / parseInt(productInfo.max_days_divide);
								daily_sale = daily_sale.toFixed(2);
							  }else{
								daily_sale = parseInt(productInfo.total_found) / 1;
								daily_sale = daily_sale.toFixed(2);  
							  }	
							}else{
								daily_sale = parseInt(productInfo.total_found) / 90;
								daily_sale = daily_sale.toFixed(2);
							}
						}

                        //max days 90                        
                        var max_days = 0;
						if(daily_sale){
							if(productInfo.quantity_index){
								if(productInfo.recent_results){
									max_days = productInfo.quantity_index / daily_sale;
									max_days = max_days.toFixed(2);                            	
								}else{
									max_days = productInfo.quantity_index / 90;
									max_days = max_days.toFixed(2);
								}
							}				
						}	
						
						/***calculate total msrp ****/
						var total_msrp = parseInt(productInfo.msrp_index) * parseInt(productInfo.quantity_index);
						total_msrp = total_msrp.toFixed(2);
						
						if(total_msrp == 'NaN'){
							total_msrp = '';
						}						
						
						//for gpm
						var gpm = 0;
						var cost_value = 0;
						cost_value = productInfo.cost_index;
						
						if(productInfo.cost_index){
							cost_value = cost_value.replace('$','');
							cost_value = parseFloat(cost_value);
						}

						console.log(cost_value,'cost_value');
						
						if(cost_value){
							gpm = avg_unit_price - cost_value;	
							gpm = parseFloat(gpm);
                            gpm = gpm.toFixed(2);	

							console.log(gpm,'gpm',avg_unit_price,'avg_unit_price');	
						}
						
						//for gpm percentage
						var gpm_percentage = 0;
						if(gpm && avg_unit_price !=0){
							gpm_percentage = gpm / avg_unit_price;
							gpm_percentage = parseFloat(gpm_percentage);
							gpm_percentage = gpm_percentage.toFixed(2);
						}					
						
                        //condition index
                        var condition = productInfo.condition_index;
						
						var cost_index = 0;
						if(productInfo.cost_index && productInfo.cost_index != ""){
							cost_index = productInfo.cost_index;
							
							/*if(productInfo.quantity_index && productInfo.quantity_index !=""){
								cost_index = cost_index * parseFloat(productInfo.quantity_index);
							}*/
						}
						
						//avg sub price
						var avg_sub_price = 0;
						avg_sub_price = avg_unit_price * parseInt(productInfo.quantity_index);
						avg_sub_price = avg_sub_price.toFixed(2);
						
						mytable2.row.add([productInfo.keyword_index, productInfo.category, productInfo.quantity_index, productInfo.msrp_index,total_msrp,productInfo.total_found,avg_unit_price,productInfo.lowest_buy,cost_index,avg_sub_price,max_days,condition,daily_sale,gpm,gpm_percentage]);
                        mytable2.draw();
						
						$('#header_total_quantity').text(parseInt($('#header_total_quantity').text()) + parseInt(productInfo.quantity_index));						

						var header_msrp = parseFloat($('#header_msrp').text()) + parseFloat(productInfo.msrp_index);
						header_msrp = header_msrp.toFixed(2);
						
						$('#header_msrp').text(header_msrp);
						
						var header_total_msrp = 0;
						header_total_msrp = $('#header_total_msrp').text();
						header_total_msrp = parseFloat(header_total_msrp);
						header_total_msrp = header_total_msrp + parseFloat(total_msrp);						
						header_total_msrp = header_total_msrp.toFixed(2);					
						
						$('#header_total_msrp').text(header_total_msrp);
						
						$('#header_total_results').text(parseInt($('#header_total_results').text()) + parseInt(productInfo.total_found));
						
						var average_selling_price_raw = parseFloat($('#header_avg_selling_price').text()) + parseFloat(avg_unit_price);
						average_selling_price_raw = average_selling_price_raw.toFixed(2);
					
                        $('#header_avg_selling_price').text(average_selling_price_raw);
						
						var lowest_selling_price_raw = parseFloat($('#header_lowest_selling_price').text()) + parseFloat(productInfo.lowest_buy);
						lowest_selling_price_raw = lowest_selling_price_raw.toFixed(2);
						
                        $('#header_lowest_selling_price').text(lowest_selling_price_raw);
						
						var header_cost_raw = 0;
						if(productInfo.cost_index && productInfo.cost_index !=""){
							header_cost_raw = productInfo.cost_index;
							header_cost_raw = header_cost_raw.replace("$", "");
							
							header_cost_raw = header_cost_raw * parseInt(productInfo.quantity_index);
						}
						
						header_cost = parseFloat($('#header_cost').text()) + parseFloat(header_cost_raw);						
						
					    $('#header_cost').text(header_cost.toFixed(2));
						
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
						header_daily_sale = header_daily_sale / total_table_row;
						header_daily_sale = header_daily_sale.toFixed(2);
						
                        $('#header_daily_sale').text(header_daily_sale);

                        header_total_gpm = $('#header_total_gpm').text();
                        header_gpm_percent = $('#header_gpm_percent').text();

                        console.log('header_gpm_percent----',header_gpm_percent,'----header_gpm_percent');

                        header_total_gpm = parseFloat(header_total_gpm) + parseFloat(gpm);
						header_total_gpm = header_total_gpm.toFixed(2);
                        header_gpm_percent = parseFloat(header_gpm_percent) + parseFloat(gpm_percentage);
						
						header_gpm_percent = header_gpm_percent / total_table_row;
						header_gpm_percent = header_gpm_percent.toFixed(2);

                        //if(isNaN(header_gpm_percent)){
                        //    header_gpm_percent = 0;
                        //}

                        $('#header_total_gpm').text(header_total_gpm);
                        $('#header_gpm_percent').text(header_gpm_percent);						
						
						//calculate filter based values
						//For true value
						var header_avg_selling_price = $('#header_avg_sub_price').text();
						var true_value = $('#true_value').val();
						var true_value_raw = $('#true_value').val();
						
						var header_avg_selling_price = parseFloat(header_avg_selling_price);
						var true_value = parseFloat(true_value);	
						res = header_avg_selling_price * true_value;
						true_value = res.toFixed(2);
						
						$('#true_value_results').val(true_value);
						
						
						//For Shipping value
						var true_value_raw = $('#true_value').val();
						var shipping = $('#shipping').val();
						var header_total_quantity = $('#header_total_quantity').text();
						
						header_total_quantity = parseInt(header_total_quantity);
						
						shipping = parseFloat(shipping) * parseFloat(true_value_raw);
						shipping = parseFloat(shipping) * header_total_quantity;
						
						shipping = shipping.toFixed(2);
						
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
						
						//OD cell
						var od = 0;
						var avg_selling_top_header = [];
						var avg_sub_price_total = [];
						$('table').find('tr').each(function (i, el) {	
							//$(this).css({backgroundColor: 'red'});
							console.log($(this),'tr');
							
							var $tds = $(this).find('td'),
								msrp = parseFloat($tds.eq(3).text()),
								avg_selling_price = parseFloat($tds.eq(6).text());
								total_price = parseFloat($tds.eq(14).text());
								quantity_index = parseInt($tds.eq(2).text());
								avg_sub_price = parseInt($tds.eq(9).text());
								
								if (avg_selling_price.toFixed(2) > msrp.toFixed(2)){
									console.log('yes');
									od = parseFloat(od) + parseFloat(msrp);
								}else{
									console.log('no');
								}
								
								rows_val = avg_selling_price * quantity_index;
								
								if(!isNaN(rows_val)){
									avg_selling_top_header.push(rows_val);
								}
								
								avg_sub_price_total.push(avg_sub_price);
								
								console.log('msrp', msrp, 'avg_selling_price', avg_selling_price);
						});
						
						console.log(avg_selling_top_header,'avg_selling_top_header');
						
						var total = 0;
						for (var i = 0; i < avg_selling_top_header.length; i++) {						  
							total += avg_selling_top_header[i] << 0;
						}
						
						total = total.toFixed(2);
						
						var total_sub_price = 0;
						for (var i = 0; i < avg_sub_price_total.length; i++) {						  
							total_sub_price += avg_sub_price_total[i] << 0;
						}
						
						total_sub_price_raw = total_sub_price.toFixed(2);
						total_sub_price = total_sub_price * true_value_raw;
						
						total_sub_price = total_sub_price.toFixed(2);
						
						$('#true_value_results').val(total_sub_price);
						
						//for avg sub price total
						var header_avg_selling_price = $('#header_avg_sub_price').text();
						header_avg_selling_price = parseFloat(header_avg_selling_price) + parseFloat(avg_sub_price);
						header_avg_selling_price = header_avg_selling_price.toFixed(2);
						
						console.log(header_avg_selling_price,'header_avg_selling_price');
						
						$('#header_avg_sub_price').text(total_sub_price_raw);
						
						od = od.toFixed(2);
						
						$('#od_results').val(od);
						
						//od offer
						var od_offer = 0;
						od_offer = parseFloat(true_value_raw) - parseFloat(od);
						$('#od_offer').val(od_offer);
                    });					
					//calculate_filter_based_data();                    
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

