
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const category = document.getElementById('category').value;
    const media = document.getElementById('media').files[0];
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    if (media) formData.append('media', media);
    
    try {
      const response = await fetch('http://localhost:8080/api/news/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        document.getElementById('message').textContent = "News submitted successfully!";
        document.getElementById('uploadForm').reset();
      } else {
        document.getElementById('message').textContent = "Error submitting news!";
      }
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('message').textContent = "Error submitting news!";
    }
  });
  
