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
               <h1 class="box-title">Edit User</h1>           
            </div>
            <?php if ($this->session->flashdata('msg')) { ?>
              <div class="alert alert-success"> <?= $this->session->flashdata('msg') ?> </div>
            <?php } ?>
            <!-- /.box-header -->
            <!-- form start -->
             <form role="form" method="POST" id="userform" action="<?php echo base_url(); ?>/user/edituser?id=<?php echo $user['id']; ?>">
              <div class="box-body">
			          <div class="form-group">
                  <label for="exampleInputName">Name</label>
                  <input type="text" value="<?php echo set_value('name',$user['name']); ?>" class="form-control" name="name" id="name" placeholder="Enter Name">
                  <div class="infoMessage"><?php echo form_error('name'); ?></div>
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email</label>
                  <input type="email" value="<?php echo set_value('email',$user['email']); ?>" class="form-control" name="email" id="email" placeholder="Enter Email">
                  <div class="infoMessage"><?php echo form_error('email'); ?></div>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" value="<?php echo set_value('password',$this->encryption->decrypt($user['password'])); ?>" class="form-control" name="password" id="exampleInputPassword1" placeholder="Password">
                  <div class="infoMessage"><?php echo form_error('password'); ?></div>
                </div>
				<div class="form-group">
                  <label for="exampleInputPassword1">Confirm Password</label>
                  <input type="password" value="<?php echo set_value('confirm_password',$this->encryption->decrypt($user['password'])); ?>" class="form-control" name="confirm_password" id="exampleInputConfirmPassword1" placeholder="Confirm Password">
                   <div class="infoMessage"><?php echo form_error('confirm_password'); ?></div>
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
</section>