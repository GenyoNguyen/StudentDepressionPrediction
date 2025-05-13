# Student Depression Prediction System

A web application that helps predict and analyze student depression levels based on various factors including academic performance, lifestyle, and mental health history.

## Features

- **Prediction System**: Multi-step form to collect student data and predict depression levels
- **Analysis Tools**: Detailed analysis of factors affecting student mental health
- **Modern UI**: Clean and responsive design with light/dark mode support
- **Interactive Navigation**: Smooth scrolling and intuitive user interface

## Pages

- **Home**: Landing page with project overview
- **Predict**: Multi-step form for depression prediction
- **Analyze**: Detailed analysis and insights
- **About**: Project information and team details

## Technical Stack

- HTML5
- CSS3 (with CSS Variables for theming)
- JavaScript (Vanilla)
- Geist Font Family

## Setup and Running

1. Clone the repository:
```bash
git clone https://github.com/GenyoNguyen/StudentDepressionPrediction
cd StudentDepressionPrediction
```

2. Start a local server. You can use any of these methods:

   Using Python:
   ```bash
   # Python 3
   python -m http.server 3000
   
   # Python 2
   python -m SimpleHTTPServer 3000
   ```

   Using Node.js:
   ```bash
   npx serve
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Project Structure

```
.
├── index.html          # Home page
├── predict.html        # Prediction form
├── analyze.html        # Analysis page
├── about.html          # About page
├── css/
│   └── styles.css      # Main stylesheet
├── js/
│   └── script.js       # JavaScript functionality
├── static/
│   └── assets/         # Icons and images
└── fonts/             # Custom fonts
```

## Development

- The project uses CSS variables for theming and easy customization
- JavaScript handles form validation and theme switching
- All pages are responsive and work on mobile devices
- The prediction form uses a multi-step approach for better user experience

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
