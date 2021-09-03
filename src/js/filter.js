export class Filter{
  constructor(){
    this.tagsEl =  document.querySelectorAll('.card__tags');
    this.filterEl =  document.querySelector('.filter');
    this.filterListEl =  document.querySelector('.filter__list');
    this.filterClearEl =  document.querySelectorAll('.filter__clear');
    this.cardsEl =  document.querySelectorAll('.card');
    this.filters = [];  
  }

  pushFilters = (value) => {
    this.filters.push(value);
    return this.filters;
  }

  removeIndexFilters = (value) => {
    let removeIndex = this.filters.map(function(item) { return item; }).indexOf(value);
    this.filters.splice(removeIndex, 1);
  }

  showFilters = () =>{
    this.filterEl.style.display = 'block';
    let htmlTemplte = '';
    this.filters.forEach(element => {
      htmlTemplte += `
        <li class="filter__item">
          <span class="filter__text">${element}</span>
          <button type="button" aria-label="remove ${element} filter" class="filter__icon">
            <img width="14" height="14" src="images/icon-remove.svg" alt="Icon remove filter">
          </button>
        </li>      
      `;
      this.filterListEl.innerHTML = htmlTemplte;
    })   
  }

  removeFilters = () => {
    document.querySelectorAll('.filter__icon').forEach(element => {
      element.addEventListener('click', (e) =>{
        let value = e.target.parentNode.previousElementSibling.innerText;
        this.removeIndexFilters(value);
        this.displayElements()
        e.target.parentNode.parentNode.remove();
        if(this.filters.length === 0 ){
          this.filterEl.style.display = 'none';
        }
      })
    })
  }

  isInArray = (array, search) => {
    return array.includes(search);
  }

  tags = () => {
    let tags = [];
    let filters = [];
    this.cardsEl.forEach((cards, key) =>{   
      tags[key] = cards.dataset.tags.split(' ');
      filters[key] = this.filters.every(r => tags[key].includes(r));
    })
    return filters
  }

  displayElements = () => {   
    let filters = this.tags();  
     
    filters.forEach((cards, key) =>{   
      if(cards){
        this.cardsEl[key].classList.remove('card--disabled');
      } else{
        this.cardsEl[key].classList.add('card--disabled');
      }
    })  
  }

  filtersClear = (e) => {
    while (this.filters.length) {
      this.filters.pop();
    }

    this.filterListEl.innerHTML = '';

    if(this.filters.length === 0 ){
      this.filterEl.style.display = 'none';
    }
  }

  // hideElements = (value) => { 
  //   let filters = this.tags();  
     
  //   filters.forEach((cards, key) =>{   
  //     if(cards){
  //       this.cardsEl[key].classList.remove('card--disabled');
  //     } else{
  //       this.cardsEl[key].classList.add('card--disabled');
  //     }
  //   })  
    
  //   // this.cardsEl.forEach((cards, key) =>{
    

  //   //   if(cards.dataset.tags.includes(value) && 
  //   //     !cards.classList.contains('card--disabled')){
  //   //     cards.classList.remove('card--disabled');
  //   //   } else{
  //   //     cards.classList.add('card--disabled');
  //   //   }    
  //   // })
  // }
  

  eventListeners = () => {
    this.tagsEl.forEach(element => {
      element.addEventListener('click', (e) =>{
        let value = e.target.innerText;       
       
        if (!this.isInArray(this.filters, value)){
          this.pushFilters(value);  
          this.showFilters();  
          this.displayElements();
          setTimeout (() =>{
            this.removeFilters()
          }, 100);   
        }         
      })
    }); 

    document.querySelector('.filter__clear').addEventListener('click', (e) =>{
      this.filtersClear(e);
      this.displayElements();
    })
    
  }

}