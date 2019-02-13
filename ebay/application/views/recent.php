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
               <h2 class="box-title">Recent Ebay Ebay CSV Searches</h2>
            </div>
            <!-- /.box-header -->
            <!-- form start -->
            <form role="form">
               <div class="box-body">
                  <div class="form-group">
                     <label for="exampleInputFile">Select CSV</label>
                     <select class="form-control" id="select_csv">
                         <option value="">Select</option>
                         <?php if($csv) { ?>
                         <?php foreach($csv as $row) { ?>
                           <option value="<?php echo $row['id']; ?>"><?php echo $row['csv']; ?></option>
                         <?php } } ?>
                     </select>                 
                  </div>
                  <div class="form-group" id="progress_bar" style="display: none;">
                     <img src="<?php echo base_url(); ?>assests/custom/images/loader.gif"  style="width: 74px;">
                  </div>
               </div>
               <!-- /.box-body -->
               <div class="box-footer">
                  <button type="submit" id="by_csv_recent" class="btn btn-primary">Submit</button>
               </div>
            </form>
         </div>
         <!-- /.box -->
      </div>
      <div class="col-md-6">
         <!-- general form elements -->
         <div class="box box-primary">
            <div class="box-header with-border">
               <h2 class="box-title">Recent Ebay Ebay URL Searches</h2>
            </div>
            <!-- /.box-header -->
            <!-- form start -->
            <form role="form">
               <div class="box-body">
                  <div class="form-group">
                     <label for="exampleInputFile">Select URL</label>
                      <select class="form-control" id="select_url">
                         <option value="">Select</option>
                         <?php if($url) { ?>
                         <?php foreach($url as $row) { ?>
                           <option value="<?php echo $row['id']; ?>"><?php echo $row['url']; ?></option>
                         <?php } }?>
                     </select>                    
                  </div>
                  <div class="form-group" id="progress_bar2" style="display: none;">
                     <img src="<?php echo base_url(); ?>assests/custom/images/loader.gif"  style="width: 74px;">
                  </div>
               </div>
               <!-- /.box-body -->
               <div class="box-footer">
                  <button type="submit" id="by_url_recent" class="btn btn-primary">Submit</button>
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
            <table id="example3" class="table table-bordered table-striped display nowrap" style="width:100%">
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