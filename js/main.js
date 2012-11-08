(function(){

	swfobject.registerObject("myId", "9.0.0", "expressInstall.swf");
  
  var YOUTUBE = {
    ready: false,

    onYouTubePlayerReady: function(id) {
      YOUTUBE.ready = true;
      var freeman = FREEMAN.current,
          player = $('#' + id)[0];
      player.seekTo(freeman.timeStart, true);
      player.playVideo();
      player.addEventListener("onStateChange", "onYouTubeStateChange");
      var interval = setInterval(function(){
        if (player.getCurrentTime() > freeman.timeEnd) {
          clearInterval(interval);
          YOUTUBE.endVideo();
        }
      }, 250);
    },

    getCurrentPlayer: function(){
      return $('#' + FREEMAN.current.id)[0];
    },

    beginVideo: function(freeman) {
      $wrapper = FREEMAN.wrapperEl(freeman);
      $wrapper.append(YOUTUBE.embed(freeman));
    },

    endVideo: function() {
      FREEMAN.endVideo();
    },

    imageUrl: function(freeman) {
      var picNumber = freeman.picNumber || 0;
      return "http://img.youtube.com/vi/" + freeman.id + "/" + picNumber + ".jpg";
    },
    
    videoUrl: function(freeman) {
      return "http://www.youtube.com/v/" + freeman.id + "?version=3&enablejsapi=1&playerapiid=" + freeman.id
    },

    onStateChange: function(state) {
      // if video is ended, paused, or queued (we called stopVideo)
      if (0 == state || 2 == state || 5 == state) {
        YOUTUBE.endVideo();
      }
    },

    embed: function(freeman) {
      $wrapper = FREEMAN.wrapperEl(freeman);
      var video = [
        '<object width="' + $wrapper.width() + '" height="' + $wrapper.height() + '">',
          '<param name="movie" value="https://www.youtube.com/v/' + freeman.id + '?version=3&enablejsapi=1&playerapiid=' + freeman.id + '"></param>',
          '<param name="allowFullScreen" value="true"></param>',
          '<param name="allowScriptAccess" value="always"></param>',
          '<embed id="' + freeman.id + '" src="' + YOUTUBE.videoUrl(freeman) + '" type="application/x-shockwave-flash" allowfullscreen="true" allowScriptAccess="always" width="' + $wrapper.width() + '" height="' + $wrapper.height() + '"></embed>',
        '</object>'
      ];
      return video.join('')
    }
  };

  var FREEMAN = {
    current: null,

    initialize: function(index, element) {
      if (index < FREEMAN.VIDEOS.length) {
        var $el = $(element),
            freeman = FREEMAN.VIDEOS[index];
        freeman.wrapperId = 'freeman-wrapper-' + index;
        freeman.index = index;
        $el.attr('id', freeman.wrapperId);
        FREEMAN.displayImageView(freeman);
        $el.click(function(){
          FREEMAN.startVideo(freeman);
        });
      }
    },

    wrapperEl: function(freeman) {
      return $('#' + freeman.wrapperId);
    },

    displayImageView: function(freeman) {
      var $el = FREEMAN.wrapperEl(freeman);
      $el.children().remove();
      $el.append('<div class="overlay" style="background-color: ' + FREEMAN.OVERLAY_COLORS[freeman.index % FREEMAN.OVERLAY_COLORS.length] + ';"></div>')
          .append('<h2>' + freeman.title + '</h2>')
          .append("<img src='" + YOUTUBE.imageUrl(freeman) + "'/>");
    },

    endVideo: function() {
      FREEMAN.displayImageView(FREEMAN.current);
      FREEMAN.current = null;
    },

    startVideo: function(freeman) {
      if (null != FREEMAN.current) {
        FREEMAN.endVideo();
      }
      FREEMAN.wrapperEl(freeman).children().remove();
      FREEMAN.current = freeman;
      YOUTUBE.beginVideo(freeman);
    },

    VIDEOS: [
      { id: 'aFxKt1sexVc', timeStart: 28, timeEnd: 32, title: "What's it like to be old?" },
      { id: 'J_6ETkI0aFg', timeStart: 14, timeEnd: 73, title: "How should I use Facebook?" },
      { id: 'GeixtYS-P3s', timeStart: 20, timeEnd: 31, title: "How do you feel about Jewish history?" },
      { id: 'jdzSN6Zc2Zw', timeStart: 1, timeEnd: 41, title: "What's it like to have kids?" },
      { id: 'L4ZYmBHZhNo', timeStart: 13, timeEnd: 27, title: "What's your purpose in life?" },
      { id: 'DZGINaRUEkU', timeStart: 0, timeEnd: 23, title: "What are we really made of?" },
      { id: 'AA3_1Af6fA4', timeStart: 83, timeEnd: 113, title: "What do you do for fun?" },
      { id: 'Pz30FK1ZXTo', timeStart: 81, timeEnd: 85, title: "How do we get people excited about public transportation?" },
      { id: 'DakcK_T3yFU', timeStart: 20 * 60 + 24, timeEnd: 20 * 60 + 33, title: "How do you get kids to do homework?" },
      { id: 'eoKea_49v3I', timeStart: 8 * 60 + 37, timeEnd: 8 * 60 + 42, title: "Do titty sprinkles surprise you?" },
      { id: 'qHncexjSObs', timeStart: 11, timeEnd: 39, title: "What's acid like?" },
      { id: 'se4i-8BYd0Y', timeStart: 8, timeEnd: 11, title: "Who's God?" },
      { id: 'zUvhQgF6bV8', timeStart: 41, timeEnd: 46, title: "Why are you always right?" },
      { id: 'GDVvRFlex-8', timeStart: 42, timeEnd: 49, title: "What if I hate your movies?" },
      { id: 'UTBzUvkWnKA', timeStart: 10, timeEnd: 23, title: "What's the latest on Carl Rove?" },
      { id: 'KvmSVOgqPrA', timeStart: 4, timeEnd: 16, title: "What do I get for all this shit?" }
    ],

    OVERLAY_COLORS: ['#80B3FF', '#FD6E8A', '#693726']
  };
  
  window.onYouTubePlayerReady = YOUTUBE.onYouTubePlayerReady;
  window.onYouTubeStateChange = YOUTUBE.onStateChange;

  $(function(){
    $('.question').each(FREEMAN.initialize);
  });

})();