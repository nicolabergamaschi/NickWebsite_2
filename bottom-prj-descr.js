const projectDescriptions = document.querySelectorAll('div.prj-description div'); // array of all div.description containers

const mainMenu = document.querySelectorAll('li#head-list') // array with all headlist element for the projects menu
const allImages = document.querySelectorAll('.carousel-inner'); // array with all of the divs containing images from carousels

const headList = document.querySelectorAll('ul#sub-list li') // array with all headlist element for the projects menu
const toggleElements = document.querySelectorAll('div.toggle');


function isElementInViewport(element) {
  const area = element.getBoundingClientRect();
  return (
    area.top >= 0 &&
    area.left >= 0 &&
    area.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    area.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
function turnDescriptionsOff(locationDescriptions) {
  locationDescriptions.forEach(project => {
    const title = project.querySelector('h4');
    const paragraph = project.querySelector('p');
    title.style.display = 'none'
    paragraph.style.display = 'none'
  });
}
function turnDescriptionsOn(locationDescriptions, carousel) {
  const activeElementCarousel = carousel.querySelector('.active');
  locationDescriptions.forEach(project => {
    const title = project.querySelector('h4');
    const paragraph = project.querySelector('p');
    title.style.display = 'none';
    paragraph.style.display = 'none';
    if (project.getAttribute('data-prj') === activeElementCarousel.id) {
      title.style.display = 'block';
      paragraph.style.display = 'block';
    }
  });
}
function openCategoryMenus(elementToOpen) {
  elementToOpen.forEach(element => {
    element.classList.add('open');
  });
}
function closeCategoryMenus(elementToClose) {
  elementToClose.forEach(element => {
    element.classList.remove('open');
  })
}

//! make sure the menus are off when launchin the web-page

window.onload = function() {
  projectDescriptions.forEach(project => {
    const title = project.querySelector('h4.title');
    const paragraph = project.querySelector('p.text-description');
    title.style.display = 'none';
    paragraph.style.display = 'none';
  })
};


//! trigger project descriptions using image click
images.forEach(image => {
  image.addEventListener("click", function () {
    const tagContainer = image.querySelector('div.carousel-dark div.carousel-inner div.active img');
    turnDescriptionsOn(projectDescriptions, image)
  })
})

//! trigger project descriptions using sub-list button prj click
headList.forEach(sublist => {
  sublist.addEventListener('click', function() {
    const linkTagFromClickSublist = sublist.children[0].id;
    projectDescriptions.forEach(project => {

      const title = project.querySelector('h4');
      const paragraph = project.querySelector('p');
      title.style.display = 'none';
      paragraph.style.display = 'none';
      
      if (project.getAttribute('data-prj') === linkTagFromClickSublist) {
      
        title.style.display = 'block';
        paragraph.style.display = 'block';
      } else {
        console.log('no matching ids')
      }
    });
    
  })
})

//! changing highlighted project based on scrolling
function changeHighligthedPrjOnScroll(carousel) {
  const activeItem = carousel.querySelector('.carousel-item.active');
  if (activeItem) {
    const activePrjId = activeItem.id;
    updateSublistHighlightFromScroll(activePrjId); // Use the new function
  }
}


//! enable/disable descriptions while scrolling between projects and update it if scrolling to a different category

window.addEventListener('scroll', function() {
  const homeCarousel = document.querySelector('div#page-home'); 
  const aiCarousel = document.querySelector('div#carouselExampleDarkAi div.carousel-inner');
  const cgiCarousel = document.querySelector('div#carouselExampleDarkCgi div.carousel-inner');
  const phtCarousel = document.querySelector('div#carouselExampleDarkPhoto div.carousel-inner');
  const aboutCarousel = document.querySelector('div#page-about');

  if (isElementInViewport(homeCarousel)) {
    /*console.log('Home carousel is in the viewport');*/
    turnDescriptionsOff(projectDescriptions);
    closeCategoryMenus(toggleElements);

  } else if (isElementInViewport(aiCarousel)) {
    /*console.log('Ai carousel is in the viewport')*/
    turnDescriptionsOn(projectDescriptions, aiCarousel)
    openCategoryMenus(toggleElements)
    changeHighligthedPrjOnScroll(aiCarousel)

  } else if (isElementInViewport(cgiCarousel)) {
    /*console.log('Cgi carousel is in the viewport')*/
    turnDescriptionsOn(projectDescriptions, cgiCarousel)
    openCategoryMenus(toggleElements)
    changeHighligthedPrjOnScroll(cgiCarousel)

  } else if (isElementInViewport(phtCarousel)) {
    /*console.log('Photo carousel is in the viewport');*/
    turnDescriptionsOn(projectDescriptions, phtCarousel)
    openCategoryMenus(toggleElements)
    changeHighligthedPrjOnScroll(phtCarousel)

  } else if (isElementInViewport(aboutCarousel)) {
    /*console.log('About carousel is in the viewport');*/
    turnDescriptionsOff(projectDescriptions);
    closeCategoryMenus(toggleElements);

  } else {
    /*console.log('Unusual carousel in the viewport!!');*/
  }
})
