
chrome.runtime.sendMessage({
    from: 'content',
    subject: 'showDropdownVal',
});

// Listen for messages from the popup.
chrome.runtime.onMessage.addListener((msg, sender, response) => {
    // First, validate the message's structure.
    if ((msg.from === 'popup') && (msg.subject === 'DOMInfoForSelect')) {
      var domInfo = {
        country: document.getElementById('select1').innerHTML,
        language: document.getElementById('prefLang').innerHTML,
        title: document.getElementById('select3').innerHTML,
      };
      response(domInfo);
    }
    if((msg.from === 'popup') && (msg.subject === 'submitForm')) {
        document.getElementById('email-address').value = msg.data.email;
        document.getElementById('password').value = msg.data.password;
        document.getElementById('repeat-password').value = msg.data.password;
        document.getElementById('portalPin').value = msg.data.pin;
        document.getElementById('select1').value = msg.data.selectCountry;
        document.getElementById('prefLang').value = msg.data.selectLanguage;
        document.getElementById('select3').value = msg.data.selectTitle;
        document.getElementById('first-name').value = msg.data.fname;
        document.getElementById('last-name').value = msg.data.lname;
        document.getElementById('company').value = msg.data.company;
        document.getElementById('address1').value = msg.data.address1;
        document.getElementById('address2').value = msg.data.address2;
        document.getElementById('appartment').value = msg.data.address3;
        document.getElementById('city').value = msg.data.city;
        document.getElementById('select2textbox').value = msg.data.state;
        document.getElementById('zip').value = msg.data.zip;
        document.getElementById('phone').value = msg.data.phone;
        document.getElementById('osvusergrpno').click();
        document.getElementById('registerUserBtn').click();
        $(document).ajaxStop(function() { 
            console.log("hellloooo world");
            document.getElementById('registerUserBtn').click();     
        });
        console.table(msg.data);
    }
  });
