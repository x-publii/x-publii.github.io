window.onload = function(){
	//Replace:1
	document.querySelectorAll('.js-navbar__toggle').forEach(navBarToggleBind);
	//Replace:2
	navBarAnchorBind();
	//Replace:3
	document.addEventListener("touchend", function () {});
	//Replace:4
	postImageClass();
	//Replace:5
	mainMenuImprovments();
	//Replace:6
	stickyMenuAnimation();
}

function navBarToggleBind(element){	
	element.addEventListener("click", function(event) {
		document.querySelectorAll('.js-navbar').forEach(function(navEle){
			navEle.classList.toggle('is-opened');
		});
	});
}

function navBarAnchorBind(){
	
	document.querySelectorAll('.js-navbar a').forEach(function(link){
		link.addEventListener("touchend", function(e) {
			let parent = link.parentElement;
			//Assume only one navbar available
			let navBarEle = document.querySelector(".js-navbar");
			if( hasClass(parent, "active") && hasClass(navBarEle, "active") && parent.getAttribute("aria-expanded") !== 'true'){
				e.preventDefault();
                e.stopPropagation();
				parent.setAttribute("aria-expanded", true);
			}
			
			document.querySelectorAll('.js-navbar li[aria-expanded="true"]').forEach(function(item){
				if(item.contains(link)){
					item.setAttribute("aria-expanded", false);
				}
			});
			
		});
	});
}

function hasClass(element, className){
	return element.classList.contains(className);
}

function postImageClass(){
	
	var contentImages = document.querySelectorAll('.post__content img');
	if(contentImages.length > 0){
		var cssClasses = ['post__image--full', 'post__image--wide', 'post__image--left', 'post__image--right', 'post__image--center'];
		contentImages.forEach(function(imageEle){
			if(imageEle.parentElement.getAttribute('tagName') === 'P') {
				cssClasses.forEach(function(cssClass) {
                    if(hasClass(imageEle, cssClass) && hasClass(imageEle.parentElement, cssClass)){
						imageEle.classList.remove(cssClass);
						imageEle.parentElement.classList.add(cssClass);
					}
                });
            }
		});

	}
}

//Need to check this
function mainMenuImprovments(){
	
	//assume only one mainmenu available
	var mainmenuElement = document.querySelector('.navbar__menu');
    var level0 = mainmenuElement.querySelectorAll('li');
	
	if(level0.length > 0) {
			level0.forEach(function(level0Ele) {
				var level1 = level0Ele.querySelectorAll('.navbar__submenu');
 
            if(level1.length > 0) {
                level1.forEach(function(submenuEle) {
					
                    submenuEle.parentElement.addEventListener('mouseenter', function() {
                        setTimeout(function() {
                            var diff = window.outerWidth - (submenuEle.offsetLeft + submenuEle.offsetWidth);
                            if(diff < 0) {
								submenuEle.style.marginLeft = (diff - 10) + "px";
                            }
                        }, 50);
                    });
 
					var subMenuChildrenElements = submenuEle.querySelectorAll('li');
					if(subMenuChildrenElements.length > 0){
						subMenuChildrenElements.forEach(function(subMenuChildrenEle) {
							var subMenuChildrenNavBarElements = subMenuChildrenEle.querySelectorAll('.navbar__submenu');
							if(subMenuChildrenNavBarElements.length > 0){
								subMenuChildrenNavBarElements.forEach(function(subMenusEle) {
									setSubmenusPosition(subMenusEle);
								});
							}
						});
						
					}
                });
            }
			});
        }
}

function setSubmenusPosition(submenus) {
	
    if(!submenus.length > 0) {
        return;
    }
 
    submenus.forEach(function(submenuEle) {
		
        submenuEle.parentElement.addEventListener('mouseenter', function() {
            setTimeout(function() {
                var diff = window.outerWidth - (submenuEle.offsetLeft + submenuEle.offsetWidth);
                if(diff < 0) {
					submenuEle.style.marginLeft = (diff - 10) + "px";
                }
            }, 50);
        });
		
		var subMenuChildrenElements = submenuEle.querySelectorAll('li');
		if(subMenuChildrenElements.length > 0){
			subMenuChildrenElements.forEach(function(subMenuChildrenEle) {
				var subMenuChildrenNavBarElements = subMenuChildrenEle.querySelectorAll('.navbar__submenu');
				if(subMenuChildrenNavBarElements.length > 0){
					subMenuChildrenNavBarElements.forEach(function(subMenusEle) {
						setSubmenusPosition(subMenusEle);
					});
				}
			});
						
		}
    });
};


function stickyMenuAnimation(){
	// Sticky menu animation
	//Consider only one menu lement
    var menu = document.querySelector('.js-top');
 
    if (!(menu.length > 0) || !hasClass(menu, "is-sticky")) {
        return;
    }
 
        var previousScroll = document.documentElement.scrollTop || document.body.scrollTop;
        var menuHeight = menu.offsetWidth;
        var menuTop = 0;
 
        window.addEventListener('scroll', function () {
            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;;
            var diff = currentScroll - previousScroll;
            menuTop -= diff / 2;
 
            if (menuTop < -menuHeight) {
                menuTop = -menuHeight;
            }
 
            if (menuTop >= 0) {
                menuTop = 0;
            }
 
            if (currentScroll <= 100) {
				menu.classList.remove('has-bg');
            } else {
				menu.classList.add('has-bg');
            }
 
            if (currentScroll <= 30) {
                menuTop = 0;
            }
 
			menu.style.top = menuTop + 'px';
			
            previousScroll = currentScroll;
        });
}