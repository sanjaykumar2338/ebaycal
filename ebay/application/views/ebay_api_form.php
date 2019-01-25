<!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Ebay Details
        <small>Preview</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="<?php echo base_url(); ?>"><i class="fa fa-dashboard"></i> Home</a></li>
        <li><a href="#">Ebay API</a></li>
        <li class="active">General Elements</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <!-- left column -->
        <div class="col-md-12">
          <!-- general form elements -->
          <div class="box box-primary">
            <div class="box-header with-border">
              <h3 class="box-title">Ebay</h3>
            </div>
            <!-- /.box-header -->
            <!-- form start -->
            <form role="form">
              <div class="box-body">                
                <div class="form-group">
                  <label for="exampleInputFile">File input</label>
                  <input type="file" name="keywords" id="keywords" onchange="upload_file(event)">                  
                </div>                
                 <div class="form-group" id="progress_bar" style="display: none;">
                  <img src="<?php echo base_url(); ?>assests/custom/images/loader.gif"  style="width: 74px;">
                 </div>
              </div>
              <!-- /.box-body -->

              <div class="box-footer">
                <button type="submit" class="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
       
          <!-- /.box -->

        

            </div>
        <!--/.col (left) -->
        <!-- right column -->
        <div class="col-md-12">
          <!-- Horizontal Form -->
          <div class="box box-info">          
            <!-- /.box-header -->
            <!-- form start -->
            <div class="box">
            <div class="box-header">
              <h3 class="box-title">Ebay DATA</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <table id="example1" class="table table-bordered table-striped">
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
