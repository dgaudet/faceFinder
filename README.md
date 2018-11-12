# Face Finder
This is a node js application written using the face-recognition, and gm packages
* face-recognition is used to detect faces in images
** it is also used to be 'trained' with faces it will be able to recognize
** finally it is used to map a face with one of the 'trained' faces
* gm is used to draw a rectangle around a matched face, and some text denoting which trained face it matches

# How to get it working
Unfortunately it isn't particularly easy to get it setup, here's what I did on my mac
* NOTE: I already had XCode installed, which is used by this in some way
* first I installed GraphicsMagic
** brew install graphicsmagick
* then I installed cmake
** brew install cmake
* Then you can run npm install which will install the face-detection npm package, and it looks like it builds dlib
** npm install
