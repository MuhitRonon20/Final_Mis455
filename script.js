async function searchCountry() {
    const countryName = document.getElementById('countryInput').value.trim();
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = '';
  
    if (!countryName) {
      alert("Please enter a country name.");
      return;
    }
  
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
      if (!response.ok) {
        throw new Error("Country not found");
      }
  
      const data = await response.json();
      const country = data[0];
  
      const currencies = Object.values(country.currencies || {})
        .map(c => `${c.name} (${c.symbol})`).join(', ');
  
      const languages = Object.values(country.languages || {}).join(', ');
  
      const resultHTML = `
        <div class="result">
          <h2>${country.name.common}</h2>
          <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
          <div class="data-item"><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</div>
          <div class="data-item"><strong>Currency:</strong> ${currencies || 'N/A'}</div>
          <div class="data-item"><strong>Population:</strong> ${country.population.toLocaleString()}</div>
          <div class="data-item"><strong>Region:</strong> ${country.region}</div>
          <div class="data-item"><strong>Timezones:</strong> ${country.timezones.join(', ')}</div>
          <div class="data-item"><strong>Languages:</strong> ${languages}</div>
        </div>
      `;
  
      resultContainer.innerHTML = resultHTML;
    } catch (error) {
      resultContainer.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
  }
  