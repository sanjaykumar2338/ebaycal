<div style="color:red"><?php echo validation_errors(); ?></div>
<form action="<?php echo base_url(); ?>user/login" method="post">
      <div class="form-group has-feedback">
        <input type="email" value="<?php echo set_value('email'); ?>" class="form-control" name="email" placeholder="Email">
        <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback">
        <input type="password" class="form-control" value="<?php echo set_value('password'); ?>" name="password" placeholder="Password">
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
      </div>
      <div class="row">
        <div class="col-xs-8">         
        </div>
        <!-- /.col -->
        <div class="col-xs-4">
          <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
        </div>
        <!-- /.col -->
      </div>
    </form>