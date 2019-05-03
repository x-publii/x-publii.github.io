// Sticky menu
var new_scroll_position = 0;
var last_scroll_position;
var header = document.getElementById("js-header");

window.addEventListener('scroll', function (e) {
    last_scroll_position = window.scrollY;

    // Scrolling down
    if (new_scroll_position < last_scroll_position && last_scroll_position > 40) {       
        header.classList.remove("is-visible");
        header.classList.add("is-hidden");

        // Scrolling up
    } else if (new_scroll_position > last_scroll_position) {       
        header.classList.remove("is-hidden");
        header.classList.add("is-visible");
    }
    
    if (last_scroll_position < 1) {        
        header.classList.remove("is-visible");       
    }
    
    new_scroll_position = last_scroll_position;
});


// Toggle menu
document.getElementById('js-toggle').onclick = function () {
    var el = document.getElementById("js-navbar-menu");
    // If my-class is set remove it, otherwise add it
    el.classList.toggle("is-visible");
};


// Sidebar menu - mobile view
var accordion = document.getElementsByClassName("js-sidebar-menu").item(0);
var sections = []; 
 
if (accordion) {
  sections = accordion.getElementsByClassName("has-submenu");
}

function openBelow(el) {    
}

function closeBelow(el) {   
}
       
for (var i = 0; i < sections.length; i++) 
{
    (function() {
        var section = sections.item(i),
            anchor = sections.item(i).children[0],
            below = sections.item(i).children[1];
        
        closeBelow(below, -below.offsetHeight);
        
        anchor.onclick = function () {
            if (section.getAttribute('class' ) == 'has-submenu active' ) {
                section.setAttribute('class', 'has-submenu');
                closeBelow(below);
            }
            else {
                section.setAttribute('class', 'has-submenu active');
                openBelow(below);
            }
        }
    })();
}

// Newsletter popup
(function() {
	var newsletter_submit = document.querySelector('.subscribe-popup-submit');
	var newsletter = document.querySelector('.subscribe-popup');
	
	if (newsletter_submit) {			
		newsletter_submit.addEventListener('click', function () {
			localStorage.setItem('publii-subscribe', 'true');
		});
		
		document.querySelector('.subscribe-popup-close').addEventListener('click', function (event) {
			event.preventDefault();
			localStorage.setItem('publii-subscribe', new Date().getTime());
			newsletter.classList.remove('is-visible');
		});
	}
	
	// Newsletter display
	if (
		newsletter &&
		localStorage.getItem('publii-subscribe') !== 'true' &&
		(
			!localStorage.getItem('publii-subscribe') || 
			new Date().getTime() - parseInt(localStorage.getItem('publii-subscribe'), 10) > (1000 * 60 * 60 * 24 * 30)
		)
	) {
		window.addEventListener('scroll', function (e) {
		    var position = window.scrollY;
		    
		    if (position > 500 && !newsletter.classList.contains('is-visible')) {
		    	newsletter.classList.add('is-visible');
		    }
		});
	
		setTimeout(function () {
			newsletter.classList.add('is-visible');
		}, parseInt(newsletter.getAttribute('data-time'), 10));
	}
})();


// Pop-up
(function () {
    
    // close popup
    var closeHandlers = document.querySelectorAll('.popup .popup-close');

    if (closeHandlers.length) {
        for (var i = 0; i < closeHandlers.length; i++) {
            closeHandlers[i].addEventListener('click', function () {
                this.parentNode.classList.add('is-fade-out');

                setTimeout(() => {
                    this.parentNode.classList.remove('is-fade-out');
                    this.parentNode.classList.remove('is-visible');
                }, 690);
            });
        }
    }
    
    // changelog popup
    let contactButtons = document.querySelectorAll('.js-changelog-cta');
    let contactPopup = document.querySelector('.js-changelog');

    if (contactButtons.length) {
        contactPopup.addEventListener('click', function (e) {
            e.stopPropagation();
        });

        for (let i = 0; i < contactButtons.length; i++) {
            contactButtons[i].addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                contactPopup.classList.toggle('is-visible');
            });
        }

        document.body.addEventListener('click', function () {
            contactPopup.classList.remove('is-visible');
        });
    }
 })();   

// Share buttons pop-up
(function () {
	// link selector and pop-up window size
	var Config = {
		Link: ".js-share",
		Width: 500,
		Height: 500
	};
	// add handler links
	var slink = document.querySelectorAll(Config.Link);
	for (var a = 0; a < slink.length; a++) {
		slink[a].onclick = PopupHandler;
	}
	// create popup
	function PopupHandler(e) {
		e = (e ? e : window.event);
		var t = (e.target ? e.target : e.srcElement);
		// popup position
		var px = Math.floor(((screen.availWidth || 1024) - Config.Width) / 2),
			py = Math.floor(((screen.availHeight || 700) - Config.Height) / 2);
		// open popup
		var link_href = t.href ? t.href : t.parentNode.href;
		var popup = window.open(link_href, "social",
			"width=" + Config.Width + ",height=" + Config.Height +
			",left=" + px + ",top=" + py +
			",location=0,menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1");
		if (popup) {
			popup.focus();
			if (e.preventDefault) e.preventDefault();
			e.returnValue = false;
		}

		return !!popup;
	}
})();

// Add class when purchase button is clicked
var purchase = document.getElementById('purchase-btn');
if(purchase) {
	purchase.onclick = function() {
		purchase.classList.add('is-loading');
	}
}

//Sign in form wysuwany na stronie checkout
'use strict';
  
var getHeight = function(el) {
        var el_style      = window.getComputedStyle(el),
            el_display    = el_style.display,
            el_position   = el_style.position,
            el_visibility = el_style.visibility,
            el_max_height = el_style.maxHeight.replace('em', '').replace('%', ''),

            wanted_height = 0;


       
        if(el_display !== 'none' && el_max_height !== '0') {
            return el.offsetHeight;
        }

      
        el.style.position   = 'absolute';
        el.style.visibility = 'hidden';
        el.style.display    = 'block';

        wanted_height     = el.offsetHeight;

        el.style.display    = el_display;
        el.style.position   = el_position;
        el.style.visibility = el_visibility;

        return wanted_height;
    },


    toggleSlide = function(el) {
        var el_max_height = 0;

        if(el.getAttribute('data-max-height')) {
           
            if(el.style.maxHeight.replace('em', '').replace('%', '') === '0') {
                el.style.maxHeight = el.getAttribute('data-max-height');
            } else {
                el.style.maxHeight = '0';
            }
        } else {
            el_max_height                  = getHeight(el) + 'em';
            el.style['transition']         = 'max-height 0.5s ease-in-out';
            el.style.overflowY             = 'hidden';
            el.style.maxHeight             = '0';
            el.setAttribute('data-max-height', el_max_height);
            el.style.display               = 'block';

            setTimeout(function() {
                el.style.maxHeight = el_max_height;
            }, 10);
        }
    };



    document.querySelector('.edd_checkout_login_area-btn').addEventListener('click', function (e) {
        toggleSlide(document.querySelector('#edd_checkout_login_register'));
    }, false);

