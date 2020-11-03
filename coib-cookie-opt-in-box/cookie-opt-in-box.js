function coib_ready(callback) {
    // in case the document is already rendered
    if (document.readyState != 'loading') callback();
    // modern browsers
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
    // IE <= 8
    else document.attachEvent('onreadystatechange', function(){
        if (document.readyState=='complete') callback();
    });
}

coib_ready(function() {
    if (coib_get_cookie("coib_seen") == "true") {
        let json_str = coib_get_cookie("coib_allowed_cookies");
        let allowed_cookies = JSON.parse(json_str);
        coib_restore_state(allowed_cookies);
        coib_on_state_changed(allowed_cookies);
    }
    else {
        coib_show_box();
    }
});

function coib_accept_all() {
    // Check all checkboxes
    let element = document.getElementById("coib-cookie-box");
    inputs = element.getElementsByTagName('input');
    // Check all boxes
    for (i = 0; i < inputs.length; i++) {
        if(inputs[i].type == "checkbox") {
            inputs[i].checked = true;
        }
    }
    // Fade out window
    element.classList.remove("coib-cookie-box-fade-in-bottom");
    element.classList.add("coib-cookie-box-fade-out-bottom");
    
    coib_state_changed();
}

function coib_save_exit() {
    // Fade out window
    let element = document.getElementById("coib-cookie-box");
    element.classList.remove("coib-cookie-box-fade-in-bottom");
    element.classList.add("coib-cookie-box-fade-out-bottom");
    
    coib_state_changed();
}

function coib_get_allowed_cookie_options() {
    let element = document.getElementById("coib-cookie-box");
    inputs = element.getElementsByTagName('input');
    let allowed_cookies = [];
    for (i = 0; i < inputs.length; i++) {
        if(inputs[i].type == "checkbox") {
            let checkbox = inputs[i];
            if (checkbox.checked == true) {
                let name = checkbox.name;
                // console.log("Checkbox is checked. Name: " + name);
                allowed_cookies.push(name);
            }
        }
    }
    return allowed_cookies;
}

function coib_show_box() {
    var element = document.getElementById("coib-cookie-box");
    element.classList.remove("coib-cookie-box-fade-out-bottom");
    element.classList.add("coib-cookie-box-fade-in-bottom");
    document.getElementById("coib-cookie-box").style.display = "block";
    
}

function coib_state_changed() {
    let allowed_cookies = coib_get_allowed_cookie_options();
    coib_save_settings(allowed_cookies);
    coib_on_state_changed(allowed_cookies);
}

function coib_save_settings(allowed_cookies) {
    coib_set_cookie("coib_seen", "true", 365);
    coib_set_cookie("coib_allowed_cookies", JSON.stringify(allowed_cookies), 365);
}

function coib_restore_state(allowed_cookies) {
    for (i = 0; i < allowed_cookies.length; i++) {
        name = allowed_cookies[i];
        (document.getElementsByName(name))[0].checked = true;
    }
}

function coib_set_cookie(name, value, expire_days) {
    var date = new Date();
    date.setTime(date.getTime() + (expire_days*24*60*60*1000));
    var expires = "expires="+ date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Lax";
}

function get_all_cookie_names() { 
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookies = decodedCookie.split(';'); 
    var cookie_list = []; 
    for (var i = 0; i < cookies.length; i++) {
        var values = cookies[i].split("=");
        var name = values[0].replace(/^ /, '');
        cookie_list.push(name);
    } 
    return cookie_list; 
}

function coib_get_cookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function coib_delete_all_cookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax";
    }
}

function coib_delete_cookie_if_exists(name, domain) {
    if (coib_get_cookie(name) != "") {
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain="+domain+";path=/;SameSite=Lax";
    }
}