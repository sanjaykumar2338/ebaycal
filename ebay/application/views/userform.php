<!-- Content Header (Page header) -->
<section class="content-header">
   <h1>
      Users
      <small>Preview</small>
   </h1>
   <ol class="breadcrumb">
      <li><a href="<?php echo base_url(); ?>"><i class="fa fa-dashboard"></i> Home</a></li>
      <li><a href="active">Users List</a></li>      
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
               <h2 class="box-title">User Info.</h2>
            </div>
            <!-- /.box-header -->
            <!-- form start -->
             <form role="form" id="userform">
              <div class="box-body">
			    <div class="form-group">
                  <label for="exampleInputName">Name</label>
                  <input type="text" class="form-control" id="name" placeholder="Enter Name">
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email</label>
                  <input type="email" class="form-control" id="email" placeholder="Enter Email">
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                </div>
				<div class="form-group">
                  <label for="exampleInputPassword1">Confirm Password</label>
                  <input type="password" class="form-control" id="exampleInputConfirmPassword1" placeholder="Confirm Password">
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
            <h2 class="box-title">User Lists</h2>
         </div>
         <!-- /.box-header -->
         <div class="box-body">
            <table id="userlisttable" class="table table-bordered table-striped display nowrap" style="width:100%">
               <thead>
                  <tr>
                     <th>Sr. No.</th>
                     <th>Name</th>
                     <th>Email</th>                     
					 <th>Added On</th>                     
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