# CodeVista: A Minimalist GitHub Clone

CodeVista is a visually stunning, minimalist interpretation of a GitHub clone, designed with a focus on clarity, simplicity, and an exceptional user experience. Built on Cloudflare's edge network, it offers a fast, read-only interface for browsing users, repositories, and code. The application's core philosophy is 'less is more', stripping away the complexity of a full-featured Git platform to provide a serene and focused environment for code exploration.

[cloudflarebutton]

## ✨ Key Features

- **Minimalist Interface**: A clean, uncluttered UI that prioritizes content and readability.
- **Powerful Search**: Easily find GitHub users and their repositories.
- **User Profiles**: View user details, including avatar, bio, and a paginated list of public repositories.
- **Repository Browser**: Navigate repository file trees with an intuitive and responsive layout.
- **Code Viewer**: Read code with elegant syntax highlighting and line numbers.
- **Responsive Design**: A flawless experience across all device sizes, from mobile to desktop.
- **Built for Performance**: Deployed on Cloudflare's edge network for lightning-fast load times.

## 🛠️ Technology Stack

- **Framework**: [React](https://react.dev/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Deployment**: [Cloudflare Workers](https://workers.cloudflare.com/)

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running for development and testing purposes.

### Prerequisites

Make sure you have [Bun](https://bun.sh/) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/codevista.git
    cd codevista
    ```

2.  **Install dependencies:**
    ```sh
    bun install
    ```

3.  **Run the development server:**
    ```sh
    bun dev
    ```

The application should now be running on `http://localhost:3000`.

## ⚙️ Development

The project includes several scripts to help with the development workflow:

-   `bun dev`: Starts the Vite development server with hot-reloading.
-   `bun build`: Builds the application for production. The output is generated in the `dist` directory.
-   `bun lint`: Runs ESLint to analyze the code for potential errors and style issues.
-   `bun preview`: Serves the production build locally to preview before deployment.

## ☁️ Deployment

This project is optimized for deployment on the Cloudflare network.

1.  **Login to Wrangler:**
    If you haven't already, authenticate Wrangler with your Cloudflare account:
    ```sh
    bunx wrangler login
    ```

2.  **Deploy the application:**
    Run the deploy script to build and deploy your application to Cloudflare Workers.
    ```sh
    bun deploy
    ```

Alternatively, you can deploy your own version of this project with a single click.

[cloudflarebutton]

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improving the project, please feel free to fork the repository and create a pull request. You can also open an issue with the "enhancement" tag.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is distributed under the MIT License. See `LICENSE` for more information.