
	<header>
		<h1></h1>
	</header>
	<link rel="stylesheet" href="<?php print module_path(); ?>/assets/css/contactListTable.css">

	<section>
		
		<h3></h3>
		<br />
	
		<div id="eventList">
			<div class="event-list" id="eventList1">
			</div>
		</div>

		<h3>List of Attendees</h3>
		<p>An X by the name indicates membership.</p>
		<br />
		<div id="contactList">
			<div class="contact-list" id="contactList1">
				<div class="flex-parent contact-list" id="contactList2"></div>
			</div>
		</div>
	
		<input id="deleteButton" type="button" value="delete" />
		<input id="resetButton" type="button" value="reset" />
		<input id="changeButton" type="button" value="changeButton" />
	
	</section>
	

	<script src="<?php print module_path(); ?>/assets/js/date.js"></script>
	<script src="<?php print module_path(); ?>/assets/js/details/contactFieldFormat.js"></script>
	<script src="<?php print module_path(); ?>/assets/js/details/data.js"></script>
	<script type="text/jsx" src="<?php print module_path(); ?>/assets/js/details/render.js"></script>
	<script type="text/jsx" src="<?php print module_path(); ?>/assets/js/details/events.js"></script>
	<script type="text/jsx" src="<?php print module_path(); ?>/assets/js/details/app.js"></script>