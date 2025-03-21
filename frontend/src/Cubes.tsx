interface CubeOptions {
    cubeSize?: { min: number; max: number }; // Min and max size of cubes
    speed?: { spin: number; move: number }; // Spin and move speed
    amount?: number; // Number of cubes
    direction?: 'up-right' | 'up-left' | 'down-right' | 'down-left'; // Direction of movement
}

export function createBackgroundCubes(options: CubeOptions = {}) {
    const container = document.getElementById('background-cubes');
    if (!container) return;
  
    const {
      cubeSize = { min: 10, max: 20 },
      speed = { spin: 5, move: 10 },
      amount = 20,
      direction = 'up-right',
    } = options;
  
    for (let i = 0; i < amount; i++) {
      // Stagger cube creation with a random delay
      setTimeout(() => {
        const cube = document.createElement('div');
        cube.classList.add('cube', direction); // Add direction as a class
  
        // Randomize size and animation duration
        const size = Math.random() * (cubeSize.max - cubeSize.min) + cubeSize.min;
        const spinDuration = Math.random() * 2 + speed.spin;
        const moveDuration = Math.random() * 5 + speed.move;
  
        // Determine spawn location based on direction
        let top: number, left: number;
  
        if (direction === 'down-right') {
          if (Math.random() < 0.5) {
            top = -10; // Just off-screen at the top (-10vh)
            left = Math.random() * 100; // Random X position (0vw to 100vw)
          } else {
            top = Math.random() * 100; // Random Y position (0vh to 100vh)
            left = -10; // Just off-screen at the left (-10vw)
          }
        } else if (direction === 'down-left') {
          if (Math.random() < 0.5) {
            top = -10; // Just off-screen at the top (-10vh)
            left = Math.random() * 100; // Random X position (0vw to 100vw)
          } else {
            top = Math.random() * 100; // Random Y position (0vh to 100vh)
            left = 110; // Just off-screen at the right (110vw)
          }
        } else if (direction === 'up-left') {
          if (Math.random() < 0.5) {
            top = Math.random() * 100; // Random Y position (0vh to 100vh)
            left = 110; // Just off-screen at the right (110vw)
          } else {
            top = 110; // Just off-screen at the bottom (110vh)
            left = Math.random() * 100; // Random X position (0vw to 100vw)
          }
        } else {
          // Default: up-right
          if (Math.random() < 0.5) {
            top = Math.random() * 100; // Random Y position (0vh to 100vh)
            left = -10; // Just off-screen at the left (-10vw)
          } else {
            top = 110; // Just off-screen at the bottom (110vh)
            left = Math.random() * 100; // Random X position (0vw to 100vw)
          }
        }
  
        // Apply position, size, and animation durations
        cube.style.top = `${top}vh`;
        cube.style.left = `${left}vw`;
        cube.style.width = `${size}px`;
        cube.style.height = `${size}px`;
        cube.style.animationDuration = `${spinDuration}s, ${moveDuration}s`;
  
        // Append the cube to the container
        container.appendChild(cube);
  
        // Add a trail effect
        createTrailEffect(cube, container);
      }, Math.random() * 5000); // Random delay between 0ms and 3000ms
    }
  }

// Function to create a trail effect for a cube
function createTrailEffect(cube: HTMLElement, container: HTMLElement) {
    const trailInterval = setInterval(() => {
        const trail = document.createElement('div');
        trail.classList.add('trail');

        // Match the cube's position and size
        const { top, left, width, height } = cube.getBoundingClientRect();
        trail.style.width = `${width * 0.6}px`; // Smaller trail: 60% of the cube's size
        trail.style.height = `${height * 0.6}px`;
        trail.style.top = `${top}px`;
        trail.style.left = `${left}px`;

        // Sync trail color animation with the cube
        const cubeAnimationDelay = window.getComputedStyle(cube).animationDelay.split(', ')[2];
        trail.style.animationDelay = `${cubeAnimationDelay}`; // Sync colorChange delay

        // Append the trail to the container
        container.appendChild(trail);

        // Remove the trail after it fades out
        setTimeout(() => {
            trail.remove();
        }, 800); // Trail lasts for 0.8 seconds (shorter duration)

        // Stop the trail effect if the cube is no longer in the DOM
        if (!document.body.contains(cube)) {
            clearInterval(trailInterval);
        }
    }, 200); // Create a trail every 200ms (less frequent)
}