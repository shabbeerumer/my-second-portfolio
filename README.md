# Umer Shabbeer - Portfolio Website

A modern, responsive portfolio website showcasing my skills, projects, and experience as a Full Stack Developer.

## Features

- Modern and responsive design
- Smooth scrolling navigation
- Project showcase with detailed descriptions
- Skills and experience timeline
- Contact form
- Mobile-friendly interface

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Font Awesome
- Google Fonts (Poppins)

## Project Structure

```
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/
    ├── hero-bg.jpg
    ├── bg-removal.jpg
    ├── tictactoe.jpg
    ├── blog.jpg
    └── weblog.jpg
```

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Navigate to the project directory:
```bash
cd portfolio
```

3. Add your project images to the `images` folder:
   - Add `hero-bg.jpg` for the hero section background
   - Add project screenshots (bg-removal.jpg, tictactoe.jpg, blog.jpg, weblog.jpg)

4. Start a local server:
   - Using PHP:
     ```bash
     php -S localhost:8000
     ```
   - Using Python:
     ```bash
     python -m http.server 8000
     ```
   - Using Node.js:
     ```bash
     npx serve
     ```

5. Open your browser and visit `http://localhost:8000`

## Customization

1. Update personal information in `index.html`
2. Modify styles in `css/style.css`
3. Add your project links and social media profiles
4. Update project images and descriptions

## Contact Form Setup

The contact form currently uses a simple JavaScript alert. To make it functional:

1. Create a PHP backend script to handle form submissions
2. Update the form action in `index.html`
3. Add proper form validation and error handling
4. Configure email settings for receiving messages

## License

This project is open source and available under the MIT License.

## Author

Umer Shabbeer
- Full Stack Developer
- BSc Engineering Student
- Intern at Promotezz International Software House 