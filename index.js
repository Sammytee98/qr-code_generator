$(document).ready(() => {
    // HTMl Structure for the QR Code Generator UI
    const $container = `
        <section id="container" class="container">
            <h1>QR CODE GENERATOR</h1>
            
            <form>
                <label for="input">Input URL:</label>
                <input type="text" id="input" placeholder="Input Text or URL" required>
            </form>
                    
            <p id='loadingText'>Loading...</p>
            <div id="imageContainer" class="imageContainer">
                <img src="" id="qrImage" >
            </div>
                    
            <button type="button" class="button" id="button">Generate QR Code</button>
            
            <button type="button" class="button download" id="download">Download QR Code</button>
        </section>
    `;

    // Append the container to the body
    $('body').append($container);
                
    let $img = $('#qrImage');
    let $input = $('#input');
    const $loading = $('#loadingText');
    let $download = $('#download');
    // Generate the QR code when the button is clicked
    $('#button').click(() =>  {
        if($input.val().length > 0) {
            const API_URL = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${$input.val()}`;

            // Show loading text and hide the QR image before fetching
            $loading.show();
            $img.hide();
            $download.hide(); // Hide the download button
            
            // Fetch the QR Code
            setTimeout(() => {
                $img.attr('src', API_URL);
                $img.attr('alt', $input.val());
                
                // Show QR image after it loads
                $img.on('load', () => {
                    $('#imageContainer').addClass('show-image');
                    $loading.hide();
                    $img.show();
                    $download.show();
                    $input.val('');
                })
            }, 1000);
        }
        else {
            // Add an animation efffect for the empty input
            $input.addClass('empty-input');     
            setTimeout(() => {
                $input.removeClass('empty-input')
            }, 500)
        }
    });

    // Download QR Code as an image
    $('#download').click(async() => {
        const qrSrc = $img.attr('src');
        if(qrSrc){
            try {
                // Fetch the QR Code image as a blob(binary large object)
                const response = await fetch(qrSrc);
                const blob = await response.blob(); // Convert response into a blob object

                // create a temporary URL for the blob
                const blobUrl = URL.createObjectURL(blob);

                // Create a temporary link to trigger download
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = 'qr-code.png'; 
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Release the blob URL from memory to prevent memory leaks
                URL.revokeObjectURL(blobUrl);
            } catch (err) {
                console.log(err);
            }
        }
    });
});