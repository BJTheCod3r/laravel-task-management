(function($) {
  "use strict";

  var api_token = localStorage.getItem('task_token'),
        private_page = $('meta[name="private_page"]').attr('content'),
        index = $('#index').val(),
        home = '',
        user_id = localStorage.getItem('user_id'),
        url = $('#url').val();

  setHeader();

  var isLogged = isLogged();

  if(!isLogged && private_page == 1) {
    window.location.href = index;
  }
  else if(isLogged && private_page == 0) {
   window.location.href = home;
  }

  if($('.home_page').length) {
    getUser();
  }

  if($('.project-list').length) {
    fetchProjects(1);
  }

  if($('.tasks_page').length) {
    fetchTasks(1);
  }

  if($('.project_page').length) {
    var id = $('#id').val();
    fetchProject(id);
  }

  if($('.project_edit_page').length) {
    var id = $('#id').val();
    editProject(id);
  }

  if($('.task_edit_page').length) {
    var id = $('#id').val();
    editTask(id);
  }

  if($('.task_page').length) {
    var id = $('#id').val();
    fetchTask(id);
  }

$(".toggle-password").click(function() {

  $(this).toggleClass("fa-eye fa-eye-slash");
  var input = $($(this).attr("toggle"));
   if (input.attr("type") == "password") {
     input.attr("type", "text");
    }
    else {
      input.attr("type", "password");
    }
  });


   $('#signup_btn').click(function () {
     $('.error-space').html('');
      var username = $('#username').val(),
          password = $('#password').val();

      if(username === "") {
        $('.error-space').html('<div class="alert alert-danger alert-dismissible fade show"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Error!</strong> Username cannot be empty.</div>');
        return;
      }

      if(username.length < 3) {
        $('.error-space').html('<div class="alert alert-danger alert-dismissible fade show"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Error!</strong> Username cannot be less than 3 characters.</div>');
        return;
      }

      if(password === "" || password.length < 6) {
       $('.error-space').html('<div class="alert alert-danger alert-dismissible fade show"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Error!</strong> Password is invalid.</div>');
       return;
      }
      signUp(username, password);
   });

   $('#signin_btn').click(function () {
     $('.error-space').html('');
      var username = $('#username').val(),
          password = $('#password').val();

      if(username === "") {
        $('.error-space').html('<div class="alert alert-danger alert-dismissible fade show"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Error!</strong> Username cannot be empty.</div>');
        return;
      }

      if(password === "") {
       $('.error-space').html('<div class="alert alert-danger alert-dismissible fade show"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Error!</strong> Password is invalid.</div>');
       return;
      }
      signIn(username, password);
   });

   $('#create_project').click(function () {
     $('.error-space').html('');
          var name = $('#name').val(),
          info = $('#info').val();

      if(name === "") {
        $('.error-space').html('<div class="alert alert-warning alert-dismissible fade show"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Warning!</strong> Name cannot be empty.</div>');
        return;
      }

      if(info === "") {
       $('.error-space').html('<div class="alert alert-warning alert-dismissible fade show"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Warning!</strong> Info cannot be empty.</div>');
       return;
     }
      createProject(user_id, name, info);
   });

   $('#add_task').click(function () {

     $('.error-space').html('');
     var name = $('#name').val(),
         info = $('#info').val(),
         project_id = $('#id').val();

      if(name === "") {
        $('.error-space').html('<div class="alert alert-warning alert-dismissible fade show"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Warning!</strong> Name cannot be empty.</div>');
        return;
      }

      if(info === "") {
       $('.error-space').html('<div class="alert alert-warning alert-dismissible fade show"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Warning!</strong> Info cannot be empty.</div>');
       return;
     }

      createTask(project_id, name, info);
   });

   $('#update_project').click(function () {
     $('.error-space').html('');
          var name = $('#name').val(),
          info = $('#info').val(),
          id = $('#id').val();

      if(name === "") {
        $('.error-space').html('<div class="alert alert-warning alert-dismissible fade show"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Warning!</strong> Name cannot be empty.</div>');
        return;
      }

      if(info === "") {
       $('.error-space').html('<div class="alert alert-warning alert-dismissible fade show"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Warning!</strong> Info cannot be empty.</div>');
       return;
     }
      updateProject(id, name, info);
   });

   $('#update_task').click(function () {
     $('.error-space').html('');
          var name = $('#name').val(),
          info = $('#info').val(),
          id = $('#id').val();

      if(name === "") {
        $('.error-space').html('<div class="alert alert-warning alert-dismissible fade show"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Warning!</strong> Name cannot be empty.</div>');
        return;
      }

      if(info === "") {
       $('.error-space').html('<div class="alert alert-warning alert-dismissible fade show"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Warning!</strong> Info cannot be empty.</div>');
       return;
     }
      updateTask(id, name, info);
   });

   $('.paginator > .next').click(function (e) {
      e.preventDefault();
      if($('.tasks_page').length) {
        fetchTasks($('#next_page').val());
      }
      else {
      fetchProjects($('#next_page').val());
      }
   });

   $('.paginator > .prev').click(function (e) {
      e.preventDefault();
      if($('.tasks_page').length) {
       fetchTasks($('#next_page').val());
      }
      else {
      fetchProjects($('#prev_page').val());
      }
   });

   $(".project-list").on('click', '.del-project',function(e) {
      e.preventDefault();
      var id = $(this).data('id');
      Swal.fire({
        title: 'Are you sure?',
        text: "This action is irreversible",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#232531',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete'
      }).then((result) => {
         if (result.value) {
          deleteProject(id);
       }
     })
   });



   $(".task-list").on('click', '.del-task',function(e) {
      e.preventDefault();
      var id = $(this).data('id');
      Swal.fire({
        title: 'Are you sure?',
        text: "This action is irreversible",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#232531',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete'
      }).then((result) => {
         if (result.value) {
          deleteTask(id);
       }
     })
   });

   $('.signout').click(function(e) {
     e.preventDefault();
     signOut();
   });


   $('.task-list').sortable({
    items: '.tile',
    start: function(event, ui) {
        // Create a temporary attribute on the element with the old index
        $(this).attr('data-currentindex', ui.item.index());
    },
    update: function(event, ui) {

      iziToast.info({
        title: 'Sort',
        message: 'Updating...',
      });

        let current_position = $(this).attr('data-currentindex');
        let id = $('ul').find(`[data-index='${current_position}']`).data('id');
        let priority = $('ul').find(`[data-index='${current_position}']`).data('priority');
        let desired_priority = $('ul').find(`[data-index='${ui.item.index()}']`).data('id');
        $(this).removeAttr('data-currentindex');
        // Post to the server to handle the changes
        //let us change numbers
        /*
        let number = $('ul').find(`[data-index='${current_position}']`).find(".number").html();
        let prev_number = $('ul').find(`[data-index='${ui.item.index()}']`).find(".number").html();
        let prev_priority = $('ul').find(`[data-index='${ui.item.index()}']`).data('priority');
        $('ul').find(`[data-index='${current_position}']`).find(".number").html(prev_number);
        $('ul').find(`[data-index='${ui.item.index()}']`).find(".number").html(number);
        $('ul').find(`[data-index='${ui.item.index()}']`).attr("data-priority", priority);
        $('ul').find(`[data-index='${current_position}']`).find(".number").attr("data-priority", prev_priority);
        */

        $.ajax({
            type: "PUT",
            url: url+'/tasks/priority',
            data: {
                id: id,
                priority: priority,
                desired_priority: desired_priority
            },
            beforeSend: function() {
                // Disable dragging
                $('.task-list').sortable('disable');
            },
            success: function(data, status) {
                // Re-enable dragging
                $('.task-list').sortable('enable');
                window.location.reload();
            },
          error: function(xhr, desc, err) {
            //we can always do something here later
            iziToast.info({
              title: 'Warning',
              message: 'Something went wrong',
            });
          }
        });
    }
});


  function signUp(username, password) {
    disableBtn('#signup_btn');

    iziToast.info({
      title: 'Sign Up',
      message: 'Signing up...',
    });

   $.ajax({
     type: 'post',
     url: 'api/register',
     dataType: 'json',
     data: {username: username, password: password},
     success: function (data, status) {
       enableBtn('#signup_btn');
       if(data.hasOwnProperty('data')) {
         api_token = data.data.api_token;
         localStorage.setItem('task_token', api_token);
         localStorage.setItem('user_id', data.data.id);
         iziToast.success({
              title: 'Success',
              message: data.message
            });
       }
        window.location.href = data.home;
     },
     error: function(xhr, desc, err) {
       enableBtn('#signup_btn');
       console.log(xhr.responseJSON);
       if(xhr.responseJSON.hasOwnProperty('errors')) {
         if(xhr.responseJSON.errors.hasOwnProperty('username')) {
           var dataset = xhr.responseJSON.errors.username;
           dataset.forEach(function (data) {
             iziToast.error({
                  title: 'Username',
                  message: data
                });
             });
           }
           if(xhr.responseJSON.errors.hasOwnProperty('password')) {
             var dataset = xhr.responseJSON.errors.password;
             dataset.forEach(function (data) {
               iziToast.error({
                    title: 'Password',
                    message: data
                  });
               });
             }
          }
          else {
            iziToast.error({
                 title: 'Unknown',
                 message: 'Something went wrong.'
               });
          }
        }
   });
 }

 function signIn(username, password) {
   disableBtn('#signin_btn');

   iziToast.info({
     title: 'Sign In',
     message: 'Signing in...',
   });

  $.ajax({
    type: 'post',
    url: 'api/login',
    dataType: 'json',
    data: {username: username, password: password},
    success: function (data, status) {
      enableBtn('#signin_btn');

      if(data.hasOwnProperty('data')) {
        api_token = data.data.api_token;
        localStorage.setItem('task_token', api_token);
        localStorage.setItem('user_id', data.data.id);
        setHeader();

        iziToast.success({
             title: 'Success',
             message: data.message
           });
         window.location.href = data.home;
      }

    },
    error: function(xhr, desc, err) {
      enableBtn('#signin_btn');
      if(xhr.responseJSON.hasOwnProperty('errors')) {
        if(xhr.responseJSON.errors.hasOwnProperty('username')) {
          var dataset = xhr.responseJSON.errors.username;
          dataset.forEach(function (data) {
            iziToast.error({
                 title: 'Username',
                 message: data
               });
            });
          }
          if(xhr.responseJSON.errors.hasOwnProperty('password')) {
            var dataset = xhr.responseJSON.errors.username;
            dataset.forEach(function (data) {
              iziToast.error({
                   title: 'Password',
                   message: data
                 });
              });
            }
         }
         else {
           iziToast.error({
                title: 'Unknown',
                message: 'Something went wrong.'
              });
         }
       }
  });
}

function createProject(user_id, name, info) {
  disableBtn('#create_project');

  iziToast.info({
    title: 'Create Project',
    message: 'Creating...',
  });

 $.ajax({
   type: 'post',
   url: url+'/projects',
   dataType: 'json',
   data: {user_id: user_id, info: info, name: name},
   success: function (data, status) {
     console.log(data);
     enableBtn('#create_project');
     $('.project-form')[0].reset();
     $('#user_id').val(user_id);
       iziToast.success({
            title: 'Success',
            message: 'Project created successfully!'
          });
     $('.success-space').html('<div class="alert alert-success alert-dismissible fade show"><button type="button" class="close" data-dismiss="alert">&times;</button>View <a href="'+data.id+'">project</a></div>');
   },
   error: function(xhr, desc, err) {
     console.log(xhr);
     enableBtn('#create_project');
     console.log(xhr.responseJSON);
     if(xhr.responseJSON.hasOwnProperty('errors')) {
       if(xhr.responseJSON.errors.hasOwnProperty('name')) {
         var dataset = xhr.responseJSON.errors.name;
         dataset.forEach(function (data) {
           iziToast.error({
                title: 'Name',
                message: data
              });
           });
         }
         if(xhr.responseJSON.errors.hasOwnProperty('info')) {
           var dataset = xhr.responseJSON.errors.info;
           dataset.forEach(function (data) {
             iziToast.error({
                  title: 'Info',
                  message: data
                });
             });
           }

           if(xhr.responseJSON.errors.hasOwnProperty('user_id')) {
             var dataset = xhr.responseJSON.errors.user_id;
             dataset.forEach(function (data) {
               iziToast.error({
                    title: 'User',
                    message: data
                  });
               });
             }
        }
        else {
          iziToast.error({
               title: 'Unknown',
               message: 'Something went wrong.'
             });
        }
      }
 });
}

function updateProject(id, name, info) {
  disableBtn('#update_project');

  iziToast.info({
    title: 'Update Project',
    message: 'Updating...',
  });

 $.ajax({
   type: 'put',
   url: url+'/projects/'+id,
   dataType: 'json',
   data: {info: info, name: name},
   success: function (data, status) {
     enableBtn('#update_project');
       iziToast.success({
            title: 'Success',
            message: 'Project updated successfully!'
          });
     $('.success-space').html('<div class="alert alert-success alert-dismissible fade show"><button type="button" class="close" data-dismiss="alert">&times;</button>View <a href="'+index+'/projects/'+id+'">project</a></div>');
   },
   error: function(xhr, desc, err) {
     console.log(xhr);
     enableBtn('#update_project');
     console.log(xhr.responseJSON);
     if(xhr.responseJSON.hasOwnProperty('errors')) {
       if(xhr.responseJSON.errors.hasOwnProperty('name')) {
         var dataset = xhr.responseJSON.errors.name;
         dataset.forEach(function (data) {
           iziToast.error({
                title: 'Name',
                message: data
              });
           });
         }
         if(xhr.responseJSON.errors.hasOwnProperty('info')) {
           var dataset = xhr.responseJSON.errors.info;
           dataset.forEach(function (data) {
             iziToast.error({
                  title: 'Info',
                  message: data
                });
             });
           }

           if(xhr.responseJSON.errors.hasOwnProperty('user_id')) {
             var dataset = xhr.responseJSON.errors.user_id;
             dataset.forEach(function (data) {
               iziToast.error({
                    title: 'User',
                    message: data
                  });
               });
             }
        }
        else {
          iziToast.error({
               title: 'Unknown',
               message: 'Something went wrong.'
             });
        }
      }
 });
}

function updateTask(id, name, info) {
  disableBtn('#update_task');

  iziToast.info({
    title: 'Update Task',
    message: 'Updating...',
  });

 $.ajax({
   type: 'put',
   url: url+'/tasks/'+id,
   dataType: 'json',
   data: {info: info, name: name},
   success: function (data, status) {
     enableBtn('#update_task');
       iziToast.success({
            title: 'Success',
            message: 'Task updated successfully!'
          });
     $('.success-space').html('<div class="alert alert-success alert-dismissible fade show"><button type="button" class="close" data-dismiss="alert">&times;</button>View <a href="'+index+'/tasks/'+id+'">task</a></div>');
   },
   error: function(xhr, desc, err) {
     enableBtn('#update_task');
     if(xhr.responseJSON.hasOwnProperty('errors')) {
       if(xhr.responseJSON.errors.hasOwnProperty('name')) {
         var dataset = xhr.responseJSON.errors.name;
         dataset.forEach(function (data) {
           iziToast.error({
                title: 'Name',
                message: data
              });
           });
         }
         if(xhr.responseJSON.errors.hasOwnProperty('info')) {
           var dataset = xhr.responseJSON.errors.info;
           dataset.forEach(function (data) {
             iziToast.error({
                  title: 'Info',
                  message: data
                });
             });
           }

           if(xhr.responseJSON.errors.hasOwnProperty('user_id')) {
             var dataset = xhr.responseJSON.errors.user_id;
             dataset.forEach(function (data) {
               iziToast.error({
                    title: 'User',
                    message: data
                  });
               });
             }
        }
        else {
          iziToast.error({
               title: 'Unknown',
               message: 'Something went wrong.'
             });
        }
      }
 });
}

function deleteProject(id) {

  iziToast.info({
    title: 'Delete',
    message: 'Deleting...',
  });

 $.ajax({
   type: 'delete',
   url: url+'/projects/'+id,
   dataType: 'json',
   data: {},
   success: function (data, status) {
     Swal.fire(
      'Deleted!',
      'Project deleted successfully!.',
      'success'
    );
    window.location.reload();
   },
   error: function(xhr, desc, err) {
      iziToast.error({
          title: 'Unknown',
          message: 'Something went wrong.'
        });
      }
 });
}

function createTask(project_id, name, info) {
  disableBtn('#create_task');

  iziToast.info({
    title: 'Create Task',
    message: 'Creating...',
  });

 $.ajax({
   type: 'post',
   url: url+'/tasks',
   dataType: 'json',
   data: {project_id: project_id, info: info, name: name},
   success: function (data, status) {
     enableBtn('#create_task');
     $('.task-form')[0].reset();
       iziToast.success({
            title: 'Success',
            message: 'Task added successfully!'
          });
      window.location.reload();
   },
   error: function(xhr, desc, err) {
     console.log(xhr);
     enableBtn('#task_project');
     console.log(xhr.responseJSON);
     if(xhr.responseJSON.hasOwnProperty('errors')) {
       if(xhr.responseJSON.errors.hasOwnProperty('name')) {
         var dataset = xhr.responseJSON.errors.name;
         dataset.forEach(function (data) {
           iziToast.error({
                title: 'Name',
                message: data
              });
           });
         }
         if(xhr.responseJSON.errors.hasOwnProperty('info')) {
           var dataset = xhr.responseJSON.errors.info;
           dataset.forEach(function (data) {
             iziToast.error({
                  title: 'Info',
                  message: data
                });
             });
           }

           if(xhr.responseJSON.errors.hasOwnProperty('user_id')) {
             var dataset = xhr.responseJSON.errors.user_id;
             dataset.forEach(function (data) {
               iziToast.error({
                    title: 'User',
                    message: data
                  });
               });
             }
        }
        else {
          iziToast.error({
               title: 'Unknown',
               message: 'Something went wrong.'
             });
        }
      }
 });
}

function deleteTask(id) {

  iziToast.info({
    title: 'Delete',
    message: 'Deleting...',
  });

 $.ajax({
   type: 'delete',
   url: url+'/tasks/'+id,
   dataType: 'json',
   data: {},
   success: function (data, status) {
     Swal.fire(
      'Deleted!',
      'Task deleted successfully!.',
      'success'
    );
    window.location.reload();
   },
   error: function(xhr, desc, err) {
      iziToast.error({
          title: 'Unknown',
          message: 'Something went wrong.'
        });
      }
 });
}


function fetchProjects(page) {

 $.ajax({
   type: 'get',
   url: url+'/projects',
   dataType: 'json',
   data: {page: page},
   success: function (data, status) {
     if(data.hasOwnProperty('data')) {
       var dataset = data.data,
           projects = "";
       $('#current_page').val(data.current_page);

       if(data.prev_page_url == null) {
         $('#prev_page').val(data.current_page);
         $('.paginator > .prev').hide();
       }
       else {
         $('#prev_page').val(data.current_page - 1);
         $('.paginator > .prev').show();
       }
       if((data.total - data.to) > 0) {
         $('#next_page').val(data.current_page + 1);
         $('.paginator > .next').show();
       }
       else {
         $('#next_page').val(data.current_page);
         $('.paginator > .next').hide();
       }

      var count = 0;
       if(data.current_page  > 1) {
         count = (data.current_page-1) * 10;
       }

      if(data.total > 0) {
         dataset.forEach(function (data) {
         count++;
         projects += '<li class="row tile mb-4">';
         projects += '<div class="col-md-12">';
         projects += '<h2><a href="projects/'+data.id+'">'+data.name+'</a></h2>';
         projects += '</div>';
         projects += '<div class="col-md-12 pt-2 actions">';
         projects += '<div class="row">';
         projects += '<div class="col-md-6 text-left">';
         projects += data.created_at;
         projects += '</div>';
         projects += '<div class="col-md-6">';
         projects += '<a href="'+index+'/projects/'+data.id+'/edit"><i class="fas fa-edit"></i></a>';
         projects += '<a class="del-project" data-id="'+data.id+'" href="#"><i class="fas fa-trash"></i></a>';
         projects += '</div>';
         projects += '</div>';
         projects += '</div>';
         projects += '<span class="number">'+count+'</span>';
         projects += '</li>';
        });
        $('.project-list').html(projects);
        }
        else {
          var show = '<div class="text-center"><span class="d-block display-3"><i class="fas fa-project-diagram"></i></span>';
              show += '<p class="no-here">There is no project yet.</p></div>';
          $('.project-list').html(show);
        }
      }
   },
   error: function(xhr, desc, err) {
     iziToast.warning({
       title: 'Error',
       message: 'Something went wrong',
     });
      }
 });
}

function fetchTasks(page) {

 $.ajax({
   type: 'get',
   url: url+'/tasks',
   dataType: 'json',
   data: {page: page},
   success: function (data, status) {
     if(data.hasOwnProperty('data')) {
       var dataset = data.data,
           tasks = "";
       $('#current_page').val(data.current_page);

       if(data.prev_page_url == null) {
         $('#prev_page').val(data.current_page);
         $('.paginator > .prev').hide();
       }
       else {
         $('#prev_page').val(data.current_page - 1);
         $('.paginator > .prev').show();
       }
       if((data.total - data.to) > 0) {
         $('#next_page').val(data.current_page + 1);
         $('.paginator > .next').show();
       }
       else {
         $('#next_page').val(data.current_page);
         $('.paginator > .next').hide();
       }

      var count = 0;
       if(data.current_page  > 1) {
         count = (data.current_page-1) * 10;
       }

      if(data.total > 0) {
         dataset.forEach(function (data) {
         count++;
         tasks += '<li class="row tile mb-4">';
         tasks += '<div class="col-md-12">';
         tasks += '<h2><a href="tasks/'+data.id+'">'+data.name+'</a></h2>';
         tasks += '</div>';
         tasks += '<div class="col-md-12 pt-2 actions">';
         tasks += '<div class="row">';
         tasks += '<div class="col-md-6 text-left">';
         tasks += data.created_at;
         tasks += '</div>';
         tasks += '<div class="col-md-6">';
         tasks += '<a href="'+index+'/tasks/'+data.id+'/edit"><i class="fas fa-edit"></i></a>';
         tasks += '<a class="del-task" data-id="'+data.id+'" href="#"><i class="fas fa-trash"></i></a>';
         tasks += '</div>';
         tasks += '</div>';
         tasks += '</div>';
         tasks += '<span class="number">'+count+'</span>';
         tasks += '</li>';
        });
        $('.task-list').html(tasks);
        }
        else {
          var show = '<div class="text-center"><span class="d-block display-3"><i class="fas fa-tasks"></i></span>';
              show += '<p class="no-here">There is no project yet.</p></div>';
          $('.task-list').html(show);
        }
      }
   },
   error: function(xhr, desc, err) {
     iziToast.warning({
       title: 'Error',
       message: 'Something went wrong',
     });
      }
 });
}

function fetchProject(id) {

 $.ajax({
   type: 'get',
   url: url+'/projects/'+id,
   dataType: 'json',
   data: {},
   success: function (data, status) {
     if(data != null) {
       $('#project_info').html(data.info);
       $('#created_at').html(data.created_at);
       $('#updated_at').html(data.updated_at);
       var dataset = data.tasks,
           count = 0,
           tasks = "";
        if(dataset.length > 0) {
          dataset.forEach(function (data) {
          count++;
          tasks += '<li class="row tile mb-4" data-index='+(count-1)+' data-id="'+data.id+'" data-priority="'+data.priority+'">';
          tasks += '<div class="col-md-12">';
          tasks += '<h2><a href="'+index+'/tasks/'+data.id+'">'+data.name+'</a></h2>';
          tasks += '</div>';
          tasks += '<div class="col-md-12 pt-2 actions">';
          tasks += '<div class="row">';
          tasks += '<div class="col-md-6 text-left">';
          tasks += data.created_at;
          tasks += '</div>';
          tasks += '<div class="col-md-6">';
          tasks += '<a href="'+index+'/tasks/'+data.id+'/edit"><i class="fas fa-edit"></i></a>';
          tasks += '<a class="del-task" data-id="'+data.id+'" href="#"><i class="fas fa-trash"></i></a>';
          tasks += '</div>';
          tasks += '</div>';
          tasks += '</div>';
          tasks += '<span class="number">'+count+'</span>';
          tasks += '</li>';
         });
         $('.task-list').html(tasks);
         $('.task-list').after('<p><button type="button" class="btn btn-primary btn-lg btn-block profile-action-btn facebook-btn" data-target="#create_task" data-toggle="modal"><i class="fas fa-plus-square"></i> Add Task</button></p>');
         }
         else {
           var show = '<div class="text-center"><span class="d-block display-3"><i class="fas fa-tasks"></i></span>';
               show += '<p class="no-here">There is no task yet, <a href="#" data-target="#create_task" data-toggle="modal">add one</a>.</p></div>';
           $('.task-list').html(show);
         }
      }
      else {
        iziToast.warning({
          title: 'Error',
          message: 'Something went wrong',
        });
        window.location.href = index+'/projects';
      }
   },
   error: function(xhr, desc, err) {
     iziToast.warning({
       title: 'Error',
       message: 'Something went wrong',
     });
     window.location.href = index+'/projects';
    }
 });
}

function editProject(id) {

 $.ajax({
   type: 'get',
   url: url+'/projects/'+id,
   dataType: 'json',
   data: {},
   success: function (data, status) {
     if(data != null) {
       $('#name').val(data.name);
       $('#info').val(data.info);
      }
      else {
        iziToast.warning({
          title: 'Error',
          message: 'Something went wrong',
        });
        window.location.href = index+'/projects';
      }
   },
   error: function(xhr, desc, err) {
     iziToast.warning({
       title: 'Error',
       message: 'Something went wrong',
     });
     window.location.href = index+'/projects';
    }
 });
}

function fetchTask(id) {

 $.ajax({
   type: 'get',
   url: url+'/tasks/'+id,
   dataType: 'json',
   data: {},
   success: function (data, status) {
     if(data != null) {
       $('#task_info').html(data.info);
       $('#created_at').html(data.created_at);
       $('#updated_at').html(data.updated_at);
       $('.back-space > a').attr('href', index+'/projects/'+data.project_id);
       $('#project_id').val(data.project_id);
      }
      else {
        iziToast.warning({
          title: 'Error',
          message: 'Something went wrong',
        });
        window.location.href = index+'/projects';
      }
   },
   error: function(xhr, desc, err) {
     iziToast.warning({
       title: 'Error',
       message: 'Something went wrong',
     });
     window.location.href = index+'/projects';
    }
 });
}

function editTask(id) {

 $.ajax({
   type: 'get',
   url: url+'/tasks/'+id,
   dataType: 'json',
   data: {},
   success: function (data, status) {
     if(data != null) {
       $('#name').val(data.name);
       $('#info').val(data.info);
       $('.back-space > a').attr('href', index+'/projects/'+data.project_id);
      }
      else {
        iziToast.warning({
          title: 'Error',
          message: 'Something went wrong',
        });

        window.location.href = index+'/projects';
      }
   },
   error: function(xhr, desc, err) {
     iziToast.warning({
       title: 'Error',
       message: 'Something went wrong',
     });
     window.location.href = index+'/projects';
    }
 });
}

function signOut() {

  iziToast.info({
    title: 'Sign Out',
    message: 'Signing out...',
  });

 $.ajax({
   type: 'post',
   url: url+'/logout',
   dataType: 'json',
   data: {api_token: api_token},
   success: function (data, status) {
     if(data.hasOwnProperty('data')) {
       iziToast.success({
            title: 'Success',
            message: data.data
          });
     }
     window.location.href = index;

   },
   error: function(xhr, desc, err) {
     console.log(xhr.responseJSON);
     if(xhr.responseJSON.hasOwnProperty('errors')) {
       if(xhr.responseJSON.errors.hasOwnProperty('username')) {
         var dataset = xhr.responseJSON.errors.username;
         dataset.forEach(function (data) {
           iziToast.error({
                title: 'Username',
                message: data
              });
           });
         }
         if(xhr.responseJSON.errors.hasOwnProperty('password')) {
           var dataset = xhr.responseJSON.errors.username;
           dataset.forEach(function (data) {
             iziToast.error({
                  title: 'Password',
                  message: data
                });
             });
           }
        }
        else {
          iziToast.error({
               title: 'Unknown',
               message: 'Something went wrong.'
             });
        }
      }
 });
}

function getUser() {

 $.ajax({
   type: 'get',
   url: url+'/user',
   dataType: 'json',
   data: {},
   success: function (data, status) {
     $('.user_place').html(data.username.toUpperCase());

   },
   error: function(xhr, desc, err) {
          iziToast.error({
               title: 'Unknown',
               message: 'Something went wrong.'
             });
      }
  });
}

function getReceiver() {

 $.ajax({
   type: 'get',
   url: url+'/user/'+$('#username').val(),
   dataType: 'json',
   data: {},
   success: function (data, status) {
     console.log(data);
     if(data.sender.logged === true) {
     if(data.sender.id === data.receiver.id) {
       //go to the homepage
       window.location.href = $('#home_url').val();
     }
    }
   },
   error: function(xhr, desc, err) {
          iziToast.error({
               title: 'Unknown',
               message: 'Something went wrong.'
             });
      }
  });
}

function isLogged() {
 var result = "";
 $.ajax({
   type: 'get',
   url: url+'/user/logged',
   async: false,
   dataType: 'json',
   data: {},
   success: function (data, status) {
     if(data.data === true) {
       home = data.home;
       result = true;
     }

   },
   error: function(xhr, desc, err) {
     if(xhr.responseJSON.hasOwnProperty('message')) {
         if(xhr.responseJSON.message === 'Unauthenticated') {
           result = false;
         }
        }
      }
 });
 return result;
}

 function setHeader() {
   $.ajaxSetup({
       headers: {
           'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
           'Authorization': 'Bearer ' + api_token
       }
   });
 }

 function disableBtn(selector) {
   $(selector).prop('disabled', true);
 }

 function enableBtn(selector) {
   $(selector).prop('disabled', false);
 }

})(jQuery);
