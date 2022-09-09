# a simple modal

Firstly, we need to import the jQuery using CDN:

    ```html
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    ```

Secondly, create a button to trigger the modal:

    ```html
        <button type="button" id="open-modal">Open Modal</button>
    ```

    then, create a modal:

        ```html
        <div id="modal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <p>some text in the modal..</p>
            </div>
        </div>
        ```

    or perhaps add some links:

        ```html
        <div id="modal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <p>some text in the modal..</p>
                <a href="https://www.google.com">google</a>
                <a href="https://www.facebook.com">facebook</a>
                <a href="/print" method="get">Print</a>
            </div>
        </div>
        ```

Thirdly, add some CSS:

    ```css
        .modal {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            opacity: 0;
            visibility: hidden;
            transform: scale(1.1);
            transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
        }

        .modal-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            padding: 1rem 1.5rem;
            width: 24rem;
            border-radius: 0.5rem;
        }

        .close-button {
            float: right;
            width: 1.5rem;
            line-height: 1.5rem;
            text-align: center;
            cursor: pointer;
            border-radius: 0.25rem;
            background-color: lightgray;
        }

        .close-button:hover {
            background-color: darkgray;
        }

        .show-modal {
            opacity: 1;
            visibility: visible;
            transform: scale(1.0);
            transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
        }
    ```

Finally, add some JavaScript:

    ```javascript
            $(document).ready(function () {
            var modal = $('.modal');
            var closeButton = $('.close-button');

            $('#form').on('submit', function (event) {
                event.preventDefault();
                modal.addClass('show-modal');
            });

            $('#open-modal').on('click', function (event) {
                event.preventDefault();
                modal.addClass('show-modal');
            });

            closeButton.on('click', function () {
                modal.removeClass('show-modal');
            });

            $(window).on('click', function (event) {
                if (event.target == modal) {
                    modal.removeClass('show-modal');
                }
            });
        });
    ```