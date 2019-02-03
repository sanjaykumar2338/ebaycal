<style type="text/css">
  .infoMessage{
    color: red;
  }
</style>
<!-- Content Header (Page header) -->
<section class="content-header">
   <h1>
      Users
      <small>Preview</small>
   </h1>
   <ol class="breadcrumb">
      <li><a href="<?php echo base_url(); ?>"><i class="fa fa-dashboard"></i> Home</a></li>
      <li><a href="#">Users List</a></li>      
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
               <h1 class="box-title">Add User</h1>           
            </div>
            <?php if ($this->session->flashdata('msg')) { ?>
              <div class="alert alert-success"> <?= $this->session->flashdata('msg') ?> </div>
            <?php } ?>
            <!-- /.box-header -->
            <!-- form start -->
             <form role="form" method="POST" id="userform" action="<?php echo base_url(); ?>user/register">
              <div class="box-body">
			          <div class="form-group">
                  <label for="exampleInputName">Name</label>
                  <input type="text" value="<?php echo set_value('name'); ?>" class="form-control" name="name" id="name" placeholder="Enter Name">
                  <div class="infoMessage"><?php echo form_error('name'); ?></div>
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email</label>
                  <input type="email" value="<?php echo set_value('email'); ?>" class="form-control" name="email" id="email" placeholder="Enter Email">
                  <div class="infoMessage"><?php echo form_error('email'); ?></div>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" value="<?php echo set_value('password'); ?>" class="form-control" name="password" id="exampleInputPassword1" placeholder="Password">
                  <div class="infoMessage"><?php echo form_error('password'); ?></div>
                </div>				
				<div class="form-group">
                  <label for="exampleInputPassword1">Confirm Password</label>
                  <input type="password" value="<?php echo set_value('confirm_password'); ?>" class="form-control" name="confirm_password" id="exampleInputConfirmPassword1" placeholder="Confirm Password">
                   <div class="infoMessage"><?php echo form_error('confirm_password'); ?></div>
                </div>                                
				<div class="form-group">
                  <label for="exampleInputPassword1">Admin (Manage Users)</label><br>
                  <input type="checkbox" id="is_admin" value="0" name="admin">                 
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
            <?php if ($this->session->flashdata('tablemsg')) { ?>
              <div class="alert alert-success"> <?= $this->session->flashdata('tablemsg') ?> </div>
            <?php } ?>
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
                     <th>Action</th>                     
                  </tr>
               </thead>
               <tbody> 
               <?php if(isset($users)) { ?>
               <?php foreach ($users as $key=>$value) { ?>
                  <tr>
                    <td><?php echo $key+1; ?>.</td>
                    <td><?php echo $value['name']; ?></td>
                    <td><?php echo $value['email']; ?></td>
                    <td><?php echo $value['added_on']; ?></td>
                    <td><a onclick="return confirm('are you sure')" href="<?php echo base_url(); ?>user/delete/<?php echo $value['id']; ?>">Delete</a> | <a href="<?php echo base_url(); ?>user/edit?id=<?php echo $value['id']; ?>">Edit</a></td>
                  </tr>                 
                <?php } } ?>
               </tbody>
            </table>
         </div>
         <!-- /.box-body -->
      </div>
   </div>
</div>
</div>      
</section>