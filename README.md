
# Crop Care AI 🌱

## Overview

Crop Care AI is a smart agriculture web application developed using React, TypeScript, Vite, and Tailwind CSS. The system allows users to upload crop leaf images and receive plant health analysis along with fertilizer and irrigation recommendations.

The project uses image color analysis techniques to estimate plant health based on green, yellow, and brown color distributions in leaf images. It also provides weather forecasts for major districts of Karnataka.

---

## Features

### Plant Health Analysis

* Upload crop leaf images
* Detect plant condition:

  * Healthy
  * Unhealthy
  * Diseased
* Display confidence score
* Show leaf condition details

### Fertilizer Recommendations

* Suggest suitable fertilizers
* Display recommended dosage
* Explain fertilizer purpose

### Irrigation Recommendations

* Recommend irrigation methods
* Suggest water requirements

### Weather Forecast

* Karnataka district selection
* 3-day weather forecast
* Temperature prediction
* Rainfall probability display

### Multilingual Support

* English
* Kannada

---

## Technology Stack

### Frontend

* React.js
* TypeScript
* Vite
* Tailwind CSS

### UI Components

* Radix UI
* ShadCN UI
* Lucide React Icons

### State Management

* React Hooks
* Context API

---

---

## Working Principle

### Image Analysis Module

The uploaded image is processed using the HTML5 Canvas API.

The system:

1. Loads the uploaded image.
2. Extracts pixel color values.
3. Calculates:

   * Green pixel percentage
   * Yellow pixel percentage
   * Brown pixel percentage
4. Classifies the plant condition.

### Classification Rules

#### Healthy Plant

```text
Green Pixels > 35%
Yellow Pixels < 8%
Brown Pixels < 8%
```

#### Unhealthy Plant

```text
Yellow Pixels > Brown Pixels
```

#### Diseased Plant

```text
Brown Pixels dominant
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Move to Project Directory

```bash
cd crop-care-ai
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Open Browser

```text
http://localhost:8080
```

---

## Build Project

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## Advantages

* Easy to use interface
* Fast image processing
* Lightweight implementation
* Weather information support
* Fertilizer recommendations
* Multilingual support

---

## Limitations

* Uses rule-based image analysis
* Not a deep learning model
* Depends on image quality and color distribution
* Weather data is currently simulated

---

## Future Scope

* Deep Learning Disease Detection
* TensorFlow Integration
* Real-Time Weather API
* Plant Species Identification
* Soil Health Monitoring
* Mobile Application Development
* Smart Irrigation System

---

## Authors

Developed as an academic smart agriculture project using React, TypeScript, and modern web technologies.

---

## License

This project is intended for educational and research purposes.
