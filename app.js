'use strict';

//search form
async function handleSubmit(event) {
    event.preventDefault();
    const inputValue = document.querySelector('.js-search-input').value;
    const searchQuery = inputValue.trim();
  
    const searchResults = document.querySelector('.js-search-results');
    searchResults.textContent = '';
  
    try {
      const results = await searchWikipedia(searchQuery);
      if (results.query.searchinfo.totalhits === 0) {
        alert('There were no results matching the query.');
        return;
      }
  
      displayResults(results);
    } catch (err) {
      console.log(err);
      alert('Failed to Search');
    }}
  

//get api results
  async function searchWikipedia(searchQuery) {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&redirects=1&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`
    console.log(endpoint)
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const json = await response.json();
    return json;
  }
  
//display results
  function displayResults(results) {
    const searchResults = document.querySelector('.js-search-results');
  
    results.query.search.forEach(result => {
      const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
      const time = `${result.timestamp}`.slice(0,10);
  
      searchResults.insertAdjacentHTML(
        'beforeend',
        `<div class="result-item">
          <h3 class="result-title">
            ${result.title}
          </h3>
          <a href="${url}" class="result-link" target="_blank" rel="noopener">${url}</a>
          <div class='snippet'>
          <span class="result-snippet">${result.snippet}</span><br>
          </div>
          <p class='time-modified'><strong>Last updated:</strong> ${time}</p>
        </div>`
      );
    });
  }
  
  
  const form = document.querySelector('.js-search-form');
  form.addEventListener('submit', handleSubmit);
  