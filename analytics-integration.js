

// Page Interaction Functions
function toggleVisible(elementId) {
  document.getElementById(elementId).classList.toggle('hide');
}

function toggleMenuCarrot(elementId){
  document.getElementById(elementId).classList.toggle('drop-menu-open');
  document.getElementById(elementId).classList.toggle('drop-menu-closed');
}

// General Functions

function displayObject(obj) {
  return JSON.stringify(obj, null, 4);
}

function clearLocalStorage() {
  localStorage.clear();
}


//////////////////////// Section 8 Events ///////////////////////////////////

//initialize Cookie Banner eventState as active & pending.

//clearLocalStorage();

let eventState = {
  cookie_banner: {
    active: true,
    consent: {
      statistics: false,
    }
  }
}

// Checks + retrieves localCart state from localStorage onload. If none, sets it.
if (localStorage.getItem("eventState") !== null){
  eventState = JSON.parse(localStorage.getItem('eventState'));
} else {
  localStorage.setItem("eventState", JSON.stringify(eventState));
};


/////// Cookie Consent Functions

// Reads Event State for cookie banner.

function consentState( state ){
  if (state.cookie_banner.active === true){
    toggleVisible('privacy-banner');
    //console.log("consent banner active");
    //console.log("window dataLayer: ");
    //console.log(window.dataLayer);

  } else if (state.cookie_banner.active === false && state.cookie_banner.consent.statistics === true){
    console.log("consent banner inactive, statistics active, will update gtag state.");
    gtagUpdate( state );
    //console.log("window dataLayer: ");
    //console.log(window.dataLayer);

  } else if (state.cookie_banner.active === false && state.cookie_banner.consent.statistics === false){
    console.log("consent banner inactive, statistics denied, will not update gtag state.");
    //console.log("window dataLayer: ");
    //console.log(window.dataLayer);
  } else {
    console.log("Error: consentState failure.");
    //console.log("This is the state passed to consentState function:")
    //console.log(state);
    //console.log("window dataLayer: ");
    //console.log(window.dataLayer);
  }
}

// Updates Event State for cookie choice.

function updateConsent( selection ){
  eventState.cookie_banner.active = false;
  eventState.cookie_banner.consent.statistics = selection;
  localStorage.setItem("eventState", JSON.stringify(eventState));
  gtagUpdate( eventState );
}


//// Updates gtag after consent event.
function gtagUpdate( state ){
  // Is called by updateConsent function after localStorage event state update.
  if (state.cookie_banner.consent.statistics === true){
    console.log("gtagUpdate will turn gtag ON:")
    gtag('consent', 'update', {
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'ad_storage': 'denied',
        'analytics_storage': 'granted'
      });
      console.log("window dataLayer: ");
      console.log(window.dataLayer);
  } else if (state.cookie_banner.consent.statistics === false){
    console.log(`gtagUpdate will keep gtag OFF:`);
    /*gtag('consent', 'update', {
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'ad_storage': 'denied',
        'analytics_storage': 'denied'
      });*/
    console.log("window dataLayer: ");
    console.log(window.dataLayer);
  } else {
    console.log("Error: gtagUpdate failed.");
  }
}



/// Onload Event State Check
consentState( eventState );
