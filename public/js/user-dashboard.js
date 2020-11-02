//sidebar toggle
const sidebarOpen = false;
const sidebar = document.getElementById('sidebar')
const sidebarCloseIcon = document.getElementById('sidebarIcon');

function toggleSidebar(){
  if(!sidebarOpen){
    sidebar.classList.add('sidebar_responsive')
    // sidebarCloseIcon.style.display = "inline";
    sidebarOpen = true;
  }
}

function closeSidebar(){
  if(sidebarOpen){
    sidebar.classList.remove('sidebar_responsive')
    sidebarOpen = false;
  }
}
