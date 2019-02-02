<!-- Content Header (Page header) -->
<section class="content-header">
   <h1>
      Ebay Details
      <small>Preview</small>
   </h1>
   <ol class="breadcrumb">
      <li><a href="<?php echo base_url(); ?>"><i class="fa fa-dashboard"></i> Home</a></li>
      <li><a href="active">Ebay API</a></li>      
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
                     <th>Sr. No.</th>
                     <th>Category</th>
                     <th>Item Description</th>
                     <th>Qty(s)</th>
                     <th>Retail Per Unit</th>
                     <th>Total Retail</th>
                     <th>Condition</th>
                     <th>Packaging</th>
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
            <table id="example4" class="table table-bordered table-striped display nowrap" style="width:100%">
               <thead>
                  <tr>
                     <th>Sr. No.</th>                  
                     <th>Item Description</th>
                     <th>Qty(s)</th>
                     <th>Retail Per Unit</th>
                     <th>Extended Retail</th>
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