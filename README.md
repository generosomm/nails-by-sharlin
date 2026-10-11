# Nails by Sharlin

A minimalist, responsive marketing website for Sharlin Camille Albino's nail services. Built with HTML, CSS and vanilla JavaScript, with glossy sculptural nail swatches created entirely in CSS.

## Run locally

From this directory, run `python -m http.server 4175`, then visit `http://localhost:4175`.

## Features

- Responsive layout, keyboard navigation and reduced-motion support.
- Available color names: Banana boat, Lucky red, Blue suede, Ashley, White satin, Touch of tan, Almond, Chic and Pure black. A selected color is included in the SMS inquiry.
- Service prices confirmed by Camille: manicure ₱100, pedicure ₱100, foot spa ₱250, foot spa + pedicure ₱300, all three ₱400.
- Service and store/home-visit selection create a prefilled SMS inquiry. SMS opens the visitor's installed messaging app; it does not automatically send a message or confirm an appointment.
- Telephone link, copy-number button and direct Facebook profile link.

## Update content

Edit service descriptions, prices and contact details in `index.html`. Update the phone number and SMS message in `script.js` as well when changing the contact number. Visual tokens and color previews are in `style.css`.

The decorative nail illustration is not an exact color sample or a photograph of Sharlin's work. The color dots and interactive nail previews use approximate digital shades based on Camille's supplied bottle photos. Actual shades can vary with lighting and display; choosing a color synchronizes the preview and SMS inquiry. The supplied location is Generoso Sari-Sari Store, Phase 2, Mt. Claire Village. Home service is available within Mt. Claire Village only. No home-service fee, opening hours or testimonials have been supplied. Sharlin confirms visit details, availability and final pricing directly. Facebook: https://www.facebook.com/sharlinemae.albino.71.

## Hosting

This buildless website works on GitHub Pages, Vercel, Netlify or any static host. Publish the repository root. No credentials, external dependencies or build step are required.

Facebook is the preferred contact channel. Visitors can copy their selected service/color/visit inquiry and open the supplied profile, then tap Message and paste it. Copying does not send a message. SMS and phone remain secondary options.
