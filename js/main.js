//==========================================
// WATS1020 - Asynchronous Flickr Search
//==========================================

$(document).on('ready', function(){

// Create a function called `searchImages()`. This function will handle the
// process of taking a user's search terms and sending them to Flickr for a
// response.
(function(searchImages) {

// Inside the `searchImages()` function, the following things should happen:

  // 1.   Accept a string value called `tags` as an argument. Example:
  //      `var searchPhotos = function(tags){`
  var searchPhotos = function(tags) {

    // 2.   Define the location of the Flickr API like this:
    //      `var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";`
    var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?&format=json";
    console.log(tags);
    $('#images').innerHTML = '<li class="search-throbber">Searching...</li>';

    // 3.   Construct a `$.getJSON()` call where you send a request object
    //      including the tags the user submitted, and a `done()` handler
    //      that displays and refreshes the content appropriately.
    $.getJSON( flickrAPI, {
      tags: tags,
      tagmode: "any",
      format: "json"
    })

      // 4.   Update the display to add the images to the list with the id
      //      `#images`.
      .done(function( data ) {
      $('#images').empty();
      $('h1.search-title').first()[0].innerHTML = "Results for: " + tags;
      $.each( data.items, function( i, item ) {
        var newListItem = $("<li>");  // Create new list item to display results

        // If you're not doing the modal, then show info about the image.
        var newTitle = $('<p class="image-title">').html(item.title).appendTo(newListItem).prepend(" <b>Title:  </b>");
        var newDate = $('<p class="image-date">').text(item.date_taken).appendTo(newListItem).prepend(" <b>Date:  </b> ");
        var newDescription = $('<p class="image-description">').html(item.description).appendTo(newListItem).prepend(" <b>Info:  </b> ");
        var newLink = $('<a>').attr('href', item.link).text('View on Flickr.').appendTo(newListItem);


        // Button only needed if you're doing the modal
        var newButton = $("<button class='btn btn-sm btn-primary'>Enlarge</button>").attr({
          'data-title': item.title,
          'data-toggle': "modal",
          'data-target': "#infoModal",
          'data-imgsrc': item.media.m,
          'data-description': item.description,
          'type': "button"
        })

        // Add images from search results to newly created list
        .appendTo(newListItem);
        newListItem.appendTo( "#images" );
        if ( i === 15 ) {  // Display 15 resulting images
          return false;
        }
      });
    });
  };


  // Attach an event to the search button (`button.search`) to execute the
  // search when clicked.
  $('button.search').on('click', function(event){

    // When the Search button is clicked, the following should happen:
    //
    // 1.   Prevent the default event execution so the browser doesn't
    //      Example: `event.preventDefault();'
    event.preventDefault();

    // 2.   Get the value of the 'input[name="searchText"]' and use that
    //      as the `tags` value you send to `searchImages()`.
    var searchTextInput = $(event.target.parentElement).find('input[name="searchText"]')[0];
    console.log(searchTextInput);

    // 3.   Execute the `searchPhotos()` function to fetch images for the
    //      user.
    searchPhotos(searchTextInput.value);
  }); // button.search


  $('#infoModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var title = button.data('title'); // Extract info from data-* attributes
    var imgSrc = button.data('imgsrc');
    var imageDescription = button.data('description');

    // Update the modal's content. We'll use jQuery here.
    var modal = $(this);
    modal.find('.modal-title').html(title);
    var modalBody = modal.find('.modal-body');
    modalBody.empty();
    var modalDescription = $("<p class='image-description'>").html(imageDescription).appendTo(modalBody).prepend(" <b>Info:  </b> ");
  });


})(); // searchImages


    // STRETCH GOAL: Add a "more info" popup using the technique shown on the
    // Bootstrap Modal documentation: http://getbootstrap.com/javascript/#modals-related-target


}); // document.on('ready')
