
# ImageKit Integration Guide

This project integrates ImageKit for valid image uploading, storage, and manipulation.

## Features Implemented
1.  **Image Upload**: `Create Page` allows users to upload images using ImageKit's client-side upload functionality (`imagekitio-next`).
2.  **Authentication**: Secure server-side signature generation for client-side uploads via `/api/imagekit/auth`.
3.  **Advanced Editing**: Text Overlay, Background Removal, Rotate, Rounded Corners, Blur, Grayscale, and Quality adjustments.
4.  **Save & Resume**: Project editing state is saved to the database (Postgres JSONB), allowing users to resume editing later.
5.  **Download**: Download the transformed image directly from the editor.
6.  **Project Management**: Uploaded images are saved as "Projects" in the database.
4.  **Dashboard**: Lists all user projects.
5.  **Image Editor**: A dedicated page for each project (`/dashboard/projects/[id]`) allowing real-time transformations (Resize, Quality, Blur, Grayscale).

## Key Files
-   `lib/imagekit.ts`: Server-side ImageKit client configuration.
-   `app/api/imagekit/auth/route.ts`: API route for generating auth parameters.
-   `components/image-upload.tsx`: Client component for uploading files.
-   `components/project-editor.tsx`: The UI for editing images.
-   `actions/projects.ts`: Server actions for database operations.

## How it Works
1.  **Upload**: The `ImageUpload` component requests auth params from the API, then uploads directly to ImageKit.
2.  **Save**: On success, the image metadata (URL, file path, ID) is sent to `createProject` server action to be saved in the `projects` table.
3.  **Edit**: The Editor uses `IKImage` component which constructs transformation URLs on the fly based on state (sliders/inputs).

## Environment Variables
Ensure these are set in `.env`:
-   `NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY`
-   `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT`
-   `IMAGEKIT_PRIVATE_KEY`
-   `DATABASE_URL` (for Drizzle/Postgres)
