/**
 * RTL support extension for slack
 */

(function () {
    'use strict';
    // const LTR_CHARS = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF' + '\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF';
    const RTL_CHARS = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC';

    // Select main container node that will be observed for changes
    const mainContainer = document.body.querySelector('.client_main_container');
    const rtlDirCheck = new RegExp('[' + RTL_CHARS + ']');
    const isRTL = s => rtlDirCheck.test(s);

    function addRtlStyle(element) {
        if (element && element.style) {
            element.style.direction = 'rtl';
            element.style.textAlign = 'right';
        }
    }

    function addRtlSupportRecursively(element) {
        if (element) {
            addRtlStyle(element);
            element.childNodes.forEach(el => addRtlSupportRecursively(el));
        }
    }

    // rtl entire page
    function rtlPage() {
        const messageElements = mainContainer.querySelectorAll('[class*="message_body"], [class*="message__body"]');

        if (messageElements) {
            messageElements.forEach(el => {
                if (isRTL(el.innerText)) {
                    addRtlSupportRecursively(el);
                }
            })
        }
    }

    // Observe changes in main container
    const observer = new MutationObserver(rtlPage);

    // initialize
    function init() {
        if (mainContainer) {
            rtlPage();
            observer.observe(mainContainer, {
                // observe config
                // see: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
                childList: true,
                attributes: true,
                characterData: true,
                subtree: true
            });
        } else {
            setTimeout(init, 1000);
        }
    }

    init();
})();

