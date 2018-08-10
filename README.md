# Interactive-Image-Particles
A Simple Javascript library that use image data to create a small interactive particles network.

Demo: https://www.ossamarafique.com/imageparticles.html
# How to use
### Step 1
Create a canvas in your html document e.g
 ```sh
<!DOCTYPE html>
<html>
<head>
	<title>Interactive Image Particles</title>
	<style type="text/css">
		canvas{
			min-width: 100vw;
			height: 100vh;
			position: fixed;
		}
	</style>
</head>
<body>
	<canvas id="canvas"></canvas>
</p>
</body>
</html>
```
### Step 2
Include the library in the document e.g
```sh
<script type="text/javascript" src="https://res.cloudinary.com/ossamarafique/raw/upload/v1533889440/imageparticles.js"></script>
```
### Step 3
Initialize the process with:
```sh
<script type="text/javascript">
  ImageParticles.initialize(Parameters Here);
</script>
```
##### List of parameters
 - Canvas ID (Compulsory)
 - Image Data (Compulsory)
 - Density (Optional, Default Value is 14)
 - Distance Between Particles (Optional, Default value is 28)
 - Base Radius (Optional, Default Value is 2)
 - Max Line Thickness (Optional, Default value is 1)
 - Reaction Sensitivity (Optional, Default Value is 2)
 - Line Thickness (Optional, Default value is 1)
 
For More Details Please refer to index.html file.

# Licence

### The MIT License (MIT)
Copyright (c) 2018 - Ossama Rafique - https://www.ossamarafique.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
