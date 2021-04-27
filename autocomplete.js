const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) =>{
    
    root.innerHTML = `
    <label><b>Search</b></label>
    <input class="input" />
    
    <div class="dropdown ">
      <div class="dropdown-menu">
        <div class="dropdown-content results">
      </div>
    </div>
    `;
    
    //grab input from html doc - remember we are using Bulma CSS
    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');
    
    //our autocomplete widget code
    const onInput = async event => {
       const items = await fetchData(event.target.value);
    
       //this removes empty dropdown box if there is no title in input
       if(!items.length){
           dropdown.classList.remove('is-active');
           return;
       }
    
       //sets up html to display items in dropdown - 'is-active' is the dropdown toggle code from Bulma
       resultsWrapper.innerHTML = '';
       dropdown.classList.add('is-active');
    
    
       //this code block searches api for move, and then dynamically displays them in dropdown to html
        for(let item of items) {
            //this 1st const makes a tags for dropdown items (items)
            const option = document.createElement('a');
            //tertiary operator that checks is the item received back from api has a poster or not and stores it in a variable
              
            option.classList.add('dropdown-item')
            //inserts items searched into dropdown dyanmically
            option.innerHTML= renderOption(item);
            //add an event listner to option a tags - will be used to dipslay content to screen on click-also displays full title in input box to replace search
            option.addEventListener('click', () =>{
                dropdown.classList.remove('is-active');
                input.value = inputValue(item);
                onOptionSelect(item);
            });
    
            resultsWrapper.appendChild(option);
        }    
    };
    
    //run all functions and search api through debounce to cap limit
    input.addEventListener('input', debounce(onInput, 500));
    
    
    //turns off dropdown if clicked outside of it
    document.addEventListener('click', event =>{
        if (!root.contains(event.target)){
            dropdown.classList.remove('is-active');
        }
    });
};