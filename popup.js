// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
    changeColor.style.backgroundColor = color;
});
// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async() => {
    let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    chrome.scripting.executeScript({
        target: {
            tabId: tab.id
        },
        function: setPageBackgroundColor,
    });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({
        color
    }) => {
        document.body.style.backgroundColor = color;
    });
}



const setDOMInfo = info => {
	document.getElementById('selectCountry').innerHTML = info.country;
	document.getElementById('selectLanguage').innerHTML = info.language;
	document.getElementById('selectTitle').innerHTML = info.title;
}


// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', () => {
	chrome.tabs.query({
	  active: true,
	  currentWindow: true
	}, tabs => {
	  chrome.tabs.sendMessage(
		  tabs[0].id,
		  {from: 'popup', subject: 'DOMInfoForSelect'},
		  // ...also specifying a callback to be called 
		  //    from the receiving end (content script).
		  setDOMInfo);
	});
});


function createObject() {
	let createAccountForm = document.getElementById('createAccountForm');
	arr = {
		'selectCountry': createAccountForm.selectCountry.value,
		'selectLanguage': createAccountForm.selectLanguage.value,
		'selectTitle': createAccountForm.selectTitle.value,
		'fname': createAccountForm.fname.value,
		'lname': createAccountForm.lname.value,
		'company': createAccountForm.company.value,
		'address1': createAccountForm.address1.value,
		'address2': createAccountForm.address2.value,
		'address3': createAccountForm.address3.value,
		'city': createAccountForm.city.value,
		'state': createAccountForm.state.value,
		'zip': createAccountForm.zip.value,
		'phone': createAccountForm.phone.value,
		'email': createAccountForm.email.value,
		'password': createAccountForm.password.value,
		'portal': createAccountForm.portal.value,
		'count': createAccountForm.count.value,
	}
	return arr;
}

function sendData() {
	arr = createObject();
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, tabs => {
		chrome.tabs.sendMessage(
			tabs[0].id,
			{from: 'popup', subject: 'submitForm', data: arr},
			function(response) {
				alert("success");
			});
	});
}
function setData() {
	arr = createObject()
	chrome.storage.sync.set({ arr });
	console.table(arr);
}
function getData() {
	chrome.storage.sync.get("arr", ({ arr }) => {
        Object.keys(arr).forEach(key => {
			document.getElementById(key).value = arr[key];
		})
    });
}
document.addEventListener("DOMContentLoaded", function() {
	let createAccount = document.getElementById("registerBtn");
	createAccount.addEventListener("click", sendData);
	let loadData = document.getElementById('loadData');
	loadData.addEventListener("click", getData);
	let saveData = document.getElementById('saveData');
	saveData.addEventListener("click", setData);
})