// ==UserScript==
// @name         Autoplay Next TikTok Video
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Automatically plays the next TikTok video
// @author       LyeeRoy
// @match        https://www.tiktok.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var autoplay = true;

    // Check if video is loaded every 100ms
    var checkLoad = setInterval(function() {
        var video = document.querySelector('video');
        if (video) {
            clearInterval(checkLoad);

            // Check if video has ended every 100ms
            const checkEnd = setInterval(() => {
                if (!autoplay) {
                    clearInterval(checkEnd);
                    return;
                }

                const seekBar = document.querySelector('.tiktok-kqqewi-DivSeekBar');
                if (seekBar) {
                    const scaleXValue = Number(seekBar.style.transform.match(/scaleX\((.*?)\)/)[1]);
                    if (scaleXValue >= 0.98) {
                        var downKeyEvent = new KeyboardEvent("keydown", {
                            bubbles: true,
                            cancelable: true,
                            keyCode: 40
                        });
                        document.body.dispatchEvent(downKeyEvent);
                    }
                }
            }, 50);


            // Add autoplay button
            var btn = document.createElement("BUTTON");
            btn.innerHTML = "Autoplay: Disable";
            btn.style.position = "fixed";
            btn.style.bottom = "20px";
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
                    btn.innerHTML = "Autoplay: Disable";
                    btn.style.backgroundColor = "transparent";
                    btn.style.color = "#696969";
                    btn.style.border = "2px solid #808080";
                } else {
                    btn.innerHTML = "Autoplay: Enable";
                    btn.style.backgroundColor = "transparent";
                    btn.style.color = "#696969";
                    btn.style.border = "2px solid #808080";
                }
            });

            // Create the button to hide the chat
            const button = document.createElement('button');
            button.innerHTML = 'Hide CHAT';
            button.style.position = "fixed";
            button.style.bottom = "70px";
            button.style.left = "20px";
            button.style.zIndex = "9999";
            button.style.backgroundColor = "transparent";
            button.style.color = "#696969";
            button.style.padding = "10px 20px";
            button.style.border = "2px solid #808080";
            button.style.borderRadius = "5px";
            button.style.cursor = "pointer";
            document.body.appendChild(button);

            // Add a click event to the button that hides the chat
            button.addEventListener('click', function() {
                const elements = document.querySelectorAll('.tiktok-3q30id-DivContentContainer');
                for (const element of elements) {
                    element.style.display = 'none';
                }
            });
        }
    }, 99);
})();
