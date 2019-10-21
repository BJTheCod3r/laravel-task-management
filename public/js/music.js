(function ($) {
  "use strict";

  var auth_id = "",
      user_session = "",
      user_id = "",
      processes = "",
      home_url = "",
      for_c = "music",
      failed_process = 0,
      browse_offset = 0,
      browse_limit = 1,
      playlist_music_id = "",
      playlist_add_type = "",
      playlist_offset = 0,
      playlist_limit = 10,
      new_playlist_offset = 0,
      new_playlist_limit = 4,
      my_playlist_offset = 0,
      my_playlist_limit = 4,
      favorite_playlist_offset = 0,
      favorite_playlist_limit = 4,
      playlist_loaded = false;

  if($('#auth_id').length) {
    auth_id  = $('#auth_id').val();
  }

  if($('#user_session').length) {
    user_session  = $('#user_session').val();
  }

  if($('#processes').length) {
    processes  = $('#processes').val();
  }

  if($('#user_id').length) {
    user_id  = $('#user_id').val();
  }

  if($('#home_url').length) {
    home_url  = $('#home_url').val();
  }

  if($('.playlist').length == 0) return;

  var playlist = $( '.playlist' ).mepPlaylist({
    audioHeight: '40',
    audioWidth: '100%',
    videoHeight: '40',
    videoWidth: '100%',
    audioVolume: 'vertical',
    mepPlaylistLoop: true,
    alwaysShowControls: true,
    mepSkin: 'mejs-audio',
    mepResponsiveProgress: true,
    mepSelectors: {
      playlist: '.playlist',
      track: '.track',
      tracklist: '.tracks'
    },
    features: [
      'meplike',
      'mepartwork',
      'mepcurrentdetails',
      'mepplaylist',
      'mephistory',
      'mepprevioustrack',
      'playpause',
      'mepnexttrack',
      'progress',
      'current',
      'duration',
      'volume',
      'mepicons',
      'meprepeat',
      'mepshuffle',
      'mepsource',
      'mepbuffering',
      'meptracklist',
      'mepplaylisttoggle',
      'youtube'
    ],
    mepPlaylistTracks:  [
      {
            "id": "item-248",
            "title": "Grateful (feat. Lace)",
            "excerpt": "",
            "link": "https://playmode.ng/music/grateful-feat-lace",
            "thumb": { "src": "https://playmode.ng/files/images/2019/09/thumbnail_1567854121_image_art.jpeg" },
            "src": "https://playmode.ng/stream?data=621bf66ddb7c962aa0d22ac97d69b793",
            "meta": {
                "author": "Tayo Kruz",
                "authorlink": "https://playmode.ng/music/grateful-feat-lace?components=artistes",
                "date": "2019",
                "category": "Afro Pop",
                "tag": "Afro Pop",
                "play": "",
                "like": "",
                "duration": "0:30"
            }
        },
    ]
  });
  // get player, then you can use the player.mepAdd(), player.mepRemove(), player.mepSelect()
  var player = playlist.find('audio, video')[0].player

  var pltracks = plTracklist(0, 5),
  count = Object.keys(pltracks).length;
  if (pltracks != false) {
  for (var i = 0; i < count; i++) {
    player.mepAdd(pltracks[i]);
  }
}

  // event on like btn
  player.$node.on('like.mep', function(e, trackid){
     var data_id = trackid.split("-");
     if(data_id[1] != 0) {
     plFavorite(Number(data_id[1]), 'music');
   }
  });

  // event on play
  player.$node.on('play', function(e){
    updateDisplay();
  });

  // event on pause
  player.$node.on('pause', function(e){
    updateDisplay();
  });

  // update when pjax end
  $(document).on('pjaxEnd', function() {
    updateDisplay();

    if($('#processes').length) {
      processes  = $('#processes').val();
    }

    //let us load the slide
    if($('#main_slide').length) {
      //let us get slide
      getSlides(4, '#main_slide');
    }

    if($('#slide_tile').length) {
      //let us get tiles
      getTiles(0, 4, '#slide_tile');
    }

    if($('#moods_genre').length) {
      //let us get mood selector
      getMoods(20, '#moods_genre');
    }

    if($('#trending_place').length) {
      //let us get trending selector
      getTrending(10, '#trending_place');
    }

    if($('#new_place').length) {
      //let us get trending selector
      getNew(0, 12, '#new_place');
    }

    if($('#playlist_place').length) {
      //let us get playlist selector
      getFeaturedPlaylist('#playlist_place');
    }

    if($('#recommend_place').length) {
      //let us get recommend selector
      getRecommend(0, 8, '#recommend_place');
    }

    if($('#top10_place').length) {
      //let us get top selector
      getTop(10, pastDate(7), '#top10_place');
    }

    if($('#music_page').length) {
      //let us get top selector
      getMusicBySlug($('#slug').val());
    }

    if($('#components_artistes').length) {
      if($('#for').length) {
        for_c = $('#for').val();
      }
      //let us get artistes
      getArtistesBySlug($('#slug').val(), for_c);
    }

    if($('#artiste_page').length) {
      //let us get top selector
      getArtisteBySlug($('#slug').val());
    }

    if($('#album_page').length) {
      //let us get album selector
      getAlbumBySlug($('#slug').val());
    }

    if($('#playlist_page').length) {
      //let us get album selector
      getPlaylistById($('#id').val());
    }

    if($('#charts_list').length) {
      //let us get chart selector
      getChartsByDate(pastDate(7));
    }

    if($('#latest_genre_releases').length) {
      //let us get top selector
      getLatestGenreTracks($('#offset').val(), $('#limit').val(), '#latest_genre_releases', $('#slug').val());
    }

    if($('#featured_album').length) {
        //let us get featured album
        getFeaturedAlbum(0, 10, '#featured_album');
    }

    if($('#new_playlists_place').length) {
        //let us get new playlists
        getNewPlaylists(0, 4, '#new_playlists_place');
    }

    if($('#my_playlists_place').length) {
        //let us get new playlists
        getMyPlaylists(0, 4, '#my_playlists_place');
    }

    if($('#favorite_playlists_place').length) {
        getMyPlaylists(0, 4, '#favorite_playlists_place');
    }

    if($('#preorder_section').length) {
        getQueuedPreorder('#preorder_section');
    }


  });

  // event on end
  player.$node.on('ended.mep', function(e){
    /*
    if(player.media.duration <= 60) {
      $('#pl-sub-status').html("If you've not signed in, sign in to purchase.");
      $('#sModal').modal('toggle');
    } */
  });

  // drop f share
  $(document).on('click', '.drop-fshare', function(e){
    e.preventDefault();
    //fill up
    var title = $(this).data('title'),
        url   = $(this).data('url');
    window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(url),"facebook-share-dialog","width=626,height=436");
  });

  // drop t share
  $(document).on('click', '.drop-tshare', function(e){
    e.preventDefault();
    //fill up
    var title = $(this).data('title'),
        url   = $(this).data('url');
    window.open('https://www.twitter.com/share/?text='+title+'&url='+url,"Twitter-dialog","width=626,height=436");
  });

  $(document).on('click', '.add-to-playlist', function(e){
    e.preventDefault();
    var data_id = $(this).data('id'),
        data_type = $(this).data('type');
    playlist_add_type = data_type;
    if(data_type == 'music') {
      playlist_music_id = data_id;
    }
    //let us fetch playlist
    if(playlist_loaded === false) {
     fetchPlaylists(playlist_offset, playlist_limit);
    }
    $('#start_playlist').modal('show');
  });

  $(document).on('click', '.pl-playlist', function(e){
    e.preventDefault();
    var music_id = playlist_music_id,
        type = playlist_add_type,
        playlist_id = $(this).data('id');
    if(type == 'music') {
      addMusicToPlaylist(music_id, playlist_id);
    }

  });

  $(document).on('click', '.pl-track_delete', function(e){
    e.preventDefault();
      var playlist_id = $(this).data('playlist_id'),
          music_id = $(this).data('id');
      deleteMusicFromPlaylist(music_id, playlist_id)

  });

  $(document).on('click', '.pl-playlist_edit', function(e){
    e.preventDefault();
    var data_id = $(this).data('id');
    editPlaylist(data_id);
  });

  $(document).on('click', '#cancel_playlist_btn', function(e){
    e.preventDefault();
    var data_id = $(this).data('id'),
        action = $(this).data('action');
    if(action === 'delete') {
      Swal.fire({
       title: 'Are you sure?',
       text: "Do you really want to delete playlist?",
       type: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#63c',
       cancelButtonColor: '#9e9e9e',
       confirmButtonText: 'Yes',
     }).then((result) => {
        if(result.value) {
         //let us call the function
         deletePlaylist(data_id);
        }
     });
    }
  });

  $(".playlist-up-icon").click(function () {
    $("#playlist_photo_upload").trigger('click');
  });

$('#playlist_photo_upload').on('change', function() {

  if($(this).val() == "") {
     iziToast.warning({
       title:   'Caution',
       message: 'Choose a file to upload.'
    });
     return false;
  }
  var file = this.files[0],
      dimension = 2200,
      result = true,
      reader = new FileReader();

  reader.onload = function (e) {
   var img = new Image();
   img.src = e.target.result;
   img.onload = function () {
     var w = this.width,
         h = this.height;
     if(w < 500) {
       iziToast.warning({
             title: 'Caution',
             message: 'Image height and width cannot be less than 500px.'
           });
      result = false;
     }
     console.log(w);

     if(w != h) {
       iziToast.warning({
             title: 'Caution',
             message: 'Image height and width must be equal'
           });
      result = false;
      }

      var imagefile = file.type,
          file_size = file.size,
          match = ["image/jpeg","image/png","image/jpg","image/gif"];

    if(!((imagefile==match[0]) || (imagefile==match[1]) || (imagefile==match[2]) || (imagefile==match[3]))) {
         iziToast.warning({
            title:   'Caution',
            message: 'Only jpeg, jpg and png Images type allowed.'
        });
           return false;
     }
     //file should not be more than 5MB
     if(file_size > 5242880) {
       iziToast.warning({
         title: 'Caution',
         message: 'Image size cannot be more than 5MB.'
     });
       return false;
     }

      if(result) {
        $('#playlist_img').css("background-image", "url("+e.target.result+")");
       }
     }
   };
   reader.readAsDataURL(file);
   return result;
 });


  $(document).on('submit', '#pc_form', function(e) {
    e.preventDefault();

     var pcData = $('#pc_form').serialize(),
     playlist_action = $('#playlist_action').val();
     //disable button since it's going to the server
     if(playlist_action === 'create') {
       disableButton('#create_playlist_btn', 'Creating...');
      }

      if(playlist_action === 'update') {
        disableButton('#create_playlist_btn', 'Updating...');
       }
  $.ajax({
    type: 'post',
    url: home_url+'api/playlist',
    dataType: 'text',
    data: new FormData(this),
    contentType: false,
    cache: false,
    processData: false,
    success: function (data, status) {
      if(playlist_action === 'update') {
        enableButton('#create_playlist_btn', 'Update');
      }
      if(playlist_action === 'create') {
        enableButton('#create_playlist_btn', 'Create');
      }
      var response = JSON.parse(data);
      if(response.success === true) {
        var playlist_content = '<a class="list-group-item p-x-md pl-playlist" data-id='+response.id+'>';
        playlist_content += '<i class="far fa-folder fa-fw text-left pl-font-size-18"></i> <span class="font-bold">'+response.name+'</span>';
        playlist_content += '</a>';
        playlist_offset += 1;
        $('.playlist-content__start').append(playlist_content);

        iziToast.success({
              title: 'Success',
              message: response.info
            });
         //close this and open another
         $('#create_playlist').modal('hide');
         $('#pc_form')[0].reset();
         if(playlist_action === 'update') {
           window.location.reload();
         }
         else {
           $('#start_playlist').modal('show');
         }
      }
      else if(response.success === false) {
        if(response.error != false) {
        for (var i = 0; i < Object.keys(response.error).length; i++) {
          iziToast.warning({
               title: 'Warning',
               message: response.error[i].info,
             });
           }
          }
        }

    },
    error: function(xhr, desc, err) {
      enableButton('#create_playlist_btn', 'Create');
      iziToast.warning({
           title: 'Warning',
           message: 'Something went wrong.',
         });
      }
  });

 });


  // simulate the play btn
  $(document).on('click.btn', '.btn-playpause', function(e){
      e.stopPropagation();
      var self = $(this);
      if( self.hasClass('is-playing') ){
        self.removeClass('is-playing');
        player.pause();
      }else{
        var item = getItem(self);
        item && player.mepAdd(item, true);
      }
  });


  //let us check favorite
  $(document).on('click.site', '.pl-like', function(e) {
    e.preventDefault();
    var data_id = $(this).attr('data-id'),
        data_type = $(this).attr('data-type');
      if(data_id != "" && data_type != "") {
         plFavorite(data_id, data_type);
      }

    });

    //let us check follower
    $(document).on('click.site', '.pl-flw-btn', function(e) {
      e.preventDefault();
      var data_id = $(this).attr('data-id'),
          data_type = $(this).attr('data-type'),
          data_action = $(this).attr('data-action');
        if(data_id != "" && data_type != "") {
           plFollow(data_id, data_type, data_action);
        }

      });

    //let us purchase
    $(document).on('click.site', '.pl-buy', function(e) {
       e.preventDefault();
       var data_id = $(this).attr('data-id'),
           buy_elem = $(this),
           action = 'purchase',
           type = $(this).attr('data-type');

          if(data_id != "") {
            Swal.fire({
             title: 'Are you sure?',
             text: "Do you really want to purchase "+type+"?",
             type: 'warning',
             showCancelButton: true,
             confirmButtonColor: '#63c',
             cancelButtonColor: '#9e9e9e',
             confirmButtonText: 'Yes',
           }).then((result) => {
              if(result.value) {
               //let us call the function
               plBuy(data_id, action, type, buy_elem);
              }
           });
          }
  });

  $(document).on('click.site', '.pl-preorder', function(e) {
     e.preventDefault();
     var data_id = $(this).attr('data-id'),
         buy_elem = $(this),
         action = 'preorder',
         type = $(this).attr('data-type');

        if(data_id != "") {
          Swal.fire({
           title: 'Are you sure?',
           text: "Do you really want to preorder "+type+"?",
           type: 'warning',
           showCancelButton: true,
           confirmButtonColor: '#63c',
           cancelButtonColor: '#9e9e9e',
           confirmButtonText: 'Yes',
         }).then((result) => {
            if(result.value) {
             //let us call the function
             plPreorder(data_id, action, type, buy_elem);
            }
         });
        }
});

  //let us download
  $(document).on('click.site', '.pl-download', function(e) {
    e.preventDefault();
    var data_id = $(this).attr('data-id'),
        type = 'music',
        data_type = $(this).attr('data-type');
        if(data_type === 'album') {
          type = 'album';
        }
       if(data_id != "") {
         plDownload(data_id, type);
       }

   });

  //let us queue
  $(document).on('click.site', '.pl-queue', function(e) {
    e.preventDefault();
     var selector = $(this).parent().siblings('.btn-more');
     //let us see if it's in player
     var data_id = selector.attr('data-id'),
         data_idArray = "";
     data_idArray = data_id.split('-');
     if(data_idArray.length < 2) {
       data_id = 'item-'+data_id;
     }
     var index = player.find(data_id),
     current_track = player.mepGetCurrentTrack();

     var obj = {
         meta: {
            author: selector.data('artiste')
           ,authorlink : selector.data('artiste_url')
         }
         ,src: selector.data('src')
         ,thumb: {
           src: selector.data('image')
         }
         ,title: selector.data('title')
         ,link: selector.data('title_url')
         ,id: data_id
     };
     if(index > -1) {
       if(current_track != undefined) {
         var current_track_index = player.find(current_track.id);
         if(current_track_index > index) {
           //remove from former position
           player.mepRemove(obj);
           //add to new position
           player.mepAdd(obj);
           iziToast.success({
                title: 'Requeued',
                message: 'Up next: '+obj.title
              });
           return;
         }
       }
       iziToast.warning({
            title: 'Queued',
            message: 'Queued already.'
          });
      return;
     }
     player.mepAdd(obj);
     iziToast.success({
          title: 'Queued',
          message: '"'+obj.title+'" '+'added to queue'
        });
    return;
    });


    function addToQueue(obj) {
     var index = player.find(obj.id);
     if(index > -1) {
       //remove
       player.mepRemove(obj);
     }
     //readd
     player.mepAdd(obj);
    }


  function updateDisplay(){
    $('[data-id]').removeClass('active').find('.btn-playpause').removeClass('is-playing').parent().removeClass('active');
    var track = player.mepGetCurrentTrack();
    if(!track || !track.id) return;
    var item = $('[data-id="'+track.id+'"]');
    if( player.media.paused ){
      item.removeClass('active').find('.btn-playpause').removeClass('is-playing').parent().removeClass('active');
    }else{
      item.addClass('active').find('.btn-playpause').addClass('is-playing').parent().addClass('active');
      //let us update stream
      var track_id = track.id.split("-");
      plStream(track_id[1]);
    }
  }



  // get item data, you can use ajax to get data from server
  function getItem(self){
    var item = self.closest('.item');
    // track detail
    if(!item.attr('data-src')){
      self.toggleClass('is-playing');
      $('#tracks').find('.btn-playpause').first().trigger('click');
      if(!$('#tracks').length) {
        $('#latest_genre_releases').find('.btn-playpause').first().trigger('click');
      }
      return false;
    }
    var like = false;
    like = item.find('.pl-like').find('i').hasClass("fas");
    var obj = {
        meta: {
           author: item.find('.item-author').find('a').text()
          ,authorlink : item.find('.item-author').find('a').attr('href')
          ,like: like
        }
        ,src: self.closest('[data-src]').attr("data-src")
        ,thumb: {
          src: item.find('.item-media-content').css("background-image").replace(/^url\(["']?/, '').replace(/["']?\)$/, '')
        }
        ,title: item.find('.item-title').find('a').text()
        ,link: item.find('.item-title').find('a').attr('href')
        ,id: self.attr("data-id") ? self.attr("data-id") : self.closest('[data-id]').attr("data-id")
    };
    return obj;
  }

  //let us load the slide
  if($('#main_slide').length) {
    //let us get slide
    getSlides(4, '#main_slide');
  }

  if($('#slide_tile').length) {
    //let us get tiles
    getTiles(0, 4, '#slide_tile');
  }

  if($('#moods_genre').length) {
    //let us get mood selector
    getMoods(20, '#moods_genre');
  }

  if($('#trending_place').length) {
    //let us get trending selector
    getTrending(10, '#trending_place');
  }

  if($('#new_place').length) {
    //let us get trending selector
    getNew(0, 12, '#new_place');
  }

  if($('#playlist_place').length) {
    //let us get playlist selector
    getFeaturedPlaylist('#playlist_place');
  }

  if($('#recommend_place').length) {
    //let us get recommend selector
    getRecommend(0, 8, '#recommend_place');
  }

  if($('#top10_place').length) {
    //let us get top selector
    getTop(10, pastDate(7), '#top10_place');
  }

  if($('#music_page').length) {
    //let us get top selector
    getMusicBySlug($('#slug').val());
  }

  if($('#components_artistes').length) {
    if($('#for').length) {
      for_c = $('#for').val();
    }
    //let us get artistes
    getArtistesBySlug($('#slug').val(), for_c);
  }

  if($('#artiste_page').length) {
    //let us get top selector
    getArtisteBySlug($('#slug').val());
  }

  if($('#album_page').length) {
    //let us get album selector
    getAlbumBySlug($('#slug').val());
  }

  if($('#playlist_page').length) {
    //let us get album selector
    getPlaylistById($('#id').val());
  }

  if($('#charts_list').length) {
    //let us get chart selector
    getChartsByDate($('#date').val());
  }

  if($('#latest_genre_releases').length) {
    //let us get top selector
    getLatestGenreTracks($('#offset').val(), $('#limit').val(), '#latest_genre_releases', $('#slug').val());

  }

  if($('#featured_album').length) {
      //let us get featured album
      getFeaturedAlbum(0, 10, '#featured_album');
  }

  if($('#new_playlists_place').length) {
      //let us get new playlists
      getNewPlaylists(0, 4, '#new_playlists_place');
  }

  if($('#my_playlists_place').length) {
      //let us get new playlists
      getMyPlaylists(0, 4, '#my_playlists_place');
  }

  if($('#favorite_playlists_place').length) {
      getMyPlaylists(0, 4, '#favorite_playlists_place');
  }

  if($('#preorder_section').length) {
      getQueuedPreorder('#preorder_section');
  }

  //let us load_more
  $(document).on('click.site', '#latest_genre_load_more', function(e) {
     e.preventDefault();
     addToLatestTracks(browse_offset, browse_limit, '#latest_genre_releases', $('#slug').val());
    });

    //let us load_more for new playlists
    $(document).on('click.site', '#new_playlists_load_more', function(e) {
       e.preventDefault();
       getNewPlaylists(new_playlist_offset, new_playlist_limit, '#new_playlists_place');
    });

    $(document).on('click.site', '#my_playlists_load_more', function(e) {
       e.preventDefault();
       getMyPlaylists(my_playlist_offset, my_playlist_limit, '#my_playlists_place');
    });

    $(document).on('click.site', '#favorite_playlists_load_more', function(e) {
       e.preventDefault();
       getMyPlaylists(favorite_playlist_offset, favorite_playlist_limit, '#favorite_playlists_place');
    });


  //tracklist
  function plTracklist(offset, limit) {
    var ret;
    $.ajax({
      type: 'get',
      url: home_url+'api/music',
      dataType: 'text',
      async: false,
      data: {auth_id: auth_id, user_id: user_id, user_session: user_session, offset: offset, limit: limit, type: 'tracklist', action: 'fetch'},
      success: function (data, status) {
        var response = JSON.parse(data);
        if(response.success == true) {
          ret = response.track;
        }
        else if(response.success == false) {
           ret = false;
          }

      },
      error: function(xhr, desc, err) {
          console.log(xhr);
          console.log("Details: " + desc + "\nError:" + err);
        }
    });
    return ret;
  }

  function getSlides(limit, slide_selector) {
    $.ajax({
      type: 'get',
      url: home_url+'api/music',
      dataType: 'text',
      data: {limit: limit, auth_id: auth_id, user_id: user_id, user_session: user_session, type: 'slide', action: 'fetch'},
      success: function (data, status) {
        var response = JSON.parse(data);
        if(response.success === true) {
          failed_process = 0;
          var slide = "";
          for (var i = 0; i < Object.keys(response.slide).length; i++) {
            var favorite_class = 'far fa-heart'
            if(response.slide[i].favorite.favorite === true) {
              favorite_class = 'fas fa-heart pl-playmode-txt';
            }

            var type = 'music';
            //later about album

            var artiste = response.slide[i].artiste[0].name,
                more_artiste = response.slide[i].artiste[0].name,
                artiste_url = response.slide[i].artiste[0].url,
                array_length = Object.keys(response.slide[i].artiste).length;
            if(array_length === 2) {
               artiste_url = response.slide[i].collective_url;
               artiste += ', '+response.slide[i].artiste[1].name;
               more_artiste = artiste;
            }
            if(array_length > 2) {
              artiste_url = response.slide[i].collective_url;
              artiste = 'Several';
              more_artiste = artiste;
            }

            var title = response.slide[i].title,
                array_length = Object.keys(response.slide[i].features).length;
            if(array_length  === 1) {
             title += ' (feat. '+response.slide[i].features[0].name+')';
             artiste_url = response.slide[i].collective_url;
            }
            else if(array_length === 2) {
              title += ' (feat. '+response.slide[i].features[0].name+', '+response.slide[i].features[1].name+')';
              artiste_url = response.slide[i].collective_url;
            }
            else if(array_length > 2) {
              title += ' (feat. Several)';
              artiste_url = response.slide[i].collective_url;
            }

            slide += '<div class="item r" data-id="item-'+response.slide[i].id+'" data-src="'+response.slide[i].url+'">';
            slide += '<div class="item-media primary">';
            slide += '<a href="#" class="item-media-content" style="background-image: url('+response.slide[i].image.url+');"></a>';
            slide += '<div class="item-overlay center">';
            slide += '<button class="btn-playpause">Play</button>';
            slide += '</div>';
            slide += '</div>';
            slide += '<div class="item-info">';
            slide += '<div class="item-overlay bottom text-right">';
            slide += '<a data-id='+response.slide[i].id+' data-type="'+type+'" class="btn btn-icon rounded btn-favorite pl-like"><i class="'+favorite_class+'"></i></a>';
            slide += '<span class="text-muted pl-like-txt">'+response.slide[i].favorite.formatted_count+'</span>';
            if(response.slide[i].purchased === false) {
            slide += '<a data-id='+response.slide[i].id+' data-type="music" class="btn btn-icon rounded btn-favorite pl-buy"><i class="fas fa-shopping-cart"></i></a>';
            slide += '<span class="text-muted price-'+type+'-'+response.slide[i].id+'">&#8358;'+response.slide[i].selling_price+'</span>';
            }
            slide += '</div>';
            slide += '<div class="item-title text-ellipsis">';
            slide += '<a href="'+response.slide[i].music_page+'">'+title+'</a>';
            slide += '</div>';
            slide += '<div class="item-author text-sm text-ellipsis">';
            slide += '<a href="'+artiste_url+'" class="text-muted">'+artiste+'</a>'
            slide += '</div>';
            slide += '</div>';
            slide += '</div>';
          }
          $(slide_selector).append(slide);
          $(slide_selector).owlCarousel({
                       items: 1,
                       loop: true,
                       autoplay: true,
                       nav: true,
                       animateOut: 'fadeOut'
                    });

          //let us reduce processes
          checkProcesses('#player_preloader');
        }
        else if(response.success === false) {

          }

      },
      error: function(xhr, desc, err) {
        failed_process++;
        if(failed_process < 5) {
          getSlides(limit, slide_selector);
         }
         else {
           iziToast.warning({
                title: 'Network',
                message: 'Please check your internet connection.'
              });
         }
        }
    });
  }

  function getTiles(offset, limit, tile_selector) {

    $.ajax({
      type: 'get',
      url: home_url+'api/music',
      dataType: 'text',
      data: {offset: offset, limit: limit, auth_id: auth_id, user_id: user_id, user_session: user_session, type: 'slide', action: 'fetch'},
      success: function (data, status) {
        var response = JSON.parse(data);
         failed_process = 0;
        if(response.success === true) {
          var tile = "";
          for (var i = 0; i < Object.keys(response.slide).length; i++) {
            var favorite_class = 'far fa-heart'
            if(response.slide[i].favorite.favorite === true) {
              favorite_class = 'fas fa-heart pl-playmode-txt';
            }
            var type = 'music';
            //later about album
            var artiste = response.slide[i].artiste[0].name,
                more_artiste = response.slide[i].artiste[0].name,
                artiste_url = response.slide[i].artiste[0].url,
                array_length = Object.keys(response.slide[i].artiste).length;
            if(array_length === 2) {
               artiste_url = response.slide[i].collective_url;
               artiste += ', '+response.slide[i].artiste[1].name;
               more_artiste = artiste;
            }
            if(array_length > 2) {
              artiste_url = response.slide[i].collective_url;
              artiste = 'Several';
              more_artiste = artiste;
            }

            var title = response.slide[i].title,
                array_length = Object.keys(response.slide[i].features).length;
            if(array_length  === 1) {
             title += ' (feat. '+response.slide[i].features[0].name+')';
             artiste_url = response.slide[i].collective_url;
            }
            else if(array_length === 2) {
              title += ' (feat. '+response.slide[i].features[0].name+', '+response.slide[i].features[1].name+')';
              artiste_url = response.slide[i].collective_url;
            }
            else if(array_length > 2) {
              title += ' (feat. Several)';
              artiste_url = response.slide[i].collective_url;
            }

            tile += '<div class="col-sm-3 col-xs-6">';
            tile += '<div class="item r" data-id="item-'+response.slide[i].id+'" data-src="'+response.slide[i].url+'">';
            tile += '<div class="item-media primary">';
            tile += '<a href="#" class="item-media-content" style="background-image: url('+response.slide[i].image.thumbnail+');"></a>';
            tile += '<div class="item-overlay center">';
            tile += '<button class="btn-playpause">Play</button>';
            tile += '</div>';
            tile += '</div>';
            tile += '<div class="item-info">';
            tile += '<div class="item-overlay bottom text-right">';
            tile += '<a data-id='+response.slide[i].id+' data-type="'+type+'" class="btn btn-icon rounded btn-favorite pl-like"><i class="'+favorite_class+'"></i></a>';
            tile += '<span class="text-muted pl-like-txt">'+response.slide[i].favorite.formatted_count+'</span>';
             if(response.slide[i].purchased === false) {
            tile += '<a data-id='+response.slide[i].id+' data-type="music" class="btn btn-icon rounded btn-favorite pl-buy"><i class="fas fa-shopping-cart"></i></a>';
            tile += '<span class="text-muted price-'+type+'-'+response.slide[i].id+'">&#8358;'+response.slide[i].selling_price+'</span>';
             }
            tile += '</div>';
            tile += '<div class="item-title text-ellipsis">';
            tile += '<a href="'+response.slide[i].music_page+'">'+title+'</a>';
            tile += '</div>';
            tile += '<div class="item-author text-sm text-ellipsis">';
            tile += '<a href="'+artiste_url+'" class="text-muted">'+artiste+'</a>'
            tile += '</div>';
            tile += '</div>';
            tile += '</div>';
            tile += '</div>';
          }
          $(tile_selector).append(tile);
          //let us reduce processes
          checkProcesses('#player_preloader');
        }
        else if(response.success === false) {

          }

      },
      error: function(xhr, desc, err) {
        failed_process += 1;
        if(failed_process < 5) {
          getTiles(offset, limit, tile_selector);
         }
         else {
           iziToast.warning({
                title: 'Network',
                message: 'Please check your internet connection.'
              });
         }
        }
    });
  }

  function getMoods(limit, moods_selector) {

    $.ajax({
      type: 'get',
      url: home_url+'api/music',
      dataType: 'text',
      data: {limit: limit, auth_id: auth_id, user_id: user_id, user_session: user_session, type: 'moods', action: 'fetch'},
      success: function (data, status) {
        //console.log(data);
        var response = JSON.parse(data);

        if(response.success === true) {
          var moods = "";
          for (var i = 0; i < Object.keys(response.moods).length; i++) {
            var style = "";
             if(response.moods[i].image != false) {
               style += '"background: url('+response.moods[i].image.thumbnail_url+')';
               style += ' '+response.moods[i].color+';"';
             }
             else {
               style = '"background: linear-gradient(#6633cc,'+response.moods[i].color+');"';
             }
            moods += '<div class="item-media pl-ex">';
            moods += '<a class= "item-media-content pl-mood-cover pl-ex" style='+style+' href="'+response.moods[i].url+'">';
            moods += '<div class="pl-mood-cover-in">'+response.moods[i].name+'</div>';
            moods += '</a>';
            moods += '</div>';
          }
         $(moods_selector).append(moods);
         $(moods_selector).owlCarousel({
          margin: 20,
          autoplay: true,
          loop: true,
          responsiveClass:true,
            responsive:{
              0:{
                items: 2
              },
                543:{
                    items: 3
                }
            }
        });
        //let us reduce processes
        checkProcesses('#player_preloader');
        }
        else if(response.success === false) {

          }

      },
      error: function(xhr, desc, err) {
        failed_process += 1;
        if(failed_process < 5) {
          getMoods(limit, moods_selector);
         }
         else {
           iziToast.warning({
                title: 'Network',
                message: 'Please check your internet connection.'
              });
         }
        }
    });
  }

  function getTrending(limit, trending_selector) {

    $.ajax({
      type: 'get',
      url: home_url+'api/music',
      dataType: 'text',
      data: {limit: limit, auth_id: auth_id, user_id: user_id, user_session: user_session, type: 'trending', action: 'fetch'},
      success: function (data, status) {
        var response = JSON.parse(data);
        if(response.success === true) {
          var trending = "";
          for (var i = 0; i < Object.keys(response.trending).length; i++) {
            var favorite_class = 'far fa-heart'
            if(response.trending[i].favorite.favorite === true) {
              favorite_class = 'fas fa-heart pl-playmode-txt';
            }
            var type = 'music';
            //later about album
            var artiste = response.trending[i].artiste[0].name,
                more_artiste = response.trending[i].artiste[0].name,
                artiste_url = response.trending[i].artiste[0].url,
                array_length = Object.keys(response.trending[i].artiste).length;
            if(array_length === 2) {
               artiste_url = response.trending[i].collective_url;
               artiste += ', '+response.trending[i].artiste[1].name;
               more_artiste = artiste;
            }
            if(array_length > 2) {
              artiste_url = response.trending[i].collective_url;
              artiste = 'Several';
              more_artiste = artiste;
            }

            var title = response.trending[i].title,
                array_length = Object.keys(response.trending[i].features).length;
            if(array_length  === 1) {
             title += ' (feat. '+response.trending[i].features[0].name+')';
             artiste_url = response.trending[i].collective_url;
            }
            else if(array_length === 2) {
              title += ' (feat. '+response.trending[i].features[0].name+', '+response.trending[i].features[1].name+')';
              artiste_url = response.trending[i].collective_url;
            }
            else if(array_length > 2) {
              title += ' (feat. Several)';
              artiste_url = response.trending[i].collective_url;
            }
            trending += '<div class="">';
            trending += '<div class="item r" data-id="item-'+response.trending[i].id+'" data-src="'+response.trending[i].url+'">';
            trending += '<div class="item-media">';
            trending += '<a href="'+response.trending[i].music_page+'" class="item-media-content" style="background-image: url('+response.trending[i].image.thumbnail+');"></a>';
            trending += '<div class="item-overlay center">';
            trending += '<button class="btn-playpause">Play</button>';
            trending += '</div>';
            trending += '</div>';
            trending += '<div class="item-info">';
            trending += '<div class="item-overlay bottom text-right">';
            trending += '<a data-id='+response.trending[i].id+' data-type="'+type+'" class="btn btn-icon rounded btn-favorite pl-like"><i class="'+favorite_class+'"></i></a>';
            trending += '<span class="text-muted pl-like-txt">'+response.trending[i].favorite.formatted_count+'</span>';
             if(response.trending[i].purchased === false) {
            trending += '<a data-id='+response.trending[i].id+' data-type="music" class="btn btn-icon rounded btn-favorite pl-buy"><i class="fas fa-shopping-cart"></i></a>';
            trending += '<span class="text-muted price-'+type+'-'+response.trending[i].id+'">&#8358;'+response.trending[i].selling_price+'</span>';
             }
            trending += '<a class="btn btn-icon rounded btn-more" data-type="music" data-id="'+response.trending[i].id+'" data-src="'+response.trending[i].url+'" data-title_url="'+response.trending[i].music_page+'" data-artiste_url="'+artiste_url+'" data-artiste="'+more_artiste+'" data-title="'+response.trending[i].title+'" data-image="'+response.trending[i].image.thumbnail+'" data-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a>';
            trending += '<div class="dropdown-menu pm-dropdown pull-right black lt"></div>';
            trending += '</div>';
            trending += '<div class="item-title text-ellipsis">';
            trending += '<a href="'+response.trending[i].music_page+'">'+title+'</a>';
            trending += '</div>';
            trending += '<div class="item-author text-sm text-ellipsis">';
            trending += '<a href="'+artiste_url+'" class="text-muted">'+artiste+'</a>'
            trending += '</div>';
            trending += '</div>';
            trending += '</div>';
            trending += '</div>';
          }
         $(trending_selector).append(trending);
         $(trending_selector).owlCarousel({
 					margin: 20,
          autoplay: true,
 					responsiveClass:true,
 				    responsive:{
 				    	0:{
 				    		items: 2
 				    	},
 				      543:{
 				            items: 3
 				        }
 				    }
 				});
        //let us reduce processes
        checkProcesses('#player_preloader');
        }
        else if(response.success === false) {

          }

      },
      error: function(xhr, desc, err) {
          /* nothing to show */
        }
    });
  }


  function plFavorite(data_id, data_type) {
    $.ajax({
      type: 'post',
      url: home_url+'api/favorite',
      dataType: 'text',
      data: {data_id: data_id, type: data_type, action: 'update_favorite', auth_id: auth_id, user_session: user_session, user_id: user_id},
      success: function (data, status) {
        var response = JSON.parse(data),
            trackid = 'item-'+data_id,
            like__ = "";
        if(response.success == true) {
          if(response.action == 'unlike') {
            $(".pl-like[data-id="+data_id+"]").find('.fas').removeClass('fas fa-heart pl-playmode-txt').addClass('far fa-heart');
            //let's see what we can do to player
            if(data_type === 'music') {
            $('[track-id='+trackid+']').removeClass('is-like pl-playmode-txt');
            like__ = false;
           }
          }
          if(response.action == 'like') {
            $(".pl-like[data-id="+data_id+"]").find('.far').removeClass('far far-heart').addClass('fas fa-heart pl-playmode-txt');
            //let's see what we can do to player
            $('[track-id='+trackid+']').addClass('is-like pl-playmode-txt');
            like__ = true;
          }
          //favorite count
          $(".pl-like[data-id="+data_id+"]").next('.pl-like-txt').html(response.formatted_count);

          //top 10
          if(data_type === 'music') {
          $('.pl-favorite-count-'+data_id).html(response.formatted_count);

            var track_id = 'item-'+data_id;
            var track_in_player = player.find(track_id);
            if(track_in_player > -1) {
             //let us update player
             $.extend(true, player.options.mepPlaylistTracks[track_in_player], {
               meta: {
                 like: like__,
               }
             });
            }
          }

          iziToast.success({
               title: 'Success',
               message: response.info
             });
        }
        else if(response.success == false) {
          for (var i = 0; i < Object.keys(response.error).length; i++) {
            iziToast.warning({
                 title: 'Caution',
                 message: response.error[i].info
               });
             }
          }

      },
      error: function(xhr, desc, err) {
          console.log(xhr);
          console.log("Details: " + desc + "\nError:" + err);
        }
    });
  }

  function plFollow(data_id, data_type, data_action) {
    $.ajax({
      type: 'post',
      url: home_url+'api/relationship',
      dataType: 'text',
      data: {data_id: data_id, type: data_type, action: data_action, auth_id: auth_id, user_session: user_session, user_id: user_id},
      success: function (data, status) {
        var response = JSON.parse(data),
            like__ = "";
        $(".pl-flw-btn[data-id="+data_id+"]").blur();
        if(response.success == true) {
          if(response.action == 'unfollow') {
            $(".pl-flw-btn[data-id="+data_id+"]").removeClass('pl-followed').addClass('b-primary text-primary pl-flw-outline').html('Follow');
            //let's see what we can do to player
          }
          if(response.action == 'follow') {
            $(".pl-flw-btn[data-id="+data_id+"]").removeClass('b-primary text-primary pl-flw-outline').addClass('pl-followed').html('Following');
          }
          var follow_text = 'followers';
          if(response.count < 2) {
            follow_text = 'follower';
          }
          follow_text = response.formatted_count+' '+follow_text;
          //favorite count
          $('.flw-'+data_id).next('span').html(response.formatted_count);
          $('.flw-'+data_id).attr('title', follow_text);
          $('.pl-flwr-text'+'.flw-'+data_id).html(follow_text);

          iziToast.success({
               title: 'Success',
               message: response.info
             });
        }
        else if(response.success == false) {
          for (var i = 0; i < Object.keys(response.error).length; i++) {
            iziToast.warning({
                 title: 'Caution',
                 message: response.error[i].info
               });
             }
             if(response.goto_url != undefined) {
                $('#sign_in_modal').modal('show');
              }
          }

      },
      error: function(xhr, desc, err) {
          console.log(xhr);
          console.log("Details: " + desc + "\nError:" + err);
        }
    });
  }

  function plStream(data_id) {
    $.ajax({
      type: 'post',
      url: home_url+'api/stats',
      dataType: 'text',
      data: {data_id: data_id, action: 'fetch', type: 'play', auth_id: auth_id, user_session: user_session, user_id: user_id},
      success: function (data, status) {
        var response = JSON.parse(data);
        if(response.success == true) {
          //let us update count
          $(".pl-play-count-"+data_id).html(response.formatted_count);
        }
        else if(response.success == false) {
           //do nothing
        }
       failed_process = 0;
      },
      error: function(xhr, desc, err) {
        failed_process += 1;
        if(failed_process < 5) {
          plStream(data_id);
         }
         else {
           iziToast.warning({
                title: 'Network',
                message: 'Please check your internet connection.'
              });
         }
        }
    });
  }

  function plBuy(data_id, action, type, buy_elem) {
    $.ajax({
      type: 'post',
      url: home_url+'api/buy',
      dataType: 'text',
      data: {data_id: data_id, auth_id: auth_id, user_session: user_session, user_id: user_id, type: type, action: action},
      success: function (data, status) {
        var response = JSON.parse(data);
        if(response.success === true) {
          var $currency_symbol = 'NGN';
          if(response.currency === 'USD') {
            $currency_symbol = '&#36;';
          }
          //let us update balance
          $('#pl-balance > span').html($currency_symbol+response.balance);
          $(".pl-buy[data-id="+data_id+"][data-type="+type+"]").remove();
          $('.'+'price-'+type+'-'+data_id).remove();
          if(type === 'music') {
          //let us update data-src
          $('.item[data-id="item-'+data_id+'"]').attr('data-src', response.src);
          //let us update player
          var track_id = 'item-'+data_id;
          var track_in_player = player.find(track_id);
          if(track_in_player > -1) {
           //let us update the src in tracklist
           $.extend(true, player.options.mepPlaylistTracks[track_in_player], {
               src: response.src
           });
           //if it's the one playing - let us refresh
           var track = player.mepGetCurrentTrack();
           if((track != undefined) && (track.id == track_id)) {
             player.mepSelect(track_in_player, player);
           }
          }
        }
        if(type === 'album') {
           for(var i = 0; i < Object.keys(response.src).length; i++) {
             $(".pl-buy[data-id="+response.src[i].id+"][data-type='music']").remove();
             $('.'+'price-music-'+response.src[i].id).remove();

             //let us update data-src
             $('.item[data-id="item-'+response.src[i].id+'"]').attr('data-src', response.src[i].src);

             var track_id = 'item-'+response.src[i].id;
             var track_in_player = player.find(track_id);
             if(track_in_player > -1) {
              //let us update the src in tracklist
              $.extend(true, player.options.mepPlaylistTracks[track_in_player], {
                  src: response.src[i].src
              });
              //if it's the one playing - let us refresh
              var track = player.mepGetCurrentTrack();
              if((track != undefined) && (track.id == track_id)) {
                player.mepSelect(track_in_player, player);
              }
           }
        }
      }

      var item_name = type.charAt(0).toUpperCase() + type.slice(1)
           Swal.fire({
             type: 'success',
             title: 'Purchased!',
             text: item_name+' purchased successfully!',
             footer: '<a href="'+response.invoice.url+'" target="_blank">Invoice</a>',
             confirmButtonColor: '#63c'
          });
        }
        else if(response.success === false) {
          for (var i = 0; i < Object.keys(response.error).length; i++) {
            iziToast.error({
                  title: 'Error',
                  message: response.error[i].info
                });
          }
        }
      },
      error: function(xhr, desc, err) {
          console.log(xhr);
          console.log("Details: " + desc + "\nError:" + err);
         }
      });
  //  });
  }

  function plPreorder(data_id, action, type, buy_elem) {
    $.ajax({
      type: 'post',
      url: home_url+'api/buy',
      dataType: 'text',
      data: {data_id: data_id, auth_id: auth_id, user_session: user_session, user_id: user_id, type: type, action: action},
      success: function (data, status) {
        var response = JSON.parse(data);
        if(response.success === true) {
          var $currency_symbol = 'NGN';
          if(response.currency === 'USD') {
            $currency_symbol = '&#36;';
          }
          //let us update balance
          $('#pl-balance > span').html($currency_symbol+response.balance);
          $(".pl-preorder[data-id="+data_id+"][data-type="+type+"]").remove();
          $('.'+'price-'+type+'-'+data_id).remove();
          if(type === 'music') {
        }
        if(type === 'album') {

        }
      var item_name = type.charAt(0).toUpperCase() + type.slice(1)
           Swal.fire({
             type: 'success',
             title: 'Preordered!',
             text: item_name+' preordered successfully!',
             footer: '<a href="'+response.invoice.url+'" target="_blank">Invoice</a>',
             confirmButtonColor: '#63c'
          });
        }
        else if(response.success === false) {
          for (var i = 0; i < Object.keys(response.error).length; i++) {
            iziToast.error({
                  title: 'Error',
                  message: response.error[i].info
                });
          }
        }
      },
      error: function(xhr, desc, err) {
          console.log(xhr);
          console.log("Details: " + desc + "\nError:" + err);
         }
      });
  }

  function plDownload(data_id, type='music') {
    console.log(type);
    $.ajax({
      type: 'get',
      url: home_url+'download',
      dataType: 'text',
      data: {'data_id': data_id, type: type, auth_id: auth_id, user_session: user_session, user_id: user_id},
      success: function (data, status) {
        var response = JSON.parse(data);
        if(response.success == true) {
          iziToast.success({
               title: 'Success',
               message: response.info
             });
          failed_process = 0;
          window.location.href = response.goto_url;
        }
        else if(response.success == false) {
          for (var i = 0; i < Object.keys(response.error).length; i++) {
            iziToast.warning({
                 title: 'Caution',
                 message: response.error[i].info
               });
             }
          }

      },
      error: function(xhr, desc, err) {
        /* let us do nothing */
        // or call it back
        failed_process++;
        if(failed_process < 5) {
          plDownload(data_id, type);
         }
         else {
           iziToast.warning({
                title: 'Network',
                message: 'Please check your internet connection.'
              });
         }
        }
    });

  }

  function getNew(offset, limit, new_selector) {

    $.ajax({
      type: 'get',
      url: home_url+'api/music',
      dataType: 'text',
      data: {offset: offset, limit: limit, auth_id: auth_id, user_id: user_id, user_session: user_session, type: 'new', action: 'fetch'},
      success: function (data, status) {
        var response = JSON.parse(data);

        if(response.success === true) {
          var new_ = "";
          for (var i = 0; i < Object.keys(response.new).length; i++) {
            var favorite_class = 'far fa-heart'
            if(response.new[i].favorite.favorite === true) {
              favorite_class = 'fas fa-heart pl-playmode-txt';
            }
            var type = 'music';
            //later about album
            var artiste = response.new[i].artiste[0].name,
                more_artiste = response.new[i].artiste[0].name,
                artiste_url = response.new[i].artiste[0].url,
                array_length = Object.keys(response.new[i].artiste).length;
            if(array_length === 2) {
               artiste_url = response.new[i].collective_url;
               artiste += ', '+response.new[i].artiste[1].name;
               more_artiste = artiste;
            }
            if(array_length > 2) {
              artiste_url = response.new[i].collective_url;
              artiste = 'Several';
              more_artiste = artiste;
            }

            var title = response.new[i].title,
                array_length = Object.keys(response.new[i].features).length;
            if(array_length  === 1) {
             title += ' (feat. '+response.new[i].features[0].name+')';
             artiste_url = response.new[i].collective_url;
            }
            else if(array_length === 2) {
              title += ' (feat. '+response.new[i].features[0].name+', '+response.new[i].features[1].name+')';
              artiste_url = response.new[i].collective_url;
            }
            else if(array_length > 2) {
              title += ' (feat. Several)';
              artiste_url = response.new[i].collective_url;
            }

            new_ += '<div class="">';
            new_ += '<div class="item r" data-id="item-'+response.new[i].id+'" data-src="'+response.new[i].url+'">';
            new_ += '<div class="item-media">';
            new_ += '<a href="'+response.new[i].music_page+'" class="item-media-content" style="background-image: url('+response.new[i].image.thumbnail+');"></a>';
            new_ += '<div class="item-overlay center">';
            new_ += '<button class="btn-playpause">Play</button>';
            new_ += '</div>';
            new_ += '</div>';
            new_ += '<div class="item-info">';
            new_ += '<div class="item-overlay bottom text-right">';
            new_ += '<a data-id='+response.new[i].id+' data-type="'+type+'" class="btn btn-icon rounded btn-favorite pl-like"><i class="'+favorite_class+'"></i></a>';
            new_ += '<span class="text-muted pl-like-txt">'+response.new[i].favorite.formatted_count+'</span>';
             if(response.new[i].purchased === false) {
            new_ += '<a data-id='+response.new[i].id+' data-type="music" class="btn btn-icon rounded pl-buy"><i class="fas fa-shopping-cart"></i></a>';
            new_ += '<span class="text-muted price-'+type+'-'+response.new[i].id+'">&#8358;'+response.new[i].selling_price+'</span>';
             }
            new_ += '<a class="btn btn-icon rounded btn-more" data-type="music" data-id="'+response.new[i].id+'" data-src="'+response.new[i].url+'" data-title_url="'+response.new[i].music_page+'" data-artiste_url="'+artiste_url+'" data-artiste="'+more_artiste+'" data-title="'+response.new[i].title+'" data-image="'+response.new[i].image.thumbnail+'" data-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a>';
            new_ += '<div class="dropdown-menu pm-dropdown pull-right black lt"></div>';
            new_ += '</div>';
            new_ += '<div class="item-title text-ellipsis">';
            new_ += '<a href="'+response.new[i].music_page+'">'+title+'</a>';
            new_ += '</div>';
            new_ += '<div class="item-author text-sm text-ellipsis">';
            new_ += '<a href="'+artiste_url+'" class="text-muted">'+artiste+'</a>'
            new_ += '</div>';
            new_ += '</div>';
            new_ += '</div>';
            new_ += '</div>';
          }
          //let us add album
          for (var i = 0; i < Object.keys(response.new_album).length; i++) {
            var favorite_class = 'far fa-heart'
            if(response.new_album[i].favorite.favorite === true) {
              favorite_class = 'fas fa-heart pl-playmode-txt';
            }
            var type = 'album';
            var artiste = response.new_album[i].artiste[0].name,
                artiste_url = response.new_album[i].artiste[0].url,
                more_artiste = response.new_album[i].artiste[0].name,
                array_length = Object.keys(response.new_album[i].artiste).length;
            if(array_length === 2) {
               artiste_url = response.new_album[i].collective_url;
               artiste += ', '+response.new_album[i].artiste[1].name;
               more_artiste = artiste;
            }
            if(array_length > 2) {
              artiste_url = response.new_album[i].collective_url;
              artiste = 'Several';
              more_artiste = artiste;
            }

            new_ += '<div class="">';
            new_ += '<div class="item r" data-id="'+response.new_album[i].track[0].id+'" data-src="'+response.new_album[i].track[0].src+'">';
            new_ += '<div class="item-media">';
            new_ += '<a href="'+response.new_album[i].album_page+'" class="item-media-content" style="background-image: url('+response.new_album[i].image.thumbnail+');"></a>';
            new_ += '<div class="item-overlay center">';
            new_ += '<button class="btn-playpause">Play</button>';
            new_ += '</div>';
            new_ += '</div>';
            new_ += '<div class="item-info">';
            new_ += '<div class="item-overlay bottom text-right">';
            new_ += '<a data-id='+response.new_album[i].id+' data-type="'+type+'" class="btn btn-icon rounded btn-favorite pl-like"><i class="'+favorite_class+'"></i></a>';
            new_ += '<span class="text-muted pl-like-txt">'+response.new_album[i].favorite.formatted_count+'</span>';
             if(response.new_album[i].purchased === false) {
            new_ += '<a data-id='+response.new_album[i].id+' data-type='+type+' class="btn btn-icon rounded btn-favorite pl-buy"><i class="fas fa-shopping-cart"></i></a>';
            new_ += '<span class="text-muted price-'+type+'-'+response.new_album[i].id+'">&#8358;'+response.new_album[i].selling_price+'</span>';
             }
            new_ += '<a class="btn btn-icon rounded btn-more" data-id="'+response.new_album[i].id+'" data-type="album" data-src="'+response.new_album[i].track[0].src+'" data-title_url="'+response.new_album[i].album_page+'" data-artiste_url="'+artiste_url+'" data-artiste="'+more_artiste+'" data-title="'+response.new_album[i].title+'" data-image="'+response.new_album[i].image.thumbnail+'" data-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a>';
            new_ += '<div class="dropdown-menu pm-dropdown pull-right black lt"></div>';
            new_ += '</div>';
            new_ += '<div class="item-title text-ellipsis">';
            new_ += '<a href="'+response.new_album[i].album_page+'">'+response.new_album[i].title+'</a>';
            new_ += '</div>';
            new_ += '<div class="item-author text-sm text-ellipsis">';
            new_ += '<a href="'+artiste_url+'" class="text-muted">'+artiste+'</a>'
            new_ += '</div>';
            new_ += '</div>';
            new_ += '</div>';
            new_ += '</div>';

            for (var j = 0; j < Object.keys(response.new_album[i].track).length; j++) {
              addToQueue(response.new_album[i].track[j]);
            }
          }
         $(new_selector).append(new_);
         $(new_selector).owlCarousel({
           margin: 20,
          autoplay: true,
           responsiveClass:true,
             responsive:{
               0:{
                 items: 2
               },
                 543:{
                     items: 3
                 }
             }
         });
         //let us reduce processes
         checkProcesses('#player_preloader');
        }
        else if(response.success === false) {

          }
      },
      error: function(xhr, desc, err) {
        failed_process++;
        if(failed_process < 5) {
          getNew(offset, limit, new_selector);
         }
         else {
           iziToast.warning({
                title: 'Network',
                message: 'Please check your internet connection.'
              });
         }
        }
    });

  }

  function getRecommend(offset, limit, recommend_selector) {

    $.ajax({
      type: 'get',
      url: home_url+'api/music',
      dataType: 'text',
      data: {offset: offset, limit: limit, auth_id: auth_id, user_id: user_id, user_session: user_session, type: 'recommend', action: 'fetch'},
      success: function (data, status) {
        var response = JSON.parse(data);

        if(response.success === true) {
          var recommend = "";
          for (var i = 0; i < Object.keys(response.recommend).length; i++) {
            var favorite_class = 'far fa-heart'
            if(response.recommend[i].favorite.favorite === true) {
              favorite_class = 'fas fa-heart pl-playmode-txt';
            }
            var type = 'music';
            var artiste = response.recommend[i].artiste[0].name,
                 more_artiste = response.recommend[i].artiste[0].name,
                artiste_url = response.recommend[i].artiste[0].url,
                array_length = Object.keys(response.recommend[i].artiste).length;
            if(array_length === 2) {
               artiste_url = response.recommend[i].collective_url;
               artiste += ', '+response.recommend[i].artiste[1].name;
               more_artiste = artiste;
            }
            if(array_length > 2) {
              artiste_url = response.recommend[i].collective_url;
              artiste = 'Several';
              more_artiste = 'Several';
            }

            var title = response.recommend[i].title,
                array_length = Object.keys(response.recommend[i].features).length;
            if(array_length  === 1) {
             title += ' (feat. '+response.recommend[i].features[0].name+')';
             artiste_url = response.recommend[i].collective_url;
            }
            else if(array_length === 2) {
              title += ' (feat. '+response.recommend[i].features[0].name+', '+response.recommend[i].features[1].name+')';
              artiste_url = response.recommend[i].collective_url;
            }
            else if(array_length > 2) {
              title += ' (feat. Several)';
              artiste_url = response.recommend[i].collective_url;
            }

            recommend += '<div class="">';
            recommend += '<div class="item r" data-id="item-'+response.recommend[i].id+'" data-src="'+response.recommend[i].url+'">';
            recommend += '<div class="item-media">';
            recommend += '<a href="'+response.recommend[i].music_page+'" class="item-media-content" style="background-image: url('+response.recommend[i].image.thumbnail+');"></a>';
            recommend += '<div class="item-overlay center">';
            recommend += '<button class="btn-playpause">Play</button>';
            recommend += '</div>';
            recommend += '</div>';
            recommend += '<div class="item-info">';
            recommend += '<div class="item-overlay bottom text-right">';
            recommend += '<a data-id='+response.recommend[i].id+' data-type="'+type+'" class="btn btn-icon rounded btn-favorite pl-like"><i class="'+favorite_class+'"></i></a>';
            recommend += '<span class="text-muted pl-like-txt">'+response.recommend[i].favorite.formatted_count+'</span>';
            if(response.recommend[i].purchased === false) {
              recommend += '<a data-id='+response.recommend[i].id+' data-type="music" class="btn btn-icon rounded btn-favorite pl-buy"><i class="fas fa-shopping-cart"></i></a>';
              recommend += '<span class="text-muted price-'+type+'-'+response.recommend[i].id+'">&#8358;'+response.recommend[i].selling_price+'</span>';
            }
            recommend += '<a class="btn btn-icon rounded btn-more" data-type="music" data-id="'+response.recommend[i].id+'" data-src="'+response.recommend[i].url+'" data-title_url="'+response.recommend[i].music_page+'" data-artiste_url="'+artiste_url+'" data-artiste="'+more_artiste+'" data-title="'+response.recommend[i].title+'" data-image="'+response.recommend[i].image.thumbnail+'" data-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a>';
            recommend += '<div class="dropdown-menu pm-dropdown pull-right black lt"></div>';
            recommend += '</div>';
            recommend += '<div class="item-title text-ellipsis">';
            recommend += '<a href="'+response.recommend[i].music_page+'">'+title+'</a>';
            recommend += '</div>';
            recommend += '<div class="item-author text-sm text-ellipsis">';
            recommend += '<a href="'+artiste_url+'" class="text-muted">'+artiste+'</a>'
            recommend += '</div>';
            recommend += '</div>';
            recommend += '</div>';
            recommend += '</div>';
          }
         $(recommend_selector).append(recommend);
         $(recommend_selector).owlCarousel({
           margin: 20,
          autoplay: true,
           responsiveClass:true,
             responsive:{
               0:{
                 items: 1
               },
               400:{
                   items: 2
               },
               543:{
                   items: 3
               },
                 800:{
                     items: 4
                 }
             }
         });

         //let us reduce process
         checkProcesses('#player_preloader');
        }
        else if(response.success === false) {

          }
      },
      error: function(xhr, desc, err) {
          console.log(xhr);
          console.log("Details: " + desc + "\nError:" + err);
        }
    });

  }

  function getFeaturedPlaylist(playlist_selector) {

    $.ajax({
      type: 'get',
      url: home_url+'api/playlist',
      dataType: 'text',
      data: {offset: 0, limit: 4, auth_id: auth_id, user_id: user_id, user_session: user_session, type: 'public', action: 'fetch'},
      success: function (data, status) {
        var response = JSON.parse(data);

        if(response.success === true) {
          var playlist = "";
          for (var i = 0; i < Object.keys(response.playlists).length; i++) {
            var favorite_class = 'far fa-heart'
            if(response.playlists[i].favorite.favorite === true) {
              favorite_class = 'fas fa-heart pl-playmode-txt';
            }
            var type = 'playlist';

            playlist += '<div class="">';
            playlist += '<div class="item r" data-id="item-'+response.playlists[i].id+'" data-src="#">';
            playlist += '<div class="item-media">';
            playlist += '<a href="'+response.playlists[i].url+'" class="item-media-content" style="background-image: url('+response.playlists[i].image.thumbnail+');"></a>';
            playlist += '<div class="item-overlay center">'; /*
            playlist += '<button class="btn-playpause">Play</button>'; */
            playlist += '</div>';
            playlist += '</div>';
            playlist += '<div class="item-info">';
            playlist += '<div class="item-overlay bottom text-right">';
            playlist += '<a data-id='+response.playlists[i].id+' data-type="'+type+'" class="btn btn-icon rounded btn-favorite pl-like"><i class="'+favorite_class+'"></i></a>';
            playlist += '<span class="text-muted pl-like-txt">'+response.playlists[i].favorite.formatted_count+'</span>';
            playlist += '</div>';
            playlist += '<div class="item-title text-ellipsis">';
            playlist += '<a href="'+response.playlists[i].url+'">'+response.playlists[i].name+' Playlist</a>';
            playlist += '</div>';
            playlist += '<div class="item-author text-sm text-ellipsis">';
            playlist += '<p class="text-muted">'+response.playlists[i].total_tracks+' tracks</p>';
            playlist += '</div>';
            playlist += '</div>';
            playlist += '</div>';
            playlist += '</div>';
          }
         $(playlist_selector).append(playlist);
         $(playlist_selector).owlCarousel({
           margin: 20,
          autoplay: true,
           responsiveClass:true,
             responsive:{
               0:{
                 items: 2
               },
               543:{
                   items: 3
               },
             }
         });

         //let us reduce process
         checkProcesses('#player_preloader');
        }
        else if(response.success === false) {

          }
      },
      error: function(xhr, desc, err) {
          console.log(xhr);
          console.log("Details: " + desc + "\nError:" + err);
        }
    });

  }

  function getNewPlaylists(offset, limit, playlist_selector) {
    $('#new_playlists_load_more').html('Loading...').prop('disabled', true);
    $.ajax({
      type: 'get',
      url: home_url+'api/playlist',
      dataType: 'text',
      data: {offset: offset, limit: limit, auth_id: auth_id, user_id: user_id, user_session: user_session, type: 'public', action: 'fetch'},
      success: function (data, status) {
        var response = JSON.parse(data);
        $('#new_playlists_load_more').html('Show More').prop('disabled', false);
        if(response.success === true) {
         if(response.total_items != 0) {
          if(response.remaining < 1) {
            $('#new_playlists_load_more').hide();
          }
          else {
            $('#new_playlists_load_more').show();
          }
          new_playlist_offset += response.fetched_items;
          var playlist = "";
          for (var i = 0; i < Object.keys(response.playlists).length; i++) {
            var favorite_class = 'far fa-heart'
            if(response.playlists[i].favorite.favorite === true) {
              favorite_class = 'fas fa-heart pl-playmode-txt';
            }
            var type = 'playlist';

            playlist += '<div class="col-xs-6 col-sm-4 col-md-3">';
            playlist += '<div class="item r" data-id="item-'+response.playlists[i].id+'" data-src="#">';
            playlist += '<div class="item-media">';
            playlist += '<a href="'+response.playlists[i].url+'" class="item-media-content" style="background-image: url('+response.playlists[i].image.thumbnail+');"></a>';
            /*
            playlist += '<div class="item-overlay center">';
            playlist += '<button class="btn-playpause">Play</button>';
            playlist += '</div>'; */
            playlist += '</div>';
            playlist += '<div class="item-info">';
            playlist += '<div class="item-overlay bottom text-right">';
            playlist += '<a data-id='+response.playlists[i].id+' data-type="'+type+'" class="btn btn-icon rounded btn-favorite pl-like"><i class="'+favorite_class+'"></i></a>';
            playlist += '<span class="text-muted pl-like-txt">'+response.playlists[i].favorite.formatted_count+'</span>';
            playlist += '</div>';
            playlist += '<div class="item-title text-ellipsis">';
            playlist += '<a href="'+response.playlists[i].url+'">'+response.playlists[i].name+' Playlist</a>';
            playlist += '</div>';
            playlist += '<div class="item-author text-sm text-ellipsis">';
            playlist += '<p class="text-muted">'+response.playlists[i].total_tracks+' tracks</p>';
            playlist += '</div>';
            playlist += '</div>';
            playlist += '</div>';
            playlist += '</div>';
          }
         $(playlist_selector).append(playlist);

          }
          else {
            var no_content = '<p style="text-align:center;"><i class="material-icons" style="font-size:60px;">library_music</i><span style="margin-top:20px; font-size:20px; display:block;">There is no playlist at this time.</span></p>';
            if($(playlist_selector).html() == '') {
              $(playlist_selector).html(no_content);
            }
          }
          checkProcesses('#player_preloader');
        }
        else if(response.success === false) {
          var no_content = '<p style="text-align:center;"><i class="material-icons" style="font-size:60px;">library_music</i><span style="margin-top:20px; font-size:20px; display:block;">You have no playlist at this time.</span></p>';
          if($(playlist_selector).html() == '') {
            $(playlist_selector).html(no_content);
          }
        }
      },
      error: function(xhr, desc, err) {
        failed_process++;
        if(failed_process < 5) {
          getNewPlaylists(offset, limit, playlist_selector);
         }
         else {
           iziToast.warning({
                title: 'Network',
                message: 'Please check your internet connection.'
              });
         }
        }
    });

  }

  function getMyPlaylists(offset, limit, playlist_selector) {
    $('#my_playlists_load_more').html('Loading...').prop('disabled', true);
    $.ajax({
      type: 'get',
      url: home_url+'api/playlist',
      dataType: 'text',
      data: {offset: offset, limit: limit, auth_id: auth_id, user_id: user_id, user_session: user_session, type: 'user', action: 'fetch'},
      success: function (data, status) {
        var response = JSON.parse(data);
        $('#my_playlists_load_more').html('Show More').prop('disabled', false);
        if(response.success === true) {
          if(response.total_items != 0) {
          if(response.remaining < 1) {
            $('#my_playlists_load_more').hide();
          }
          else {
            $('#my_playlists_load_more').show();
          }
          my_playlist_offset += response.fetched_items;
          var playlist = "";
          for (var i = 0; i < Object.keys(response.playlists).length; i++) {
            var favorite_class = 'far fa-heart'
            if(response.playlists[i].favorite.favorite === true) {
              favorite_class = 'fas fa-heart pl-playmode-txt';
            }
            var type = 'playlist';

            playlist += '<div class="col-xs-6 col-sm-4 col-md-3">';
            playlist += '<div class="item r" data-id="item-'+response.playlists[i].id+'" data-src="#">';
            playlist += '<div class="item-media">';
            playlist += '<a href="'+response.playlists[i].url+'" class="item-media-content" style="background-image: url('+response.playlists[i].image.thumbnail+');"></a>';
            /*
            playlist += '<div class="item-overlay center">';
            playlist += '<button class="btn-playpause">Play</button>';
            playlist += '</div>'; */
            playlist += '</div>';
            playlist += '<div class="item-info">';
            playlist += '<div class="item-overlay bottom text-right">';
            playlist += '<a data-id='+response.playlists[i].id+' data-type="'+type+'" class="btn btn-icon rounded btn-favorite pl-like"><i class="'+favorite_class+'"></i></a>';
            playlist += '<span class="text-muted pl-like-txt">'+response.playlists[i].favorite.formatted_count+'</span>';
            playlist += '</div>';
            playlist += '<div class="item-title text-ellipsis">';
            playlist += '<a href="'+response.playlists[i].url+'">'+response.playlists[i].name+' Playlist</a>';
            playlist += '</div>';
            playlist += '<div class="item-author text-sm text-ellipsis">';
            playlist += '<p class="text-muted">'+response.playlists[i].total_tracks+' tracks</p>';
            playlist += '</div>';
            playlist += '</div>';
            playlist += '</div>';
            playlist += '</div>';
          }
         $(playlist_selector).append(playlist);

      }
       else {
         var no_content = '<p style="text-align:center;"><i class="material-icons" style="font-size:60px;">library_music</i><span style="margin-top:20px; font-size:20px; display:block;">There is no playlist at this time.</span></p>';
          if($(playlist_selector).html() == '') {
             $(playlist_selector).html(no_content);
            }
          }
          checkProcesses('#player_preloader');
        }
        else if(response.success === false) {
          //
          var no_content = '<p style="text-align:center;"><i class="material-icons" style="font-size:60px;">library_music</i><span style="margin-top:20px; font-size:20px; display:block;">You have no playlist at this time.</span></p>';
          if($(playlist_selector).html() == '') {
            $(playlist_selector).html(no_content);
          }
        }
      },
      error: function(xhr, desc, err) {
        failed_process++;
        if(failed_process < 5) {
          getMyPlaylists(offset, limit, playlist_selector);
         }
         else {
           iziToast.warning({
                title: 'Network',
                message: 'Please check your internet connection.'
              });
         }
        }
    });

  }

  function getFavoritePlaylists(offset, limit, playlist_selector) {
    $('#favorite_playlists_load_more').html('Loading...').prop('disabled', true);
    $.ajax({
      type: 'get',
      url: home_url+'api/playlist',
      dataType: 'text',
      data: {offset: offset, limit: limit, auth_id: auth_id, user_id: user_id, user_session: user_session, type: 'favorite', action: 'fetch'},
      success: function (data, status) {
        var response = JSON.parse(data);
        $('#favorite_playlists_load_more').html('Show More').prop('disabled', false);
        if(response.success === true) {
         if(response.total_items != 0) {
          if(response.remaining < 1) {
            $('#favorite_playlists_load_more').hide();
          }
          else {
            $('#favorite_playlists_load_more').show();
          }
          favorite_playlist_offset += response.fetched_items;
          var playlist = "";
          for (var i = 0; i < Object.keys(response.playlists).length; i++) {
            var favorite_class = 'far fa-heart'
            if(response.playlists[i].favorite.favorite === true) {
              favorite_class = 'fas fa-heart pl-playmode-txt';
            }
            var type = 'playlist';

            playlist += '<div class="col-xs-6 col-sm-4 col-md-3">';
            playlist += '<div class="item r" data-id="item-'+response.playlists[i].id+'" data-src="#">';
            playlist += '<div class="item-media">';
            playlist += '<a href="'+response.playlists[i].url+'" class="item-media-content" style="background-image: url('+response.playlists[i].image.thumbnail+');"></a>';
            /*
            playlist += '<div class="item-overlay center">';
            playlist += '<button class="btn-playpause">Play</button>';
            playlist += '</div>'; */
            playlist += '</div>';
            playlist += '<div class="item-info">';
            playlist += '<div class="item-overlay bottom text-right">';
            playlist += '<a data-id='+response.playlists[i].id+' data-type="'+type+'" class="btn btn-icon rounded btn-favorite pl-like"><i class="'+favorite_class+'"></i></a>';
            playlist += '<span class="text-muted pl-like-txt">'+response.playlists[i].favorite.formatted_count+'</span>';
            playlist += '</div>';
            playlist += '<div class="item-title text-ellipsis">';
            playlist += '<a href="'+response.playlists[i].url+'">'+response.playlists[i].name+' Playlist</a>';
            playlist += '</div>';
            playlist += '<div class="item-author text-sm text-ellipsis">';
            playlist += '<p class="text-muted">'+response.playlists[i].total_tracks+' tracks</p>';
            playlist += '</div>';
            playlist += '</div>';
            playlist += '</div>';
            playlist += '</div>';
          }
         $(playlist_selector).append(playlist);

          }
          else {
            var no_content = '<p style="text-align:center;"><i class="material-icons" style="font-size:60px;">library_music</i><span style="margin-top:20px; font-size:20px; display:block;">You have no favorite playlist at this time.</span></p>';
            if($(playlist_selector).html() == '') {
              $(playlist_selector).html(no_content);
            }
          }
          checkProcesses('#player_preloader');
        }
        else if(response.success === false) {
          var no_content = '<p style="text-align:center;"><i class="material-icons" style="font-size:60px;">library_music</i><span style="margin-top:20px; font-size:20px; display:block;">You have no favorite playlist at this time.</span></p>';
          if($(playlist_selector).html() == '') {
            $(playlist_selector).html(no_content);
          }
        }
      },
      error: function(xhr, desc, err) {
        failed_process++;
        if(failed_process < 5) {
          getFavoritePlaylists(offset, limit, playlist_selector);
         }
         else {
           iziToast.warning({
                title: 'Network',
                message: 'Please check your internet connection.'
              });
         }
        }
    });

  }

  function getQueuedPreorder(selector) {

    $.ajax({
      type: 'get',
      url: home_url+'api/preorder',
      dataType: 'text',
      data: {offset: 0, limit: 10, auth_id: auth_id, user_id: user_id, user_session: user_session, type: 'list', action: 'fetch'},
      success: function (data, status) {
        var response = JSON.parse(data);

        if(response.success === true) {
          var preorder = "";
          for (var i = 0; i < Object.keys(response.list).length; i++) {
             var artiste = response.list[i].artiste[0].name,
                 array_length = Object.keys(response.list[i].artiste).length;

             if(array_length === 2) {
               artiste += ', '+response.list[i].artiste[1].name;
             }

             if(array_length > 2) {
               artiste = 'Several';
             }

             var title = response.list[i].title;

             if(response.list[i].type === 'music') {

             var array_length = Object.keys(response.list[i].features).length;

             if(array_length === 1) {
               title += ' (feat. '+response.list[i].features[0].name+')';
             }
             else if(array_length === 2) {
               title += ' (feat. '+response.list[i].features[0].name+', '+response.list[i].features[1].name+')';
             }
             else if(array_length > 2) {
               title += ' (feat. Several)';
             }
           }

            preorder += '<div class="">';
            preorder += '<div class="item r" data-id="item-'+response.list[i].id+'" data-src="#">';
            preorder += '<div class="item-media">';
            preorder += '<a href="#" class="item-media-content" style="background-image: url('+response.list[i].image.thumbnail+');"></a>';
            preorder += '<div class="item-overlay center">';
            preorder += '</div>';
            preorder += '</div>';
            preorder += '<div class="item-info">';
            preorder += '<div class="item-overlay bottom text-right">';
            preorder += '<a data-id='+response.list[i].id+' data-type="music" class="btn btn-icon rounded btn-favorite pl-preorder"><i class="fas fa-shopping-bag"></i></a>';
            preorder += '<span class="text-muted price-'+response.list[i].type+'-'+response.list[i].id+'">&#8358;'+response.list[i].selling_price+'</span>';
            preorder += '</div>';
            preorder += '<div class="item-title text-ellipsis">';
            preorder += '<a href="#">'+title+'</a>';
            preorder += '</div>';
            preorder += '<div class="item-author text-sm text-ellipsis">';
            preorder += '<p class="text-muted">'+artiste+'</p>';
            if(response.list[i].type === 'album') {
             preorder += '<p class="text-muted">'+response.list[i].track_length+' tracks</p>';
            }
            preorder += '</div>';
            preorder += '</div>';
            preorder += '</div>';
            preorder += '</div>';
          }
         $(selector).append(preorder);
         $('.preorder_section').css('display', 'block');
         $(selector).owlCarousel({
           margin: 20,
           autoplay: true,
           responsiveClass:true,
             responsive:{
               0:{
                 items: 1
               },
             }
         });
        }
        else if(response.success === false) {
           /* **/
          }
      },
      error: function(xhr, desc, err) {
          /* **/
        }
    });

  }

  function getFeaturedAlbum(offset, limit, selector) {

    $.ajax({
      type: 'get',
      url: home_url+'api/music',
      dataType: 'text',
      data: {offset: offset, limit: limit, auth_id: auth_id, user_id: user_id, user_session: user_session, type: 'random_album', action: 'fetch'},
      success: function (data, status) {
        var response = JSON.parse(data);
        failed_process = 0;
        if(response.success === true) {
          var featured_album = "";

            var background_image = '"background-image: linear-gradient('+response.random_album.colors[0]+','+response.random_album.colors[1]+');"';
            var artiste = "",
                artiste_url = "";

            if(Object.keys(response.random_album.artiste).length === 1) {
              artiste += '<a href="'+response.random_album.artiste[0].url+'">'+response.random_album.artiste[0].name+'</a>';
            }
            else if(Object.keys(response.random_album.artiste).length === 2) {
              for (var i = 0; i < Object.keys(response.random_album.artiste).length; i++) {
                if(artiste === "") {
                  artiste += response.random_album.artiste[i].name;
                }
                else {
                  artiste += ', '+response.random_album.artiste[i].name;
                }
              }
              artiste = '<a href="'+response.random_album.collective_url+'">'+artiste+'</a>';
            }
            else {
              artiste += '<a href="'+response.random_album.collective_url+'Several</a>';
            }
            featured_album += '<div class="col-xs-12 col-sm-6 pl-featured-album-art" style='+background_image+'>';
            featured_album += '<a href='+response.random_album.url+'>';
            featured_album += '<div class="row">';
            featured_album += '<div class="col-sm-5">';
            featured_album += '<img class="img-responsive img-rounded" src='+response.random_album.image.url+'>';
            featured_album += '</div>';
            featured_album += '<div class="col-sm-7 details">';
            featured_album += '<h3>'+response.random_album.title+'</h3>';
            featured_album += '<span class="artiste">'+artiste+'</span>';
            featured_album += '</div></div></a></div>';
            featured_album += '<div class="col-xs-12 col-sm-6 pl-featured-album-track">';
            featured_album += '<h3>Tracks</h3>';
            featured_album += '<ol>';

            for (var i = 0; i < Object.keys(response.random_album.track).length; i++) {
              if(i < 5) {
                var features = "",
                    title = '<a href='+response.random_album.track[i].music_page+'>'+response.random_album.track[i].title+'</a>';
                if(Object.keys(response.random_album.track[i].features).length === 1) {
                  features += response.random_album.track[i].features[0].name;
                  title += ' (feat. <a href="'+response.random_album.track[i].features[0].url+'">'+response.random_album.track[i].features[0].name+'</a>)';
                }
                else if(Object.keys(response.random_album.track[i].features).length === 2) {
                  features += response.random_album.track[i].features[0].name+', '+response.random_album.track[i].features[1].name;
                  title += ' (feat. <a href="'+response.random_album.track[i].features[0].url+'">'+response.random_album.track[i].features[0].name+'</a>'+' & '+
                  '<a href="'+response.random_album.track[i].features[1].url+'">'+response.random_album.track[i].features[1].name+'</a>)';
                }
                else if(Object.keys(response.random_album.track[i].features).length > 2) {
                  artiste = 'Several';
                  title += ' (feat. <a href="'+response.random_album.track[i].collective_url+'">Several</a>';
                }
                featured_album += '<li><a class="track" href='+response.random_album.track[i].music_page+'>'+title+'</a></li>';
              }
              else {
                break;
              }
            }
            if(Object.keys(response.random_album.track).length > 5) {
              featured_album += '<li><a class="track" href="'+response.random_album.url+'">...</a></li>';
            }
            featured_album += '</ol>';
            featured_album += '</div>';
         $(selector).append(featured_album);

         //let us reduce process
         checkProcesses('#player_preloader');
        }
        else if(response.success === false) {

          }
      },
      error: function(xhr, desc, err) {
        failed_process++;
        if(failed_process < 5) {
          getFeaturedAlbum(offset, limit, selector);
         }
         else {
           iziToast.warning({
                title: 'Network',
                message: 'Please check your internet connection.'
              });
         }
        }
    });

  }

  function getTop(limit, date, top_selector) {

    $.ajax({
      type: 'get',
      url: home_url+'api/music',
      dataType: 'text',
      data: {auth_id: auth_id, user_id: user_id, user_session: user_session, limit: limit, date: date, type: 'top', action: 'fetch'},
      success: function (data, status) {
        var response = JSON.parse(data);
        if(response.success === true) {
          var top = "";
          for (var i = 0; i < Object.keys(response.top).length; i++) {
            var favorite_class = 'far fa-heart'
            if(response.top[i].favorite.favorite === true) {
              favorite_class = 'fas fa-heart pl-playmode-txt';
            }
            var type = 'music';

            var artiste = response.top[i].artiste[0].name,
                more_artiste = response.top[i].artiste[0].name,
                artiste_url = response.top[i].artiste[0].url,
                array_length = Object.keys(response.top[i].artiste).length;
            if(array_length === 2) {
               artiste_url = response.top[i].collective_url;
               artiste += ', '+response.top[i].artiste[1].name;
               more_artiste = artiste;
            }
            if(array_length > 2) {
              artiste_url = response.top[i].collective_url;
              artiste = 'Several';
              more_artiste = 'Several';
            }

            var title = response.top[i].title,
                array_length = Object.keys(response.top[i].features).length;
            if(array_length  === 1) {
             title += ' (feat. '+response.top[i].features[0].name+')';
             artiste_url = response.top[i].collective_url;
            }
            else if(array_length === 2) {
              title += ' (feat. '+response.top[i].features[0].name+', '+response.top[i].features[1].name+')';
              artiste_url = response.top[i].collective_url;
            }
            else if(array_length > 2) {
              title += ' (feat. Several)';
              artiste_url = response.top[i].collective_url;
            }

            top += '<div class="col-xs-12">';
            top += '<div class="item r" data-id="item-'+response.top[i].id+'" data-src="'+response.top[i].url+'">';
            top += '<div class="item-media">';
            top += '<a href="#" class="item-media-content" style="background-image: url('+response.top[i].image.thumbnail+');"></a>';
            top += '<div class="item-overlay center">';
            top += '<button class="btn-playpause">Play</button>';
            top += '</div>';
            top += '</div>';
            top += '<div class="item-info">';
            top += '<div class="item-overlay bottom text-right">';
            top += '<a data-id='+response.top[i].id+' data-type="'+type+'" class="btn btn-icon rounded btn-favorite pl-like"><i class="'+favorite_class+'"></i></a>';
            top += '<span class="text-muted pl-like-txt">'+response.top[i].favorite.formatted_count+'</span>';
            if(response.top[i].purchased === false) {
             top += '<a data-id='+response.top[i].id+' data-type="music" class="btn btn-icon rounded btn-favorite pl-buy"><i class="fas fa-shopping-cart"></i></a>';
             top += '<span class="text-muted price-'+type+'-'+response.top[i].id+'">&#8358;'+response.top[i].selling_price+'</span>';
            }
            top += '<a class="btn btn-icon rounded btn-more" data-type="music" data-id="'+response.top[i].id+'" data-src="'+response.top[i].url+'" data-title_url="'+response.top[i].music_page+'" data-artiste_url="'+artiste_url+'" data-artiste="'+more_artiste+'" data-title="'+response.top[i].title+'" data-image="'+response.top[i].image.thumbnail+'" data-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a>';
            top += '<div class="dropdown-menu pm-dropdown pull-right black lt"></div>';
            top += '</div>';
            top += '<div class="item-title text-ellipsis">';
            top += '<a href="'+response.top[i].music_page+'">'+title+'</a>';
            top += '</div>';
            top += '<div class="item-author text-sm text-ellipsis">';
            top += '<a href="'+artiste_url+'" class="text-muted">'+artiste+'</a>'
            top += '</div>';
            top += '<div class="item-meta text-sm text-muted">';
            top += '<span class="item-meta-stats text-xs item-meta-right">';
            top += '<i class="fa fa-play text-muted"></i> <span class="pl-play-count-'+response.top[i].id+'">'+response.top[i].play.formatted_count+'</span> <i class="fas fa-heart m-l-sm text-muted"></i> <span class="pl-favorite-count-'+response.top[i].id+'">'+response.top[i].favorite.formatted_count+'</span></span>';
            top += '</div>';
            top += '</div>';
            top += '</div>';
            top += '</div>';
          }
         $(top_selector).append(top);
         //let us reduce processes
         checkProcesses('#player_preloader');
        }
        else if(response.success === false) {

          }
      },
      error: function(xhr, desc, err) {
          console.log(xhr);
          console.log("Details: " + desc + "\nError:" + err);
        }
    });

  }

  function getMusicBySlug(slug) {
    $.ajax({
      type: 'get',
      url: '../api/music',
      dataType: 'text',
      data: {auth_id: auth_id, user_id: user_id, user_session: user_session, type: 'page', action: 'fetch', slug: slug},
      success: function (data, status) {
        var response = JSON.parse(data);
        if(response.success === true) {
          //let us set page title
          //$('head > title').html(response.page_title);
          //let us add background image
          $('.page-bg').css("background-image", "url('"+response.music.image.url+"')");

          $('#share_url').val(response.music.music_page);
          $('#facebook_share').attr('onclick', "window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent('"+response.music.music_page+"'),'facebook-share-dialog','width=626,height=436'); return false;");
          $('#twitter_share').attr('onclick', "window.open('https://twitter.com/share?text="+response.page_title+"&url="+response.music.music_page+"','Twitter-dialog','width=626,height=436'); return false;");
          $('#link_copy').attr('data-clipboard-text', response.music.music_page);
          var favorite_class = 'far fa-heart'
          if(response.music.favorite.favorite === true) {
            favorite_class = 'fas fa-heart pl-playmode-txt';
          }

          var type = 'music';

          var artiste = "",
              more_artiste = "",
              artiste_url = "";
          if(Object.keys(response.music.artiste).length === 1) {
            artiste += '<a href="'+response.music.artiste[0].url+'">'+response.music.artiste[0].name+'</a>';
            more_artiste += response.music.artiste[0].name;
            artiste_url = response.music.artiste[0].url;
          }
          else if(Object.keys(response.music.artiste).length === 2) {
            for (var i = 0; i < Object.keys(response.music.artiste).length; i++) {
              if(artiste === "") {
                artiste += response.music.artiste[i].name;
              }
              else {
                artiste += ', '+response.music.artiste[i].name;
              }
            }
            more_artiste = artiste;
            artiste_url = response.music.collective_url;
            artiste = '<a href="'+response.music.collective_url+'">'+artiste+'</a>';
          }
          else {
            more_artiste = 'Several';
            artiste_url = response.music.collective_url;
            artiste += '<a href="'+response.music.collective_url+'Several</a>';
          }

          var music = "";

          music = '<div class="padding b-b">';
          music += '<div class="row-col">';
          music += '<div class="col-sm w w-auto-xs m-b">';
          music += '<div class="item w r pl-img-bordered">';
          music += '<div class="item-media">';
          music += '<div class="item-media-content" style="background-image: url('+response.music.image.thumbnail+')"></div>';
          music += '</div></div></div>';
          music += '<div class="col-sm">';
          music += '<div class="p-l-md no-padding-xs">';
          music += '<div class="page-title">';
          music += '<h1 class="inline pl-display-page__header">'+response.music.title+'</h1>';
          music += '</div>';
          music += '<p class="item-desc text-ellipsis text-muted" data-ui-toggle-class="text-ellipsis">'+response.music.description+'</p>'
          music += '<div class="item-action m-b">';
          music += '<a class="btn btn-icon white rounded btn-share pull-right" data-toggle="modal" data-target="#share-modal"><i class="fas fa-share-alt"></i></a>';
          music += '<button class="btn-playpause text-primary m-r-sm"></button>';
          music += '<span class="text-muted pl-play-count-'+response.music.id+'">'+response.music.play.formatted_count+'</span>';
          music += '<a data-id='+response.music.id+' data-type="'+type+'" class="btn btn-icon rounded btn-favorite pl-like"><i class="'+favorite_class+'"></i></a>';
          music += '<span class="text-muted pl-like-txt">'+response.music.favorite.formatted_count+'</span>';

          if(response.music.purchased === false) {
           music += '<a data-id='+response.music.id+' data-type="music" class="btn btn-icon rounded btn-favorite pl-buy"><i class="fas fa-shopping-cart"></i></a>';
           music += '<span class="text-muted price-'+type+'-'+response.music.id+'">&#8358;'+response.music.selling_price+'</span>';
          }
          if(response.music.purchased === true) {
            music += '<a href="'+response.music.download_url+'" data-id="'+response.music.id+'" data-type="music" class="btn btn-icon rounded btn-favorite pl-download"><i class="fas fa-download"></i></a>';
          }
          music += '<div class="inline dropdown m-l-xs">';
          music += '<a class="btn btn-icon rounded btn-more" data-type="music" data-id="'+response.music.id+'" data-src="'+response.music.url+'" data-title_url="'+response.music.music_page+'" data-artiste_url="'+artiste_url+'" data-artiste="'+more_artiste+'" data-title="'+response.music.title+'" data-image="'+response.music.image.thumbnail+'" data-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a>';
          music += '<div class="dropdown-menu pm-dropdown pull-right black lt"></div>';
          music += '</div></div>';
          music += '<div class="item-meta">';
          music += '<a class="btn btn-xs rounded white" href="'+response.music.genre.url+'">'+response.music.genre.name+'</a>';
          var release_date = response.music.release_date;
          if(response.music.release_date == null) {
           release_date = 'N/A';
          }
          var producers = "N/A";
          for (var i = 0; i < Object.keys(response.music.producers).length; i++) {
              if(producers == "N/A") {
                producers = response.music.producers[i].name;
              }
              else {
                producers += ', '+response.music.producers[i].name
              }
          }
          producers = ' / '+'Producer(s): '+producers;
          music += '</div></div></div></div><p class="pm-music-meta">Release date: '+release_date+producers+'</p></div>';
          $('.page-content').prepend(music);

          //let us generate artiste
          var artiste = "";
          if(Object.keys(response.music.artiste).length === 1) {
            artiste += '<a href="'+response.music.artiste[0].url+'" data-pjax class="item-author _600">'+response.music.artiste[0].name+'</a>';
          }
          else if(Object.keys(response.music.artiste).length === 2) {
            for (var i = 0; i < Object.keys(response.music.artiste).length; i++) {
              if(artiste === "") {
                artiste += '<a href="'+response.music.artiste[i].url+'" data-pjax class="item-author _600">'+response.music.artiste[i].name+'</a>';
              }
              else {
                artiste += ', '+'<a href="'+response.music.artiste[i].url+'" data-pjax class="item-author _600">'+response.music.artiste[i].name+'</a>';
              }
            }
          }
          else {
            artiste += '<a href="'+response.music.artiste[0].url+'" data-pjax class="item-author _600">Several</a>';
          }
          var feat = "";
          if(Object.keys(response.music.features).length === 1) {
            feat += '<a href="'+response.music.features[0].url+'" data-pjax class="item-author _600">'+response.music.features[0].name+'</a>';
            feat = '<span class="text-muted">feat.</span> '+feat;
          }
          else if(Object.keys(response.music.features).length === 2) {
            for (var i = 0; i < Object.keys(response.music.features).length; i++) {
              if(feat === "") {
                feat += '<a href="'+response.music.features[i].url+'" data-pjax class="item-author _600">'+response.music.features[i].name+'</a>';
              }
              else {
                feat += ', '+'<a href="'+response.music.features[i].url+'" data-pjax class="item-author _600">'+response.music.features[i].name+'</a>';
              }
            }
            feat = '<span class="text-muted">feat.</span> '+feat;
          }
          else if(Object.keys(response.music.features).length > 2) {
            feat += '<a href="'+response.music.collective_url+'" data-pjax class="item-author _600">Several</a>';
            feat = '<span class="text-muted">feat.</span> '+feat;
          }

          //let us update more
          music = '<h6 class="m-b pl-music-page__artiste">';
          music += '<span class="text-muted">Song by </span>';
          music += '<a href="#" data-pjax class="item-author _600">'+artiste+'</a> '+feat;
          music += '<span class="text-muted text-sm"> . '+response.music.year+'</span>';
          music += '</h6>';
          $('#content_info > .padding').prepend(music);

          music = '<div class="col-xs-12">';
          music += '<div class="item r" data-id="item-'+response.music.id+'" data-src="'+response.music.url+'">';
          music += '<div class="item-media">';
          music += '<a href="'+response.music.music_page+'" class="item-media-content" style="background-image: url('+response.music.image.thumbnail+');"></a>';
          music += '<div class="item-overlay center">';
          music += '<button  class="btn-playpause">Play</button>';
          music += '</div></div>';
          music += '<div class="item-info">';
          music += '<div class="item-overlay bottom text-right">';
          music += '<a data-id="'+response.music.id+'" data-type="'+type+'" class="btn btn-icon rounded btn-favorite pl-like"><i class="'+favorite_class+'"></i></a>';
          music += '<a class="btn btn-icon rounded btn-more" data-type="music" data-id="'+response.music.id+'" data-src="'+response.music.url+'" data-title_url="'+response.music.music_page+'" data-artiste_url="'+artiste_url+'" data-artiste="'+more_artiste+'" data-title="'+response.music.title+'" data-image="'+response.music.image.thumbnail+'" data-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a>';
          music += '<div class="dropdown-menu pm-dropdown pull-right black lt"></div>';
          music += '</div>';
          music += '<div class="item-title text-ellipsis">';
          music += '<a href="'+response.music.music_page+'">'+response.music.title+'</a>';
          music += '</div>';

          if(response.music.album != false) {
          music += '<div class="item-author text-sm text-ellipsis">';
          music += '<a href="'+response.music.album.url+'" class="text-muted">'+response.music.album.title+'</a>';
          music += '</div>';
          }
          music += '<div class="item-meta text-sm text-muted">';
          music += '<span class="item-meta-right">'+response.music.duration.raw+'</span>';
          music += '</div></div></div></div>';
          $('#tracks').html(music);

          //let us see also by
          if(response.also_by != false) {
            music = '<h2 class="widget-title h4 m-b pl-sections__header"><a class="pl-checker" href="'+response.music.artiste[0].url+'">Also by '+response.music.artiste[0].name+' <i class="material-icons">keyboard_arrow_right</i></a></h2>';
            music += '<div class="owl-carousel owl-theme owl-dots-center" id="also_by">';
            for (var i = 0; i < Object.keys(response.also_by).length; i++) {
              var favorite_class = 'far fa-heart'
              if(response.also_by[i].favorite.favorite === true) {
                favorite_class = 'fas fa-heart pl-playmode-txt';
              }
              var type = 'music';

              var artiste = response.also_by[i].artiste[0].name,
                  more_artiste = response.also_by[i].artiste[0].name,
                  artiste_url = response.also_by[i].artiste[0].url,
                  array_length = Object.keys(response.also_by[i].artiste).length;
              if(array_length === 2) {
                 artiste_url = response.also_by[i].music_page;
                 artiste += ', '+response.also_by[i].artiste[1].name;
                 more_artiste = artiste;
              }
              if(array_length > 2) {
                artiste_url = response.also_by[i].music_page;
                artiste = 'Several';
                more_artiste = artiste;
              }

              var title = response.also_by[i].title,
                  array_length = Object.keys(response.also_by[i].features).length;
              if(array_length  === 1) {
               title += ' (feat. '+response.also_by[i].features[0].name+')';
               artiste_url = response.also_by[i].music_page;
              }
              else if(array_length === 2) {
                title += ' (feat. '+response.also_by[i].features[0].name+', '+response.also_by[i].features[1].name+')';
                artiste_url = response.also_by[i].music_page;
              }
              else if(array_length > 2) {
                title += ' (feat. Several)';
                artiste_url = response.also_by[i].music_page;
              }

              music += '<div class="">';
              music += '<div class="item r" data-id="item-'+response.also_by[i].id+'" data-src="'+response.also_by[i].url+'">';
              music += '<div class="item-media">';
              music += '<a href="'+response.also_by[i].music_page+'" class="item-media-content" style="background-image: url('+response.also_by[i].image.thumbnail_url+');"></a>';
              music += '<div class="item-overlay center">';
              music += '<button class="btn-playpause">Play</button>';
              music += '</div>';
              music += '</div>';
              music += '<div class="item-info">';
              music += '<div class="item-overlay bottom text-right">';
              music += '<a data-id='+response.also_by[i].id+' data-type="'+type+'" class="btn btn-icon rounded btn-favorite pl-like"><i class="'+favorite_class+'"></i></a>';
              music += '<span class="text-muted pl-like-txt">'+response.also_by[i].favorite.formatted_count+'</span>';
               if(response.also_by[i].purchased === false) {
              music += '<a data-id='+response.also_by[i].id+' data-type="music" class="btn btn-icon rounded btn-favorite pl-buy"><i class="fas fa-shopping-cart"></i></a>';
              music += '<span class="text-muted price-'+type+'-'+response.also_by[i].id+'">&#8358;'+response.also_by[i].selling_price+'</span>';
               }
              music += '<a class="btn btn-icon rounded btn-more" data-type="music" data-id="'+response.also_by[i].id+'" data-src="'+response.also_by[i].url+'" data-title_url="'+response.also_by[i].music_page+'" data-artiste_url="'+artiste_url+'" data-artiste="'+more_artiste+'" data-title="'+response.also_by[i].title+'" data-image="'+response.also_by[i].image.thumbnail_url+'" data-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a>';
              music += '<div class="pm-dropdown dropdown-menu pull-right black lt"></div>';
              music += '</div>';
              music += '<div class="item-title text-ellipsis">';
              music += '<a href="'+response.also_by[i].music_page+'">'+title+'</a>';
              music += '</div>';
              music += '<div class="item-author text-sm text-ellipsis">';
              music += '<a href="'+artiste_url+'" class="text-muted">'+artiste+'</a>';
              music += '</div>';
              music += '</div>';
              music += '</div>';
              music += '</div>';
            }
             music += '</div>';
           $('#content_info > .padding > #tracks').after(music);
           $('#also_by').owlCarousel({
   					margin: 20,
            autoplay: true,
   					responsiveClass:true,
   				    responsive:{
   				    	0:{
   				    		items: 1
   				    	},
                400: {
                 items: 2
                },
   				        543:{
   				            items: 3
   				        },
                  800:{
   				            items: 4
   				        }
   				    }
   				});
          }

          //let us see related
          if(response.related != false) {
            music = '<h2 class="widget-title h4 m-b pl-sections__header"><a class="pl-checker" href="'+response.music.genre.url+'">Related Music<i class="material-icons">keyboard_arrow_right</i></a></h2>';
            music += '<div class="owl-carousel owl-theme owl-dots-center" id="related">';
            for (var i = 0; i < Object.keys(response.related).length; i++) {
              var favorite_class = 'far fa-heart'
              if(response.related[i].favorite.favorite === true) {
                favorite_class = 'fas fa-heart pl-playmode-txt';
              }
              var type = 'music';

              var artiste = response.related[i].artiste[0].name,
                  more_artiste = artiste,
                  artiste_url = response.related[i].artiste[0].url,
                  array_length = Object.keys(response.related[i].artiste).length;
              if(array_length === 2) {
                 artiste_url = response.related[i].music_page;
                 artiste += ', '+response.related[i].artiste[1].name;
                 more_artiste = artiste;
              }
              if(array_length > 2) {
                artiste_url = response.related[i].music_page;
                artiste = 'Several';
                more_artiste = artiste;
              }

              var title = response.related[i].title,
                  array_length = Object.keys(response.related[i].features).length;
              if(array_length  === 1) {
               title += ' (feat. '+response.related[i].features[0].name+')';
               artiste_url = response.related[i].music_page;
              }
              else if(array_length === 2) {
                title += ' (feat. '+response.related[i].features[0].name+', '+response.related[i].features[1].name+')';
                artiste_url = response.related[i].music_page;
              }
              else if(array_length > 2) {
                title += ' (feat. Several)';
                artiste_url = response.related[i].music_page;
              }

              music += '<div class="">';
              music += '<div class="item r" data-id="item-'+response.related[i].id+'" data-src="'+response.related[i].url+'">';
              music += '<div class="item-media">';
              music += '<a href="'+response.related[i].music_page+'" class="item-media-content" style="background-image: url('+response.related[i].image.thumbnail_url+');"></a>';
              music += '<div class="item-overlay center">';
              music += '<button class="btn-playpause">Play</button>';
              music += '</div>';
              music += '</div>';
              music += '<div class="item-info">';
              music += '<div class="item-overlay bottom text-right">';
              music += '<a data-id='+response.related[i].id+' data-type="'+type+'" class="btn btn-icon rounded btn-favorite pl-like"><i class="'+favorite_class+'"></i></a>';
              music += '<span class="text-muted pl-like-txt">'+response.related[i].favorite.formatted_count+'</span>';
               if(response.related[i].purchased === false) {
              music += '<a data-id='+response.related[i].id+' data-type="music" class="btn btn-icon rounded btn-favorite pl-buy"><i class="fas fa-shopping-cart"></i></a>';
              music += '<span class="text-muted price-'+type+'-'+response.related[i].id+'">&#8358;'+response.related[i].selling_price+'</span>';
               }
              music += '<a class="btn btn-icon rounded btn-more" data-type="music" data-id="'+response.related[i].id+'" data-src="'+response.related[i].url+'" data-title_url="'+response.related[i].music_page+'" data-artiste_url="'+artiste_url+'" data-artiste="'+more_artiste+'" data-title="'+response.related[i].title+'" data-image="'+response.related[i].image.thumbnail_url+'" data-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a>';
              music += '<div class="dropdown-menu pm-dropdown pull-right black lt"></div>';
              music += '</div>';
              music += '<div class="item-title text-ellipsis">';
              music += '<a href="'+response.related[i].music_page+'">'+title+'</a>';
              music += '</div>';
              music += '<div class="item-author text-sm text-ellipsis">';
              music += '<a href="'+artiste_url+'" class="text-muted">'+artiste+'</a>';
              music += '</div>';
              music += '</div>';
              music += '</div>';
              music += '</div>';
            }
             music += '</div>';
             var where_selector = $('#tracks');
             if($('#also_by').length) {
               where_selector = $('#also_by');
             }
           where_selector.after(music);
           $('#related').owlCarousel({
            margin: 20,
            autoplay: true,
            responsiveClass:true,
              responsive:{
                0:{
                  items: 2
                },
                  543:{
                      items: 4
                  }
              }
          });
          }

         //let us reduce processes
         checkProcesses('#player_preloader');
        }
        else if(response.success === false) {

          }
      },
      error: function(xhr, desc, err) {
          console.log(xhr);
          console.log("Details: " + desc + "\nError:" + err);
        }
    });

  }

  function getAlbumBySlug(slug) {
    $.ajax({
      type: 'get',
      url: home_url+'api/album',
      dataType: 'text',
      data: {auth_id: auth_id, user_id: user_id, user_session: user_session, type: 'page', action: 'fetch', slug: slug},
      success: function (data, status) {
        var response = JSON.parse(data);
        if(response.success === true) {
          //let us set page title
          //$('head > title').html(response.page_title);
          //let us add background image
          $('.page-bg').css("background-image", "url('"+response.album.image.url+"')");
          $('#share_url').val(response.album.url);
          $('#facebook_share').attr('onclick', "window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent('"+response.album.url+"'),'facebook-share-dialog','width=626,height=436'); return false;");
          $('#twitter_share').attr('onclick', "window.open('https://twitter.com/share?text="+response.page_title+"&url="+response.album.url+"','Twitter-dialog','width=626,height=436'); return false;");
          $('#link_copy').attr('data-clipboard-text', response.album.url);

          var favorite_class = 'far fa-heart';
          if(response.album.favorite.favorite === true) {
            favorite_class = 'fas fa-heart pl-playmode-txt';
          }
          var type = 'album',
              album_type = response.album.type;

          var artiste = "",
              more_artiste = "";
          if(Object.keys(response.album.artiste).length === 1) {
            artiste += '<a href="'+response.album.artiste[0].url+'">'+response.album.artiste[0].name+'</a>';
            more_artiste = response.album.artiste[0].name;
          }
          else if(Object.keys(response.album.artiste).length === 2) {
            for (var i = 0; i < Object.keys(response.album.artiste).length; i++) {
              if(artiste === "") {
                artiste += response.album.artiste[i].name;
              }
              else {
                artiste += ', '+response.album.artiste[i].name;
                more_artiste = artiste;
              }
            }
            artiste = '<a href="'+response.album.collective_url+'">'+artiste+'</a>';
          }
          else {
            artiste += '<a href="'+response.album.collective_url+'Several</a>';
            more_artiste = 'Several';
          }

          var album = "";

          album = '<div class="padding b-b">';
          album += '<div class="row-col">';
          album += '<div class="col-sm w w-auto-xs m-b">';
          album += '<div class="item w r pl-img-bordered">';
          album += '<div class="item-media">';
          album += '<div class="item-media-content" style="background-image: url('+response.album.image.thumbnail+')"></div>';
          album += '</div></div></div>';
          album += '<div class="col-sm">';
          album += '<div class="p-l-md no-padding-xs">';
          album += '<div class="page-title">';
          album += '<h1 class="inline pl-display-page__header">'+response.album.title+'</h1>';
          album += '</div>';
          album += '<p class="item-desc text-ellipsis text-muted" data-ui-toggle-class="text-ellipsis">'+response.album.description+'</p>'
          album += '<div class="item-action m-b">';
          album += '<a class="btn btn-icon white rounded btn-share pull-right" data-toggle="modal" data-target="#share-modal"><i class="fas fa-share-alt"></i></a>';
          album += '<button class="btn-playpause text-primary m-r-sm"></button>';
          album += '<a data-id='+response.album.id+' data-type="'+type+'" class="btn btn-icon rounded btn-favorite pl-like"><i class="'+favorite_class+'"></i></a>';
          album += '<span class="text-muted pl-like-txt">'+response.album.favorite.formatted_count+'</span>';

          if(response.album.purchased === false) {
           album += '<a data-id='+response.album.id+' data-type="album" class="btn btn-icon rounded btn-favorite pl-buy"><i class="fas fa-shopping-cart"></i></a>';
           album += '<span class="text-muted price-'+type+'-'+response.album.id+'">&#8358;'+response.album.selling_price+'</span>';
          }
          if(response.album.purchased === true) {
            album += '<a href="'+response.album.download_url+'" data-id="'+response.album.id+'" data-type="album" class="btn btn-icon rounded btn-favorite pl-download"><i class="fas fa-download"></i></a>';
          }
          album += '<div class="inline dropdown m-l-xs">';
          album += '<a class="btn btn-icon rounded btn-more" data-type="album" data-id="'+response.album.id+'" data-src="'+response.album.track[0].src+'" data-title_url="'+response.album.url+'" data-artiste_url="'+response.album.artiste[0].url+'" data-artiste="'+more_artiste+'" data-title="'+response.album.title+'" data-image="'+response.album.image.thumbnail+'" data-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a>';
          album += '<div class="dropdown-menu pm-dropdown pull-right black lt"></div>';
          album += '</div></div>';
          album += '<div class="item-meta">';
          var genre = "";
          if(Object.keys(response.album.genre).length > 0) {
           for(var i = 0; i < Object.keys(response.album.genre).length; i++) {
             genre += '<a class="btn btn-xs rounded white">'+response.album.genre[i].name+'</a> ';
           }
          }
          album += genre;
          album += '</div></div></div></div></div>';
          $('.page-content').prepend(album);

          //let us generate artiste
          var artiste = "",
              more_artiste = "";
          if(Object.keys(response.album.artiste).length === 1) {
            artiste += '<a href="'+response.album.artiste[0].url+'" data-pjax class="item-author _600">'+response.album.artiste[0].name+'</a>';
            more_artiste = response.album.artiste[0].name;
          }
          else if(Object.keys(response.album.artiste).length === 2) {
            for (var i = 0; i < Object.keys(response.album.artiste).length; i++) {
              if(artiste === "") {
                artiste += '<a href="'+response.album.artiste[i].url+'" data-pjax class="item-author _600">'+response.album.artiste[i].name+'</a>';
                more_artiste = response.album.artiste[i].name;
              }
              else {
                artiste += ', '+'<a href="'+response.album.artiste[i].url+'" data-pjax class="item-author _600">'+response.album.artiste[i].name+'</a>';
                more_artiste += ', '+response.album.artiste[i].name;
              }
            }
          }
          else {
            artiste += '<a href="'+response.album.artiste[0].url+'" data-pjax class="item-author _600">Several</a>';
            more_artiste += 'Several';
          }

          //let us update more
          album = '<h6 class="m-b pl-music-page__artiste">';
          album += '<span class="text-muted">'+response.album.type.toUpperCase()+' by </span>';
          album += '<a href="#" data-pjax class="item-author _600">'+artiste+'</a> ';
          album += '<span class="text-muted text-sm"> . '+response.album.year+'</span>';
          album += '</h6>';
          $('#content_info > .padding').prepend(album);

          album = "";
          for(var i = 0; i < Object.keys(response.album.track).length; i++) {
            var favorite_class = 'far fa-heart',
                type = 'music';
            if(response.album.track[i].meta.like === true) {
              favorite_class = 'fas fa-heart pl-playmode-txt';
            }

            var track_id = "";
             track_id = response.album.track[i].id.split('-');

          album += '<div class="col-xs-12">';
          album += '<div class="item r" data-id="'+response.album.track[i].id+'" data-src="'+response.album.track[i].src+'">';
          album += '<div class="item-media">';
          album += '<a href="'+response.album.track[i].link+'" class="item-media-content" style="background-image: url('+response.album.track[i].thumb.src+');"></a>';
          album += '<div class="item-overlay center">';
          album += '<button  class="btn-playpause">Play</button>';
          album += '</div></div>';
          album += '<div class="item-info">';
          album += '<div class="item-overlay bottom text-right">';
          album += '<a data-id="'+track_id[1]+'" data-type="'+type+'" class="btn btn-icon btn-favorite rounded pl-like"><i class="'+favorite_class+'"></i></a>';
          album += '<a class="btn btn-icon rounded btn-more" data-type="music" data-id="'+response.album.track[i].id+'" data-src="'+response.album.track[i].src+'" data-title_url="'+response.album.track[i].link+'" data-artiste_url="'+response.album.track[i].meta.autorLink+'" data-artiste="'+more_artiste+'" data-title="'+response.album.track[i].title+'" data-image="'+response.album.track[i].thumb.src+'" data-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a>';
          album += '<div class="dropdown-menu pm-dropdown pull-right black lt"></div>';
          album += '</div>';
          album += '<div class="item-title text-ellipsis">';
          album += '<a href="'+response.album.track[i].link+'">'+response.album.track[i].title+'</a>';
          album += '</div>';
          album += '<div class="item-author text-sm text-ellipsis">';
          album += '<a href="'+response.album.url+'" class="text-muted">'+response.album.title+'</a>';
          album += '</div>';
          album += '<div class="item-meta text-sm text-muted">';
          album += '<span class="item-meta-right">'+response.album.track[i].meta.duration+'</span>';
          album += '</div></div></div></div>';
          addToQueue(response.album.track[i]);
        }
          $('#tracks').html(album);


         //let us reduce processes
         checkProcesses('#player_preloader');
        }
        else if(response.success === false) {

          }
      },
      error: function(xhr, desc, err) {
          console.log(xhr);
          console.log("Details: " + desc + "\nError:" + err);
        }
    });

  }

  function getPlaylistById(id) {
    $.ajax({
      type: 'get',
      url: home_url+'api/playlist',
      dataType: 'text',
      data: {auth_id: auth_id, user_id: user_id, user_session: user_session, type: 'playlist', action: 'fetch', id: id},
      success: function (data, status) {
        var response = JSON.parse(data);
        if(response.success === true) {
          //let us set page title
          var title = response.name+' Playlist on Playmode';
          $('head > title').html(title);
          //let us add background image
          $('.page-bg').css("background-image", "url('"+response.image.url+"')");
          $('#share_url').val(response.url);
          $('#facebook_share').attr('onclick', "window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent('"+response.url+"'),'facebook-share-dialog','width=626,height=436'); return false;");
          $('#twitter_share').attr('onclick', "window.open('https://twitter.com/share?text="+title+"&url="+response.url+"','Twitter-dialog','width=626,height=436'); return false;");
          $('#link_copy').attr('data-clipboard-text', response.url);

          var favorite_class = 'far fa-heart';
          if(response.favorite.favorite === true) {
            favorite_class = 'fas fa-heart pl-playmode-txt';
          }
          var type = 'playlist';

          var playlist = "";

          playlist = '<div class="padding b-b">';
          playlist += '<div class="row-col">';
          playlist += '<div class="col-sm w w-auto-xs m-b">';
          playlist += '<div class="item w r pl-img-bordered">';
          playlist += '<div class="item-media">';
          playlist += '<div class="item-media-content" style="background-image: url('+response.image.thumbnail+')"></div>';
          playlist += '</div></div></div>';
          playlist += '<div class="col-sm">';
          playlist += '<div class="p-l-md no-padding-xs">';
          playlist += '<div class="page-title">';
          playlist += '<h1 class="inline pl-display-page__header">'+response.name+' Playlist</h1>';
          playlist += '</div>';
          playlist += '<p class="item-desc text-ellipsis text-muted" data-ui-toggle-class="text-ellipsis">'+response.description+'</p>'
          playlist += '<div class="item-action m-b">';
          playlist += '<a class="btn btn-icon white rounded btn-share pull-right" data-toggle="modal" data-target="#share-modal"><i class="fas fa-share-alt"></i></a>';
          playlist += '<button class="btn-playpause text-primary m-r-sm"></button>';
          playlist += '<a data-id='+response.id+' data-type="'+type+'" class="btn btn-icon rounded btn-favorite pl-like"><i class="'+favorite_class+'"></i></a>';
          playlist += '<span class="text-muted pl-like-txt">'+response.favorite.formatted_count+'</span>';
          playlist += '</div>';
          playlist += '<div class="item-meta">';

          var edit = "",
              owned = false;
          if(response.owned === true) {
             edit += '<a class="btn btn-xs rounded white pl-playlist_edit" data-id='+response.id+'>Edit</a> ';
             owned = true;
           }
          playlist += edit;
          playlist += '<p class="pl-margin-top-20 text-muted">'+response.fetched_items+' tracks . '+response.duration.formatted+' . Updated: '+response.updated+'</p>';
          playlist += '</div></div></div></div></div>';
          $('.page-content').prepend(playlist);


          //let us update more
          playlist = '<h6 class="m-b pl-music-page__artiste">';
          playlist += '<span class="text-muted">'+type.toUpperCase()+' by </span>';
          playlist += '<a href="#" data-pjax class="item-author _600">'+response.creator.username+'</a> ';
          playlist += '</h6>';
          $('#content_info > .padding').prepend(playlist);
          playlist = [];

          for(var i = 0; i < Object.keys(response.tracks).length; i++) {
            var favorite_class = 'far fa-heart',
                type = 'music';
            if(response.tracks[i].favorite.favorite === true) {
              favorite_class = 'fas fa-heart pl-playmode-txt';
            }

            var artiste = "",
                more_artiste = "",
                artiste_url = "";
            if(Object.keys(response.tracks[i].artiste).length === 1) {
              artiste += '<a href="'+response.tracks[i].artiste[0].url+'">'+response.tracks[i].artiste[0].name+'</a>';
              more_artiste += response.tracks[i].artiste[0].name;
              artiste_url = response.tracks[i].artiste[0].url;
            }
            else if(Object.keys(response.tracks[i].artiste).length === 2) {
              for (var j = 0; j < Object.keys(response.tracks[i].artiste).length; j++) {
                if(artiste === "") {
                  artiste += response.tracks[i].artiste[j].name;
                }
                else {
                  artiste += ', '+response.tracks[i].artiste[j].name;
                }
              }
              more_artiste = artiste;
              artiste_url = response.tracks[i].collective_url;
              artiste = '<a href="'+response.tracks[i].collective_url+'">'+artiste+'</a>';
            }
            else {
              more_artiste = 'Several';
              artiste_url = response.tracks[i].collective_url;
              artiste += '<a href="'+response.tracks[i].collective_url+'Several</a>';
            }

            var title = response.tracks[i].title,
                array_length = Object.keys(response.tracks[i].features).length;
            if(array_length  === 1) {
             title += ' (feat. '+response.tracks[i].features[0].name+')';
            }
            else if(array_length === 2) {
              title += ' (feat. '+response.tracks[i].features[0].name+', '+response.tracks[i].features[1].name+')';
            }
            else if(array_length > 2) {
              title += ' (feat. Several)';
            }

          playlist.push('<div class="col-xs-12">');
          playlist.push('<div class="item r" data-id="item-'+response.tracks[i].id+'" data-src="'+response.tracks[i].url+'">');
          playlist.push('<div class="item-media">');
          playlist.push('<a href="'+response.tracks[i].music_page+'" class="item-media-content" style="background-image: url('+response.tracks[i].image.thumbnail+');"></a>');
          playlist.push('<div class="item-overlay center">');
          playlist.push('<button  class="btn-playpause">Play</button>');
          playlist.push('</div></div>');
          playlist.push('<div class="item-info">');
          playlist.push('<div class="item-overlay bottom text-right">');
          playlist.push('<a data-id="'+response.tracks[i].id+'" data-type="'+type+'" class="btn btn-icon btn-favorite rounded pl-like"><i class="'+favorite_class+'"></i></a>');
          playlist.push('<a class="btn btn-icon rounded btn-more" data-owned='+owned+' data-playlist_id = '+response.id+' data-type="music" data-id="'+response.tracks[i].id+'" data-src="'+response.tracks[i].url+'" data-title_url="'+response.tracks[i].music_page+'" data-artiste_url="'+artiste_url+'" data-artiste="'+more_artiste+'" data-title="'+response.tracks[i].title+'" data-image="'+response.tracks[i].image.thumbnail+'" data-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a>');
          playlist.push('<div class="dropdown-menu pm-dropdown pull-right black lt"></div>');
          playlist.push('</div>');
          playlist.push('<div class="item-title text-ellipsis">');
          playlist.push('<a href="'+response.tracks[i].music_page+'">'+title+'</a>');
          playlist.push('</div>');

          playlist.push('<div class="item-author text-sm text-ellipsis">');
          playlist.push('<a href="'+artiste_url+'" class="text-muted">'+artiste+'</a>');
          playlist.push('</div>');
          if(response.tracks[i].album != false) {
          playlist.push('<div class="item-author text-sm text-ellipsis">');
          playlist.push('<a href="'+response.tracks[i].album.url+'" class="text-muted">'+response.tracks[i].album.title+'</a>');
          playlist.push('</div>');
        }

          playlist.push('<div class="item-meta text-sm text-muted">');
          playlist.push('<span class="item-meta-right">'+response.tracks[i].duration.raw+'</span>');
          playlist.push('</div></div></div></div>');
          //addToQueue
          var obj = {
              meta: {
                 author: artiste
                ,authorlink : artiste_url
                ,like: response.tracks[i].favorite.favorite
              }
              ,src: response.tracks[i].url
              ,thumb: {
                src: response.tracks[i].image.thumbnail
              }
              ,title: title
              ,link: response.tracks[i].music_page
              ,id: 'item-'+response.tracks[i].id
          };
          addToQueue(obj);
        }
        $('#tracks').html(playlist.join('\n'));

         checkProcesses('#player_preloader');

        }
        else if(response.success === false) {
           //
          }
      },
      error: function(xhr, desc, err) {
          //
        }
    });

  }

  function getChartsByDate(date) {
    $.ajax({
      type: 'get',
      url: home_url+'api/charts',
      dataType: 'text',
      data: {auth_id: auth_id, user_id: user_id, user_session: user_session, type: 'top', action: 'fetch', date: date, limit: 30},
      success: function (data, status) {
        var response = JSON.parse(data);
        if(response.success === true) {
          //let us set page title
          $('head > title').html(response.page_title);

          var type = 'music',

          charts = "";
          for(var i = 0; i < Object.keys(response.charts).length; i++) {
            //calculate arrow
            var static_arrow = "";
            if(response.charts[i].previous.position != response.charts[i].position) {
              if(response.charts[i].previous.play_count != 0) {
                if(response.charts[i].previous.position > response.charts[i].position) {
                  var change = response.charts[i].previous.position - response.charts[i].position;
                  change = '<span class="pl-position-change-'+response.charts[i].id+'">+'+change+'</span>';
                  static_arrow = '<i class="fas fa-arrow-circle-up text-success"></i> '+change;
                }
                else {
                  var change = response.charts[i].position - response.charts[i].previous.position;
                  change = '<span class="pl-position-change-'+response.charts[i].id+'">-'+change+'</span>';
                  static_arrow = '<i class="fas fa-arrow-circle-down text-danger"></i> '+change;
                }
              }
              else {
                static_arrow = '<i class="fas fa-plus-circle text-primary"></i>';
              }
            }
            else {
              if(response.charts[i].previous.play_count == 0)  {
              static_arrow = '<i class="fas fa-plus-circle text-primary"></i>';
              }
            }
            var favorite_class = 'far fa-heart'
            if(response.charts[i].track.meta.like === true) {
              favorite_class = 'fas fa-heart pl-playmode-txt';
            }
          charts += '<div class="col-xs-12">';
          charts += '<div class="item r" data-id="item-'+response.charts[i].track.id+'" data-src="'+response.charts[i].track.src+'">';
          charts += '<div class="item-media">';
          charts += '<a href="'+response.charts[i].track.link+'" class="item-media-content" style="background-image: url('+response.charts[i].track.thumb.src+');"></a>';
          charts += '<div class="item-overlay center">';
          charts += '<button  class="btn-playpause">Play</button>';
          charts += '</div></div>';
          charts += '<div class="item-info">';
          charts += '<div class="item-overlay bottom text-right">';
          charts += '<a data-id="'+response.charts[i].track.id+'" data-type="'+type+'" class="btn btn-icon rounded btn-favorite pl-like"><i class="'+favorite_class+'"></i></a>';
          charts += '<span class="text-muted pl-like-txt">'+response.charts[i].details.favorite.formatted_count+'</span>';
          if(response.charts[i].details.purchased === false) {
           charts += '<a data-id='+response.charts[i].details.id+' class="btn btn-icon rounded btn-favorite pl-buy"><i class="fas fa-shopping-cart"></i></a>';
           charts += '<span class="text-muted price-'+type+'-'+response.charts[i].details.id+'">&#8358;'+response.charts[i].details.selling_price+'</span>';
          }
          charts += '<a class="btn btn-icon rounded btn-more" data-type="music" data-id="'+response.charts[i].track.id+'" data-src="'+response.charts[i].track.src+'" data-title_url="'+response.charts[i].track.link+'" data-artiste_url="'+response.charts[i].track.meta.authorlink+'" data-artiste="'+response.charts[i].track.meta.author+'" data-title="'+response.charts[i].track.title+'" data-image="'+response.charts[i].track.thumb.src+'" data-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a>';
          charts += '<div class="dropdown-menu pm-dropdown pull-right black lt"></div>';
          charts += '</div>';
          charts += '<div class="item-title text-ellipsis">';
          charts += '<a href="'+response.charts[i].track.link+'">'+response.charts[i].track.title+'</a>';
          charts += '</div>';
          charts += '<div class="item-author text-sm text-ellipsis">';
          charts += '<a href="'+response.charts[i].track.meta.author_link+'" class="text-muted">'+response.charts[i].track.meta.author+'</a>';
          charts += '</div>';
          charts += '<div class="item-meta text-sm text-muted">';
          charts += '<span class="item-meta-stats text-xs item-meta-right">';
          charts += static_arrow+' ';
          charts += '<i class="fas fa-play text-muted"></i> <span class="pl-play-count-'+response.charts[i].details.id+'">'+response.charts[i].details.play.formatted_count+'</span> <i class="fas fa-heart m-l-sm text-muted"></i> <span class="pl-favorite-count-'+response.charts[i].details.id+'">'+response.charts[i].details.favorite.formatted_count+'</span></span>';
          charts += '</div></div></div></div>';
          addToQueue(response.charts[i].track);
        }
          $('#charts_list').html(charts);


         //let us reduce processes
         checkProcesses('#player_preloader');
        }
        else if(response.success === false) {

          }
      },
      error: function(xhr, desc, err) {
          console.log(xhr);
          console.log("Details: " + desc + "\nError:" + err);
        }
    });

  }


  function getArtisteBySlug(slug) {
    $.ajax({
      type: 'get',
      url: home_url+'api/artiste',
      dataType: 'text',
      data: {auth_id: auth_id, user_id: user_id, user_session: user_session, type: 'page', action: 'fetch', slug: slug},
      success: function (data, status) {
        var response = JSON.parse(data);
        if(response.success === true) {
          //let us set page title
          //$('head > title').html(response.page_title);
          //let us add background image
          $('.page-bg').css("background-image", "url('"+response.artiste.avatar.url+"')");

          $('#share_url').val(response.artiste.url);
          $('#facebook_share').attr('onclick', "window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent('"+response.artiste.url+"'),'facebook-share-dialog','width=626,height=436'); return false;");
          $('#twitter_share').attr('onclick', "window.open('https://twitter.com/share?text="+response.page_title+"&url="+response.artiste.url+"','Twitter-dialog','width=626,height=436'); return false;");
          $('#link_copy').attr('data-clipboard-text', response.artiste.url);

          var verify_icon = '<label class="material-icons text-primary text-lg m-b v-m m-l-xs" title="Verified">check_circle</label>';
          if(response.artiste.status === 'self_verified') {
            verify_icon = '<label class="material-icons text-success text-lg m-b v-m m-l-xs" title="Verified">check_circle</label>';
          }

          var details = "";

          details = '<div class="padding b-b">';
          details += '<div class="row-col">';
          details += '<div class="col-sm w w-auto-xs m-b">';
          details += '<div class="item w rounded pl-img-bordered">';
          details += '<div class="item-media">';
          details += '<div class="item-media-content" style="background-image: url('+response.artiste.avatar.thumbnail+')"></div>';
          details += '</div></div></div>';
          details += '<div class="col-sm">';
          details += '<div class="p-l-md no-padding-xs">';
          details += '<div class="page-title">';
          details += '<h1 class="inline pl-display-page__header">'+response.artiste.name+'</h1>';
          details += verify_icon;
          details += '</div>';
          details += '<p class="item-desc text-ellipsis text-muted" data-ui-toggle-class="text-ellipsis">'+response.artiste.bio+'</p>'
          details += '<div class="item-action m-b">';
          details += '<a class="btn btn-icon white rounded btn-share pull-right pl-apg-no-display" data-toggle="modal" data-target="#share-modal"><i class="fas fa-share-alt"></i></a>';
          details += '<button class="btn-playpause text-primary m-r-sm"></button>';

          var followers = '',
              follow_text = 'followers',
              follow_count_class = 'flw-'+response.artiste.id;
          if(response.artiste.relationship.followers == 1 || response.artiste.relationship.followers == 0) {
            follow_text = 'follower';
          }

          var album_text = 'album',
              track_text = 'tracks',
              chart_text = '#0',
              position = '#0';
          if(response.artiste.album_length > 1) {
            album_text = 'albums';
          }
          if(response.artiste.track_length < 2) {
            track_text = 'track';
          }
          if(response.artiste.charts_position != '~') {
            chart_text = '#'+response.artiste.charts_position;
            position = chart_text;
          }

          followers = '<i class="material-icons '+follow_count_class+'" title="'+response.artiste.relationship.followers+' '+follow_text+'">people</i> <span>'+response.artiste.relationship.followers+'</span>';
          details += '<span><i class="material-icons" title="'+response.artiste.album_length+' '+album_text+'">album</i> '+response.artiste.album_length+', <i class="material-icons" title="'+response.artiste.track_length+' '+track_text+'">audiotrack</i> '+response.artiste.track_length+', '+followers+', <i class="material-icons" title="'+chart_text+' on artist charts">trending_up</i> '+chart_text+'</span>';

          var follow_color = 'pl-followed',
              follow_direction = 'Following';

          if(response.artiste.relationship.followed == false) {
          follow_color = ' b-primary text-primary pl-flw-outline',
          follow_direction = 'Follow';
          }

          details += '<button class="btn rounded m-l-sm pl-flw-btn '+follow_color+'" data-type="user_artiste" data-action="update_relationship" data-id="'+response.artiste.id+'">'+follow_direction+'</button>';
          details += '</div>';

          details += '<div class="block clearfix m-b">';
          var genre = "";
          if(Object.keys(response.artiste.genre).length > 0) {
           for(var i = 0; i < Object.keys(response.artiste.genre).length; i++) {
             genre += '<a class="btn btn-xs rounded white" href="'+response.artiste.genre[i].url+'">'+response.artiste.genre[i].name+'</a> ';
           }
          }
          details += genre;
          details += '</div></div></div></div></div>';
          $('.page-content').prepend(details);

           if(response.artiste.album != false || response.artiste.ep != false
           || response.artiste.mixtape != false || response.artiste.singles != false) {

            details = '<div class="nav-active-border b-primary bottom m-b-md">';
            details += '<ul class="nav l-h-2x">';
            details += '<li class="nav-item m-r inline">';
            details += '<a class="nav-link active" href="#" data-toggle="tab" data-target="#tab_1">Discography</a>';
            details += '</li>';
            details += '<li class="nav-item m-r inline">';
            details += '<a class="nav-link" href="#" data-toggle="tab" data-target="#tab_2">Tracks</a>';
            details += '</li>';
            details += '</ul>';
            details += '</div>';
            details += '<div class="tab-content">';
            details += '<div class="tab-pane active" id="tab_1">';
            if(response.artiste.tracks != false) {
              details += '<h5 class="m-b">Top Tracks</h5>';
              details += '<div class="row m-b">';
              for(var i = 0; i < Object.keys(response.artiste.tracks).length; i++) {
                if(i === 4) {
                  break;
                }

                var favorite_class = 'far fa-heart';
                if(response.artiste.tracks[i].meta.like === true) {
                  favorite_class = 'fas fa-heart pl-playmode-txt';
                }

                var type = 'music';

               details += '<div class="col-xs-6 col-sm-3">';
               details += '<div class="item r" data-id="'+response.artiste.tracks[i].id+'" data-src="'+response.artiste.tracks[i].src+'">';
               details += '<div class="item-media">';
               details += '<a href="'+response.artiste.tracks[i].link+'" class="item-media-content" style="background-image: url('+response.artiste.tracks[i].thumb.src+');"></a>';
               details += '<div class="item-overlay center">';
               details += '<button  class="btn-playpause">Play</button>';
               details += '</div></div>';
               details += '<div class="item-info">';
               details += '<div class="item-overlay bottom text-right">';

               var exploded = response.artiste.tracks[i].id.split('-');
               var id = exploded[1];
               details += '<a data-id='+id+' data-type="'+type+'" class="btn btn-icon rounded btn-favorite pl-like"><i class="'+favorite_class+'"></i></a>';
               details += '<span class="text-muted pl-like-txt">'+1+'</span>'
               if(response.artiste.tracks_details[i].purchased != true) {
               details += '<a data-id='+id+' data-type="music" class="btn btn-icon rounded btn-favorite pl-buy"><i class="fas fa-shopping-cart"></i></a>';
               details += '<span class="text-muted price-'+type+'-'+id+'">&#8358;'+response.artiste.tracks_details[i].selling_price+'</span>';
               }
               details += '<a class="btn btn-icon rounded btn-more" data-type="music" data-id="'+response.artiste.tracks[i].id+'" data-src="'+response.artiste.tracks[i].src+'" data-title_url="'+response.artiste.tracks[i].link+'" data-artiste_url="'+response.artiste.tracks[i].meta.authorlink+'" data-artiste="'+response.artiste.tracks[i].meta.author+'" data-title="'+response.artiste.tracks[i].title+'" data-image="'+response.artiste.tracks[i].thumb.src+'" data-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a>';
               details += '<div class="dropdown-menu pm-dropdown pull-right black lt"></div>';
               details += '</div>';
               details += '<div class="item-title text-ellipsis">';
               details += '<a href="'+response.artiste.tracks[i].link+'">'+response.artiste.tracks[i].title+'</a>';
               details += '</div>';
               details += '<div class="item-author text-sm text-ellipsis">';
               details += '<a href="'+response.artiste.tracks[i].meta.author_link+'" class="text-muted">'+response.artiste.tracks[i].meta.author+'</a>';
               details += '</div>';
               details += '</div>';
               details += '</div>';
               details += '</div>';
              }
              details += '</div>';
            }

            if(response.artiste.album != false) {
              details += '<h5 class="m-b">Albums</h5>';
              details += '<div class="row m-b">';
              for(var i = 0; i < Object.keys(response.artiste.album).length; i++) {

                var favorite_class = 'far fa-heart'
                if(response.artiste.album[i].favorite.favorite === true) {
                  favorite_class = 'fas fa-heart pl-playmode-txt';
                }

                var type = 'album';

                var artiste = response.artiste.album[i].artiste[0].name,
                    more_artiste = artiste,
                    artiste_url = response.artiste.album[i].artiste[0].url,
                    array_length = Object.keys(response.artiste.album[i].artiste).length;
                if(array_length === 2) {
                   artiste_url = response.artiste.album[i].collective_url;
                   artiste += ', '+response.artiste.album[i].artiste[1].name;
                   more_artiste = artiste;
                }
                if(array_length > 2) {
                  artiste_url = response.artiste.album[i].collective_url;
                  artiste = 'Several';
                  more_artiste = artiste;
                }


               details += '<div class="col-xs-12 col-sm-4">';
               details += '<div class="item r" data-id="'+response.artiste.album[i].track[0].id+'" data-src="'+response.artiste.album[i].track[0].src+'">';
               details += '<div class="item-media">';
               details += '<a href="'+response.artiste.album[i].url+'" class="item-media-content" style="background-image: url('+response.artiste.album[i].image.thumbnail+');"></a>';
               details += '<div class="item-overlay center">';
               details += '<button  class="btn-playpause">Play</button>';
               details += '</div></div>';
               details += '<div class="item-info">';
               details += '<div class="item-overlay bottom text-right">';

               details += '<a data-id='+response.artiste.album[i].id+' data-type="'+type+'" class="btn btn-icon rounded btn-favorite pl-like"><i class="'+favorite_class+'"></i></a>';
               details += '<span class="text-muted pl-like-txt">'+response.artiste.album[i].favorite.formatted_count+'</span>';
               if(response.artiste.album[i].purchased != true) {
               details += '<a data-id='+response.artiste.album[i].id+' class="btn btn-icon rounded btn-favorite pl-buy"><i class="fas fa-shopping-cart"></i></a>';
               details += '<span class="text-muted price-'+type+'-'+response.artiste.album[i].id+'">&#8358;'+response.artiste.album[i].selling_price+'</span>';
               }
               details += '<a class="btn btn-icon rounded btn-more" data-type="album" data-id="'+response.artiste.album[i].track[0].id+'" data-src="'+response.artiste.album[i].track[0].src+'" data-title_url="'+response.artiste.album[i].url+'" data-artiste_url="'+artiste_url+'" data-artiste="'+more_artiste+'" data-title="'+response.artiste.album[i].title+'" data-image="'+response.artiste.album[i].image.thumbnail+'" data-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a>';
               details += '<div class="dropdown-menu pm-dropdown pull-right black lt"></div>';
               details += '</div>';
               details += '<div class="item-title text-ellipsis">';
               details += '<a href="'+response.artiste.album[i].url+'">'+response.artiste.album[i].title+'</a>';
               details += '</div>';
               details += '<div class="item-author text-sm text-ellipsis">';
               details += '<a href="'+artiste_url+'" class="text-muted">'+artiste+'</a>';
               details += '</div>';
               details += '</div>';
               details += '</div>';
               details += '</div>';
               for (var j = 0; j < Object.keys(response.artiste.album[i].track).length; j++) {
                 addToQueue(response.artiste.album[i].track[j]);
               }
              }
              details += '</div>';

            }

            if(response.artiste.ep != false) {
              details += '<h5 class="m-b">Eps</h5>';
              details += '<div class="row m-b">';
              for(var i = 0; i < Object.keys(response.artiste.ep).length; i++) {

                var favorite_class = 'far fa-heart'
                if(response.artiste.ep[i].favorite.favorite === true) {
                  favorite_class = 'fas fa-heart pl-playmode-txt';
                }

                var type = 'album';

                var artiste = response.artiste.ep[i].artiste[0].name,
                    more_artiste = artiste,
                    artiste_url = response.artiste.ep[i].artiste[0].url,
                    array_length = Object.keys(response.artiste.ep[i].artiste).length;
                if(array_length === 2) {
                   artiste_url = response.artiste.ep[i].collective_url;
                   artiste += ', '+response.artiste.ep[i].artiste[1].name;
                   more_artiste = artiste;
                }
                if(array_length > 2) {
                  artiste_url = response.artiste.ep[i].collective_url;
                  artiste = 'Several';
                  more_artiste = artiste;
                }


               details += '<div class="col-xs-12 col-sm-4">';
               details += '<div class="item r" data-id="'+response.artiste.ep[i].track[0].id+'" data-src="'+response.artiste.ep[i].track[0].src+'">';
               details += '<div class="item-media">';
               details += '<a href="'+response.artiste.ep[i].url+'" class="item-media-content" style="background-image: url('+response.artiste.ep[i].image.thumbnail+');"></a>';
               details += '<div class="item-overlay center">';
               details += '<button  class="btn-playpause">Play</button>';
               details += '</div></div>';
               details += '<div class="item-info">';
               details += '<div class="item-overlay bottom text-right">';

               details += '<a data-id='+response.artiste.ep[i].id+' data-type="'+type+'" class="btn btn-icon rounded btn-favorite pl-like"><i class="'+favorite_class+'"></i></a>';
               details += '<span class="text-muted pl-like-txt">'+response.artiste.ep[i].favorite.formatted_count+'</span>';
               if(response.artiste.ep[i].purchased != true) {
               details += '<a data-id='+response.artiste.ep[i].id+' data-type="album" class="btn btn-icon rounded btn-favorite pl-buy"><i class="fas fa-shopping-cart"></i></a>';
               details += '<span class="text-muted price-'+type+'-'+response.artiste.ep[i].id+'">&#8358;'+response.artiste.ep[i].selling_price+'</span>';
               }
               details += '<a class="btn btn-icon rounded btn-more" data-type="album" data-id="'+response.artiste.ep[i].track[0].id+'" data-src="'+response.artiste.ep[i].track[0].src+'" data-title_url="'+response.artiste.ep[i].url+'" data-artiste_url="'+artiste_url+'" data-artiste="'+more_artiste+'" data-title="'+response.artiste.ep[i].title+'" data-image="'+response.artiste.ep[i].image.thumbnail+'" data-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a>';
               details += '<div class="dropdown-menu pm-dropdown pull-right black lt"></div>';
               details += '</div>';
               details += '<div class="item-title text-ellipsis">';
               details += '<a href="'+response.artiste.ep[i].url+'">'+response.artiste.ep[i].title+'</a>';
               details += '</div>';
               details += '<div class="item-author text-sm text-ellipsis">';
               details += '<a href="'+artiste_url+'" class="text-muted">'+artiste+'</a>';
               details += '</div>';
               details += '</div>';
               details += '</div>';
               details += '</div>';
               for (var j = 0; j < Object.keys(response.artiste.ep[i].track).length; j++) {
                 addToQueue(response.artiste.ep[i].track[j]);
               }
              }
              details += '</div>';

            }

            if(response.artiste.mixtape != false) {

              details += '<h5 class="m-b">Mixtapes</h5>';
              details += '<div class="row m-b">';
              for(var i = 0; i < Object.keys(response.artiste.mixtape).length; i++) {

                var favorite_class = 'far fa-heart'
                if(response.artiste.mixtape[i].favorite.favorite === true) {
                  favorite_class = 'fas fa-heart pl-playmode-txt';
                }

                var type = 'album';

                var artiste = response.artiste.mixtape[i].artiste[0].name,
                    more_artiste = artiste,
                    artiste_url = response.artiste.mixtape[i].artiste[0].url,
                    array_length = Object.keys(response.artiste.mixtape[i].artiste).length;
                if(array_length === 2) {
                   artiste_url = response.artiste.mixtape[i].collective_url;
                   artiste += ', '+response.artiste.mixtape[i].artiste[1].name;
                   more_artiste = artiste;
                }
                if(array_length > 2) {
                  artiste_url = response.artiste.mixtape[i].collective_url;
                  artiste = 'Several';
                  more_artiste = artiste;
                }


               details += '<div class="col-xs-12 col-sm-4">';
               details += '<div class="item r" data-id="'+response.artiste.mixtape[i].track[0].id+'" data-src="'+response.artiste.mixtape[i].track[0].src+'">';
               details += '<div class="item-media">';
               details += '<a href="'+response.artiste.mixtape[i].url+'" class="item-media-content" style="background-image: url('+response.artiste.mixtape[i].image.thumbnail+');"></a>';
               details += '<div class="item-overlay center">';
               details += '<button  class="btn-playpause">Play</button>';
               details += '</div></div>';
               details += '<div class="item-info">';
               details += '<div class="item-overlay bottom text-right">';

               details += '<a data-id='+response.artiste.mixtape[i].id+' data-type="'+type+'" class="btn btn-icon rounded btn-favorite pl-like"><i class="'+favorite_class+'"></i></a>';
               details += '<span class="text-muted pl-like-txt">'+response.artiste.mixtape[i].favorite.formatted_count+'</span>';
               if(response.artiste.mixtape[i].purchased != true) {
               details += '<a data-id='+response.artiste.mixtape[i].id+' data-type="album" class="btn btn-icon rounded btn-favorite pl-buy"><i class="fas fa-shopping-cart"></i></a>';
               details += '<span class="text-muted price-'+type+'-'+response.artiste.mixtape[i].id+'">&#8358;'+response.artiste.mixtape[i].selling_price+'</span>';
               }
               details += '<a class="btn btn-icon rounded btn-more" data-type="album" data-id="'+response.artiste.mixtape[i].track[0].id+'" data-src="'+response.artiste.mixtape[i].track[0].src+'" data-title_url="'+response.artiste.mixtape[i].url+'" data-artiste_url="'+artiste_url+'" data-artiste="'+more_artiste+'" data-title="'+response.artiste.mixtape[i].title+'" data-image="'+response.artiste.mixtape[i].image.thumbnail+'" data-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a>';
               details += '<div class="dropdown-menu pm-dropdown pull-right black lt"></div>';
               details += '</div>';
               details += '<div class="item-title text-ellipsis">';
               details += '<a href="'+response.artiste.mixtape[i].url+'">'+response.artiste.mixtape[i].title+'</a>';
               details += '</div>';
               details += '<div class="item-author text-sm text-ellipsis">';
               details += '<a href="'+artiste_url+'" class="text-muted">'+artiste+'</a>';
               details += '</div>';
               details += '</div>';
               details += '</div>';
               details += '</div>';
               for (var j = 0; j < Object.keys(response.artiste.mixtape[i].track).length; j++) {
                 addToQueue(response.artiste.mixtape[i].track[j]);
               }
              }
              details += '</div>';

            }

            if(response.artiste.singles != false) {
              details += '<h5 class="m-b">Singles</h5>';
              details += '<div class="row m-b">';
              for(var i = 0; i < Object.keys(response.artiste.singles).length; i++) {

                var favorite_class = 'far fa-heart'
                if(response.artiste.singles[i].favorite.favorite != false) {
                  favorite_class = 'fas fa-heart pl-playmode-txt';
                }

                var type = 'music';

                var artiste = response.artiste.singles[i].artiste[0].name,
                    more_artiste = artiste,
                    artiste_url = response.artiste.singles[i].artiste[0].url,
                    array_length = Object.keys(response.artiste.singles[i].artiste).length;
                if(array_length === 2) {
                   artiste_url = response.artiste.singles[i].collective_url;
                   artiste += ', '+response.artiste.singles[i].artiste[1].name;
                   more_artiste = artiste;
                }
                if(array_length > 2) {
                  artiste_url = response.artiste.singles[i].collective_url;
                  artiste = 'Several';
                  more_artiste = artiste;
                }

                var title = response.artiste.singles[i].title,
                    array_length = Object.keys(response.artiste.singles[i].features).length;
                if(array_length  === 1) {
                 title += ' (feat. '+response.artiste.singles[i].features[0].name+')';
                 artiste_url = response.artiste.singles[i].collective_url
                }
                else if(array_length === 2) {
                  title += ' (feat. '+response.artiste.singles[i].features[0].name+', '+response.artiste.singles[i].features[1].name+')';
                  artiste_url = response.artiste.singles[i].collective_url;
                }
                else if(array_length > 2) {
                  title += ' (feat. Several)';
                  artiste_url = response.artiste.singles[i].collective_url;
                }


               details += '<div class="col-xs-6 col-sm-4 col-md-3">';
               details += '<div class="item r" data-id="item-'+response.artiste.singles[i].id+'" data-src="'+response.artiste.singles[i].url+'">';
               details += '<div class="item-media">';
               details += '<a href="'+response.artiste.singles[i].music_page+'" class="item-media-content" style="background-image: url('+response.artiste.singles[i].image.thumbnail+');"></a>';
               details += '<div class="item-overlay center">';
               details += '<button  class="btn-playpause">Play</button>';
               details += '</div></div>';
               details += '<div class="item-info">';
               details += '<div class="item-overlay bottom text-right">';

               details += '<a data-id='+response.artiste.singles[i].id+' data-type="'+type+'" class="btn btn-icon rounded btn-favorite pl-like"><i class="'+favorite_class+'"></i></a>';
               details += '<span class="text-muted pl-like-txt">'+response.artiste.singles[i].favorite.formatted_count+'</span>';
               if(response.artiste.singles[i].purchased != true) {
               details += '<a data-id='+response.artiste.singles[i].id+' data-type="'+type+'" class="btn btn-icon rounded btn-favorite pl-buy"><i class="fas fa-shopping-cart"></i></a>';
               details += '<span class="text-muted price-'+type+'-'+response.artiste.singles[i].id+'">&#8358;'+response.artiste.singles[i].selling_price+'</span>';
               }
               details += '<a class="btn btn-icon rounded btn-more" data-type="music" data-id="'+response.artiste.singles[i].id+'" data-src="'+response.artiste.singles[i].url+'" data-title_url="'+response.artiste.singles[i].music_page+'" data-artiste_url="'+artiste_url+'" data-artiste="'+more_artiste+'" data-title="'+title+'" data-image="'+response.artiste.singles[i].image.thumbnail+'" data-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a>';
               details += '<div class="dropdown-menu pm-dropdown pull-right black lt"></div>';
               details += '</div>';
               details += '<div class="item-title text-ellipsis">';
               details += '<a href="'+response.artiste.singles[i].music_page+'">'+title+'</a>';
               details += '</div>';
               details += '<div class="item-author text-sm text-ellipsis">';
               details += '<a href="'+artiste_url+'" class="text-muted">'+artiste+'</a>';
               details += '</div>';
               details += '</div>';
               details += '</div>';
               details += '</div>';
              }
              details += '</div>';

            }
            details += '</div>';
            details += '<div class="tab-pane" id="tab_2" style="min-height:220px;">';
            details += '<h6 class="m-b pl-music-page__artiste">';
            details += '<span class="text-muted">Contents by </span>';
            details += '<a href="#" data-pjax class="item-author _600">'+response.artiste.name+'</a>';
            details += '</h6>';
            details += '<div id="tracks" class="row item-list item-list-xs item-list-li m-b">';

            for(var i = 0; i < Object.keys(response.artiste.tracks).length; i++) {
              var favorite_class = 'far fa-heart',
                  type = 'music';
              if(response.artiste.tracks[i].meta.like === true) {
                favorite_class = 'fas fa-heart pl-playmode-txt';
              }

              details += '<div class="col-xs-12">';
              details += '<div class="item r" data-id="'+response.artiste.tracks[i].id+'" data-src="'+response.artiste.tracks[i].src+'">';
              details += '<div class="item-media">';
              details += '<a href="'+response.artiste.tracks[i].link+'" class="item-media-content" style="background-image: url('+response.artiste.tracks[i].thumb.src+');"></a>';
              details += '<div class="item-overlay center">';
              details += '<button  class="btn-playpause">Play</button>';
              details += '</div></div>';
              details += '<div class="item-info">';
              details += '<div class="item-overlay bottom text-right">';
              var exploded = response.artiste.tracks[i].id.split('-');
              var id = exploded[1];
              details += '<a data-id="'+id+'" data-type="'+type+'" class="btn btn-icon btn-favorite rounded pl-like"><i class="'+favorite_class+'"></i></a>';
              details += '<a class="btn btn-icon rounded btn-more" data-type="music" data-id="'+response.artiste.tracks[i].id+'" data-src="'+response.artiste.tracks[i].src+'" data-title_url="'+response.artiste.tracks[i].link+'" data-artiste_url="'+response.artiste.tracks[i].meta.autorLink+'" data-artiste="'+response.artiste.tracks[i].meta.author+'" data-title="'+response.artiste.tracks[i].title+'" data-image="'+response.artiste.tracks[i].thumb.src+'" data-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a>';
              details += '<div class="dropdown-menu pm-dropdown pull-right black lt"></div>';
              details += '</div>';
              details += '<div class="item-title text-ellipsis">';
              details += '<a href="'+response.artiste.tracks[i].link+'">'+response.artiste.tracks[i].title+'</a>';
              details += '</div>';
              details += '<div class="item-author text-sm text-ellipsis hide">';
              details += '<a href="#" class="text-muted">'+response.artiste.tracks[i].meta.author+'</a>';
              details += '</div>';
              details += '<div class="item-meta text-sm text-muted">';
              details += '<span class="item-meta-right">'+response.artiste.tracks[i].meta.duration+'</span>';
              details += '</div></div></div></div>';
              addToQueue(response.artiste.tracks[i]);
            }
            details += '</div></div></div>';
            $('#content_info > .padding').html(details);
        }
        else {
          var no_content = '<p style="text-align:center;"><i class="material-icons" style="font-size:60px;">library_music</i><span style="margin-top:20px; font-size:20px; display:block;">No content yet.</span></p>';
          $('#content_info > .padding').html(no_content);
        }

         //let us reduce processes
         checkProcesses('#player_preloader');
        }
        else if(response.success === false) {

          }
      },
      error: function(xhr, desc, err) {
        failed_process++;
        if(failed_process < 5) {
          getArtisteBy(slug);
         }
         else {
           iziToast.warning({
                title: 'Network',
                message: 'Please check your internet connection.'
              });
         }
        }
    });

  }

  function getArtistesBySlug(slug, for_c) {
    $.ajax({
      type: 'get',
      url: home_url+'api/artiste',
      dataType: 'text',
      data: {auth_id: auth_id, user_id: user_id, user_session: user_session, type: 'components', action: 'fetch', slug: slug, for: for_c},
      success: function (data, status) {
        var response = JSON.parse(data);
        if(response.success === true) {
          //let us set page title
          $('head > title').html(response.page_title+' on Playmode');
           var details = "";
           details += '<div class="page-title m-b">';
           details += '<h1 class="inline m-a-0 pl-main__header"><a class="pl-checker" href="'+response.music_page+'">'+response.page_title+' <i class="material-icons">keyboard_arrow_right</i></a></h1>';
           details += '</div>';
           details += '<div class="row" style="margin-bottom:20px;">';
          for(var i = 0; i < Object.keys(response.artiste).length; i++) {
           details += '<div class="col-md-6">';
           details += '<div class="pl-artist-tile">';
           details += '<div class="header" style="background-image: url('+response.artiste[i].avatar.url+');">';
           details += '<div class="row-col">';
           details += '<div class="col-xs w w-auto-x m-b">';
           details += '<div class="item w rounded pl-img-bordered pl-img-100">';
           details += '<div class="item-media">';
           details += '<div class="item-media-content" style="background-image: url('+response.artiste[i].avatar.thumbnail+');">';
           details += '</div></div></div></div>';
           var verify_icon = '<label class="material-icons text-primary text-md pl-artiste-card-v-text" title="Verified">check_circle</label>';
           if(response.artiste[i].status === 'self_verified') {
              verify_icon = '<label class="material-icons text-success text-md pl-artiste-card-v-text" title="Verified">check_circle</label>';
            }

            var followers = '',
                follow_text = 'followers',
                follow_count_class = 'flw-'+response.artiste[i].id;
            if(response.artiste[i].relationship.followers == 1 || response.artiste[i].relationship.followers == 0) {
              follow_text = 'follower';
            }

            var follow_color = ' pl-followed',
                follow_direction = 'Following';

            if(response.artiste[i].relationship.followed == false) {
             follow_color = ' b-primary text-primary pl-flw-outline',
             follow_direction = 'Follow';
             }

             details += '<div class="col-xs clearfix"><button class="btn rounded pull-right pl-flw-btn '+follow_color+'" data-type="user_artiste" data-action="update_relationship" data-id="'+response.artiste[i].id+'" style="margin-top:50px; margin-right:20px;">'+follow_direction+'</button></div></div>';
             details += '</div>';
             details += '<div class="body">';
             details += '<div>';
             details += '<h2 class="inline pl-artiste-card"><a href="'+response.artiste[i].url+'">'+response.artiste[i].name+'</a></h2>';
             details += ' '+verify_icon;
             details += '</div>';
             details += '<span class="pl-flwr-text '+follow_count_class+'">'+response.artiste[i].relationship.followers+' '+follow_text+'</span>';
             details += '<p>'+response.artiste[i].bio+'</p>';
             details += '<div class="row discography">';
             var album_text = 'album',
                 track_text = 'tracks',
                 chart_text = '#0',
                 position = '#0';
             if(response.artiste[i].album_length > 1) {
               album_text = 'albums';
             }
             if(response.artiste[i].track_length < 2) {
               track_text = 'track';
             }
             if(response.artiste[i].charts_position != '~') {
               chart_text = '#'+response.artiste[i].charts_position;
               position = chart_text;
             }

             details += '<div class="col-xs-4" title="'+response.artiste[i].album_length+' '+album_text+'">';
             details += response.artiste[i].album_length+' <i class="material-icons">album</i>';
             details += '</div>';
             details += '<div class="col-xs-4" title="'+response.artiste[i].track_length+' '+track_text+'">';
             details += response.artiste[i].track_length+' <i class="material-icons">audiotrack</i>';
             details += '</div>';
             details += '<div class="col-xs-4" title="'+chart_text+' '+'on artiste charts">';
             details += position+' <i class="material-icons">trending_up</i>';
             details += '</div>';
             details += '</div></div></div></div>';
          }
          details += '</div>';
          if(Object.keys(response.also_by).length > 0) {
          details += '<h2 class="widget-title h4 m-b pl-sections__header"><a class="pl-checker" href="#">Also by artistes <i class="material-icons">keyboard_arrow_right</i></a></h2>';
          details += '<div class="owl-carousel owl-theme owl-dots-center" id="also_by_artistes_place">';

          for (var i = 0; i < Object.keys(response.also_by).length; i++) {
            var favorite_class = 'far fa-heart';
            if(response.also_by[i].favorite.favorite === true) {
              favorite_class = 'fas fa-heart pl-playmode-txt';
            }
            var type = 'music';
            var artiste = response.also_by[i].artiste[0].name,
                more_artiste = response.also_by[i].artiste[0].name,
                artiste_url = response.also_by[i].artiste[0].url,
                array_length = Object.keys(response.also_by[i].artiste).length;
            if(array_length === 2) {
               artiste_url = response.also_by[i].collective_url;
               artiste += ', '+response.also_by[i].artiste[1].name;
               more_artiste = artiste;
            }
            if(array_length > 2) {
              artiste_url = response.also_by[i].collective_url;
              artiste = 'Several';
              more_artiste = artiste;
            }

            var title = response.also_by[i].title,
                array_length = Object.keys(response.also_by[i].features).length;
            if(array_length  === 1) {
             title += ' (feat. '+response.also_by[i].features[0].name+')';
             artiste_url = response.also_by[i].collective_url;
            }
            else if(array_length === 2) {
              title += ' (feat. '+response.also_by[i].features[0].name+', '+response.also_by[i].features[1].name+')';
              artiste_url = response.also_by[i].collective_url;
            }
            else if(array_length > 2) {
              title += ' (feat. Several)';
              artiste_url = response.also_by[i].collective_url;
            }

            details += '<div class="">';
            details += '<div class="item r" data-id="item-'+response.also_by[i].id+'" data-src="'+response.also_by[i].url+'">';
            details += '<div class="item-media">';
            details += '<a href="#" class="item-media-content" style="background-image: url('+response.also_by[i].image.thumbnail+');"></a>';
            details += '<div class="item-overlay center">';
            details += '<button class="btn-playpause">Play</button>';
            details += '</div>';
            details += '</div>';
            details += '<div class="item-info">';
            details += '<div class="item-overlay bottom text-right">';
            details += '<a data-id='+response.also_by[i].id+' data-type="'+type+'" class="btn btn-icon rounded btn-favorite pl-like"><i class="'+favorite_class+'"></i></a>';
            details += '<span class="text-muted pl-like-txt">'+response.also_by[i].favorite.formatted_count+'</span>';
            if(response.also_by[i].purchased === false) {
              details += '<a data-id='+response.also_by[i].id+' class="btn btn-icon rounded btn-favorite pl-buy"><i class="fas fa-shopping-cart"></i></a>';
              details += '<span class="text-muted price-'+type+'-'+response.also_by[i].id+'">&#8358;'+response.also_by[i].selling_price+'</span>';
            }
            details += '<a class="btn btn-icon rounded btn-more" data-type="music" data-id="'+response.also_by[i].id+'" data-src="'+response.also_by[i].url+'" data-title_url="'+response.also_by[i].music_page+'" data-artiste_url="'+artiste_url+'" data-artiste="'+more_artiste+'" data-title="'+response.also_by[i].title+'" data-image="'+response.also_by[i].image.thumbnail+'" data-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a>';
            details += '<div class="dropdown-menu pm-dropdown pull-right black lt"></div>';
            details += '</div>';
            details += '<div class="item-title text-ellipsis">';
            details += '<a href="'+response.also_by[i].music_page+'">'+title+'</a>';
            details += '</div>';
            details += '<div class="item-author text-sm text-ellipsis">';
            details += '<a href="'+artiste_url+'" class="text-muted">'+artiste+'</a>'
            details += '</div>';
            details += '</div>';
            details += '</div>';
            details += '</div>';
          }
          details += '</div>';
        }
          $('#components_artistes > .padding').prepend(details);
          if(Object.keys(response.also_by).length > 0) {
          $('#also_by_artistes_place').owlCarousel({
            margin: 20,
           autoplay: true,
            responsiveClass:true,
              responsive:{
                0:{
                  items: 2
                },
                  543:{
                      items: 4
                  }
              }
          });
        }

         //let us reduce processes
         checkProcesses('#player_preloader');
        }
        else if(response.success === false) {

          }
      },
      error: function(xhr, desc, err) {
          console.log(xhr);
          console.log("Details: " + desc + "\nError:" + err);
        }
    });

  }

  function getLatestGenreTracks(offset, limit, selector, slug) {
    $.ajax({
      type: 'get',
      url: '../api/music',
      dataType: 'text',
      data: {offset: offset, limit: limit, auth_id: auth_id, user_id: user_id, user_session: user_session, type: 'moods_items', slug: slug, action: 'fetch'},
      success: function (data, status) {
        var response = JSON.parse(data);
        if(response.success === true) {
          //let us set some to use later
          if(response.remaining < 1) {
            $('#latest_genre_load_more').css('display', 'none');
          }
          browse_offset = response.pointer;
          if(response.remaining > $('#limit').val()) {
            browse_limit = $('#limit').val();
          }
          else {
            browse_limit = response.remaining;
          }
          //let us add background image
          $('.page-bg').css("background-image", "url('"+response.mood.image.url+"')");
          var mood = "";
          mood = '<div class="padding b-b">';
          mood += '<div class="row-col">';
          mood += '<div class="col-sm w w-auto-xs m-b">';
          mood += '<div class="item w rounded pl-img-bordered">';
          mood += '<div class="item-media">';
          mood += '<div class="item-media-content" style="background-image: url('+response.mood.image.thumbnail+')"></div>';
          mood += '</div></div></div>';
          mood += '<div class="col-sm">';
          mood += '<div class="p-l-md no-padding-xs">';
          mood += '<div class="page-title">';
          mood += '<h1 class="inline pl-display-page__header">'+response.mood.name+'</h1>';
          mood += '</div>';
          mood += '<p class="item-desc text-ellipsis text-muted" data-ui-toggle-class="text-ellipsis">'+response.mood.description+'</p>'
          mood += '<div class="item-action m-b">';
          mood += '<button class="btn-playpause text-primary m-r-sm"></button>';

         var album_text = 'album',
             track_text = 'tracks';
        if(response.mood.album_length > 1) {
            album_text = 'albums';
         }
        if(response.mood.track_length < 2) {
           track_text = 'track';
          }
        var followers = '';
     if(response.mood.name != "All") {
        var follow_text = 'followers',
            follow_count_class = 'flw-'+response.mood.id;
          if(response.mood.relationship.followers == 1 || response.mood.relationship.followers == 0) {
            follow_text = 'follower';
          }

          followers = ', <i class="material-icons '+follow_count_class+'" title="'+response.mood.relationship.followers+' '+follow_text+'">people</i> <span>'+response.mood.relationship.followers+'</span>';

          var follow_color = 'pl-followed',
              follow_direction = 'Following';
          if(response.mood.relationship.followed === false) {
              follow_color = ' b-primary text-primary pl-flw-outline',
              follow_direction = 'Follow';
          }
      }
      mood += '<span><i class="material-icons" title="'+response.mood.album_length+' '+album_text+'">album</i> '+response.mood.album_length+', <i class="material-icons" title="'+response.mood.track_length+' '+track_text+'">audiotrack</i> '+response.mood.track_length+followers+'</span>';
      if(response.mood.name != 'All') {
      mood += '<button class="btn rounded m-l-sm pl-flw-btn '+follow_color+'" data-type="user_genre" data-action="update_relationship" data-id="'+response.mood.id+'">'+follow_direction+'</button>';
     }
      mood += '</div>';

      mood += '<div class="block clearfix m-b">';

      mood += '</div></div></div></div>';
      $('.page-content').prepend(mood);

          var latest_releases = "";
          for (var i = 0; i < Object.keys(response.latest_releases).length; i++) {
            var favorite_class = 'far fa-heart';
            if(response.latest_releases[i].favorite.favorite === true) {
              favorite_class = 'fas fa-heart pl-playmode-txt';
            }
            var type = 'music';

            var artiste = response.latest_releases[i].artiste[0].name,
                more_artiste = response.latest_releases[i].artiste[0].name,
                artiste_url = response.latest_releases[i].artiste[0].url,
                array_length = Object.keys(response.latest_releases[i].artiste).length;
            if(array_length === 2) {
               artiste_url = response.latest_releases[i].collective_url;
               artiste += ', '+response.latest_releases[i].artiste[1].name;
               more_artiste = artiste;
            }
            if(array_length > 2) {
              artiste_url = response.latest_releases[i].collective_url;
              artiste = 'Several';
              more_artiste = artiste;
            }

            var title = response.latest_releases[i].title,
                array_length = Object.keys(response.latest_releases[i].features).length;
            if(array_length  === 1) {
             title += ' (feat. '+response.latest_releases[i].features[0].name+')';
             artiste_url = response.latest_releases[i].collective_url;
            }
            else if(array_length === 2) {
              title += ' (feat. '+response.latest_releases[i].features[0].name+', '+response.latest_releases[i].features[1].name+')';
              artiste_url = response.latest_releases[i].collective_url;
            }
            else if(array_length > 2) {
              title += ' (feat. Several)';
              artiste_url = response.latest_releases[i].collective_url;
            }

            latest_releases += '<div class="col-xs-6 col-sm-4 col-md-3">';
            latest_releases += '<div class="item r" data-id="item-'+response.latest_releases[i].id+'" data-src="'+response.latest_releases[i].url+'">';
            latest_releases += '<div class="item-media">';
            latest_releases += '<a href="#" class="item-media-content" style="background-image: url('+response.latest_releases[i].image.thumbnail+');"></a>';
            latest_releases += '<div class="item-overlay center">';
            latest_releases += '<button class="btn-playpause">Play</button>';
            latest_releases += '</div>';
            latest_releases += '</div>';
            latest_releases += '<div class="item-info">';
            latest_releases += '<div class="item-overlay bottom text-right">';
            latest_releases += '<a data-id='+response.latest_releases[i].id+' data-type="'+type+'" class="btn btn-icon rounded btn-favorite pl-like"><i class="'+favorite_class+'"></i></a>';
            latest_releases += '<span class="text-muted pl-like-txt">'+response.latest_releases[i].favorite.formatted_count+'</span>';
             if(response.latest_releases[i].purchased === false) {
            latest_releases += '<a data-id='+response.latest_releases[i].id+' data-type="'+type+'" class="btn btn-icon rounded btn-favorite pl-buy"><i class="fas fa-shopping-cart"></i></a>';
            latest_releases += '<span class="text-muted price-'+type+'-'+response.latest_releases[i].id+'">&#8358;'+response.latest_releases[i].selling_price+'</span>';
             }
            latest_releases += '<a class="btn btn-icon rounded btn-more" data-type="music" data-id="'+response.latest_releases[i].id+'" data-src="'+response.latest_releases[i].url+'" data-title_url="'+response.latest_releases[i].music_page+'" data-artiste_url="'+artiste_url+'" data-artiste="'+more_artiste+'" data-title="'+response.latest_releases[i].title+'" data-image="'+response.latest_releases[i].image.thumbnail+'" data-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a>';
            latest_releases += '<div class="dropdown-menu pm-dropdown pull-right black lt"></div>';
            latest_releases += '</div>';
            latest_releases += '<div class="item-title text-ellipsis">';
            latest_releases += '<a href="'+response.latest_releases[i].music_page+'">'+title+'</a>';
            latest_releases += '</div>';
            latest_releases += '<div class="item-author text-sm text-ellipsis">';
            latest_releases += '<a href="'+artiste_url+'" class="text-muted">'+artiste+'</a>'
            latest_releases += '</div>';
            latest_releases += '</div>';
            latest_releases += '</div>';
            latest_releases += '</div>';
            //addToQueue
            var obj = {
                meta: {
                   author: artiste
                  ,authorlink : artiste_url
                  ,like: response.latest_releases[i].favorite.favorite
                }
                ,src: response.latest_releases[i].url
                ,thumb: {
                  src: response.latest_releases[i].image.thumbnail
                }
                ,title: title
                ,link: response.latest_releases[i].music_page
                ,id: 'item-'+response.latest_releases[i].id
            };
            addToQueue(obj);
          }
         $(selector).append(latest_releases);
         //let us reduce processes
         checkProcesses('#player_preloader');
        }
        else if(response.success === false) {

          }
      },
      error: function(xhr, desc, err) {
          console.log(xhr);
          console.log("Details: " + desc + "\nError:" + err);
        }
    });

  }

  function addToLatestTracks(offset, limit, selector, slug) {
    $('#latest_genre_load_more').html('Loading...').prop('disabled', true);
    $.ajax({
      type: 'get',
      url: '../api/music',
      dataType: 'text',
      data: {offset: offset, limit: limit, auth_id: auth_id, user_id: user_id, user_session: user_session, type: 'moods_items', slug: slug, action: 'fetch'},
      success: function (data, status) {
        var response = JSON.parse(data);
        $('#latest_genre_load_more').html('Show More').prop('disabled', false);
        if(response.success === true) {
          failed_process = 0;
          //let us set some to use later
          if(response.remaining < 1) {
            $('#latest_genre_load_more').css('display', 'none');
          }
          browse_offset = response.pointer;
          if(response.remaining > $('#limit').val()) {
            browse_limit = $('#limit').val();
          }
          else {
            browse_limit = response.remaining;
          }
          var latest_releases = "";
          for (var i = 0; i < Object.keys(response.latest_releases).length; i++) {
            var favorite_class = 'far fa-heart';
            if(response.latest_releases[i].favorite.favorite === true) {
              favorite_class = 'fas fa-heart pl-playmode-txt';
            }
            var type = 'music';

            var artiste = response.latest_releases[i].artiste[0].name,
                more_artiste = response.latest_releases[i].artiste[0].name,
                artiste_url = response.latest_releases[i].artiste[0].url,
                array_length = Object.keys(response.latest_releases[i].artiste).length;
            if(array_length === 2) {
               artiste_url = response.latest_releases[i].collective_url;
               artiste += ', '+response.latest_releases[i].artiste[1].name;
               more_artiste = artiste;
            }
            if(array_length > 2) {
              artiste_url = response.latest_releases[i].collective_url;
              artiste = 'Several';
              more_artiste = artiste;
            }

            var title = response.latest_releases[i].title,
                array_length = Object.keys(response.latest_releases[i].features).length;
            if(array_length  === 1) {
             title += ' (feat. '+response.latest_releases[i].features[0].name+')';
             artiste_url = response.latest_releases[i].collective_url;
            }
            else if(array_length === 2) {
              title += ' (feat. '+response.latest_releases[i].features[0].name+', '+response.latest_releases[i].features[1].name+')';
              artiste_url = response.latest_releases[i].collective_url;
            }
            else if(array_length > 2) {
              title += ' (feat. Several)';
              artiste_url = response.latest_releases[i].collective_url;
            }

            latest_releases += '<div class="col-xs-6 col-sm-4 col-md-3">';
            latest_releases += '<div class="item r" data-id="item-'+response.latest_releases[i].id+'" data-src="'+response.latest_releases[i].url+'">';
            latest_releases += '<div class="item-media">';
            latest_releases += '<a href="#" class="item-media-content" style="background-image: url('+response.latest_releases[i].image.thumbnail+');"></a>';
            latest_releases += '<div class="item-overlay center">';
            latest_releases += '<button class="btn-playpause">Play</button>';
            latest_releases += '</div>';
            latest_releases += '</div>';
            latest_releases += '<div class="item-info">';
            latest_releases += '<div class="item-overlay bottom text-right">';
            latest_releases += '<a data-id='+response.latest_releases[i].id+' data-type="'+type+'" class="btn btn-icon rounded btn-favorite pl-like"><i class="'+favorite_class+'"></i></a>';
            latest_releases += '<span class="text-muted pl-like-txt">'+response.latest_releases[i].favorite.formatted_count+'</span>';
             if(response.latest_releases[i].purchased === false) {
            latest_releases += '<a data-id='+response.latest_releases[i].id+' data-type="'+type+'" class="btn btn-icon rounded btn-favorite pl-buy"><i class="fas fa-shopping-cart"></i></a>';
            latest_releases += '<span class="text-muted price-'+type+'-'+response.latest_releases[i].id+'">&#8358;'+response.latest_releases[i].selling_price+'</span>';
             }
            latest_releases += '<a class="btn btn-icon rounded btn-more" data-type="music" data-id="'+response.latest_releases[i].id+'" data-src="'+response.latest_releases[i].url+'" data-title_url="'+response.latest_releases[i].music_page+'" data-artiste_url="'+artiste_url+'" data-artiste="'+more_artiste+'" data-title="'+response.latest_releases[i].title+'" data-image="'+response.latest_releases[i].image.thumbnail+'" data-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a>';
            latest_releases += '<div class="dropdown-menu pm-dropdown pull-right black lt"></div>';
            latest_releases += '</div>';
            latest_releases += '<div class="item-title text-ellipsis">';
            latest_releases += '<a href="'+response.latest_releases[i].music_page+'">'+title+'</a>';
            latest_releases += '</div>';
            latest_releases += '<div class="item-author text-sm text-ellipsis">';
            latest_releases += '<a href="'+artiste_url+'" class="text-muted">'+artiste+'</a>'
            latest_releases += '</div>';
            latest_releases += '</div>';
            latest_releases += '</div>';
            latest_releases += '</div>';
            //addToQueue
            var obj = {
                meta: {
                   author: artiste
                  ,authorlink : artiste_url
                  ,like: response.latest_releases[i].favorite.favorite
                }
                ,src: response.latest_releases[i].url
                ,thumb: {
                  src: response.latest_releases[i].image.thumbnail
                }
                ,title: title
                ,link: response.latest_releases[i].music_page
                ,id: 'item-'+response.latest_releases[i].id
            };
            addToQueue(obj);
          }
         $(selector).append(latest_releases);
        }
        else if(response.success === false) {
            //run again
            addToLatestTracks(browse_offset, browse_limit, '#latest_genre_releases', $('#slug').val());
          }
      },
      error: function(xhr, desc, err) {
        $('#latest_genre_load_more').html('Show More').prop('disabled', false);
         /* we rerun again */
         failed_processs++;
         if(failed_process < 5) {
           addToLatestTracks(browse_offset, browse_limit, '#latest_genre_releases', $('#slug').val());
          }
          else {
            iziToast.warning({
                 title: 'Network',
                 message: 'Please check your internet connection.'
               });
          }
        }
    });

  }

  function fetchPlaylists(offset, limit) {
    $.ajax({
      type: 'get',
      url: home_url+'api/playlist',
      dataType: 'text',
      data: {auth_id: auth_id, user_id: user_id, user_session: user_session, type: 'user', action: 'fetch'},
      success: function (data, status) {
        var response = JSON.parse(data);
        if(response.success === true) {
           var playlist_content = "";
           for (var i = 0; i < Object.keys(response.playlists).length; i++) {
             playlist_content += '<a class="list-group-item p-x-md pl-playlist" data-id='+response.playlists[i].id+'>';
             playlist_content += '<i class="far fa-folder fa-fw text-left pl-font-size-18"></i> <span class="font-bold">'+response.playlists[i].name+'</span>';
             playlist_content += '</a>';
           }
           $('.playlist-content__start').append(playlist_content);

           playlist_offset = response.fetched_items;
           if(response.remaining > 0) {
             $('.start_playlist_load').css('display', 'block');
           }
           else {
             $('.start_playlist_load').css('display', 'none');
           }
          failed_process = 0;
          playlist_loaded = true;
        }
        else if(response.success === false) {
          if(response.error != false) {
          for (var i = 0; i < Object.keys(response.error).length; i++) {
            iziToast.warning({
                 title: 'Warning',
                 message: response.error[i].info,
               });
             if(response.error[i].code === 407) {
               $('#sign_in_modal').modal('show');
             }
           }
          }
        }
      },
      error: function(xhr, desc, err) {
        failed_process++;
        if(failed_process < 5) {
          fetchPlaylists(offset, limit);
         }
         else {
           iziToast.warning({
                title: 'Network',
                message: 'Please check your internet connection.'
              });
         }
        }
    });
  }

  function addMusicToPlaylist(music_id, playlist_id) {
    $.ajax({
      type: 'post',
      url: home_url+'api/playlist',
      dataType: 'text',
      data: {auth_id: auth_id, user_id: user_id, user_session: user_session, type: 'music', action: 'add', music_id: music_id, id:playlist_id},
      success: function (data, status) {
        var response = JSON.parse(data);
        if(response.success === true) {
          failed_process = 0;
          iziToast.success({
               title: 'Success',
               message: response.info,
             });
        }
        else if(response.success === false) {
          if(response.error != false) {
          for (var i = 0; i < Object.keys(response.error).length; i++) {
            iziToast.warning({
                 title: 'Warning',
                 message: response.error[i].info,
               });
           }
          }
        }
        $('#start_playlist').modal('hide');
      },
      error: function(xhr, desc, err) {
        failed_process++;
        if(failed_process < 5) {
          addMusicToPlaylist(music_id, playlist_id);
         }
         else {
           iziToast.warning({
                title: 'Network',
                message: 'Please check your internet connection.'
              });
         }
        }
    });
  }

  function deleteMusicFromPlaylist(music_id, playlist_id) {
    $.ajax({
      type: 'post',
      url: home_url+'api/playlist',
      dataType: 'text',
      data: {auth_id: auth_id, user_id: user_id, user_session: user_session, type: 'track', action: 'delete', music_id: music_id, id:playlist_id},
      success: function (data, status) {
        var response = JSON.parse(data);
        if(response.success === true) {
          failed_process = 0;
          iziToast.success({
               title: 'Success',
               message: response.info,
             });
          window.location.reload();
        }
        else if(response.success === false) {
          if(response.error != false) {
          for (var i = 0; i < Object.keys(response.error).length; i++) {
            iziToast.warning({
                 title: 'Warning',
                 message: response.error[i].info,
               });
           }
          }
        }
      },
      error: function(xhr, desc, err) {
        failed_process++;
        if(failed_process < 5) {
          deleteMusicFromPlaylist(music_id, playlist_id);
         }
         else {
           iziToast.warning({
                title: 'Network',
                message: 'Please check your internet connection.'
              });
         }
        }
    });
  }

  function deletePlaylist(playlist_id) {
    $.ajax({
      type: 'post',
      url: home_url+'api/playlist',
      dataType: 'text',
      data: {auth_id: auth_id, user_id: user_id, user_session: user_session, type: 'playlist', action: 'delete', id: playlist_id},
      success: function (data, status) {
        var response = JSON.parse(data);
        if(response.success === true) {
          failed_process = 0;
          iziToast.success({
               title: 'Success',
               message: response.info,
             });
          window.location.replace(home_url);
        }
        else if(response.success === false) {
          if(response.error != false) {
          for (var i = 0; i < Object.keys(response.error).length; i++) {
            iziToast.warning({
                 title: 'Warning',
                 message: response.error[i].info,
               });
           }
          }
        }
      },
      error: function(xhr, desc, err) {
        failed_process++;
        if(failed_process < 5) {
          deletePlaylist(playlist_id);
         }
         else {
           iziToast.warning({
                title: 'Network',
                message: 'Please check your internet connection.'
              });
         }
        }
    });
  }

  function editPlaylist(playlist_id) {
    $.ajax({
      type: 'get',
      url: home_url+'api/playlist',
      dataType: 'text',
      data: {auth_id: auth_id, user_id: user_id, user_session: user_session, type: 'single', action: 'fetch', id: playlist_id},
      success: function (data, status) {
        var response = JSON.parse(data);
        if(response.success === true) {
          failed_process = 0;
          $('#playlist_action').val('update');
          $('#playlist_id').val(response.id);
          $('#playlist_name').val(response.name);
          if(response.description != null) {
            $('#playlist_description').val(response.description);
          }
          if(response.type === 'private') {
            $('#playlist_type').prop('checked', true);
          }
          $('#playlist_img').css("background-image", "url("+response.image.thumbnail+")");

          $('#cancel_playlist_btn').html('Delete');
          $('#cancel_playlist_btn').data('id', response.id);
          $('#cancel_playlist_btn').data('action', 'delete');
          $('#create_playlist_btn').html('Update');
          $('#cancel_playlist_btn').removeAttr('data-dismiss');
          $('#create_playlist').modal('show');
        }
        else if(response.success === false) {
          if(response.error != false) {
          for (var i = 0; i < Object.keys(response.error).length; i++) {
            iziToast.warning({
                 title: 'Warning',
                 message: response.error[i].info,
               });
           }
          }
        }
      },
      error: function(xhr, desc, err) {
        failed_process++;
        if(failed_process < 5) {
          editPlaylist(playlist_id);
         }
         else {
           iziToast.warning({
                title: 'Network',
                message: 'Please check your internet connection.'
              });
         }
        }
    });
  }

  function pastDate(days) {
    var date = new Date(),
        return_date;
    date.setDate(date.getDate() - days);
    date = date.toISOString();
    return_date = date.substring(0,10);

    return return_date;
  }

  function checkProcesses(preloader_selector) {
    if(processes === 0) {
      $(preloader_selector).detach();
    }
    else {
      processes -= 1;
      if(processes === 0) {
        $(preloader_selector).detach();
      }
    }
  }

 var clipboard = new ClipboardJS('.pl-link-copy');

 clipboard.on('success', function(e) {
   iziToast.success({
        title: 'Copied',
        message: 'Link copied to clipboard!'
      });
   e.clearSelection();
 });

 function disableButton(btn, text) {
   $(btn).prop('disabled', true).html(text);
 }

 function enableButton(btn, text) {
   $(btn).prop('disabled', false).html(text);
 }

})(jQuery);
