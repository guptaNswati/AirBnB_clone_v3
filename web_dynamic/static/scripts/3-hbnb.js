$(document).ready(function () {
  let selected = [];
// checkboxes amenity
  $('input[type=checkbox]').change(function () {
    $(this).each(function () {
      let name = $(this).attr('data-name');
      if ($(this).is(':checked')) {
        selected.push(name);
        console.log(name);
      } else {
        selected.pop(name);
      }
      if (selected.length === 0) {
        $('.amenities h4').text('\u00A0');
      } else {
        $('.amenities h4').text(selected.join(', '));
      }
    });
  });
// red and grey disc
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    type: 'GET',
    dataType: 'json',
    success: function (res) {
      if (res.status === 'OK') {
        $('DIV#api_status').addClass('available');
      } else {
        $('DIV#api_status').removeClass('available');
      }
    },
    error: function (res) {
      $('DIV#api_status').removeClass('available');
    }
  });
// build places
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({}),
    error: function (res) {
      $('.places').append('<p>Server issue</p>');
      console.log(res);
    },
    success: function (res) {
      $.each(res, function (k, v) {
        console.log(k);
        let article = $('<article>');
        article.append($('<div>', {'class': 'price_by_night', 'text': '$' + v.price_by_night}));
        article.append($('<h2>').text(v.name));
        let info = $('<div>', {'class': 'informations'});
        info.append($('<div>', {'class': 'max_guest', 'text': v.max_guest + 'Guests'}));
        info.append($('<div>', {'class': 'number_rooms', 'text': v.number_rooms + 'Rooms'}));
        info.append($('<div>', {'class': 'number_bathrooms', 'text': v.number_bathrooms + 'Bathrooms'}));
        article.append(info);
        article.append($('<div>', {'class': 'user', 'html': '<b>Owner</b>: ' + v.user_id}));
       	article.append($('<div>', {'class': 'description', 'html': v.description}));
        $('.places').append(article);
      });
    }
  });
});

/**	    {% for place in places %}
	        <article>
	            <div class="price_by_night">${{place[1].price_by_night}}</div>
	            <h2>{{place[1].name}}</h2>
	            <div class="informations">
	              <div class="max_guest">{{place[1].max_guest}} Guests</div>
		      <div class="number_rooms">{{place[1].number_rooms}} Rooms</div>
		      <div class="number_bathrooms">{{place[1].number_rooms}} Bathrooms</div>
		    </div> <!-- end informations -->
		    <div class="user"><b>Owner</b>: {{place[0]}}</div>
		    {% autoescape false %}
		    <div class="description">{{place[1].description}}</div>
		    {% endautoescape %}
		</article>
	    {% endfor %}
**/