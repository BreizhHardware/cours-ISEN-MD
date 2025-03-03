#A2
[[tp_steganographie.pdf]]

Itération 1:
```PY
def getHiddenImage(image, nbBitsForSize):
	imageArray = imageToArray(image)  
	width = getLength(imageArray, nbBitsForSize)  
	height = getLength(imageArray, nbBitsForSize, nbBitsForSize)  
	hiddenImageArray = imageArray[:width * height * 3]  
	flatHiddenImageArray = [val for val in hiddenImageArray]  
	hiddenImage = Image.new("RGB", (width, height))  
	hiddenImage.putdata(flatHiddenImageArray)  
	return hiddenImage
```

Itération 2:
```PY
def getHiddenImage(image, nbBitsForSize):
	
```