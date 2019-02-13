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
				   <div class="form-group">
                      <label for="exampleInputFile">How many keywords form description?</label>
                     <input style="width:50px;" type="text" name="words_csv" class="form-control" id="words_csv">                  
                  </div>
                  <div class="form-group" id="progress_bar" style="display: none;">
                     <img src="<?php echo base_url(); ?>assests/custom/images/loader.gif"  style="width: 74px;">
                  </div>
               </div>
               <!-- /.box-body -->
               <div class="box-footer">
                  &nbsp;
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
				   <div class="form-group">
                     <label for="exampleInputFile">How many keywords form description?</label>
                     <input style="width:50px;" type="text" name="words_url" class="form-control" id="words_url">                  
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
                     <th>Total Retail</th>
                     <th>Total Amt.(s)</th>                                           
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
                     <th></th>
                     <th></th>                                           
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

<div class="col-md-12">
   <!-- Horizontal Form -->
   <div class="box box-info">
      <!-- /.box-header -->
      <!-- form start -->
      <div class="box">
         <div class="box-header">
            <h2 class="box-title">Ebay URL DATA</h2>
         </div>
         <!-- /.box-header -->
         <div class="box-body">
            <table id="example2" class="table table-bordered table-striped display nowrap" style="width:100%">
               <thead>
                  <tr>
                     <th>Sr. No.</th>                  
                     <th>Item Description</th>
                     <th>Qty(s)</th>
                     <th>Retail Per Unit</th>
                     <th>Extended Retail / Total Retail Price</th>
                     <th>BBBY SKU</th>
                     <th>UPC</th>
                     <th>Total Result(s)</th>
                     <th>Total Amt.(s)</th>
                     <th>Category</th>

                     <th>Avg. Unit Price</th>
                     <th>Lowest Buy</th>
                     <th>Avg. Total Price</th>
                     <th>Max Days</th>
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