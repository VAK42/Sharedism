# Sharedism - Comprehensive Technical Documentation

## 1. Project Overview & Architectural Vision

This Documentation Presents An In-Depth Technical Analysis Of **Sharedism**, A Modern Social Blogging Platform Designed To Facilitate The Sharing Of Ideas Through Posts, Comments, & Interconnected Communities. The Platform Is Architected Using A Robust Monorepo Structure, Separating Concerns Between A Specialized **NestJS** Backend API & A Dynamic **SvelteKit** Frontend.

The Core Objective Of This Project Is To Create A Scalable, Interactive Environment Where Users Can Publish Content, Engage In Threaded Discussions, & Manage Personal Profiles. By Leveraging The Strong Typing Of TypeScript Across The Entire Stack, Sharedism Ensures Reliability & Developer Velocity. The System Emphasizes Modular Design, Secure Authentication, & A Clean, Responsive User Interface.

From An Architectural Perspective, The System Adopts A Decoupled Client-Server Model. The Backend Serves As A RESTful API Provider Managing Data Persistence & Business Logic, While The Frontend Consumes These APIs To Render A High-Performance Single Page Application (SPA) Experience via SvelteKit. This Separation Allows For Independent Scaling & Maintenance Of Both Layers.

---

## 2. Technology Stack & Infrastructure Decisions

### 2.1 Backend Infrastructure (API Layer)

The Server-Side Logic Is Encapsulated Within A Dedicated NestJS Application, Running On A Node.js Runtime.

* **Framework**: **NestJS**
    * **Strategic Rationale**: NestJS Was Chosen For Its Opinionated, Modular Architecture That Promotes Code Organization & Testability. Its Dependency Injection System Efficiently Manages Services Like Authentication & Database Access.
* **Language**: **TypeScript**
    * **Implementation Details**: The Entire Backend Is Written In TypeScript, Providing Static Typing That Reduces Runtime Errors & Improves Code Maintainability via Interfaces & DTOs.
* **Database System**: **SQLite**
    * **Deployment Strategy**: The Application Currently Utilizes SQLite (`dev.db`) For Lightweight, Serverless Data Storage, Ideal For Development & Rapid Prototyping.
* **Object-Relational Mapping (ORM)**: **Prisma**
    * **Functionality**: Prisma Is Utilized To Define The Schema (`User`, `Post`, `Comment`) & Perform Type-Safe Database Queries. It Simplifies Complex Relations Like Self-Referencing Comments & Many-To-Many Tagging.
* **Authentication & Security**: **JWT** & **Passport**
    * **Security Model**: Authentication Is Handled via JSON Web Tokens (JWT). The `Passport` Library With `JwtStrategy` Validates Bearer Tokens On Protected Routes. Passwords Are Securely Hashed Using **Bcrypt** Before Storage.

### 2.2 Frontend Client (User Interface)

The Frontend Delivers A Reactive & Lightweight User Experience Leveraging The Svelte Ecosystem.

* **Framework**: **SvelteKit**
    * **Architectural Choice**: SvelteKit Provides The Routing & Build Infrastructure. It Offers A Hybrid Approach With Server-Side Rendering (SSR) Capabilities & Client-Side Navigation for Optimal Performance.
* **Styling Engine**: **Tailwind CSS**
    * **Component System**: Tailwind CSS Is Integrated via Vite Plugins To Provide Utility-First Styling. The Design System Utilizes A Dark Mode Theme (`bg-zinc-950`, `text-zinc-100`) For A Modern Aesthetic.
* **State Management**: **Svelte Stores**
    * **Logic**: A Custom `auth` Store (`lib/stores/auth.ts`) Manages The User's Session State, Persisting Tokens To `localStorage` To Survive Page Reloads while keeping the UI reactive.
* **Build Tool**: **Vite**
    * **Optimization**: Vite Powers The Development Server & Build Process, Offering Instant Hot Module Replacement (HMR) & Efficient Bundling.

---

## 3. Detailed System Architecture & Design Patterns

### 3.1 Server-Side Architecture (NestJS)

The Backend Is Organized Into Distinct Modules, Following The Controller-Service-Repository Pattern.

* **Modular Design**:
    * **AuthModule**: Handles Registration, Login, & Token Generation.
    * **UsersModule**: Manages User Profile Retrieval & Updates.
    * **PostsModule**: Handles CRUD Operations For Blog Posts & Tag Management.
    * **CommentsModule**: Manages Threaded Discussions Linked To Posts.
    * **PrismaModule**: A Global Module Providing The Database Connection Service.
* **Request Pipeline**:
    * **Guards**: `JwtAuthGuard` Is Applied To Routes Requiring Authentication, intercepting Requests To Verify Tokens.
    * **DTOs & Validation**: Data Transfer Objects (`CreatePostDto`, `RegisterDto`) Use `class-validator` Decorators To Ensure Incoming Data Integrity Before Reaching Business Logic.

### 3.2 Client-Side Architecture (SvelteKit)

The Frontend Is Structured Around Routes & Reusable Components.

* **API Abstraction**:
    * **Pattern**: A Centralized `api` Utility (`lib/api.ts`) Wraps The Native `fetch` API. It Automatically Injects The Authorization Header From The Auth Store & Handles Error Parsing, simplifying Network Calls.
* **Component Composition**:
    * **Structure**: Complex UIs Are Broken Down Into Components Like `Navbar`, `PostCard`, & `CommentSection`.
    * **Reactivity**: Components Like `CommentSection.svelte` Manage Their Own Local State For Inputs While Fetching Data via The `onMount` Lifecycle Hook.

---

## 4. Comprehensive Database Schema Definition

The Data Model Is Defined In `schema.prisma`, Establishing A Relational Structure To Support Social Interactions.

### 4.1 User Entity (`User`)
Represents The Registered Members Of The Platform.
* **id**: `String` (UUID) - Unique Identifier.
* **email**: `String` (Unique) - User's Login Credential.
* **password**: `String` - Bcrypt Hashed Password.
* **name**: `String` - Display Name.
* **Relations**: Has Many `Posts` & `Comments`.

### 4.2 Post Entity (`Post`)
The Core Content Unit Created By Users.
* **id**: `String` (UUID) - Unique Identifier.
* **title**: `String` - Headline Of The Article.
* **content**: `String` - The Body Text Of The Post.
* **status**: `Enum` (`Draft`, `Published`) - Controls Visibility.
* **Relations**: Belongs To A `User`, Has Many `Comments`, Has Many `Tags` via `PostTag`.

### 4.3 Comment Entity (`Comment`)
Supports Threaded Discussions On Posts.
* **id**: `String` (UUID) - Unique Identifier.
* **content**: `String` - The Text Of The Comment.
* **Relations**: Belongs To A `User` & `Post`.
* **Recursive Relation**: Has A `parentId` Field Pointing To Another Comment, Enabling Nested Replies.

### 4.4 Tag Entity (`Tag`)
Used For Categorizing Content.
* **id**: `String` (UUID) - Unique Identifier.
* **name**: `String` (Unique) - The Label Of The Tag (e.g., "Technology").
* **Relations**: Many-To-Many Relation With `Post` via The Explicit Join Table `PostTag`.

---

## 5. Extensive API Documentation

The Backend Exposes A Structured REST API For Client Consumption.

### 5.1 Authentication (`/auth`)
* **POST** `/register`: Accepts `email`, `name`, `password`. Creates A New User.
* **POST** `/login`: Accepts `email`, `password`. Returns `accessToken` & `refreshToken`.
* **POST** `/logout`: Invalidates The Session (Client-Side).

### 5.2 Posts Management (`/posts`)
* **GET** `/`: Retrieves A Paginated List Of Published Posts. Supports `page` & `pageSize` Query Parameters.
* **POST** `/`: Creates A New Post. Requires Auth. Payload: `title`, `content`, `tags`, `status`.
* **GET** `/search`: Filters Posts By Title Or Content Query String `q`.
* **GET** `/:id`: Fetches A Single Post With Its User, Tags, & Comments.
* **PATCH** `/:id`: Updates A Post. Checks Ownership.
* **DELETE** `/:id`: Removes A Post & Its Associated Data. Checks Ownership.

### 5.3 Comments System (`/posts/:postId/comments`)
* **POST** `/`: Adds A Comment To A Specific Post. Supports `parentId` For Replies. Requires Auth.
* **GET** `/`: Fetches All Top-Level Comments For A Post, Including Nested Replies.

### 5.4 User Profile (`/users`)
* **GET** `/me`: Retrieves The Currently Authenticated User's Profile.
* **PATCH** `/me`: Updates The Current User's `name` Or `password`.

---

## 6. Detailed Installation & Setup Guide

Follow These Steps To Configure The Development Environment For Sharedism.

### 6.1 Prerequisites
* **Node.js**: LTS Version Recommended.
* **NPM**: Package Manager Included With Node.

### 6.2 Backend Setup
1.  **Navigate To Backend**:
    ```bash
    cd Backend
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Database Initialization**:
    Generate The Prisma Client & Push The Schema To The SQLite Database.
    ```bash
    npx prisma db push
    ```
    *(Optional) Seed The Database*:
    ```bash
    npx ts-node src/seed.ts
    ```
4.  **Launch Server**:
    Start The NestJS Development Server.
    ```bash
    npm run start:dev
    ```
    *Server Will Run On `http://localhost:3000`*

### 6.3 Frontend Setup
1.  **Navigate To Frontend**:
    Open A New Terminal & Move To The Frontend Directory.
    ```bash
    cd Frontend
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Launch Client**:
    Start The Vite Development Server.
    ```bash
    npm run dev
    ```
    *Application Will Be Accessible At `http://localhost:5173`*

---

## 7. Project Directory Structure Deep Dive

### Backend Structure (`Backend/src/`)
* **`auth/`**: Contains `AuthController`, `AuthService`, `JwtStrategy`, & Guards.
* **`users/`**: Manages User Data & DTOs (`UpdateUserDto`).
* **`posts/`**: Core Blog Logic Including Search & Tag Handling.
* **`comments/`**: Commenting Logic With Recursive Depth Handling.
* **`prisma/`**: Database Service & Schema Configuration.
* **`main.ts`**: Application Entry Point.

### Frontend Structure (`Frontend/src/`)
* **`routes/`**: SvelteKit File-System Routing.
    * **`+page.svelte`**: Home Page (Recent Posts).
    * **`login/`**, **`register/`**: Auth Pages.
    * **`create/`**: Post Creation Interface.
    * **`posts/[id]/`**: Dynamic Route For Individual Post Viewing.
    * **`profile/`**: User Settings Page.
* **`lib/`**: Shared Code.
    * **`api.ts`**: HTTP Request Wrapper.
    * **`stores/`**: Svelte Stores (Auth State).
    * **`components/`**: Reusable UI Elements (`Navbar`, `PostCard`, `CommentSection`).

---

## 8. Future Roadmap & Enhancements

To Scale Sharedism For Production Use, The Following Enhancements Are Recommended:
* **Database Migration**: Migrate From SQLite To PostgreSQL For Better Concurrency & Scalability.
* **Environment Configuration**: Move Hardcoded Secrets (JWT Keys) Into A `.env` File.
* **Rich Text Editing**: Integrate A Library Like Tiptap Or Quill For Rich Content Creation In Posts.
* **Image Uploads**: Implement File Storage (AWS S3 Or Local Multer) To Allow Users To Upload Avatars & Post Covers.
* **WebSockets**: Implement `Socket.io` Gateway In NestJS For Real-Time Comment Updates.

---

## 9. License

This Project Is Proprietary Software Developed For **Sharedism**. Unauthorized Copying Or Distribution Is Prohibited.

<img src="/Frontend/img/0.png" />
