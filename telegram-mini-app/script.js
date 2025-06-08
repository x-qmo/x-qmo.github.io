document.addEventListener('DOMContentLoaded', () => {
      const postsContainer = document.getElementById('postsContainer');
      const closeButton = document.getElementById('closeButton');
      const headerTitle = document.querySelector('header h1');

      // URL RSS Feed blog Jekyll Anda
      // Pastikan ini adalah URL feed.xml atau atom.xml yang benar dari blog Anda yang di-hosting
      const RSS_FEED_URL = 'https://x-qmo.github.io/feed.xml'; // GANTI INI DENGAN URL FEED BLOG ANDA

      // Fungsi untuk mengambil dan memparsing RSS Feed
      async function fetchAndParseRss() {
          try {
              const response = await fetch(RSS_FEED_URL);
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              const text = await response.text();
              const parser = new DOMParser();
              const xmlDoc = parser.parseFromString(text, "text/xml");

              const items = xmlDoc.querySelectorAll('item'); // Untuk RSS
              // Atau xmlDoc.querySelectorAll('entry') untuk Atom

              if (items.length === 0) {
                  headerTitle.textContent = 'Tidak ada postingan blog ditemukan.';
                  return;
              }

              headerTitle.textContent = 'x-Qmo Blog';
              postsContainer.innerHTML = ''; // Bersihkan konten sebelumnya

              items.forEach(item => {
                  const title = item.querySelector('title').textContent;
                  const link = item.querySelector('link').textContent;
                  const pubDate = item.querySelector('pubDate') ? new Date(item.querySelector('pubDate').textContent) : null;
                  const description = item.querySelector('description') ? item.querySelector('description').textContent : '';

                  const postCard = document.createElement('div');
                  postCard.className = 'post-card';

                  const formattedDate = pubDate ? pubDate.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Tanggal Tidak Tersedia';

                  postCard.innerHTML = `
                      <h2><a href="<span class="math-inline">\{link\}" target\="\_blank"\></span>{title}</a></h2>
                      <span class="date"><span class="math-inline">\{formattedDate\}</span\>
                      <p>{description.substring(0, 150)}...</p> <a href="${link}" target="_blank" class="read-more">Baca Selengkapnya</a>
  `;
  postsContainer.appendChild(postCard);
  });
  } catch (error) {
              console.error('Error fetching or parsing RSS feed:', error);
              headerTitle.textContent = 'Gagal memuat postingan blog.';
              postsContainer.innerHTML = `<p class="error-message">Terjadi kesalahan saat memuat blog. Mohon coba lagi nanti.</p>`;
          }
      }

      fetchAndParseRss();

      // Integrasi dengan Telegram Web Apps API
      // Memastikan Telegram Web Apps API tersedia
      if (window.Telegram && window.Telegram.WebApp) {
          const WebApp = window.Telegram.WebApp;

          // Inisialisasi WebApp
          WebApp.ready();

          // Tampilkan tombol tutup jika diperlukan (misalnya jika app dibuka dari link inline)
          if (WebApp.isExpanded) {
              closeButton.style.display = 'block';
              closeButton.addEventListener('click', () => {
                  WebApp.close();
              });
          } else {
              // Jika tidak di-expand (misalnya di-minimize), Telegram akan otomatis menampilkan tombol close di header app
              closeButton.style.display = 'none';
          }

          // Jika Anda ingin mengubah warna tema agar sesuai dengan Telegram
          WebApp.setHeaderColor(WebApp.themeParams.header_bg_color || '#0088cc'); // Menggunakan warna header Telegram atau default
          WebApp.setBackgroundColor(WebApp.themeParams.bg_color || '#f0f2f5'); // Menggunakan warna background Telegram atau default


      } else {
          console.warn('Telegram WebApp API not available. Running outside Telegram.');
          // Jika aplikasi dijalankan di luar Telegram, sembunyikan tombol tutup
          closeButton.style.display = 'none';
      }
  });
