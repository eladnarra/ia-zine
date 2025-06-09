document.addEventListener("DOMContentLoaded", function () {
  const cacheKey = "donationData";
  const cacheExpiry = 15 * 60 * 1000; // 15 minutes
  const cached = localStorage.getItem(cacheKey);
  const now = new Date().getTime();

  if (cached) {
    const parsed = JSON.parse(cached);
    if (now - parsed.timestamp < cacheExpiry) {
      updateDonationStats(parsed.data);
      console.log('Using cached data');
      return; // use cached data
    }
  }

  // Fetch fresh data from Sheety
  let url = 'https://api.sheety.co/cbc66317d5a525dc4c43eca2f00ba8ac/archivezine/donations';
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const donations = data.donations; // adjust as needed
      const donationData = {
        count: donations.length, // count the number of objects in the JSON to get the total number of donations
        amount: donations.reduce((sum, d) => sum + Number(d.amount || 0), 0) // convert to numbers and sum all the amounts from the Amount column
      };
      console.log('fetched new data');
      
      // Cache the result
      localStorage.setItem(cacheKey, JSON.stringify({
        data: donationData,
        timestamp: now
      }));

      updateDonationStats(donationData);
    })
    .catch(error => console.error("Error fetching donation data:", error));

  function updateDonationStats({ count, amount }) {
    document.querySelector("#donation-count").textContent = count;
    document.querySelector("#donation-amount").textContent = `$${amount}`;
  }
});