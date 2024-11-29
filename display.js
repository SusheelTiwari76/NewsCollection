
// Run after DOM content loads
document.addEventListener('DOMContentLoaded', () => {
  fetchNews(); // Load all news initially
});

// Fetch news based on category
function fetchNews(category = '') {
  const newsFeed = document.getElementById('newsFeed');
  const url = category 
    ? `http://localhost:8080/api/news?category=${encodeURIComponent(category)}` 
    : 'http://localhost:8080/api/news';

  // Clear existing content and show loading
  newsFeed.innerHTML = '<p>Loading...</p>';

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      // Display news articles
      if (data.length === 0) {
        newsFeed.innerHTML = '<p>No news available for this category.</p>';
      } else {
        newsFeed.innerHTML = data.map(news => `
          <div class="news-item">
            <!-- Static Header Section -->
            <div class="news-header">
              <img src="logo.png" alt="News Logo" class="news-logo"> <!-- Static logo -->
              <div class="news-meta">
                <p>BY <span class="news-source">Susheel Tiwari</span><span class="news-s"> | Make it now</span></p>
                <p class="news-date">LAST UPDATED: ${new Date().toLocaleString()}</p> <!-- Current date/time -->
              </div>
            </div>
            
            <!-- Dynamic Body Section -->
            <div class="news-body">
              <h2>${news.title}</h2>
              <p>${news.content}</p>
              ${news.mediaUrl ? (
                news.mediaUrl.endsWith('.mp4') 
                  ? `<video controls src="http://localhost:8080${news.mediaUrl}" class="news-media"></video>` 
                  : `<img src="http://localhost:8080${news.mediaUrl}" alt="${news.title}" class="news-media">`
              ) : ''}
            </div>
            
            <!-- Static Footer Section -->
            <div class="news-footer">
              <p>SHARE</p>
              <div class="news-share-icons">
                <!-- Facebook Share Link -->
                <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(news.title)}" target="_blank">
                  <img src="fb.png" alt="Facebook">
                </a>
                <!-- Twitter Share Link -->
                <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(news.title)}" target="_blank">
                  <img src="tw.png" alt="Twitter">
                </a>
                <!-- WhatsApp Share Link -->
                <a href="https://wa.me/?text=${encodeURIComponent(news.title)}%20${encodeURIComponent(news.content)}%20${encodeURIComponent(window.location.href)}" target="_blank">
                  <img src="wt.png" alt="WhatsApp">
                </a>
                <!-- Telegram Share Link -->
                <a href="https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(news.title)}" target="_blank">
                  <img src="tg.png" alt="Telegram">
                </a>
              </div>
            </div>
          </div>
        `).join('');
      }
    })
    .catch(error => {
      console.error('Error fetching news:', error);
      newsFeed.innerHTML = `<p>Failed to load news. Please try again later.</p>`;
    });
}

// Highlight the active category
function setActive(link) {
  document.querySelectorAll('.navbar-links a').forEach(a => a.classList.remove('active'));
  link.classList.add('active');
}


