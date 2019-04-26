// original function by c. bavota at: http://bavotasan.com/2010/add-a-copyright-notice-to-copied-text/
function addLink() {
    var C = document.appendLinkConfig;
    var body_element = document.getElementsByTagName('body')[0];
    var selection;
    selection = window.getSelection();
    var linebreaks = '';
    var link_name;


    for (i = 0; i < C.lb; i++)
        linebreaks = linebreaks + '<br />';

    link_name = C.url;

    pagelink =
        linebreaks
        + ' ' + C.readmore + ' '
        + C.title
        + ' ( ' + C.url + ' ) '
        + '<br /> ';

    //pagelink = pagelink.replace('%link%', ' ' + link_url + ' ');

    var copytext = selection + pagelink;
    var newdiv = document.createElement('div');

    newdiv.style.position='absolute';
    newdiv.style.left='-99999px';
    body_element.appendChild(newdiv);
    newdiv.innerHTML = copytext;
    selection.selectAllChildren(newdiv);
    window.setTimeout(function() {
        body_element.removeChild(newdiv);
    },0);
}

document.oncopy = addLink;
