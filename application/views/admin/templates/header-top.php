<div class="container">
	<div class="row ">
	<!-- When the user is logged -->
<!-- 			<div class="pull-right"> -->
<!-- 				<div class="link"> -->
<!-- 					<span class="glyphicon glyphicon-user"></span> -->
<!-- 					<a>Sign in</a> -->
<!-- 				</div> -->
<!-- 			</div> -->
		<div class="pull-left">
            	<div class="header-item"><i class="fa fa-envelope"></i> info@pixlized.cz</div>
                <div class="header-item"><i class="fa fa-phone"></i> +420 123 456 789</div>
        </div>
		<div class="btn-group pull-right">
		<?php if( (isset($type_of_admin)) && (isset($account_types)) ):?>
			<?php if( $type_of_admin == $account_types[0] || $type_of_admin == $account_types[2] || $type_of_admin == $account_types[3]):?>
				<a class="btn btn-default" href="#" role="button">Iniciar nueva orden </span></a>
				<a class="btn btn-default" href="#" role="button">Cerrar sesion <span class="glyphicon glyphicon-user"></span></a>
			<?php endif;?>	
		<?php endif;?>
		</div>
	</div>
	
</div>