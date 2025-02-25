$(document).ready(() => {
    const $container = `
        <section id="container" class="container">
            <h1>QR CODE GENERATOR</h1>
            
            <form>
                <label for="input">Input URL:</label>
                <input type="text" id="input" placeholder="Input Text or URL" required>
            </form>
                    
            <div id="imageContainer" class="imageContainer">
                <img src="" id="qrImage" >
            </div>
                    
            <button type="button" class="button" id="button">Generate QR Code</button>
        </section>
    `;

    $('body').append($container);
                
    let $img = $('#qrImage');
    let $input = $('#input');
    $('#button').click(() =>  {
        if($input.val().length > 0) {
            const API_URL = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${$input.val()}`;
            $img.attr('src', API_URL);
            $img.attr('alt', $input.val())
            setTimeout(() => {
                $('#imageContainer').addClass('show-image');
                $input.val('');
            }, 1000);
        }
        else {
            $input.addClass('empty-input');
            
            setTimeout(() => {
                $input.removeClass('empty-input')
            }, 500)
        }
    });

});