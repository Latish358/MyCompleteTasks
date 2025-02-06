
function logout() {
    // Display a confirmation alert
    const confirmLogout = confirm("Are you sure you want to log out?");
    
    // If the user clicks "OK", redirect to Login.html
    if (confirmLogout) {
        window.location.href = "Login.html";
    }
}
  
  // Toggle submenus
function toggleSubmenu(submenuId) {
    const submenu = document.getElementById(submenuId);
    const toggleIcon = submenu.previousElementSibling.querySelector('.submenu-toggle');

    // Toggle the visibility of the submenu
    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';

    // Rotate the chevron icon when the submenu is active
    toggleIcon.classList.toggle('rotate');
}

// Add event listeners for submenus (nested)
document.querySelectorAll('.submenu li > a').forEach(submenuItem => {
    submenuItem.addEventListener('click', function (e) {
        e.stopPropagation(); // Prevent event from affecting parent menus
        const parentLi = submenuItem.parentElement;
        const nestedSubmenu = parentLi.querySelector('.submenu');

        if (nestedSubmenu) {
            nestedSubmenu.style.display = nestedSubmenu.style.display === 'block' ? 'none' : 'block';
            const toggleIcon = parentLi.querySelector('.submenu-toggle');
            if (toggleIcon) {
                toggleIcon.classList.toggle('rotate');
            }
        }
    });
});

  
  // Function to toggle the visibility of the dropdown
  function toggleCountryDropdown() {
    const dropdown = document.getElementById('countryDropdown');
    // Toggle the display between block (show) and none (hide)
    dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
  }

  // Close the dropdown if clicked outside of it
  document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('countryDropdown');
    const languageSelector = document.querySelector('.language-selector');
    const globeIcon = document.querySelector('img[alt="geography--v2"]');

    // Check if the click was outside the dropdown or the language selector
    if (!dropdown.contains(event.target) && !languageSelector.contains(event.target) && !globeIcon.contains(event.target)) {
      dropdown.style.display = 'none';
    }
  });

// ACTIVE MENU ITEM HIGHLIGHTING
const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
allSideMenu.forEach(item => {
    const li = item.parentElement;
    item.addEventListener('click', function () {
        allSideMenu.forEach(i => {
            i.parentElement.classList.remove('active');
        });
        li.classList.add('active');
    });
});

// TOGGLE SIDEBAR (HIDE/SHOW) with Chevron Icon
const menuBar = document.querySelector('#content nav .bi.bi-chevron-compact-right'); // Updated to chevron icon
const sidebar = document.getElementById('sidebar');
menuBar.addEventListener('click', function () {
    sidebar.classList.toggle('hide');
});

// AUTO-ADJUST FOR WINDOW RESIZING
if (window.innerWidth < 768) {
    sidebar.classList.add('hide');
} else if (window.innerWidth > 576) {
    searchButtonIcon.classList.replace('bx-x', 'bx-search');
    searchForm.classList.remove('show');
}

window.addEventListener('resize', function () {
    if (this.innerWidth > 576) {
        searchButtonIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }
});



// TOGGLE DASHBOARD SUBMENU
function toggleSubmenu() {
    const dashboardItem = document.querySelector('.side-menu li.active');
    const submenu = dashboardItem.querySelector('.submenu');
    const content = document.getElementById('content');

    // Check if the submenu is already visible
    if (submenu.style.display === 'block') {
        // Hide the submenu
        submenu.style.display = 'none';
        dashboardItem.classList.remove('active');
        content.classList.remove('expanded');
        // Shrink content area
    } else {
        // Show the submenu
        submenu.style.display = 'block';
        dashboardItem.classList.add('active');
        content.classList.add('expanded');
        // Expand content area
    }
}



function toggleSubmenu(submenuId) {
    const submenu = document.getElementById(submenuId);
    const toggleIcon = submenu.previousElementSibling.querySelector('.submenu-toggle');

    // Toggle the visibility of the submenu
    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';

    // Rotate the chevron icon when the submenu is active
    toggleIcon.classList.toggle('rotate');
}



function toggleFullscreen() {
  if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) { // Firefox
          document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
          document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
          document.documentElement.msRequestFullscreen();
      }
  } else {
      if (document.exitFullscreen) {
          document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { // Firefox
          document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
          document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { // IE/Edge
          document.msExitFullscreen();
      }
  }
}

var search=document.getElementById('search');


search.addEventListener('focus',(event)=>{

document.getElementById('search-wrapper').style.border="1px solid #1dbf73";

});


search.addEventListener('focusout',(event)=>{

document.getElementById('search-wrapper').style.border="1px solid rgba(0, 0, 0, 0.276)";

});


