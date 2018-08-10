/* -----------------------------------------------
/* Author : Ossama Rafique
/* Email: contact@ossamarafique.com
/* Website: https://www.ossamarafique.com
/* MIT license: http://opensource.org/licenses/MIT
/* GitHub : https://github.com/OssamaRafique/Interactive-Image-Particles
/* For Documentation open readme.md
/* v1.0
/* ----------------------------------------------- */
var ImageParticles = {

    // Settings
    density: 0,

    produceDistance: 0,
    baseRadius: 0,
    maxLineThickness: 0,
    reactionSensitivity: 0,
    lineThickness: 0,

    particles: [],
    mouse: {
        x: -1000,
        y: -1000,
        down: false
    },

    animation: null,

    canvas: null,
    context: null,
    bgImage: null,
    bgCanvas: null,
    bgContext: null,
    bgContextPixelData: null,

    initialize: function(canvas_id, imageData,densityPara=14,produceDistancePara=28,baseRadiusPara=2,maxLineThicknessPara=1,reactionSensitivityPara=2,lineThicknessPara=1) {
        // Set up the visual canvas 
        this.canvas = document.getElementById(canvas_id);
        this.context = canvas.getContext('2d');
        this.context.globalCompositeOperation = "lighter";
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.display = 'block'
        this.canvas.addEventListener('mousemove', this.pointerMove, false);
        this.canvas.addEventListener('mousedown', this.pointerDown, false);
        this.canvas.addEventListener('mouseup', this.pointerUp, false);
        this.canvas.addEventListener('mouseout', this.pointerOut, false);
        //Assign the settings
        this.density=densityPara;
        this.produceDistance=produceDistancePara;
        this.baseRadius=baseRadiusPara;
        this.maxLineThickness=maxLineThicknessPara;
        this.reactionSensitivity=reactionSensitivityPara;
        this.lineThickness=lineThicknessPara;

        window.onresize = function(event) {
            ImageParticles.canvas.width = window.innerWidth;
            ImageParticles.canvas.height = window.innerHeight;
            ImageParticles.onWindowResize();
        }

        // Load initial input image
        this.getImageData(imageData);
    },

    makeParticles: function() {

        // remove the current particles
        this.particles = [];

        var width, height, i, j;

        var colors = this.bgContextPixelData.data;

        for (i = 0; i < this.canvas.height; i += this.density) {

            for (j = 0; j < this.canvas.width; j += this.density) {

                var pixelPosition = (j + i * this.bgContextPixelData.width) * 4;

                // Dont use whiteish pixels
                if (colors[pixelPosition] > 200 && (colors[pixelPosition + 1]) > 200 && (colors[pixelPosition + 2]) > 200 || colors[pixelPosition + 3] === 0) {
                    continue;
                }

                var color = 'rgba(' + colors[pixelPosition] + ',' + colors[pixelPosition + 1] + ',' + colors[pixelPosition + 2] + ',' + '1)';
                this.particles.push({
                    x: j,
                    y: i,
                    originalX: j,
                    originalY: i,
                    color: color
                });

            }
        }
    },

    updateparticles: function() {

        var i, currentPoint, theta, distance;

        for (i = 0; i < this.particles.length; i++) {

            currentPoint = this.particles[i];

            theta = Math.atan2(currentPoint.y - this.mouse.y, currentPoint.x - this.mouse.x);

            if (this.mouse.down) {
                distance = this.reactionSensitivity * 200 / Math.sqrt((this.mouse.x - currentPoint.x) * (this.mouse.x - currentPoint.x) +
                    (this.mouse.y - currentPoint.y) * (this.mouse.y - currentPoint.y));
            } else {
                distance = this.reactionSensitivity * 100 / Math.sqrt((this.mouse.x - currentPoint.x) * (this.mouse.x - currentPoint.x) +
                    (this.mouse.y - currentPoint.y) * (this.mouse.y - currentPoint.y));
            }


            currentPoint.x += Math.cos(theta) * distance + (currentPoint.originalX - currentPoint.x) * 0.05;
            currentPoint.y += Math.sin(theta) * distance + (currentPoint.originalY - currentPoint.y) * 0.05;

        }
    },

    produceLines: function() {

        var i, j, currentPoint, otherPoint, distance, lineThickness;

        for (i = 0; i < this.particles.length; i++) {

            currentPoint = this.particles[i];

            // produce the dot.
            this.context.fillStyle = currentPoint.color;
            this.context.strokeStyle = currentPoint.color;

            for (j = 0; j < this.particles.length; j++) {

                // Distaqnce between two particles.
                otherPoint = this.particles[j];

                if (otherPoint == currentPoint) {
                    continue;
                }

                distance = Math.sqrt((otherPoint.x - currentPoint.x) * (otherPoint.x - currentPoint.x) +
                    (otherPoint.y - currentPoint.y) * (otherPoint.y - currentPoint.y));

                if (distance <= this.produceDistance) {

                    this.context.lineWidth = (1 - (distance / this.produceDistance)) * this.maxLineThickness * this.lineThickness;
                    this.context.beginPath();
                    this.context.moveTo(currentPoint.x, currentPoint.y);
                    this.context.lineTo(otherPoint.x, otherPoint.y);
                    this.context.stroke();
                }
            }
        }
    },

    produceparticles: function() {

        var i, currentPoint;

        for (i = 0; i < this.particles.length; i++) {

            currentPoint = this.particles[i];

            // produce the dot.
            this.context.fillStyle = currentPoint.color;
            this.context.strokeStyle = currentPoint.color;

            this.context.beginPath();
            this.context.arc(currentPoint.x, currentPoint.y, this.baseRadius, 0, Math.PI * 2, true);
            this.context.closePath();
            this.context.fill();

        }
    },

    produce: function() {
        this.animation = requestAnimationFrame(function() {
            ImageParticles.produce()
        });

        this.remove();
        this.updateparticles();
        this.produceLines();
        this.produceparticles();

    },

    remove: function() {
        this.canvas.width = this.canvas.width;
    },

    // The filereader has loaded the image... add it to image object to be producen
    getImageData: function(data) {

        this.bgImage = new Image;
        this.bgImage.src = data;

        this.bgImage.onload = function() {

            //this
            ImageParticles.produceImageParticles();
        }
    },

    // Image is loaded... produce to bg canvas
    produceImageParticles: function() {

        this.bgCanvas = document.createElement('canvas');
        this.bgCanvas.width = this.canvas.width;
        this.bgCanvas.height = this.canvas.height;

        var newWidth, newHeight;

        // If the image is too big for the screen... scale it down.
        if (this.bgImage.width > this.bgCanvas.width - 100 || this.bgImage.height > this.bgCanvas.height - 100) {

            var maxRatio = Math.max(this.bgImage.width / (this.bgCanvas.width - 100), this.bgImage.height / (this.bgCanvas.height - 100));
            newWidth = this.bgImage.width / maxRatio;
            newHeight = this.bgImage.height / maxRatio;

        } else {
            newWidth = this.bgImage.width;
            newHeight = this.bgImage.height;
        }

        // produce to background canvas
        this.bgContext = this.bgCanvas.getContext('2d');
        this.bgContext.drawImage(this.bgImage, (this.canvas.width - newWidth) / 2, (this.canvas.height - newHeight) / 2, newWidth, newHeight);
        this.bgContextPixelData = this.bgContext.getImageData(0, 0, this.bgCanvas.width, this.bgCanvas.height);

        this.makeParticles();
        this.produce();
    },

    pointerDown: function(event) {
        ImageParticles.mouse.down = true;
    },

    pointerUp: function(event) {
        ImageParticles.mouse.down = false;
    },

    pointerMove: function(event) {
        ImageParticles.mouse.x = event.offsetX || (event.layerX - ImageParticles.canvas.offsetLeft);
        ImageParticles.mouse.y = event.offsetY || (event.layerY - ImageParticles.canvas.offsetTop);
    },

    pointerOut: function(event) {
        ImageParticles.mouse.x = -1000;
        ImageParticles.mouse.y = -1000;
        ImageParticles.mouse.down = false;
    },

    // Resize and reproduce the canvas.
    onWindowResize: function() {
        cancelAnimationFrame(this.animation);
        this.produceImageParticles();
    }
}
