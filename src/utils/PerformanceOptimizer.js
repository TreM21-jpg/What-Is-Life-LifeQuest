/**
 * PerformanceOptimizer.js
 * 
 * Performance monitoring and optimization system
 * Tracks: FPS, memory usage, API response times, render performance
 * 
 * Features:
 * - Real-time FPS monitoring
 * - Memory leak detection
 * - Request caching
 * - Debounced updates
 * - Component render performance tracking
 * - Network request optimization
 */

class PerformanceOptimizer {
  constructor() {
    this.metrics = {
      fps: 60,
      memoryUsage: 0,
      renderTime: 0,
      apiRequests: [],
      slowComponents: []
    };

    this.frameCount = 0;
    this.lastFrameTime = Date.now();
    this.cache = new Map();
    this.requestCache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes

    this.startFPSMonitoring();
  }

  /**
   * Monitor FPS
   */
  startFPSMonitoring() {
    let frameCount = 0;
    let lastTime = Date.now();

    const countFrame = () => {
      frameCount++;
      const now = Date.now();

      if (now - lastTime >= 1000) {
        this.metrics.fps = frameCount;
        frameCount = 0;
        lastTime = now;

        // Log if FPS drops
        if (this.metrics.fps < 30) {
          console.warn(`⚠️  Low FPS detected: ${this.metrics.fps}`);
        }
      }

      requestAnimationFrame(countFrame);
    };

    requestAnimationFrame(countFrame);
  }

  /**
   * Track memory usage
   */
  trackMemory() {
    if (performance.memory) {
      this.metrics.memoryUsage = Math.round(
        performance.memory.usedJSHeapSize / 1048576
      );

      if (this.metrics.memoryUsage > 100) {
        console.warn(`⚠️  High memory usage: ${this.metrics.memoryUsage}MB`);
      }
    }
  }

  /**
   * Track render performance
   */
  measureRender(componentName, duration) {
    if (duration > 16) {
      // More than one frame (60fps = 16ms)
      this.metrics.slowComponents.push({
        name: componentName,
        duration,
        timestamp: Date.now()
      });

      console.warn(
        `⚠️  Slow render: ${componentName} took ${duration.toFixed(2)}ms`
      );
    }
  }

  /**
   * Cache API responses
   */
  cacheRequest(key, data) {
    this.requestCache.set(key, {
      data,
      timestamp: Date.now()
    });

    // Auto-expire cache
    setTimeout(() => {
      this.requestCache.delete(key);
    }, this.cacheTimeout);
  }

  /**
   * Get cached request
   */
  getCachedRequest(key) {
    const cached = this.requestCache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    return null;
  }

  /**
   * Track API request
   */
  trackRequest(endpoint, duration, status) {
    this.metrics.apiRequests.push({
      endpoint,
      duration,
      status,
      timestamp: Date.now()
    });

    // Keep only last 50 requests
    if (this.metrics.apiRequests.length > 50) {
      this.metrics.apiRequests.shift();
    }

    if (duration > 1000) {
      console.warn(`⚠️  Slow API: ${endpoint} took ${duration}ms`);
    }
  }

  /**
   * Debounce function calls
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Throttle function calls
   */
  throttle(func, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  /**
   * Get performance report
   */
  getReport() {
    this.trackMemory();

    const avgApiTime =
      this.metrics.apiRequests.length > 0
        ? Math.round(
            this.metrics.apiRequests.reduce((sum, r) => sum + r.duration, 0) /
              this.metrics.apiRequests.length
          )
        : 0;

    return {
      fps: this.metrics.fps,
      memoryUsage: `${this.metrics.memoryUsage}MB`,
      avgApiResponseTime: `${avgApiTime}ms`,
      totalApiRequests: this.metrics.apiRequests.length,
      slowComponents: this.metrics.slowComponents.slice(-5), // Last 5
      cacheSize: this.requestCache.size,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Log performance report
   */
  logReport() {
    const report = this.getReport();
    console.group("📊 Performance Report");
    console.log(`FPS: ${report.fps}`);
    console.log(`Memory: ${report.memoryUsage}`);
    console.log(`Avg API Response: ${report.avgApiResponseTime}`);
    console.log(`Total API Requests: ${report.totalApiRequests}`);
    console.log(`Cache Size: ${report.cacheSize}`);
    if (report.slowComponents.length > 0) {
      console.warn("Slow Components:", report.slowComponents);
    }
    console.groupEnd();
  }

  /**
   * Optimize image loading
   */
  optimizeImageLoading(imageUrl, maxWidth = 1920) {
    // Return optimized image URL (for services like Cloudinary)
    return `${imageUrl}?w=${maxWidth}&q=80`;
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.requestCache.clear();
  }
}

// Export singleton instance
export const performanceOptimizer = new PerformanceOptimizer();
export default PerformanceOptimizer;
