<div class="modal" id="create_task">
  <div class="modal-dialog">
   <div class="modal-content">
    <div class="modal-header">
      <h4 class="modal-title">Add task</h4>
      <button type="button" class="close" data-dismiss="modal">&times;</button>
    </div>
    <div class="modal-body">
      <form class="task-form">
        <div class="error-space"></div>
        <input type="hidden" id="project_id" name="project_id">
        <div class="form-group">
          <label for="email">Name*</label>
          <input class="form-control form-control-lg br-20" name="name" id="name" type="text" required placeholder="Name of task">
        </div>
        <div class="form-group">
          <label for="message">Info</label>
          <textarea class="form-control form-control-lg br-20" name="info" id="info"></textarea>
        </div>
        <div class="form-group">
          <button type="button" class="btn btn-primary btn-lg btn-block profile-action-btn facebook-btn" id="add_task"><i class="fas fa-plus-square"></i> Add task</button>
        </div>
      </form>
   </div>
  <div class="modal-footer">
  </div>
</div>
</div>
</div>
