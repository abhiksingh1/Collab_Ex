import helpers from './helpers.js';

window.addEventListener( 'load', () => {

    //When the chat icon is clicked
    document.querySelector( '#share-canvas' ).addEventListener( 'click', ( e ) => {
        let canvasElem = document.querySelector( '#whiteboard-container' );
        let mainSecElem = document.querySelector( '#main-section' );

        if ( canvasElem.classList.contains( 'canvas-opened' ) ) {
            canvasElem.setAttribute( 'hidden', true );
            mainSecElem.classList.remove( 'col-md-333' );
            mainSecElem.classList.add( 'col-md-999' );
            canvasElem.classList.remove( 'canvas-opened' );
        }

        else {
            canvasElem.attributes.removeNamedItem( 'hidden' );
            mainSecElem.classList.remove( 'col-md-999' );
            mainSecElem.classList.add( 'col-md-333' );
            canvasElem.classList.add( 'canvas-opened' );
        }

        //remove the 'New' badge on chat icon (if any) once chat is opened.
        // setTimeout( () => {
        //     if ( document.querySelector( '#chat-pane' ).classList.contains( 'chat-opened' ) ) {
        //         helpers.toggleChatNotificationBadge();
        //     }
        // }, 300 );
    } );


    //When the chat icon is clicked
    document.querySelector( '#toggle-chat-pane' ).addEventListener( 'click', ( e ) => {
        let chatElem = document.querySelector( '#chat-pane' );
        let mainSecElem = document.querySelector( '#main-section' );

        if ( chatElem.classList.contains( 'chat-opened' ) ) {
            chatElem.setAttribute( 'hidden', true );
            mainSecElem.classList.remove( 'col-md-9' );
            mainSecElem.classList.add( 'col-md-12' );
            chatElem.classList.remove( 'chat-opened' );
        }

        else {
            chatElem.attributes.removeNamedItem( 'hidden' );
            mainSecElem.classList.remove( 'col-md-12' );
            mainSecElem.classList.add( 'col-md-9' );
            chatElem.classList.add( 'chat-opened' );
        }

        //remove the 'New' badge on chat icon (if any) once chat is opened.
        setTimeout( () => {
            if ( document.querySelector( '#chat-pane' ).classList.contains( 'chat-opened' ) ) {
                helpers.toggleChatNotificationBadge();
            }
        }, 300 );
    } );


    //When the video frame is clicked. This will enable picture-in-picture
    document.getElementById( 'local' ).addEventListener( 'click', () => {
        if ( !document.pictureInPictureElement ) {
            document.getElementById( 'local' ).requestPictureInPicture()
                .catch( error => {
                    // Video failed to enter Picture-in-Picture mode.
                    console.error( error );
                } );
        }

        else {
            document.exitPictureInPicture()
                .catch( error => {
                    // Video failed to leave Picture-in-Picture mode.
                    console.error( error );
                } );
        }
    } );


    //When the 'Create room" is button is clicked
    document.getElementById( 'create-room' ).addEventListener( 'click', ( e ) => {
        e.preventDefault();

        let roomName = document.querySelector( '#room-name' ).value;
        let yourName = document.querySelector( '#your-name' ).value;

        if ( roomName && yourName ) {
            //remove error message, if any
            document.querySelector('#err-msg').innerText = "";

            //save the user's name in sessionStorage
            sessionStorage.setItem( 'username', yourName );

            //create room link
            let roomLink = `${ location.origin }?room=${ roomName.trim().replace( ' ', '_' ) }_${ helpers.generateRandomString() }`;

            //show message to link 
            document.querySelector('#link-address').value = roomLink;

            //enable copy link button
            document.querySelector('#copy-link').disabled = false;

            //onclick to copy link
            document.querySelector('#copy-link').addEventListener("click", function() {
                    navigator.clipboard.writeText(roomLink);
                    alert("Link Copied");
              });

            //show message with link to room
            // document.querySelector( '#room-created' ).innerHTML = `Room successfully created. Click <a href='${ roomLink }'>here</a> to enter room. 
            //     Share the room link with your partners.`;
            document.querySelector( '#room-created' ).innerHTML = `Room created successfully. Share the room link with others to join.`;

             //enable join button
            document.querySelector('#join-room').disabled = false; 

            //disable create room button
            document.querySelector('#create-room').disabled = true; 
            
            //onclick to join room button
            document.querySelector('#join-room').addEventListener("click", function() {
                window.open(roomLink, "_blank");
              }); 

            //empty the values
            document.querySelector( '#room-name' ).value = '';
            document.querySelector( '#your-name' ).value = '';
        }

        else {
            document.querySelector('#err-msg').innerText = "All fields are required";
        }
    } );


    //When the 'Enter room' button is clicked.
    document.getElementById( 'enter-room' ).addEventListener( 'click', ( e ) => {
        e.preventDefault();

        let name = document.querySelector( '#username' ).value;

        if ( name ) {
            //remove error message, if any
            document.querySelector('#err-msg-username').innerText = "";

            //save the user's name in sessionStorage
            sessionStorage.setItem( 'username', name );

            //reload room
            location.reload();
        }

        else {
            document.querySelector('#err-msg-username').innerText = "Please input your name";
        }
    } );


    document.addEventListener( 'click', ( e ) => {
        if ( e.target && e.target.classList.contains( 'expand-remote-video' ) ) {
            helpers.maximiseStream( e );
        }

        else if ( e.target && e.target.classList.contains( 'mute-remote-mic' ) ) {
            helpers.singleStreamToggleMute( e );
        }
    } );


    document.getElementById( 'closeModal' ).addEventListener( 'click', () => {
        helpers.toggleModal( 'recording-options-modal', false );
    } );
} );
