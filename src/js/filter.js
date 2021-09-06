export class Filter{
  constructor(){
    this.filters = [];  
    this.filterEl =  document.querySelector('.filter');
    this.filterWrapperEl =  document.querySelector('.filter__wrapper');
    this.filterListEl =  document.querySelector('.filter__list');
    this.cardsEl =  document.querySelectorAll('.card');
    this.cardsWrapperEl =  document.querySelector('#cardWrapper');
  }

  /**
   * Push elements into array
   * @param {*} value 
   */
  pushFilters = (value) => {
    this.filters.push(value);
    return this.filters;
  }

  /**
   * Remove elements of array
   * @param {*} value 
   */
  removeIndexFilters = (value) => {
    let removeIndex = this.filters.map(function(item) { return item; }).indexOf(value);
    this.filters.splice(removeIndex, 1);
  }

  /**
   * Check if items is in array
   * @param {*} array 
   * @param {*} search 
   */
  isInArray = (array, search) => {
    return array.includes(search);
  }

  /**
   * Display filters container and show array tags
   */
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

  /**
   * Compare array filters with card data attributes and return the ones that exist
   */
  tags = () => {
    let tags = [];
    let filters = [];
    this.cardsEl.forEach((cards, key) =>{   
      tags[key] = cards.dataset.tags.split(' ');
      filters[key] = this.filters.every(r => tags[key].includes(r));
    })
    return filters
  }

  /**
   * Display filtered cards
   */
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

  /**
   * Remove filters of array, remove filters elements and hide filters container
   */
  filtersClear = () => {
    while (this.filters.length) {
      this.filters.pop();
      this.filterEl.style.display = 'none';
      this.filterListEl.innerHTML = '';
    }
  }

  eventListeners = () => {
   this.cardsWrapperEl.addEventListener('click', (e) =>{   
     if(e.target.className === 'card__tags'){
      let value = e.target.innerText;       
      if (!this.isInArray(this.filters, value)){
        this.pushFilters(value);  
        this.showFilters();  
        this.displayElements();
      }         
     }      
    })

    this.filterWrapperEl.addEventListener('click', (e) =>{
      if(e.target.nodeName === 'IMG'){
        let value = e.target.parentNode.previousElementSibling.innerText;
        this.removeIndexFilters(value);
        this.displayElements()
        e.target.parentNode.parentNode.remove();
        if(this.filters.length === 0 ){
          this.filterEl.style.display = 'none';
        }
      }

      if(e.target.className === 'filter__clear'){
        this.filtersClear();
        this.displayElements();
      }     
    })    
  }

}