# phonolab

A web application for phonetic analysis, voice experimentation, or audio lab purposes. (Please update this description with specific details about the app's features and goals).

## Features
- (e.g., Audio recording and playback)
- (e.g., Phonetic transcription tools)
- (e.g., Voice modulation effects)
- (Add other relevant features)

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm (or pnpm, if `pnpm-lock.yaml` is used)

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/igor-kan/phonolab.git
    cd phonolab
    ```
2. Install dependencies:
    ```bash
    npm install 
    # or
    # pnpm install
    ```

### Running the Development Server
To start the development server, run:
```bash
npm run dev
# or
# pnpm dev
```
This will typically start the server on `http://localhost:3000`.

## Technologies Used
- Next.js
- React
- Tailwind CSS
- (Please confirm and add other technologies used, e.g., Web Audio API)

## Deployment (GitHub Pages)

You can deploy this project to GitHub Pages:

1. **Build the static site:**
   Ensure your Next.js app is configured for static export (e.g., `next build && next export`). The output directory is usually `out`.
    ```bash
    npm run build
    ```
2. **Install `gh-pages`:**
    ```bash
    npm install --save-dev gh-pages
    ```
3. **Update `package.json`:**
    Add `homepage` and `scripts` for deployment. The `deploy` script should point to the `out` directory.
    ```json
    {
      "homepage": "https://igor-kan.github.io/phonolab",
      "scripts": {
        "predeploy": "npm run build", 
        "deploy": "gh-pages -d out" 
      }
    }
    ```
4. **Deploy:**
    ```bash
    npm run deploy
    ```

## Custom Domain
You can connect a custom domain to your deployed project. Refer to your hosting provider's documentation for instructions. 