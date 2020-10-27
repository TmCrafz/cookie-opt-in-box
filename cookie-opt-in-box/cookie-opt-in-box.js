function coib_accept_all() {
    console.log("coib_accept_all");
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
    
    // Get checked options
    let allowed_cookies = coib_get_allowed_cookie_options();
    console.log("Allowed cookies: " + allowed_cookies);
}

function coib_save_exit() {
    console.log("coib_save_exit");
    // Fade out window
    let element = document.getElementById("coib-cookie-box");
    element.classList.remove("coib-cookie-box-fade-in-bottom");
    element.classList.add("coib-cookie-box-fade-out-bottom");
    // Get checked options
    let allowed_cookies = coib_get_allowed_cookie_options();
    console.log("Allowed cookies: " + allowed_cookies);
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