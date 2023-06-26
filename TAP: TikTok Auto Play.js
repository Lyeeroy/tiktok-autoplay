// ==UserScript==
// @name         TAP: TikTok Auto Play
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Automatically plays the next TikTok video
// @author       LyeeRoy
// @match        https://www.tiktok.com/*
// @icon         https://cdn4.iconfinder.com/data/icons/social-media-flat-7/64/Social-media_Tiktok-512.png
// @updateURL    https://github.com/Lyeeroy/tiktok-autoplay/blob/main/TAP:%20TikTok%20Auto%20Play.js
// @downloadURL  https://github.com/Lyeeroy/tiktok-autoplay/blob/main/TAP:%20TikTok%20Auto%20Play.js
// @grant        none
// ==/UserScript==

// If you pause the video, minimaze or somehow stop the video you'll need to manually move on to the next one to continue.

var autoplay = true; // To disable Autoplay as the default setting, set the value to FALSE.
var hideChat = true; // To keep the "Hide CHAT" button invisible, set the value to FALSE.

(function() {
    'use strict';

    // Check if video is loaded every 50ms
    var checkLoad = setInterval(function() {
        var video = document.querySelector('video');
        if (video) {
            clearInterval(checkLoad);

            // Check if video has ended every 50ms
            var currentUrl = window.location.href;
            var wasPaused = false;
            var checkEnd = setInterval(function() {
                if (!autoplay) {
                    return;
                }

                var playerContainer = document.querySelector('.xgplayer-container');
                if (playerContainer && !playerContainer.classList.contains('xgplayer-inactive')) {
                    var url = window.location.href;
                    if (url.startsWith('https://www.tiktok.com/@')) {
                        if (url !== currentUrl) {
                            currentUrl = url;
                            wasPaused = false;
                        } else if (playerContainer.classList.contains('xgplayer-pause') && !wasPaused) {
                            wasPaused = true;
                            return;
                        } else if (!wasPaused) {
                            var xpaths = [
                                '/html/body/div[2]/div[3]/div[4]/div/div[1]/button[3]',
                                '/html/body/div[1]/div[3]/div[4]/div/div[1]/button[3]',
                                '/html/body/div[1]/div[2]/div[4]/div/div[1]/button[3]',
                                '/html/body/div[1]/div[2]/div[2]/div/div[2]/div[3]/div/div[1]/button[3]'
                            ];

                            for (var i = 0; i < xpaths.length; i++) {
                                var button = document.evaluate(xpaths[i], document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                                if (button) {
                                    button.click();
                                    break; // Exit the loop if button is found
                                }
                            }
                        }
                    }
                }
            }, 50);

            // Add autoplay button
            var btn = document.createElement("BUTTON");
            if (autoplay) { btn.innerHTML = "TAP: Disable"; } else { btn.innerHTML = "TAP: Enable"; }
            btn.style.position = "fixed";
            btn.style.bottom = "80px";
            btn.style.left = "20px";
            btn.style.zIndex = "9999";
            btn.style.backgroundColor = "transparent";
            btn.style.color = "#696969";
            btn.style.padding = "10px 20px";
            btn.style.border = "2px solid #808080";
            btn.style.borderRadius = "5px";
            btn.style.cursor = "pointer";
            document.body.appendChild(btn);

            btn.addEventListener("click", function() {
                autoplay = !autoplay;
                if (autoplay) {
                    btn.innerHTML = "TAP: Disable";
                    btn.style.backgroundColor = "transparent";
                    btn.style.color = "#696969";
                    btn.style.border = "2px solid #808080";
                } else {
                    btn.innerHTML = "TAP: Enable";
                    btn.style.backgroundColor = "transparent";
                    btn.style.color = "#696969";
                    btn.style.border = "2px solid #808080";
                }
            });
        }
    }, 50);
})();


(function() {
    if (hideChat) {
        'use strict';

        // Specify the class name of the element to hide/show
        const elementClass = '.tiktok-2wi892-DivContentContainer';

        // Create the button
        const button = document.createElement('button');
        button.innerHTML = 'Hide CHAT';
        button.style.position = 'fixed';
        button.style.bottom = '130px';
        button.style.left = '20px';
        button.style.zIndex = '9999';
        button.style.backgroundColor = 'transparent';
        button.style.color = '#696969';
        button.style.padding = '10px 20px';
        button.style.border = '2px solid #808080';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';

        // Add the button to the page
        document.body.appendChild(button);

        // Add a click event to the button that toggles the element
        button.addEventListener('click', function() {
            const elements = document.querySelectorAll(elementClass);
            for (const element of elements) {
                if (element.style.display === 'none') {
                    element.style.display = 'block';
                    button.innerHTML = 'Hide CHAT';
                } else {
                    element.style.display = 'none';
                    button.innerHTML = 'Show CHAT';
                }
            }
        });
    }
})();
