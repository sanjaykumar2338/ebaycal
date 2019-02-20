<!-- Content Header (Page header) -->
<section class="content-header">
   <h1>
      Ebay Details
      <small>Preview</small>
   </h1>
   <ol class="breadcrumb">
      <li><a href="<?php echo base_url(); ?>"><i class="fa fa-dashboard"></i> Home</a></li>
      <li><a href="#">Ebay API</a></li>
   </ol>
</section>
<!-- Main content -->
<section class="content">
   <div class="row">
      <!-- left column -->
      <div class="col-md-6">
         <!-- general form elements -->
         <div class="box box-primary">
            <div class="box-header with-border">
               <h2 class="box-title">Ebay CSV</h2>
            </div>
            <!-- /.box-header -->
            <!-- form start -->
            <form role="form">
               <div class="box-body">
                  <div class="form-group">
                     <label for="exampleInputFile">File input</label>
                     <input type="file" name="keywords" class="form-control" id="keywords" onchange="upload_file(event)">                  
                  </div>                  
                  <div class="form-group" id="progress_bar" style="display: none;">
                     <img src="<?php echo base_url(); ?>assests/custom/images/loader.gif"  style="width: 74px;">
                  </div>
               </div>
               <!-- /.box-body -->
               <div class="box-footer">
                  <span>&nbsp;</span>
                  <!-- <button type="submit" class="btn btn-primary" style="display: none;">Submit</button> -->
               </div>
            </form>
         </div>
         <!-- /.box -->
      </div>
      <div class="col-md-6">
         <!-- general form elements -->
         <div class="box box-primary">
            <div class="box-header with-border">
               <h2 class="box-title">Ebay URL</h2>
            </div>
            <!-- /.box-header -->
            <!-- form start -->
            <form role="form">
               <div class="box-body">
                  <div class="form-group">
                     <label for="exampleInputFile">URL</label>
                     <input type="text" name="url" id="url" placeholder="Enter URL" class="form-control">                  
                  </div>                  
                  <div class="form-group" id="progress_bar2" style="display: none;">
                     <img src="<?php echo base_url(); ?>assests/custom/images/loader.gif"  style="width: 74px;">
                  </div>
               </div>
               <!-- /.box-body -->
               <div class="box-footer">
                  <button type="submit" id="byurl" class="btn btn-primary">Submit</button>
               </div>
            </form>
         </div>
         <!-- /.box -->
      </div>
   </div>
   <!--/.col (left) -->
   <!-- right column -->
   <div class="row">
      <div class="col-md-12">
         <div class="box box-info">
            <div class="box">
               <div class="box-header">
                  <h2 class="box-title">Filters</h2>
               </div>
               <div class="box-body">
               <div class="form-group">                 
                 <div class="col-lg-12">
                   <div class="form-inline">
                     
                     <div class="form-group ">
                       <div class="col-lg-12">
                         <label class="sr-only" for="Condition">Condition:</label> 
                         <select class="form-control" id="condition">
                             <option value="">--Condition--</option>
                             <option value="1000">New</option>
                             <option value="3000">Used</option>
                             <option value="7000">Parts</option>                             
                         </select>                         
                       </div>
                     </div> 
                     
                     <div class="form-group ">
                       <div class="col-lg-12">
                         <label class="sr-only" for="county">Fewer Words:</label> 
                         Fewer Words: <input type="text" id="fewer_words" name="fewer_words" class="form-control " placeholder="Fewer Words">
                       </div>
                     </div>

                     

                     <div class="form-group ">
                       <div class="col-lg-12">
                         <label class="sr-only" for="county">True Value:</label> 
                         True Value: <input type="text" id="true_value" value="0.75" name="true_value" class="form-control " placeholder="True Value">
                       </div>
                     </div>

                     <div class="form-group ">
                       <div class="col-lg-12">
                         <label class="sr-only" for="county">Shipping:</label> 
                         Shipping: <input type="text" id="shipping" value="1" name="shipping" class="form-control " placeholder="Shipping">
                       </div>
                     </div>
					
                      <div class="form-group ">
                       <div class="col-lg-12">
                         <label class="sr-only" for="county">Fees:</label> 
                         Fees: <input type="text" id="fees" value="1" name="fees" class="form-control " placeholder="Fees">
                       </div>
                     </div>
					 <br/>	                     
					 <div class="form-group">
                       <div class="col-lg-12">
                         <label class="sr-only" for="Offer">Offer:</label> 
                         Offer: <input type="text" id="offer" name="offer" value="0.50" class="form-control " placeholder="Offer">
                       </div>
                     </div>
					 
					 <div class="form-group ">
                       <div class="col-lg-12">                            
                         Recent Results:<label class="checkbox-inline"><input name="recent_results" type="radio" checked value="1">Yes</label>
                         <label class="checkbox-inline"><input name="recent_results" type="radio" value="0">No</label>     
                       </div>
                     </div>
					 
					 <div class="form-group">
                       <div class="col-lg-12">
                         <label class="sr-only" for="Offer">Category ID:</label> 
                         Category ID: <input type="text" id="category_id" name="category_id" value="" class="form-control " placeholder="Category ID">
                       </div>
                     </div>
					 

                   </div>
                 </div>
               </div>
               </div>
            </div>
         </div>
      </div>
   </div>

   <div class="row">
      <div class="col-md-12">
         <div class="box box-info">
            <div class="box">
               <div class="box-header">
                  <h2 class="box-title">Filters Based Calculations</h2>
               </div>
               <div class="box-body">
               <div class="form-group">                 
                 <div class="col-lg-12">
                   <div class="form-inline">
                     
                     <div class="form-group ">
                       <div class="col-lg-12">                         
                         True Value: <input type="condition" id="true_value_results" name="true_value_results" class="form-control " placeholder="True Value" >
                       </div>
                     </div> 
                     
                     <div class="form-group ">
                       <div class="col-lg-12">
                         <label class="sr-only" for="county">Shipping:</label> 
                         Shipping: <input type="text" id="shipping_results" name="shipping_results" class="form-control " placeholder="Shipping">
                       </div>
                     </div>

                     <div class="form-group ">
                       <div class="col-lg-12">
                         <label class="sr-only" for="county">Fees:</label> 
                         Fees: <input type="text" id="fees_results" name="fees_results" class="form-control " placeholder="Fee">
                       </div>
                     </div>

                     <div class="form-group ">
                       <div class="col-lg-12">
                         <label class="sr-only" for="county">Benefit:</label> 
                         Benefit: <input type="text" id="benefit_results" name="benefit_results" class="form-control " placeholder="Benefit">
                       </div>
                     </div>

                     <div class="form-group ">
                       <div class="col-lg-12">
                         <label class="sr-only" for="county">OD:</label> 
                         OD: <input type="text" id="od_results" name="od_results" class="form-control " placeholder="OD">
                       </div>
                     </div>

                      <div class="form-group ">
                       <div class="col-lg-12">
                         <label class="sr-only" for="county">Offer:</label> 
                         Offer: <input type="text" id="offer_results" name="offer_results" class="form-control " placeholder="Offer">
                       </div>
                     </div>

                     <div class="form-group ">
                       <div class="col-lg-12">
                         <label class="sr-only" for="county">OD Offer:</label> 
                         OD Offer: <input type="text" id="od_offer" name="od_offer" class="form-control " placeholder="OD Offer">
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
               </div>
            </div>
         </div>
      </div>
   </div>



   <div class="row">
      <div class="col-md-12">
         <!-- Horizontal Form -->
         <div class="box box-info">
            <!-- /.box-header -->
            <!-- form start -->
            <div class="box">
               <div class="box-header">
                  <h2 class="box-title">Ebay CSV DATA</h2>
               </div>
               <!-- /.box-header -->
               <div class="box-body">
                  <table id="example1" class="table table-bordered table-striped display nowrap" style="width:100%">
                     <thead>
                        <tr>
                           <th>Keyword</th>
                           <th>Category</th>
                           <th>Quantity</th>
                           <th>MSRP</th>
                           <th>Total MSRP</th>
                           <th>Results</th>
                           <th>Avg Selling Price</th>
                           <th>Lowest Selling Price</th>
                           <th>Cost</th>
                           <th>Avg Sub Price</th>
                           <th>Max Days</th>
                           <th>Condition</th>
                           <th>Daiy Sale</th>
                           <th>GPM</th>						  
                        </tr>
                        <tr>
                           <th></th>
                           <th></th>
                           <th id="header_total_quantity">0</th>
                           <th id="header_msrp">0</th>
                           <th id="header_total_msrp">0</th>
                           <th id="header_total_results">0</th>
                           <th id="header_avg_selling_price">0</th>
                           <th id="header_lowest_selling_price">0</th>
                           <th id="header_cost">0</th>
                           <th id="header_avg_sub_price">0</th>
                           <th id="header_total_max_days">0</th>
                           <th></th>
                           <th id="header_daily_sale">0</th>
                           <th><span id="header_total_gpm">0</span>&nbsp;<span id="header_gpm_percent">0</span></th>						   
                        </tr>
                     </thead>
                     <tbody>                
                     </tbody>
                  </table>
               </div>
               <!-- /.box-body -->
            </div>
         </div>
      </div>
   </div>
</section>