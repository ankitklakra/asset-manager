# Study Share Hub

**Selected as one of the top 10 teams in college for proposing this innovative web-based application, which simplifies students' access to study resources.** [website link](https://studysharehub.netlify.app/)

## Overview
Study Share Hub is a web application designed to streamline the process of sharing and accessing study materials for students. The application was developed as a prototype within 48 hours using Next.js, Tailwind CSS, Firebase, Node.js, and deployed on Netlify.

### Key Features
1. **Resource Sharing via Links**: Users can easily share resources by generating shareable links, which others can use to download the materials.
2. **Direct Resource Donation**: Registered users can directly donate study materials to the admin via the website.
3. **Bookmark Section**: A dedicated section allows users to bookmark resources they find useful for quick access later.
4. **Search Functionality**: A search bar enables users to find specific study materials, previous year questions (PYQs), notes, and books.
5. **Document Preview**: Users can preview documents and resources before downloading, ensuring they get exactly what they need.

## Tech Stack
- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Node.js, Firebase
- **Deployment**: Netlify

## Installation and Setup
To get a local copy up and running, follow these simple steps.

### Prerequisites
- Node.js installed on your local machine.
- Firebase account with a configured project.

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/ankitklakra/asset-manager.git
    cd asset-manager
    ```

2. Install NPM packages:
    ```bash
    npm install
    ```

3. Set up Firebase:
    - Go to your Firebase console.
    - Set up Firestore and Firebase Storage.
    - Get your Firebase configuration and add it to the `config.js` file.

4. Run the application:
    ```bash
    npm run dev
    ```
   The application will start on `http://localhost:3000`.


## Contributing
If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## License
Distributed under the MIT License. See `LICENSE` for more information.

