let pushJSON = (address, longurl, shorturl) => {
    let request = new XMLHttpRequest();
    request.open('POST', address);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    let data = {
        "l": longurl,
        "s": shorturl
    };
    request.send(JSON.stringify(data));
};

let cinp = () => {
    document.getElementById("erbox").innerHTML = "";
    let cival = document.getElementById("custominput").value;

    let res = JSON.parse(fetchJSON(endpoint + '/?q=s:' + cival))[0]["l"];
    let data = res;


    if (data != null) {
        return false;

    } else if (data == null) {
        return true;

    }


};

let geturl = () => {
    let url = document.getElementById("urlinput").value;
    return url;

};

async function getrandom() {
  let response = await fetch('https://random-word-api.herokuapp.com/word')
  let data = await response.json()
  return data[0]
}

let genhash = () => {
    if (document.getElementById("custominput").value == "") {
        getrandom().then(data => {
            window.location.hash = data;
            check_is_unique();
            send_request(geturl());
        })
    } else {
        window.location.hash = document.getElementById("custominput").value;

    }
};

let check_is_unique = () => {
    let url = window.location.hash.substr(1);
    let res = JSON.parse(fetchJSON(endpoint + '/?q=s:' + url))[0];
    let data = res;

    if (data != null) {
        genhash();
    }


};

let copyer = (containerid) => {
    let elt = document.getElementById(containerid);
    if (document.selection) { // IE
        if (elt.nodeName.toLowerCase() === "input") {
            document.getElementById(containerid).select();
            document.execCommand("copy");
        } else {
            let range = document.body.createTextRange();
            range.moveToElementText(document.getElementById(containerid));
            range.select();
            document.execCommand("copy");
        }

    } else if (window.getSelection) {
        if (elt.nodeName.toLowerCase() === "input") {
            document.getElementById(containerid).select();
            document.execCommand("copy");
        } else {
            let range_ = document.createRange();
            range_.selectNode(document.getElementById(containerid));
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range_);
            document.execCommand("copy");
        }
    }
};

let send_request = (url) => {
    let longurl = url;
    let shorturl = window.location.hash.substr(1)
    let address = endpoint + "/";
    // console.log(address)
    pushJSON(address, longurl, shorturl);
    document.getElementById('shortenedURL').value = window.location.href;
    document.getElementById('sucess').innerHTML = "Shortened URL has been copied to your clipboard.";
    copyer("shortenedURL");
};

let shorturl = () => {
    let longurl = geturl();
    let re = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
    let cre = /^([a-zA-Z0-9 _-]+)$/;
    let protocol_ok = re.test(longurl);
    if (!protocol_ok) {
        document.getElementById("erbox").style.color = "red";
        document.getElementById("erbox").innerHTML = "❌ Invalid URL";
    } else {
        document.getElementById("erbox").innerHTML = "";
        if (document.getElementById("custominput").value == "") {
            genhash();

        } else {
            if (cre.test(document.getElementById("custominput").value)) {
                if (cinp()) {
                    document.getElementById("erbox").style.color = "cyan";
                    document.getElementById("erbox").innerHTML = " Custom Address Available ✔️";
                    genhash();
                } else {
                    document.getElementById("erbox").style.color = "red";
                    document.getElementById("erbox").innerHTML = "❌ Custom Address Already Used, Choose Another";
                    document.getElementById("custominput").placeholder = document.getElementById("custominput").value;
                    document.getElementById("custominput").value = "";
                }
            } else {
                document.getElementById("erbox").style.color = "red";
                document.getElementById("erbox").innerHTML = "Invalid Custom URL! Use only Alphanumerics and underscore!";
                document.getElementById("custominput").placeholder = document.getElementById("custominput").value;
                document.getElementById("custominput").value = "";

            }
        }


    }
};
document.getElementById("sbtn").addEventListener("click", shorturl);
