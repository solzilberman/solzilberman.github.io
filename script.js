function toggle_dark_mode() {
    // toggle dark mode
    var body = document.getElementsByTagName("body")[0];
    body.classList.toggle("dark-mode");
    // get .header
    var header = document.getElementsByClassName("header")[0];
    header.classList.toggle("dark-mode-forced");

    // update css var var(----text-color) from #333 to #fff and vice versa
    var root = document.documentElement;
    var text_color = root.style.getPropertyValue('--text-color');
    if (text_color == "#333") {
        root.style.setProperty('--text-color', '#fff');
    }
    else {
        root.style.setProperty('--text-color', '#333');
    }
  } 