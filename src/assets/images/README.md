# Local images (interim)

`BaseImage` uses a file here in preference to Cloudinary when the path matches the image id, ignoring the extension:

| `src` / `featured_image_src`      | Local file                                              |
| --------------------------------- | ------------------------------------------------------- |
| `projects/trellis-ai/scan-review` | `src/assets/images/projects/trellis-ai/scan-review.png` |

Use `.png`, `.jpg`, `.webp` or `.avif`. Once an image is uploaded to Cloudinary under the same id, delete the local file and nothing else needs to change.
