// Experience data
const experienceData = {
    'supplying-seniors': {
        title: 'Supplying Seniors',
        position: 'SEO Specialist',
        period: 'Dec 2024 - Jun 2025',
        description: 'As an SEO Specialist at Supplying Seniors, I was responsible for driving organic traffic and improving search engine rankings through comprehensive SEO strategies.',
        achievements: [
            'Performed on-page optimization from homepage to product pages',
            'Conducted technical audits and improved site speed',
            'Created custom sections using Liquid programming',
            'Set up Klaviyo workflow and performed weekly email campaigns',
            'Created landing pages using systeme.io',
            'Overhauled and revamped the homepage for a modern look'
        ]
    },
    'arash-law': {
        title: 'Arash Law',
        position: 'Senior Link Builder',
        period: 'Aug 2023 - Dec 2023',
        description: 'As a Senior Link Builder at Arash Law, I focused on acquiring high-quality backlinks and improving the website\'s domain authority.',
        achievements: [
            'Successfully placed backlinks from government websites',
            'Ranked high-value keywords',
            'Established relations with government, chiropractor, and therapist websites',
            'Proactively sought link opportunities for guest post campaigns',
            'Identified .gov, .edu, and .org link prospects for resource campaigns',
            'Performed citation placements on legal directories'
        ]
    },
    'callbox': {
        title: 'Callbox Inc',
        position: 'Senior Data Management Specialist',
        period: 'Jun 2020 - Jun 2023',
        description: 'At Callbox Inc, I led data profiling efforts and ensured data quality for client projects.',
        achievements: [
            'Led data profiling for Ilo-ilo and Siargao Callbox branches',
            'Examined and verified data to meet client\'s Ideal Customer Profile (ICP)',
            'Gathered and collected data from data warehouses and online sources',
            'Ensured compliance with legal data availability guidelines',
            'Collaborated with cross-functional teams to improve data quality',
            'Developed and maintained data management processes'
        ]
    },
    'accelerate-agency': {
        title: 'Accelerate Agency',
        position: 'Email Hyper-Personalizer',
        period: 'Jul 2022 - Aug 2022',
        description: 'At Accelerate Agency, I specialized in creating hyper-personalized email campaigns as part of the guest post link building process.',
        achievements: [
            'Collected and analyzed prospect data for targeted outreach',
            'Crafted highly personalized email templates for link building campaigns',
            'Maintained high response rates through A/B testing of email templates',
            'Collaborated with the outreach team to optimize campaign performance',
            'Tracked and reported on email campaign metrics and success rates',
            'Contributed to the development of outreach strategies for various clients'
        ]
    },
    'bahagia-staff': {
        title: 'Bahagia Staff',
        position: 'Outreach Specialist | Link Builder',
        period: 'Jan 2019 - Dec 2019',
        description: 'As a Virtual Assistant at Bahagia Staff, I specialized in email outreach and link building, working with high-profile clients to build quality backlinks.',
        achievements: [
            'Acquired backlinks through ethical, white hat SEO techniques',
            'Worked with prominent clients including Canva, Airtasker, and Contactout',
            'Developed and maintained relationships with webmasters and content managers',
            'Created and managed outreach campaigns to secure high-quality backlinks',
            'Tracked and reported on link acquisition progress and success rates',
            'Conducted competitor analysis to identify new link building opportunities',
            'Maintained organized records of outreach efforts and communications'
        ]
    }
};

// Testimonials Carousel
class TestimonialsCarousel {
    constructor() {
        this.slides = document.querySelectorAll('.testimonial-slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.testimonial-prev');
        this.nextBtn = document.querySelector('.testimonial-next');
        this.currentSlide = 0;
        this.autoSlideInterval = null;
        
        this.init();
    }
    
    init() {
        // Show first slide
        this.showSlide(this.currentSlide);
        
        // Event listeners
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Auto slide
        this.startAutoSlide();
        
        // Pause on hover
        const slider = document.querySelector('.testimonial-slider');
        slider.addEventListener('mouseenter', () => this.stopAutoSlide());
        slider.addEventListener('mouseleave', () => this.startAutoSlide());
    }
    
    showSlide(index) {
        // Hide all slides
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        this.slides[index].classList.add('active');
        this.dots[index].classList.add('active');
        
        this.currentSlide = index;
    }
    
    nextSlide() {
        let nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(nextIndex);
    }
    
    prevSlide() {
        let prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prevIndex);
    }
    
    goToSlide(index) {
        this.showSlide(index);
    }
    
    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => this.nextSlide(), 7000);
    }
    
    stopAutoSlide() {
        clearInterval(this.autoSlideInterval);
    }
}

// Resume Download Functionality
class ResumeDownloader {
    constructor() {
        this.downloadBtn = document.getElementById('download-resume');
        this.tooltip = document.getElementById('download-tooltip');
        this.formatOptions = document.querySelectorAll('.format-option');
        
        if (this.downloadBtn) {
            this.init();
        }
    }
    
    init() {
        // Toggle tooltip on button click
        this.downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.tooltip.classList.toggle('show');
            
            // Close tooltip when clicking outside
            if (this.tooltip.classList.contains('show')) {
                document.addEventListener('click', this.handleOutsideClick);
            } else {
                document.removeEventListener('click', this.handleOutsideClick);
            }
        });
        
        // Handle format selection
        this.formatOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const format = option.getAttribute('data-format');
                this.downloadResume(format);
                this.tooltip.classList.remove('show');
            });
        });
    }
    
    handleOutsideClick = (e) => {
        if (!this.tooltip.contains(e.target) && e.target !== this.downloadBtn) {
            this.tooltip.classList.remove('show');
            document.removeEventListener('click', this.handleOutsideClick);
        }
    }
    
    downloadResume(format) {
        // In a real implementation, you would have different files for each format
        // For now, we'll just show an alert
        const formatNames = {
            'pdf': 'PDF',
            'docx': 'Word Document',
            'txt': 'Text File'
        };
        
        // Simulate download with a small delay
        this.showDownloadingState();
        
        setTimeout(() => {
            alert(`Your resume in ${formatNames[format]} format will start downloading.`);
            // In a real implementation, you would trigger the actual file download here
            // window.location.href = `/path/to/your/resume.${format}`;
            this.resetDownloadButton();
        }, 1000);
    }
    
    showDownloadingState() {
        const btnText = this.downloadBtn.querySelector('.btn-text');
        const btnIcon = this.downloadBtn.querySelector('.btn-icon i');
        
        // Save original content
        this.originalText = btnText.textContent;
        this.originalIcon = btnIcon.className;
        
        // Update to loading state
        btnText.textContent = 'Preparing...';
        btnIcon.className = 'fas fa-spinner fa-spin';
        this.downloadBtn.style.pointerEvents = 'none';
    }
    
    resetDownloadButton() {
        const btnText = this.downloadBtn.querySelector('.btn-text');
        const btnIcon = this.downloadBtn.querySelector('.btn-icon i');
        
        // Restore original content
        btnText.textContent = this.originalText;
        btnIcon.className = this.originalIcon;
        this.downloadBtn.style.pointerEvents = 'auto';
    }
}

// Music Player with Spotify Integration
class MusicPlayer {
    constructor() {
        this.audio = new Audio();
        this.playlist = [];
        this.spotifyAuth = new SpotifyAuth();
        this.spotifyToken = null;
        
        this.currentTrackIndex = 0;
        this.isPlaying = false;
        this.isShuffled = false;
        this.isRepeated = false;
        this.volume = 0.8;
        this.audio.volume = this.volume;
        
        // Bind methods to maintain 'this' context
        this.togglePlay = this.togglePlay.bind(this);
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.nextTrack = this.nextTrack.bind(this);
        this.prevTrack = this.prevTrack.bind(this);
        this.toggleShuffle = this.toggleShuffle.bind(this);
        this.toggleRepeat = this.toggleRepeat.bind(this);
        this.toggleMute = this.toggleMute.bind(this);
        this.setVolume = this.setVolume.bind(this);
        this.setProgress = this.setProgress.bind(this);
        this.updateProgress = this.updateProgress.bind(this);
        this.onTrackEnd = this.onTrackEnd.bind(this);
        this.toggleLike = this.toggleLike.bind(this);
        
        // Initialize
        this.init();
    }
    
    async fetchSpotifyApi(endpoint, method = 'GET', body = null) {
        try {
            const res = await fetch(`https://api.spotify.com/${endpoint}`, {
                headers: {
                    Authorization: `Bearer ${this.spotifyToken}`,
                    'Content-Type': 'application/json'
                },
                method,
                body: body ? JSON.stringify(body) : null
            });
            
            if (!res.ok) {
                throw new Error(`Spotify API error: ${res.status}`);
            }
            
            return await res.json();
        } catch (error) {
            console.error('Spotify API fetch error:', error);
            return null;
        }
    }
    
    async loadSpotifyTracks() {
        console.log('🎵 Loading Spotify tracks...');
        
        // Check if user is authenticated
        if (!this.spotifyAuth.isAuthenticated()) {
            console.log('🔐 User not authenticated, starting OAuth flow...');
            this.showAuthButton();
            return;
        }
        
        this.spotifyToken = this.spotifyAuth.getAccessToken();
        console.log('🔑 Using token:', this.spotifyToken.substring(0, 20) + '...');
        
        try {
            // Use the auth helper for API requests
            console.log('🎶 Fetching your top tracks...');
            const response = await this.spotifyAuth.apiRequest('/me/top/tracks?time_range=medium_term&limit=10');
            
            console.log('📊 Response status:', response.status);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ API Error:', errorText);
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }
            
            const data = await response.json();
            console.log('🎵 Received data:', data);
            
            if (data && data.items && data.items.length > 0) {
                console.log(`📝 Processing ${data.items.length} tracks...`);
                
                // Create playlist from your actual Spotify tracks
                this.playlist = data.items.map((track, index) => {
                    const trackInfo = {
                        title: track.name,
                        artist: track.artists.map(artist => artist.name).join(', '),
                        cover: track.album.images && track.album.images.length > 0 ? track.album.images[0].url : null,
                        src: track.preview_url, // Spotify 30-second preview
                        spotifyId: track.id,
                        external_url: track.external_urls ? track.external_urls.spotify : null,
                        hasPreview: !!track.preview_url
                    };
                    
                    console.log(`🎤 Track ${index + 1}: "${trackInfo.title}" by ${trackInfo.artist}`);
                    console.log(`   🖼️ Cover: ${trackInfo.cover ? 'Available' : 'None'}`);
                    console.log(`   🔊 Preview: ${trackInfo.hasPreview ? 'Available' : 'None'}`);
                    
                    return trackInfo;
                });
                
                console.log(`✅ Successfully loaded ${this.playlist.length} tracks from Spotify!`);
                
                // Load first track immediately
                if (this.playlist.length > 0) {
                    console.log('🚀 Loading first track:', this.playlist[0].title);
                    this.currentTrackIndex = 0;
                    this.loadTrack(0);
                    
                    // Update UI to show it's loaded
                    if (this.trackTitle && this.trackArtist) {
                        this.trackTitle.style.color = '#1DB954'; // Spotify green
                        this.trackArtist.style.color = '#b3b3b3';
                    }
                } else {
                    console.warn('⚠️ No tracks found');
                    this.loadFallbackPlaylist();
                }
            } else {
                console.warn('⚠️ No items in response');
                console.log('📄 Full response:', data);
                this.loadFallbackPlaylist();
            }
        } catch (error) {
            console.error('💥 Error loading Spotify tracks:', error);
            console.error('📋 Full error:', error);
            
            // Show error in UI
            if (this.trackTitle) {
                this.trackTitle.textContent = 'Spotify Error';
                this.trackTitle.style.color = '#ff6b6b';
            }
            if (this.trackArtist) {
                this.trackArtist.textContent = 'Check console for details';
                this.trackArtist.style.color = '#ff6b6b';
            }
            
            this.loadFallbackPlaylist();
        }
    }
    
    loadFallbackPlaylist() {
        console.log('🔄 Loading fallback playlist (Spotify failed)...');
        this.playlist = [
            {
                title: "Spotify Failed - Demo Track",
                artist: "Check Console for Errors",
                cover: "https://via.placeholder.com/300/ff6b6b/ffffff?text=Spotify+Failed",
                src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
            },
            {
                title: "Refresh to Try Again",
                artist: "Demo Fallback",
                cover: "https://via.placeholder.com/300/4ecdc4/ffffff?text=Try+Refresh",
                src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
            }
        ];
        
        // Show user notification
        if (this.trackTitle) {
            this.trackTitle.style.color = '#ff6b6b';
        }
        if (this.trackArtist) {
            this.trackArtist.style.color = '#ff6b6b';
        }
        
        console.log('⚠️ Using fallback playlist - check console for Spotify errors');
        
        if (this.playlist.length > 0) {
            this.loadTrack(0);
        }
    }
    
    init() {
        // Get DOM elements
        this.playBtn = document.getElementById('play-btn');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.shuffleBtn = document.getElementById('shuffle-btn');
        this.repeatBtn = document.getElementById('repeat-btn');
        this.volumeBtn = document.getElementById('volume-btn');
        this.volumeBar = document.getElementById('volume-bar');
        this.volumeLevel = document.getElementById('volume-level');
        this.progressBar = document.getElementById('progress-bar');
        this.progress = document.getElementById('progress');
        this.currentTimeEl = document.getElementById('current-time');
        this.durationEl = document.getElementById('duration');
        this.trackTitle = document.getElementById('now-playing-track');
        this.trackArtist = document.getElementById('now-playing-artist');
        this.trackCover = document.getElementById('now-playing-cover');
        this.likeBtn = document.getElementById('like-btn');

        // Add event listeners
        if (this.playBtn) this.playBtn.addEventListener('click', this.togglePlay);
        if (this.prevBtn) this.prevBtn.addEventListener('click', this.prevTrack);
        if (this.nextBtn) this.nextBtn.addEventListener('click', this.nextTrack);
        if (this.shuffleBtn) this.shuffleBtn.addEventListener('click', this.toggleShuffle);
        if (this.repeatBtn) this.repeatBtn.addEventListener('click', this.toggleRepeat);
        if (this.volumeBtn) this.volumeBtn.addEventListener('click', this.toggleMute);
        if (this.volumeBar) this.volumeBar.addEventListener('click', this.setVolume);
        if (this.progressBar) this.progressBar.addEventListener('click', this.setProgress);
        if (this.likeBtn) this.likeBtn.addEventListener('click', this.toggleLike);
        
        // Audio events
        this.audio.addEventListener('timeupdate', this.updateProgress);
        this.audio.addEventListener('ended', this.onTrackEnd);
        
        // Set initial volume display
        this.updateVolumeDisplay();
        
        // Load Spotify tracks
        this.loadSpotifyTracks();
    }
    
    loadTrack(index) {
        if (!this.playlist[index]) return;
        
        const track = this.playlist[index];
        
        // Validate audio source before setting
        if (!track.src || track.src === 'null' || track.src === null || track.src.trim() === '') {
            console.warn('⚠️ No valid audio source for:', track.title);
            // Skip to next track if no valid audio
            this.next();
            return;
        }
        
        console.log('🎵 Loading track:', track.title, 'Source:', track.src);
        this.audio.src = track.src;
        
        // Add better audio error handling
        if (this.audio) {
            this.audio.crossOrigin = "anonymous";
            this.audio.preload = "metadata";
            
            // Remove existing event listeners to prevent duplicates
            this.audio.removeEventListener('loadedmetadata', this.onAudioLoaded);
            this.audio.removeEventListener('error', this.onAudioError);
            
            // Create bound event handlers
            this.onAudioLoaded = () => {
                console.log('✅ Audio loaded:', track.title, 'Duration:', this.audio.duration, 'seconds');
                if (this.durationEl && !isNaN(this.audio.duration) && isFinite(this.audio.duration)) {
                    this.durationEl.textContent = this.formatTime(this.audio.duration);
                }
            };
            
            this.onAudioError = (e) => {
                console.error('❌ Audio error for:', track.title, e);
                console.log('📝 Error details:', e.target.error);
                
                // Try fallback without CORS
                if (track.hasPreview && this.audio.crossOrigin) {
                    console.log('🔄 Retrying without CORS...');
                    this.audio.crossOrigin = null;
                    this.audio.load(); // Reload the audio
                } else {
                    console.log('⚠️ No preview available or CORS retry failed');
                    // Could auto-skip to next track here if desired
                }
            };
            
            // Add event listeners
            this.audio.addEventListener('loadedmetadata', this.onAudioLoaded);
            this.audio.addEventListener('error', this.onAudioError);
        }
        
        // Update track info
        if (this.trackTitle) this.trackTitle.textContent = track.title;
        if (this.trackArtist) this.trackArtist.textContent = track.artist;
        
        // Load cover image with better error handling
        if (this.trackCover) {
            // Use a more reliable placeholder or local fallback
            const fallbackImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNTYiIHZpZXdCb3g9IjAgMCA1NiA1NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9IjI4IiB5PSIzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZiIgZm9udC1zaXplPSIxMiI+Tm8gSW1hZ2U8L3RleHQ+Cjwvc3ZnPg==';
            
            this.trackCover.src = track.cover || fallbackImage;
            this.trackCover.onerror = () => {
                this.trackCover.src = fallbackImage;
            };
            this.trackCover.alt = `${track.title} cover art`;
        }
        
        // Reset progress
        if (this.progress) this.progress.style.width = '0%';
        if (this.currentTimeEl) this.currentTimeEl.textContent = '0:00';
        if (this.durationEl) this.durationEl.textContent = '0:00';
        
        // Update active state
        this.updateActiveStates();
        
        // If was playing, continue playing the new track
        if (this.isPlaying) {
            const playPromise = this.audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error('Playback failed:', error);
                    this.isPlaying = false;
                    if (this.playBtn) this.playBtn.innerHTML = '<i class="fas fa-play"></i>';
                });
            }
        }
    }
    
    async togglePlay() {
        try {
            if (this.audio.paused) {
                await this.play();
            } else {
                this.pause();
            }
        } catch (error) {
            console.error('Toggle play failed:', error);
            this.isPlaying = false;
            if (this.playBtn) {
                this.playBtn.innerHTML = '<i class="fas fa-play"></i>';
                this.playBtn.setAttribute('title', 'Play');
            }
        }
    }
    
    async play() {
        try {
            await this.audio.play();
            this.isPlaying = true;
            if (this.playBtn) {
                this.playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                this.playBtn.setAttribute('title', 'Pause');
            }
        } catch (error) {
            console.error('Playback failed:', error);
            this.isPlaying = false;
            if (this.playBtn) {
                this.playBtn.innerHTML = '<i class="fas fa-play"></i>';
                this.playBtn.setAttribute('title', 'Play');
            }
        }
    }
    
    pause() {
        this.audio.pause();
        this.isPlaying = false;
        if (this.playBtn) {
            this.playBtn.innerHTML = '<i class="fas fa-play"></i>';
            this.playBtn.setAttribute('title', 'Play');
        }
    }
    
    nextTrack() {
        if (this.isShuffled) {
            this.currentTrackIndex = Math.floor(Math.random() * this.playlist.length);
        } else {
            this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
        }
        this.loadTrack(this.currentTrackIndex);
    }
    
    prevTrack() {
        if (this.audio.currentTime > 3) {
            // If track has been playing for more than 3 seconds, restart it
            this.audio.currentTime = 0;
        } else {
            // Otherwise go to previous track
            this.currentTrackIndex = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
            this.loadTrack(this.currentTrackIndex);
        }
    }
    
    toggleShuffle() {
        this.isShuffled = !this.isShuffled;
        if (this.shuffleBtn) this.shuffleBtn.classList.toggle('active', this.isShuffled);
    }
    
    toggleRepeat() {
        this.isRepeated = !this.isRepeated;
        if (this.repeatBtn) this.repeatBtn.classList.toggle('active', this.isRepeated);
        this.audio.loop = this.isRepeated;
    }
    
    toggleMute() {
        this.audio.muted = !this.audio.muted;
        const icon = this.audio.muted ? 'volume-mute' : 'volume-up';
        if (this.volumeBtn) this.volumeBtn.innerHTML = `<i class="fas fa-${icon}"></i>`;
    }
    
    setVolume(e) {
        if (!this.volumeBar) return;
        
        const rect = this.volumeBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        let volume = clickX / rect.width;
        
        // Ensure volume is between 0 and 1
        volume = Math.min(1, Math.max(0, volume));
        
        this.volume = volume;
        this.audio.volume = volume;
        
        // Update volume display
        this.updateVolumeDisplay();
    }
    
    updateVolumeDisplay() {
        if (!this.volumeLevel || !this.volumeBtn) return;
        
        // Update volume level bar
        this.volumeLevel.style.width = `${this.volume * 100}%`;
        
        // Update volume icon
        let icon = 'volume-up';
        if (this.audio.muted || this.volume === 0) {
            icon = 'volume-mute';
        } else if (this.volume < 0.5) {
            icon = 'volume-down';
        }
        this.volumeBtn.innerHTML = `<i class="fas fa-${icon}" title="${Math.round(this.volume * 100)}% volume"></i>`;
    }
    
    toggleMute() {
        this.audio.muted = !this.audio.muted;
        this.updateVolumeDisplay();
    }
    
    setProgress(e) {
        if (!this.progressBar) return;
        
        const rect = this.progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        
        // Calculate the seek position as a percentage (0-1)
        const seekPercent = Math.min(1, Math.max(0, clickX / width));
        
        // Only set the time if we have a valid duration
        if (this.audio.duration && isFinite(this.audio.duration)) {
            this.audio.currentTime = seekPercent * this.audio.duration;
        }
        
        // Update the progress bar immediately for better UX
        if (this.progress) {
            this.progress.style.width = `${seekPercent * 100}%`;
        }
    }
    
    updateProgress() {
        const currentTime = this.audio.currentTime;
        const duration = this.audio.duration || 1; // Avoid division by zero
        
        // Update progress bar
        if (this.progress) {
            const progressPercent = (currentTime / duration) * 100;
            this.progress.style.width = `${progressPercent}%`;
        }
        
        // Update time display
        if (this.currentTimeEl) {
            this.currentTimeEl.textContent = this.formatTime(currentTime);
        }
        
        // Update duration (only if it's a valid number)
        if (this.durationEl && !isNaN(duration) && isFinite(duration)) {
            this.durationEl.textContent = this.formatTime(duration);
        }
    }
    
    onTrackEnd() {
        if (this.isRepeated) {
            this.audio.currentTime = 0;
            this.play();
        } else {
            this.nextTrack();
        }
    }
    
    toggleLike() {
        if (!this.likeBtn) return;
        this.likeBtn.classList.toggle('liked');
        this.likeBtn.innerHTML = this.likeBtn.classList.contains('liked') ? 
            '<i class="fas fa-heart"></i>' : 
            '<i class="far fa-heart"></i>';
    }
    
    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    
    updateActiveStates() {
        // Update active states for shuffle and repeat buttons
        if (this.shuffleBtn) this.shuffleBtn.classList.toggle('active', this.isShuffled);
        if (this.repeatBtn) this.repeatBtn.classList.toggle('active', this.isRepeated);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize music player
    console.log('DOM loaded, checking for music player elements...');
    const nowPlayingBar = document.querySelector('.now-playing-bar');
    console.log('Now playing bar found:', nowPlayingBar);
    
    if (nowPlayingBar) {
        console.log('Initializing music player...');
        window.musicPlayer = new MusicPlayer();
        console.log('Music player initialized:', window.musicPlayer);
    } else {
        console.log('Now playing bar not found');
    }
    
    // Initialize testimonials carousel if it exists
    if (document.querySelector('.testimonial-slider')) {
        new TestimonialsCarousel();
    }
    
    // Initialize resume downloader
    new ResumeDownloader();
    // Navigation
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    
    // Set initial active section
    const hash = window.location.hash.substring(1) || 'home';
    showSection(hash);
    updateActiveNav(hash);
    
    // Navigation click handler
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
            updateActiveNav(sectionId);
            window.history.pushState({}, '', `#${sectionId}`);
        });
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1) || 'home';
        showSection(hash);
        updateActiveNav(hash);
    });
    
    // Show section function
    function showSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        const activeSection = document.getElementById(sectionId);
        if (activeSection) {
            activeSection.classList.add('active');
        }
    }
    
    // Update active nav item
    function updateActiveNav(sectionId) {
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === sectionId) {
                item.classList.add('active');
            }
        });
    }

    // Progress bar interaction
    const progressBar = document.querySelector('.progress-bar');
    const progress = document.querySelector('.progress');
    
    if (progressBar && progress) {
        progressBar.addEventListener('click', function(e) {
            const clickPosition = e.clientX - this.getBoundingClientRect().left;
            const progressBarWidth = this.offsetWidth;
            const progressPercentage = (clickPosition / progressBarWidth) * 100;
            progress.style.width = `${Math.min(100, Math.max(0, progressPercentage))}%`;
        });
    }

    // Volume control interaction
    const volumeBar = document.querySelector('.volume-bar');
    const volumeLevel = document.querySelector('.volume-level');
    
    if (volumeBar && volumeLevel) {
        volumeBar.addEventListener('click', function(e) {
            const clickPosition = e.clientX - this.getBoundingClientRect().left;
            const volumeBarWidth = this.offsetWidth;
            const volumePercentage = (clickPosition / volumeBarWidth) * 100;
            volumeLevel.style.width = `${Math.min(100, Math.max(0, volumePercentage))}%`;
        });
    }
    
    // Album click handler
    const albums = document.querySelectorAll('.album');
    const albumDetails = document.querySelector('.album-details');
    const albumContent = document.getElementById('album-content');
    const backButton = document.querySelector('.back-button');
    const albumGrid = document.querySelector('.album-grid');
    
    albums.forEach(album => {
        album.addEventListener('click', function() {
            const albumId = this.getAttribute('data-album');
            const data = experienceData[albumId];
            
            if (data) {
                // Create album details content
                let achievementsHtml = '';
                data.achievements.forEach(achievement => {
                    achievementsHtml += `<li>${achievement}</li>`;
                });
                
                const content = `
                    <div class="album-detail-header">
                        <h2>${data.title}</h2>
                        <p class="position">${data.position} • ${data.period}</p>
                    </div>
                    <div class="album-detail-content">
                        <p class="description">${data.description}</p>
                        <h3>Key Achievements</h3>
                        <ul class="achievements">
                            ${achievementsHtml}
                        </ul>
                    </div>
                `;
                
                albumContent.innerHTML = content;
                albumGrid.style.display = 'none';
                albumDetails.classList.add('active');
                
                // Scroll to top of the section
                document.getElementById('experience').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Back button handler
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            albumGrid.style.display = 'grid';
            albumDetails.classList.remove('active');
        });
    }
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const sections = document.querySelectorAll('.section');
            
            if (searchTerm.length > 0) {
                // Show all sections for search
                sections.forEach(section => {
                    section.classList.add('active');
                    section.style.display = 'block';
                });
                
                // Highlight matching text
                document.querySelectorAll('.album, .education-item, .cert-item').forEach(item => {
                    const text = item.textContent.toLowerCase();
                    if (text.includes(searchTerm)) {
                        item.style.display = 'block';
                        // Highlight matching text
                        const regex = new RegExp(`(${searchTerm})`, 'gi');
                        item.innerHTML = item.innerHTML.replace(regex, '<span class="highlight">$1</span>');
                    } else {
                        item.style.display = 'none';
                    }
                });
            } else {
                // Reset search
                document.querySelectorAll('.album, .education-item, .cert-item').forEach(item => {
                    item.style.display = 'block';
                    // Remove highlighting
                    item.innerHTML = item.innerHTML.replace(/<span class="highlight">(.*?)<\/span>/g, '$1');
                });
                // Reset to current section
                const currentSection = document.querySelector('.nav-item.active').getAttribute('data-section');
                showSection(currentSection);
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {  // Only prevent default if it's not a # link
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.card, .stat, .skill-tag');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial styles for animation
    document.addEventListener('DOMContentLoaded', () => {
        const elements = document.querySelectorAll('.card, .stat, .skill-tag');
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        // Trigger initial animation
        setTimeout(animateOnScroll, 500);
    });

    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);

    // Update current year in footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
});
