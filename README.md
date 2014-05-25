# dejavideo

Stream your own videos easily, either on your private network or to the
world using HTML5 video. I use the app to share all my videos from my main
device to any devices in the house connected to the Wi-Fi, including tablets
and smartphones.

## Features

- Responsive design with beautiful columns for desktop, smartphones and tablets.
- Folder contents count and file details (size and modification date).
- Indefinitely recursive listings.
- Video support detection. Unsupported files in the current browser are marked and links to the video are disabled.
- Ability to delete files.
- Custom start time by adding a number of seconds after the hash (ie. `url#60`
would make the video start at minute 1). The URL gets periodical
updates so you can keep the link and start where you left off.

## Video support <sup>*</sup>

- Theora (usually with `.ogv` or `.ogg` filename extensions)
- H.264, (`.mp4`, `.mkv`, `.3gp`)
- V8 (`.webm`)

\* Actual support depends on the browser of choice. Learn more at
    [http://diveintohtml5.info/video.html#what-works](http://diveintohtml5.info/video.html#what-works).

## How to install

Copy the application on a folder on your web root and put your videos
inside the `data/` folder (alternatively, you can create a symlink to any
folder on your system), organised in subfolders or however you prefer.
