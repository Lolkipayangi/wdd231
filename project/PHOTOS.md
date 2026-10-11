# Adding real photos

Your photos are already in `images/photos/`. Nine trails use photos (Karura, Oloolua, Ngong Hills, Mount Kenya Sirimon and Chogoria, Mount Elgon, plus Ol Donyo Sabuk, Mount Longonot and Taita Hills, which use Unsplash photos marked as illustrative). The other seven trails still show illustrations.

The site shows an illustration for every trail until you add a photo. To switch a trail to a photo:

1. Choose a photo you took yourself, or one with a licence that allows reuse
   (Unsplash, Pexels, or Wikimedia Commons). Check the licence and note any credit it asks for.
2. Crop it to a 8:5 shape and resize it to 800 x 500 pixels.
3. Save it as a JPEG or WebP at about 70 percent quality, so each file is 60 kB or less.
   Put it in `images/photos/`, for example `images/photos/ngong-hills.jpg`.
4. In `data/trails.json`, add three lines to that trail:

       "photo": "images/photos/ngong-hills.jpg",
       "photoAlt": "Describe what the photo actually shows, for example: Two hikers on a grassy ridge above the Rift Valley.",
       "photoCredit": "Your name, or Photographer name / Unsplash"

   The photo is used only when `photo` and `photoAlt` are both present. `photoCredit` is optional.
5. Hero image: in `index.html`, change the `src` of the hero image to your photo (use 1600 x 720),
   and rewrite its `alt` text to describe it.
6. Sharing image: replace `images/og-image.jpg` with a 1200 x 630 photo for social previews.

Keep each page under 500 kB in total. Photos below the first screen are lazy loaded.
